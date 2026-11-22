---
title: "Swin Transformer 完整学习手册｜从 ViT 到移动窗口注意力"
published: 2026-11-22
description: "沿着一张图像走过 Swin-T 的四个 Stage，在 8×8 网格上移动窗口、检查 Attention Mask，再用原论文图表和 PyTorch 代码理解跨窗口通信。"
category: "深度学习"
tags: ["Transformer", "Swin Transformer", "计算机视觉", "论文精读"]
lang: "zh_CN"
---

窗口注意力把计算限制在局部。可如果相邻的两个 Token 恰好分在不同窗口，它们怎样交换信息？这份手册沿着一张 224×224 图像走过 Swin-T 的四个 Stage，再用一张可以点击的 8×8 网格，看清移动窗口、循环移位和 Attention Mask 各自做了什么。

[回顾 ViT 精读](/posts/interactive/vit/) · [原论文 PDF](https://arxiv.org/pdf/2103.14030v2) · [试试移动窗口](#swin-window-lab) · [查看 PyTorch 示例](#implementation)

<link rel="stylesheet" href="/assets/swin-reading/reader.css">
<script type="module" src="/assets/swin-reading/reader.js"></script>

<swin-handbook-tools class="swin-tools not-prose" data-pagefind-ignore>
  <details><summary>手册目录 · 18 章</summary>
    <nav aria-label="手册章节"><ol>
      <li><a href="#overview">00 如何使用这份手册</a></li>
      <li><a href="#motivation">01 为什么需要 Swin</a></li>
      <li><a href="#vit">02 ViT 必要基础</a></li>
      <li><a href="#architecture">03 四个 Stage 的架构</a></li>
      <li><a href="#merging">04 Patch Merging</a></li>
      <li><a href="#block">05 Swin Block 内部</a></li>
      <li><a href="#wmsa">06 W-MSA 的张量计算</a></li>
      <li><a href="#shift">07 Shifted Window</a></li>
      <li><a href="#cyclic">08 Cyclic Shift 与 Mask</a></li>
      <li><a href="#position">09 相对位置偏置</a></li>
      <li><a href="#complexity">10 复杂度公式推导</a></li>
      <li><a href="#variants">11 Swin-T/S/B/L 变体</a></li>
      <li><a href="#experiments">12 实验与消融</a></li>
      <li><a href="#implementation">13 源码级理解</a></li>
      <li><a href="#mistakes">14 常见误区速查</a></li>
      <li><a href="#quiz">15 自测题与解析</a></li>
      <li><a href="#reading">16 后续阅读计划</a></li>
      <li><a href="#glossary">17 术语与参考来源</a></li>
    </ol></nav>
    <button type="button" data-print>打印或保存为 PDF</button>
  </details>
  <progress value="0" max="100" aria-label="正文阅读进度"></progress>
</swin-handbook-tools>

## <span id="overview"></span>00｜这份手册该怎么读？

目标不是背诵网络结构，而是能沿着一张图像的数据流解释：<strong>为什么做、做了什么、张量怎么变化、有什么证据证明有效。</strong>

**一条主线**　<strong>ViT 的局限</strong> → 分层特征和局部窗口 → 移动窗口跨区通信 → Mask 保证正确性 → 位置偏置与效率 → 实验验证。

> <b>边界说明：</b>标注“论文事实”的内容来自原论文 PDF；演示、算例与伪代码是为了教学补充的推导，不是论文原图或原始源码。模型效果仅对应论文当时的实验条件，不能当作目前的最新性能排名。

### 建议阅读顺序

1. **先读 01–05**　巩固为什么需要 Swin，完整理解形状变化和 Block 的两个残差子层。
2. **把 06–09 连起来读**　从局部 Attention 到移动窗口，再到 Cyclic Shift / Mask / Relative Position Bias，这是技术核心。
3. **再读 10–13**　掌握效率推导、模型变体、消融实验以及代码级的数据排列。
4. **最后做 15 的自测**　无需全对，但应该能自己讲清“为什么 Mask 是必需的”。

## <span id="motivation"></span>01｜为什么在 ViT 之后还需要 Swin？

<p class="swin-source">论文定位：第 1–2 页，Abstract、Introduction、Figure 1。</p>

原始 <strong>ViT（Vision Transformer）</strong> 将图像切成 Patch，再让所有 Patch 在 Transformer 中参与<strong>全局 Self-Attention</strong>。这对图像分类很有效，但作为通用视觉主干（backbone）时，有两个特别突出的设计挑战。

**挑战 A · 尺度不同**　图像中的物体可大可小，目标检测和语义分割往往需要不同空间尺度的特征图。原始 ViT 主干在各层通常保持相同 Token 网格尺度。

**挑战 B · 高分辨率**　全局 Attention 的每个 Token 都要和其他 N 个 Token 求关联。仅注意力矩阵的规模就随 <strong>N²</strong> 增长，密集预测会变昂贵。

<figure>
  <img src="/assets/swin-reading/figure-1.png" alt="论文 Figure 1：Swin 的层次化特征与 ViT 的单尺度特征对比" loading="lazy" width="540" height="336" decoding="async">
  <figcaption>原论文 Figure 1（第 1 页）：左边 Swin 的特征空间分辨率逐级降低；右边原始 ViT 的主干尺度保持不变。 <a href="https://arxiv.org/pdf/2103.14030v2#page=1">查看 PDF 第 1 页</a></figcaption>
</figure>

| 维度 | 原始 ViT | Swin Transformer |
| --- | --- | --- |
| 基本输入 | Patch Token | Patch Token |
| 主干空间尺度 | 大体单一尺度 | 四阶段层次化特征 |
| Attention 范围 | 全局 | 固定大小局部窗口 |
| 跨窗口信息 | 直接全局访问 | 靠相邻的 W-MSA / SW-MSA 逐层传播 |
| 定位 | 首先为图像分类建立强基线 | 通用视觉 Backbone，兼顾分类和密集预测 |

> <b>一句话总结：</b>Swin 的两根主线是 <strong>Hierarchical（分层）</strong> 以及 <strong>Shifted Window（移动窗口）</strong>：前者帮助多尺度表达，后者在局部计算的效率与跨窗口交流之间取得平衡。

<strong>不要误解：</strong>“ViT 不适合直接作为多尺度 Backbone”不等于“ViT 不能做检测或分割”。ViT 可以借助额外结构适配密集任务，论文比较的是架构的适配方式和效率。

## <span id="vit"></span>02｜真正需要的 ViT 基础：补到刚好够用

读过 ViT 后，你只需要确认以下概念，才能顺利理解 Swin 的实现。

| 概念 | 直觉 | 在 Swin 中是否保留？ |
| --- | --- | --- |
| Token / Patch | 用向量表示图像的局部区域 | 保留；起始 Patch 通常为 4×4 |
| Q / K / V | 查询、匹配、聚合内容 | 保留；限制在一个窗口内 |
| Multi-Head | 并行学习多组相关性 | 保留；各 Head 维度通常 32 |
| LayerNorm | 对每个 Token 的通道特征归一化 | 保留，Pre-LN |
| Residual | 输出 = 输入 + 学到的更新 | 保留，每个 Block 两处 |
| MLP | 每个 Token 内部非线性变换 | 保留，默认 C → 4C → C |

$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\!\left(\frac{QK^\top}{\sqrt d}\right)V
$$

这里 <strong>QK<sup>T</sup></strong> 是匹配分数，<strong>Softmax</strong> 把每行变成权重，乘 <strong>V</strong> 代表按照权重聚合信息。<strong>MLP 不直接混合不同 Token</strong>，它对每个 Token 的通道特征做变换；跨 Token 交换主要由 Attention 完成。

> <b>形状口诀：</b>LN 不变形；Attention 不变形；MLP 临时扩维再还原；Residual 要求相加的张量形状一致。真正降低空间分辨率的是 <strong>Patch Merging</strong>。

## <span id="architecture"></span>03｜整个 Swin-T：沿数据流看四个 Stage

<p class="swin-source">论文定位：第 3–4 页 §3.1、Figure 3；第 10 页 Table 7。以下以 224×224 输入、Swin-T 为例。</p>

<figure>
  <img src="/assets/swin-reading/figure-3.png" alt="论文 Figure 3：Swin-T 四阶段架构和两个相邻 Swin Block" loading="lazy" width="1080" height="334" decoding="async">
  <figcaption>论文 Figure 3（第 4 页），左侧是四个 Stage，右侧是连续两个 Swin Block。 <a href="https://arxiv.org/pdf/2103.14030v2#page=4">查看 PDF 第 4 页</a></figcaption>
</figure>

**224×224×3** → **4×4 Patch** → **Linear Embedding** → **Stage 1–4**

### 输入如何变成 Token？

<strong>Patch Partition：</strong>4×4×3 = <strong>48</strong> 个原始数值构成一个 Token；224/4 = <strong>56</strong>，因此共有 <strong>56×56 = 3136</strong> 个 Token。接着 <strong>Linear Embedding</strong> 把每个 48 维 Token 投影成 <strong>C=96</strong> 维。

$$
[224,224,3]\to[56,56,48]\to[56,56,96]
$$

### 四个 Stage 的形状

| Stage | 特征图（H × W × C） | Token 数 | Block 数 |
| --- | --- | --- | --- |
| STAGE 1 | 56×56×96 | 3136 | 2 |
| STAGE 2 | 28×28×192 | 784 | 2 |
| STAGE 3 | 14×14×384 | 196 | 6 |
| STAGE 4 | 7×7×768 | 49 | 2 |

> <b>关键规律：</b>每次 Patch Merging → <strong>高宽各减半</strong>，Token 总数变为 1/4，通道数变为 2 倍。Stage 内多个 Block 通常不改变当前的 H×W×C。

### 一个经常出现的误解

Stage 的“输出分辨率降低”说的是<strong>特征图空间网格</strong>变小，不代表原始图像又被物理缩小处理了一遍。更深层单个 Token 对应更大范围的原图内容，但这不意味着每个 Token 都能直接关注整张图。

### 分类头怎么接？

论文附录 A2.1 说明：用于图像分类时，Stage 4 的特征图经过 <strong>Global Average Pooling（全局平均池化）</strong>，再接线性分类器；论文认为这与使用 ViT 式 class token 的分类精度相当。<span class="source-note">来源：论文第 9 页 A2.1。</span>

## <span id="merging"></span>04｜Patch Merging：不是平均池化

输入形状为 <strong>H×W×C</strong>，把每组相邻的 2×2 个 Token <strong>拼接</strong>成 4C 维，再经过线性投影变成 2C 维。

$$
[H,W,C]\to[H/2,W/2,4C]\to[H/2,W/2,2C]
$$

**拼接 Concatenate**　例如原本 4 个 Token 都是 96 维：<br><strong>[A(96), B(96), C(96), D(96)]</strong> → 1 个 384 维向量。不是求均值、不是把四个向量逐元素相加。

**线性投影 Projection**　将每个 384 维拼接向量映射为 <strong>192 维</strong>。最终每 4 个旧 Token 对应 1 个新 Token；空间高宽减半。

$$
56\times56\times96\to28\times28\times384\to28\times28\times192
$$

> <b>容易混淆：</b>MLP 也会执行 96→384→96，但它不减少 Token 数量。Patch Merging 是 <strong>4 个位置合并成 1 个位置</strong>，它承担下采样职责。

从第二阶段开始，得到越来越粗粒度的特征，可以更方便地交给 FPN、UPerNet 等依赖多尺度特征的任务结构。<span class="source-note">来源：论文 §3.1，第 3–4 页。</span>

## <span id="block"></span>05｜Swin Transformer Block：内部到底做了什么？

可以把它看成 <strong>ViT Encoder Block</strong>，只把原先全局 MSA 换成<strong>局部 W-MSA 或 SW-MSA</strong>。别的基础构件——LayerNorm、MLP、Residual——仍然存在。

**Block 1 · W-MSA**　LN → <strong>普通窗口注意力</strong> → 残差相加 → LN → MLP → 残差相加。

**Block 2 · SW-MSA**　LN → <strong>移动窗口注意力</strong> → 残差相加 → LN → MLP → 残差相加。

$$
\begin{aligned}X' &= X+\operatorname{W\!-\!MSA}(\operatorname{LN}(X))\\Y &= X'+\operatorname{MLP}(\operatorname{LN}(X'))\end{aligned}
$$

<strong>Pre-LN：</strong>先 LayerNorm，再送入子模块。<strong>Residual：</strong>分别绕过 Attention 和 MLP 各自的计算分支，将旧表示加回来。

$$
\begin{aligned}X'_{\rm shift} &= X+\operatorname{SW\!-\!MSA}(\operatorname{LN}(X))\\Y_{\rm shift} &= X'_{\rm shift}+\operatorname{MLP}(\operatorname{LN}(X'_{\rm shift}))\end{aligned}
$$

论文公式 (3) 通过 <code>ẑ<sup>l</sup></code> 和 <code>z<sup>l</sup></code> 区分“Attention 子层后的中间输出”和“整个 Block 后的输出”；连续两个 Block 就是这两组公式依次执行。

### 这些模块分别改变什么？

| 模块 | 负责什么 | 改变 H×W×C？ |
| --- | --- | --- |
| LayerNorm | 归一化每个 Token 的 C 个通道 | 不改变 |
| W-MSA | 固定窗口内部 Token 交互 | 不改变 |
| SW-MSA | 移动后的窗口内部交互 | 不改变 |
| MLP | 逐 Token 非线性变换，C→4C→C | 最终不改变 |
| Residual | 输入与变换输出逐元素相加 | 不改变 |
| Patch Merging | 下采样并合并相邻 Token | <strong>改变</strong> |

<strong>为什么 LayerNorm？</strong>稳定特征尺度与训练。<strong>为什么 MLP？</strong>通过升维、GELU、降维，提高逐 Token 特征变换的表达能力。<strong>为什么 Residual？</strong>保留直接传递输入与梯度的路径，有助于深层优化。

> <b>一分钟复述：</b>一个 Block 内先由 Attention 处理 Token 之间的关系，再由 MLP 处理各 Token 的特征；两次都用 Pre-LN 与残差相加。两个相邻 Block 只有窗口划分方式不同。

## <span id="wmsa"></span>06｜W-MSA：从 56×56 到 49×49 的注意力矩阵

<p class="swin-source">论文第 4 页 §3.2：Self-attention in non-overlapped windows；默认 M=7，Swin-T Stage 1 的 C=96、Heads=3。</p>

假设特征图大小是 <strong>56×56×96</strong>。将其按 <strong>7×7</strong> 的窗口划分：窗口数 = (56/7)² = <strong>64</strong>；每个窗口有 <strong>49</strong> 个 Token。

**56×56×96** → **64×49×96** → **64×3×49×32** → **Attention**

<strong>每个 Head 的维度</strong>为 96/3 = <strong>32</strong>。对每个窗口、每个 Head，Q/K/V 都有 <strong>49×32</strong> 的形状，因此 QKᵀ 产生 <strong>49×49</strong> 的相关性矩阵。

$$
Q:[49,32],\quad K^\top:[32,49],\quad QK^\top:[49,49]
$$

窗口间使用<strong>同一套可学习投影参数</strong>，但注意力权重由每个窗口自身的特征决定。最后合并 Heads、做输出投影并还原空间排列，输出形状再次回到 <strong>56×56×96</strong>。

| 注意力分数（每个 Head） | 元素数 | 计算 |
| --- | --- | --- |
| 全局 Attention 分数数量 / Head | 9,834,496 | 3136 × 3136 |
| W-MSA 分数数量 / Head | 153,664 | 64 × 49 × 49 |

这里是<strong>注意力分数元素数量减少 64 倍</strong>的例子，不代表整个网络快 64 倍。线性投影、MLP、显存访问和硬件实现仍有额外开销；严格复杂度推导在第 10 章。

## <span id="shift"></span>07｜Shifted Window：不是让整张图做全局 Attention

<p class="swin-source">论文第 2 页 Figure 2、第 4 页 §3.2：连续 Block 先固定窗口 W-MSA，再改用 SW-MSA。</p>

<figure>
  <img src="/assets/swin-reading/figure-2.png" alt="论文 Figure 2：相邻两个 Block 改变窗口划分，从而连接原来的不同窗口" loading="lazy" width="532" height="254" decoding="async">
  <figcaption>论文 Figure 2（第 2 页），左为普通窗口划分，右为偏移后的窗口划分。 <a href="https://arxiv.org/pdf/2103.14030v2#page=2">查看 PDF 第 2 页</a></figcaption>
</figure>

只用固定窗口，窗口 A 内的 Token 只能从 A 内部取信息；旁边的窗口 B 无法直接交换信息。Swin 的做法是<strong>在下一层把窗口边界移动约半个窗口</strong>，令一个新窗口覆盖原来多个窗口的部分 Token。

**W-MSA**　先在固定窗口内部交流。计算可控，但不同窗口在本层之间互不访问。

**SW-MSA**　下一个 Block 改变分组；新窗口跨过旧边界，使先前不同组的部分 Token 得以通信。

> <b>关键限定：</b>W-MSA + SW-MSA 不会让每个 Token 在两层后就“访问到全图所有 Token”。跨区域信息是在堆叠 Block 的过程中逐层传播的。

默认窗口边长 M = 7，偏移通常为 <strong>floor(M/2) = 3</strong> 个 Token。Figure 2 为了说明原理，用的是 <strong>8×8 Token、4×4 窗口、移动 2 格</strong>的示意场景。

## <span id="cyclic"></span>08｜Cyclic Shift + Attention Mask：怎样屏蔽循环移位产生的虚假连接？

<p class="swin-source">论文第 5 页 §3.2，Figure 4。下面的一维算例及 8×8 交互网格是教学补充，帮助还原论文机制。</p>

<strong>先区分两个概念：</strong>Shifted Window 是“改变窗口边界、促进跨旧窗口通信”的<strong>目标</strong>；Cyclic Shift + Mask 是“既保留这个效果，又能规则批处理”的<strong>实现方案</strong>。

### 第一步：一维例子，最不容易绕晕

$$
\begin{aligned}\text{原始划分}\quad &[A\,B\,C\,D]\ [E\,F\,G\,H]\\\text{移动划分}\quad &[A\,B]\ [C\,D\,E\,F]\ [G\,H]\end{aligned}
$$

第二行确实让 D 和 E 交流了，但窗口数量从 2 变为 3，边缘窗口只有 2 个 Token。直接填充或者分开计算不够规整。

$$
\text{循环左移 2 格}\quad [C\,D\,E\,F]\ [G\,H\,A\,B]
$$

现在恢复成<strong>2 个大小一致的计算窗口</strong>了：第一个窗口 C–F 合理；第二个窗口里的 G/H 和 A/B 却只是由于循环移动才被拼在一起，它们在原始图像的左右两端，并不相邻。

> <b>Mask 要解决的不是跨旧窗口通信，而是错误的“首尾相连”。</b> 允许 C/D 与 E/F 交流；禁止 G/H 与 A/B 因循环拼接而误连。

### 第二步：可交互的二维 8×8 模拟

选择「4 · 加上 Mask」，再点网格中的任意一个 Token。绿色描边标出它能关注的位置，红色虚线标出同一计算窗口内被 Mask 屏蔽的位置。

<div class="swin-lab not-prose" aria-label="Swin 移动窗口交互演示" id="swin-window-lab">
   <div class="lab-controls" id="demoControls"><button class="active" data-step="0" type="button">1 · 固定窗口</button><button data-step="1" type="button">2 · 理想偏移</button><button data-step="2" type="button">3 · Cyclic Shift</button><button data-step="3" type="button">4 · 加上 Mask</button><button data-step="4" type="button">5 · 移回原位</button></div>
   <div class="lab-body">
    <div><div id="windowGrid" class="grid-mat" role="group" aria-label="8乘8 Token 网格，每格可点击"></div><div class="legend"><span><i class="legend-i"></i>可注意</span><span><i class="legend-i"></i>被 Mask 阻止</span><span><i class="legend-i"></i>当前 Token</span></div></div>
    <div class="lab-description"><h4 id="demoTitle">1 · 常规 W-MSA</h4><p id="demoDesc"></p><div class="stat" id="demoStat" role="status"></div><div class="instruction" id="demoHint">点击不同颜色或窗口边缘的 Token，观察通信范围如何变化。</div></div>
   </div>
 </div>

### 第三步：Mask 怎样工作？

假设循环移动后的一个窗口是 <strong>[G,H,A,B]</strong>。它们在计算矩阵里可以放在同一个批次，但<strong>不能跨越原图的首尾边界互相注意</strong>。

|  | G | H | A | B |
| --- | --- | --- | --- | --- |
| G | 0 | 0 | −∞ | −∞ |
| H | 0 | 0 | −∞ | −∞ |
| A | −∞ | −∞ | 0 | 0 |
| B | −∞ | −∞ | 0 | 0 |

这里 <strong>0</strong> 表示“这个位置不额外惩罚”，<strong>−∞</strong> 表示“在 Softmax 之后权重归零”。实际代码通常用一个足够大的负数（例如 −100）近似；Mask 只限制合法连接，并不会删除 Token。

$$
\operatorname{Attention}=\operatorname{softmax}\!\left(\frac{QK^\top}{\sqrt d}+B+\mathrm{Mask}\right)V
$$

### 第四步：为什么要 Reverse Cyclic Shift？

$$
[C'\,D'\,E'\,F'\,G'\,H'\,A'\,B']\to[A'\,B'\,C'\,D'\,E'\,F'\,G'\,H']
$$

撇号表示<strong>Attention 已经更新了特征</strong>。反向移动只恢复每个 Token 的<strong>空间位置</strong>，不撤销信息交互。若不恢复位置，后续的残差相加就会把本不对应的空间位置混在一起。

<figure>
  <img src="/assets/swin-reading/figure-4.png" alt="原论文 Figure 4：窗口划分，循环移动，masked MSA 和反向循环移动" loading="lazy" width="508" height="216" decoding="async">
  <figcaption>原论文 Figure 4（第 5 页）。建议看完上面的模拟再回头看这张图。 <a href="https://arxiv.org/pdf/2103.14030v2#page=5">查看 PDF 第 5 页</a></figcaption>
</figure>

> <b>最终口诀：</b>移动窗口是<strong>目的</strong>；循环位移让窗口保持规则是<strong>工程技巧</strong>；Mask 切断错误的首尾连接；Reverse Shift 恢复输出坐标。

## <span id="position"></span>09｜Relative Position Bias：Attention 怎样感知空间位置？

<p class="swin-source">论文第 5 页 §3.2 Relative position bias、公式 (4)。</p>

原始 ViT 将<strong>绝对位置编码</strong>加到 Token 表示中；Swin 在窗口内的 Attention 分数上加入<strong>相对位置偏置 B</strong>，体现一对 Token 的相对位移。

$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\!\left(\frac{QK^\top}{\sqrt d}+B\right)V
$$

比如 E → F 与 D → E 都是“向右一个格子”，因此可使用相同的相对位移偏置参数。不过内容不同，最终注意力权重仍可能完全不同。

### 互动：选两个位置，查看相对位移

<div class="swin-lab not-prose" id="swin-position-lab"><p>蓝色框为 Query，橙色框为 Key。先点一次设 Query，再点一次设 Key；之后可以不断点击切换。</p><div class="pos-lab"><div class="pos-grid" id="positionGrid"></div><div class="pos-details" id="positionDetails" role="status"></div></div></div>

### 为什么偏置表是 (2M−1)×(2M−1)？

对于一个 <strong>M×M</strong> 窗口，沿行方向可以有从 <strong>−(M−1)</strong> 到 <strong>+(M−1)</strong> 的相对位移，共 <strong>2M−1</strong> 种；列方向也一样。

**窗口 7×7** → **49 Tokens** → **13×13=169 偏置**

注意：一个 Head 的完整 Attention 分数矩阵仍然是 <strong>49×49</strong>；可学习的相对位置偏置表是 <strong>13×13</strong>。前者包含每对 Token 的关系，后者按相对位移<strong>共享参数</strong>。两个形状不要混淆。

| 概念 | 作用 | 是否可学习 |
| --- | --- | --- |
| QKᵀ/√d | 内容相关性 | 投影参数可学习 |
| Relative Position Bias（B） | 调整相对位移对应的分数 | 是 |
| Attention Mask | 禁止非法注意力连接 | 否，由窗口位置规则计算 |

> <b>误区：</b>相对位置偏置不是人工规定“越近越重要”，而是模型学习不同相对位移的偏好；Mask 则可以强制某些位置的注意力权重为 0，两者作用不同。

## <span id="complexity"></span>10｜复杂度公式从哪里来？

<p class="swin-source">论文第 4 页公式 (1)、(2)。下面推导为按论文记号展开的教学解释。论文的 FLOPs 计数省略了 Softmax 等部分计算。</p>

先记号统一：空间网格 <strong>h×w</strong>，共有 <strong>N=hw</strong> 个 Token；通道维度 <strong>C</strong>；窗口边长 <strong>M</strong>，每窗 <strong>M²</strong> 个 Token。

$$
\Omega(\mathrm{MSA})=4hwC^2+2(hw)^2 C\tag{1}
$$

$$
\Omega(\mathrm{W\!-\!MSA})=4hwC^2+2M^2hwC\tag{2}
$$

### 第一项：4NC² 来自哪里？

1. <strong>Q 投影：</strong>N×C 输入乘以 C×C 权重，约 NC² 次乘加。
2. <strong>K 投影：</strong>约 NC²。
3. <strong>V 投影：</strong>约 NC²。
4. <strong>输出投影：</strong>Heads 拼接后还有一次 C→C，约 NC²。

因此两种 Attention 都有相同的<strong>4NC²</strong>一项。即使只做窗口 Attention，Q/K/V 和输出线性层也不能省掉。

### 第二项：为什么全局是 2N²C？

1. QKᵀ：N 个 Query 与 N 个 Key 相乘，约 <strong>N²C</strong>。
2. 注意力权重乘 V：约 <strong>N²C</strong>。

合起来约为 <strong>2N²C</strong>。这就是随着 Token 总数增加的<strong>平方项</strong>。

### 第三项：为什么窗口内变成 2NM²C？

一共有 <strong>N/M²</strong> 个窗口；每个窗口 M² 个 Token，单窗注意力矩阵为 M²×M²，计算 QKᵀ 和乘 V 的成本约 <strong>2(M²)²C</strong>。

$$
\frac{N}{M^2}\cdot 2(M^2)^2C=2NM^2C
$$

当窗口大小 <strong>M 固定</strong>时，第二项随 N 线性增长。所以论文称 W-MSA 的复杂度相对于图像 Token 数是线性的。更准确地说：<strong>固定 C 与 M 时，该模块总 FLOPs 对 N 线性增长</strong>。

### 代入 Stage 1 的具体数字

| 计算部分 | 全局 MSA | W-MSA |
| --- | --- | --- |
| QKV + 输出线性投影 | 115,605,504 | 115,605,504 |
| 注意力矩阵乘法 + 加权汇总 | 1,888,223,232 | 29,503,488 |
| 两项合计（估算） | 2,003,828,736 | 145,108,992 |

这里取 N=3136、C=96、M=7：<strong>注意力混合部分减少 64 倍</strong>，但包含线性投影的模块总操作量比约为 <strong>13.8 倍</strong>；实际速度不能直接从这个数字推出。

> <b>为什么实际 GPU 速度不等于 FLOPs 比例？</b>窗口分组、数据布局、显存访问、张量内核实现、吞吐批量大小等，都会影响真实延迟。论文第 8 页 Table 5 专门测了这些实现差异。

## <span id="variants"></span>11｜Swin-T、S、B、L 有什么区别？

<p class="swin-source">论文第 5 页 §3.3，第 10 页 Table 7。下面 Layer 数是四个 Stage 中的 Swin Block 数量。</p>

| 模型 | Stage 1 通道 C | 各 Stage Block 数 | 各 Stage Heads | 参数量（论文） |
| --- | --- | --- | --- | --- |
| Swin-T | 96 | 2 / 2 / 6 / 2 | 3 / 6 / 12 / 24 | 29M |
| Swin-S | 96 | 2 / 2 / 18 / 2 | 3 / 6 / 12 / 24 | 50M |
| Swin-B | 128 | 2 / 2 / 18 / 2 | 4 / 8 / 16 / 32 | 88M |
| Swin-L | 192 | 2 / 2 / 18 / 2 | 6 / 12 / 24 / 48 | 197M |

<figure>
  <img src="/assets/swin-reading/table-7.png" alt="原论文第 10 页 Table 7，Swin-T S B L 详细配置" loading="lazy" width="1046" height="440" decoding="async">
  <figcaption>原论文 Table 7（第 10 页）：不同 Stage 的宽度、Head 数、Block 数。 <a href="https://arxiv.org/pdf/2103.14030v2#page=10">查看 PDF 第 10 页</a></figcaption>
</figure>

共同点：默认 <strong>7×7 Window</strong>、每个 Head 维度 <strong>d=32</strong>、MLP 扩展比例 <strong>4</strong>。不同规模主要通过<strong>第一阶段通道宽度 C</strong>和<strong>第三阶段 Block 数量</strong>调节。

例如 Swin-S 和 Swin-T 都从 96 通道开始，但 Stage 3 的 Block 数由 <strong>6 增至 18</strong>；Swin-B 则进一步加宽通道。

> <b>读模型配置时先看：</b>每个 Stage 的 <strong>深度（Blocks）</strong>、<strong>宽度（Channels）</strong>和 <strong>Heads</strong>，再看参数与 FLOPs，而不只是 T/S/B/L 的命名。

## <span id="experiments"></span>12｜实验到底证明了什么？

<p class="swin-source">论文第 6–9 页 §4，尤其 Table 1、2、3、4、5、6。下列是 2021 年论文中的报告结果，不代表后续最新榜单。</p>

### 三个任务、三个指标体系

| 任务 | 数据集 | 指标 | 读实验时关注什么 |
| --- | --- | --- | --- |
| 图像分类 | ImageNet-1K | Top-1 Accuracy | 预测类别是否正确 |
| 目标检测 / 实例分割 | COCO | Box AP / Mask AP | 定位框和实例掩码的质量 |
| 语义分割 | ADE20K | mIoU | 像素级语义分割的一致性 |

### 消融 1：Shifted Window 真的有用吗？

| Swin-T 配置 | ImageNet Top-1 | COCO Box AP | ADE20K mIoU |
| --- | --- | --- | --- |
| 所有层固定窗口（不 shift） | 80.2 | 47.7 | 43.3 |
| 正常 Swin（shifted windows） | <strong>81.3</strong> | <strong>50.5</strong> | <strong>46.1</strong> |
| 增益 | +1.1 | +2.8 | +2.8 |

结果支持作者的解释：<strong>不同窗口之间建立联系</strong>能够提升多个任务的表现。（来源：论文第 8 页 Table 4）

### 消融 2：相对位置偏置有用吗？

| 位置方案 | 分类 Top-1 | COCO Box AP | ADE20K mIoU |
| --- | --- | --- | --- |
| 不加位置编码 / 偏置 | 80.1 | 49.2 | 43.8 |
| 绝对位置编码 | 80.5 | 49.0 | 43.2 |
| 相对位置偏置 | <strong>81.3</strong> | <strong>50.5</strong> | <strong>46.1</strong> |

<figure>
  <img src="/assets/swin-reading/table-4.png" alt="论文第 8 页 Table 4：Shifted Window 与相对位置偏置消融" loading="lazy" width="582" height="331" decoding="async">
  <figcaption>原论文 Table 4：将不同网络组件替换或删除，观察三个任务的指标变化。 <a href="https://arxiv.org/pdf/2103.14030v2#page=8">查看 PDF 第 8 页</a></figcaption>
</figure>

### 效率实验：为什么 Figure 4 不只是“数学花活”？

Table 5 在相同论文测试环境下比较 <strong>直接 padding</strong> 和 <strong>cyclic shift</strong> 的真实吞吐量。对 Swin-T，论文报告 <strong>670 → 755 images/s</strong>；对于 Swin-S，为 <strong>371 → 437 images/s</strong>，说明工程实现策略也影响运行效率。

<figure>
  <img src="/assets/swin-reading/table-5.png" alt="论文第 8 页 Table 5：不同窗口实现的 GPU 速度" loading="lazy" width="595" height="297" decoding="async">
  <figcaption>原论文 Table 5：GPU 上实际的速度比较；FPS 越高表示论文测试条件下吞吐越好。 <a href="https://arxiv.org/pdf/2103.14030v2#page=8">查看 PDF 第 8 页</a></figcaption>
</figure>

### 读整体结果时要防止不公平比较

**ImageNet 分类**　Table 1(a)：224²、常规 ImageNet-1K 训练下，Swin-T <strong>81.3%</strong>，DeiT-S <strong>79.8%</strong>。不过两者吞吐也不同，不能只说 Swin 在所有维度都更快。

**COCO / ADE20K**　论文报告 Swin-L 的系统级最好结果包括 <strong>58.7 Box AP</strong>、<strong>51.1 Mask AP</strong>；ADE20K 验证集 mIoU <strong>53.5</strong>。这些结果使用更大模型、预训练和特定任务头及测试策略。

> <b>科学阅读方法：</b>看论文不是只看最佳数字。对于跨模型比较，检查 <strong>数据集、预训练、输入尺寸、检测/分割头、训练轮数、测试增强</strong>是否一致；对核心模块是否有效，优先看控制变量的消融实验。

## <span id="implementation"></span>13｜把论文映射到 PyTorch 代码

以下是<strong>教学级简化示例</strong>，帮助你检查张量维度。不是从作者仓库复制的完整模型；生产代码还需要 batch、padding、不同 Head、position bias、DropPath 等处理。

### 1. Patch Partition 和 Linear Embedding

*Python / PyTorch · 只展示核心形状*

~~~python
import torch
import torch.nn as nn

# PyTorch 的图像张量通常是 [batch, channel, height, width]
x = torch.randn(1, 3, 224, 224)

# kernel_size = stride = 4，可同时完成 Patch Partition + Linear Embedding
patch_embed = nn.Conv2d(3, 96, kernel_size=4, stride=4)
y = patch_embed(x)     # [1, 96, 56, 56]
y = y.permute(0, 2, 3, 1)   # [1, 56, 56, 96]
print(y.shape)
~~~

这里用 <strong>Conv2d(kernel=4, stride=4)</strong> 实现的是一种等价的线性 Patch Embedding：每个不重叠 4×4 Patch 投影到 96 维。这不意味着之后整个 Swin 使用卷积替代 Attention。

### 2. 最小版 Patch Merging

*Python / PyTorch · 适用于偶数高宽*

~~~python
import torch
import torch.nn as nn

x = torch.randn(1, 56, 56, 96)  # [B, H, W, C]
x0 = x[:, 0::2, 0::2, :]      # 左上
x1 = x[:, 1::2, 0::2, :]      # 左下
x2 = x[:, 0::2, 1::2, :]      # 右上
x3 = x[:, 1::2, 1::2, :]      # 右下

x = torch.cat([x0, x1, x2, x3], dim=-1)
print(x.shape)                 # [1, 28, 28, 384]

reduction = nn.Linear(4 * 96, 2 * 96)
y = reduction(x)
print(y.shape)                 # [1, 28, 28, 192]
~~~

### 3. 最小版 Cyclic Shift 与 Reverse Shift

*Python / PyTorch*

~~~python
import torch

x = torch.arange(8 * 8).reshape(1, 8, 8, 1)
shift = 2

# 向上、向左循环移 2 格
shifted = torch.roll(x, shifts=(-shift, -shift), dims=(1, 2))

# 这里应在 shifted 上执行 window partition + masked attention
# attended = window_attention(shifted, attention_mask)

# 为了验证“先移后还原”不改变空间顺序，此处仅演示逆操作
restored = torch.roll(shifted, shifts=(shift, shift), dims=(1, 2))
assert torch.equal(restored, x)
~~~

<strong>注意：</strong>如果中间执行了真正的 Attention，恢复后的数值不会再与原始 x 相同；这里的断言只用于验证 <code>torch.roll</code> 正反移动的排列规则。

### 4. 一个可以自己运行的 Mask 构造思路

*Python / PyTorch · 8×8 网格，4×4 Window，shift=2*

~~~python
import torch
H = W = 8
M = 4
S = 2

# 按“循环移动后的坐标”给来源区域编号：
# [0:4] / [4:6] / [6:8] 沿两个轴各划成三段
region = torch.zeros((H, W), dtype=torch.long)
row_slices = [slice(0, H - M), slice(H - M, H - S), slice(H - S, H)]
col_slices = [slice(0, W - M), slice(W - M, W - S), slice(W - S, W)]
count = 0
for rs in row_slices:
    for cs in col_slices:
        region[rs, cs] = count
        count += 1

# [8, 8] --> [2, 4, 2, 4] --> [4, 16]
window_ids = region.reshape(H // M, M, W // M, M)
window_ids = window_ids.permute(0, 2, 1, 3).reshape(-1, M * M)

# 同一计算窗口内：不同来源区域需 Mask
# [4, 16, 16]  True 表示禁止注意力连接
mask = window_ids[:, :, None] != window_ids[:, None, :]
print(mask.shape)   # torch.Size([4, 16, 16])

# 如果 attn_logits 是 [B*num_windows, heads, 16, 16]
# 应先正确对齐每个 window 的 mask，再 masked_fill；
# 不可未经检查地把 [4, 16, 16] 直接广播到任意 batch。
~~~

完整 SW-MSA 还要计算 Q/K/V、加入每个 Head 的相对位置偏置、应用 Mask、合并 Heads 和窗口，再做反向循环移位。真正的训练实现还会处理输入尺寸不能整除窗口的情况。

> <b>建议实操顺序：</b>先打印 Patch Merging 各步 shape，再用 8×8 的整数网格打印 roll 前后的位置，最后检查 Mask 中哪些位置为 True。确认这些都理解后，再看官方源码。

官方实现可查阅 <a href="https://github.com/microsoft/Swin-Transformer" rel="noopener" target="_blank">microsoft/Swin-Transformer</a>。

## <span id="mistakes"></span>14｜把容易混淆的概念一次理清

| 容易说错的说法 | 更准确的理解 |
| --- | --- |
| “Shifted Window 就是把整张图随便挪一下” | 目标是改变窗口覆盖范围；Cyclic Shift 只是高效实现这种新窗口划分的手段。 |
| “Mask 用来阻止跨窗口交流” | Mask 只禁止循环拼接造成的<strong>非法</strong>连接；合法的跨<strong>旧窗口</strong>交流需要被保留。 |
| “Reverse Shift 撤销了 Attention” | 只恢复位置排列，Token 的新特征保留。 |
| “Stage 里每个 Block 都减少分辨率” | Stage 内 Block 一般不改变 H/W/C；Patch Merging 才进行下采样。 |
| “MLP 负责不同 Token 相互交流” | 逐 Token MLP 负责通道特征的非线性变换，跨 Token 信息交互主要由 Attention 完成。 |
| “49×49 Attention = 169 个参数” | 注意力矩阵和位置偏置表不是同一个对象；7×7 Window 对应 49×49 分数矩阵、13×13 相对位置偏置表。 |
| “注意力 FLOPs 降低 64 倍，网络就快 64 倍” | 投影、MLP、内存访问等没有被同样比例缩减，真实吞吐需实际测试。 |
| “做完一对 Block 就得到全局信息” | 局部信息是靠堆叠交替窗口逐层传播，不能当成单层全局 Self-Attention。 |

## <span id="quiz"></span>15｜用 6 道题确认自己是不是理解了

选择答案后点击「批改」。六道题覆盖张量形状、窗口机制、计算复杂度与消融实验。

<div class="swin-quiz not-prose" id="quizContainer">
<fieldset data-answer="b" data-explain="每 2×2 个 Token 拼接后投影到 2C；高宽各减半：56→28，96→192。"><legend>01 · 56×56×96 经 Patch Merging 之后变成什么？</legend><label><input type="radio" name="q1" value="a"> 28×28×96</label><label><input type="radio" name="q1" value="b"> 28×28×192</label><label><input type="radio" name="q1" value="c"> 56×56×192</label><p class="quiz-result" role="status"></p></fieldset>
<fieldset data-answer="c" data-explain="W-MSA 的跨 Token 交互限制在固定窗口内部，两个窗口之间本层没有直接关联。"><legend>02 · 固定窗口的 W-MSA 的主要限制是？</legend><label><input type="radio" name="q2" value="a"> 无法计算任何 Attention</label><label><input type="radio" name="q2" value="b"> 所有 Token 必须有不同维度</label><label><input type="radio" name="q2" value="c"> 无法在固定窗口边界之间直接交换信息</label><p class="quiz-result" role="status"></p></fieldset>
<fieldset data-answer="a" data-explain="Cyclic Shift 把两端接起来以保留统一窗口；Mask 正是为了避免这种人为接起来的边缘产生非法连接。"><legend>03 · 为什么 Cyclic Shift 之后仍然需要 Mask？</legend><label><input type="radio" name="q3" value="a"> 防止原图不相邻的边缘 Token 被错误联系</label><label><input type="radio" name="q3" value="b"> 防止所有旧窗口之间交换信息</label><label><input type="radio" name="q3" value="c"> 将窗口数量恢复成 9 个</label><p class="quiz-result" role="status"></p></fieldset>
<fieldset data-answer="b" data-explain="M=7 对应 49 个 Token：Attention 是 49×49；相对位移沿各轴有 13 种，参数表为 13×13。"><legend>04 · 7×7 Window 中一个 Head 的 Attention 矩阵与相对偏置表分别是？</legend><label><input type="radio" name="q4" value="a"> 13×13；49×49</label><label><input type="radio" name="q4" value="b"> 49×49；13×13</label><label><input type="radio" name="q4" value="c"> 49×49；49×49</label><p class="quiz-result" role="status"></p></fieldset>
<fieldset data-answer="c" data-explain="窗口数 N/M²，每窗 Token 数 M²；注意力混合总成本约 2·(N/M²)·(M²)²·C = 2NM²C，对固定 M、C 随 N 线性变化。"><legend>05 · 为什么说固定窗口大小的 W-MSA 对 Token 数量是线性的？</legend><label><input type="radio" name="q5" value="a"> 因为完全没有任何矩阵乘法</label><label><input type="radio" name="q5" value="b"> 因为固定每张图只能有一个窗口</label><label><input type="radio" name="q5" value="c"> 因为每个 Token 只与固定数量的窗口内 Token 交互</label><p class="quiz-result" role="status"></p></fieldset>
<fieldset data-answer="b" data-explain="看同一模型大小、预训练、任务头等条件下删除某个设计的影响，更接近检验设计是否有效的证据。"><legend>06 · 要判断 Shifted Window 本身是否有效，优先看哪类证据？</legend><label><input type="radio" name="q6" value="a"> 不同数据集中的两个最大模型的最高分</label><label><input type="radio" name="q6" value="b"> 固定其他条件，有/无 Shifted Window 的消融实验</label><label><input type="radio" name="q6" value="c"> 仅看论文的模型总参数量</label><p class="quiz-result" role="status"></p></fieldset>
<div class="quiz-actions"><button type="button" id="checkQuiz">批改并显示解析</button><button type="button" id="resetQuiz">重新作答</button><output id="quizScore" aria-live="polite"></output></div>
</div>

## <span id="reading"></span>16｜下一次打开手册时，按这个清单学习

这些勾选项在同一个浏览器中会自动保留（使用本地存储）；清除浏览器网站数据后可能丢失。它只是个人学习检查清单，不等于系统确认你已经掌握。

<div class="swin-tasks not-prose" id="studyTasks">
  <div class="task"><label><input type="checkbox" data-task="t1"><span>能够解释 ViT 两个瓶颈：多尺度和 N² Attention。</span></label></div>
  <div class="task"><label><input type="checkbox" data-task="t2"><span>从 224×224×3 推导 Swin-T 四个 Stage 的 H×W×C。</span></label></div>
  <div class="task"><label><input type="checkbox" data-task="t3"><span>复述一个 Block 的 Pre-LN、Attention、Residual、MLP 顺序。</span></label></div>
  <div class="task"><label><input type="checkbox" data-task="t4"><span>自己算出 64 个 7×7 Window，各 Head 的 49×49 Attention。</span></label></div>
  <div class="task"><label><input type="checkbox" data-task="t5"><span>用交互网格理解：哪些连接是 Shift 合法产生的？哪些是循环拼接产生的？</span></label></div>
  <div class="task"><label><input type="checkbox" data-task="t6"><span>不用看答案，解释 Mask 和 Reverse Shift 各自的必要性。</span></label></div>
  <div class="task"><label><input type="checkbox" data-task="t7"><span>推导相对位置表 (2M−1)² 与 49×49 Attention 的区别。</span></label></div>
  <div class="task"><label><input type="checkbox" data-task="t8"><span>推导公式 (1)(2)，并解释真实 GPU 速度为何不等于 FLOPs 倍数。</span></label></div>
  <div class="task"><label><input type="checkbox" data-task="t9"><span>能读懂 Swin-T/S/B/L 的 stage depth、channels 和 heads。</span></label></div>
  <div class="task"><label><input type="checkbox" data-task="t10"><span>理解 Table 4 消融和 Table 5 效率实验，并运行最小 PyTorch 例子。</span></label></div>
 </div>

> <b>阶段性目标：</b>如果能独立讲清 <strong>“固定窗口为什么不够、移动窗口怎样建立跨窗口联系、为什么循环移动必须配 Mask、为什么最后要移回”</strong>，就真正抓住了这篇论文最重要的技术链条。

## <span id="glossary"></span>17｜术语表、论文页码与出处

| 术语 | 含义 |
| --- | --- |
| Backbone · 骨干网络 | 负责提取视觉特征，后面可以接分类、检测或分割任务头。 |
| Token · 特征单元 | 在 Swin 中通常对应当前尺度特征图的一个空间位置。 |
| Stage · 阶段 | 同一空间分辨率下的一组 Swin Blocks。 |
| Patch Merging · 合并 | 相邻 2×2 Token 拼接后投影到 2C，降低空间分辨率。 |
| W-MSA · 窗口多头注意力 | 在固定且不重叠的局部窗口内部计算 MSA。 |
| SW-MSA · 移动窗口注意力 | 移动窗口划分，连接原窗口边界附近的 Token。 |
| Cyclic Shift · 循环移位 | 越界的 Token 从另一侧接入，便于固定形状计算。 |
| Attention Mask · 掩码 | 在 Softmax 前禁止人工拼接形成的非法注意力连接。 |
| Relative Position Bias · 相对位置偏置 | 按 Query 与 Key 的相对位移调整 Attention 分数。 |
| mIoU / AP / Top-1 | 分别是语义分割、检测及分类任务的常用评价指标。 |

### 按论文位置回读

| 章节 / 图表 | PDF 页码 | 对应本手册 |
| --- | --- | --- |
| Abstract / Introduction / Figure 1 | 1–2 | 第 01 章 · 研究动机 |
| Figure 2 | 2 | 第 07 章 · Shifted Window |
| §3.1 / Figure 3 | 3–4 | 第 03–05 章 · 架构与 Block |
| §3.2 / Eq. (1)(2)(3) | 4 | 第 06、07、10 章 |
| §3.2 / Figure 4 / Eq. (4) | 5 | 第 08、09 章 |
| §3.3 / Table 7 | 5 / 10 | 第 11 章 · 模型变体 |
| §4 / Tables 1–6 | 6–9 | 第 12 章 · 实验分析 |
| Appendix A1, A2, A3 | 9–11 | 架构配置、训练细节和补充实验 |

<strong>论文完整信息：</strong>Ze Liu, Yutong Lin, Yue Cao, Han Hu 等，<em>Swin Transformer: Hierarchical Vision Transformer using Shifted Windows</em>，arXiv:2103.14030v2，2021。<a href="https://arxiv.org/abs/2103.14030" target="_blank" rel="noopener">arXiv 论文页</a>。这里的原论文图片均从论文 PDF（arXiv v2，共 14 页） 中裁取；所有其他图表与交互为教学重制。

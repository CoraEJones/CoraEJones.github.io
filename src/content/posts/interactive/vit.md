---
title: "把图像变成 16×16 的“词”｜ViT 论文互动精读"
published: 2026-11-22
description: "把一张 224×224 的图像切成 Patch，看看序列有多长，再亲手调节注意力权重。用 7 章、21 道自测和论文原图读懂 Vision Transformer。"
category: "深度学习"
tags: ["Transformer", "Vision Transformer", "计算机视觉", "论文精读"]
lang: "zh_CN"
---

图像切成 Patch 后，为什么还要加入位置编码和分类 Token？这份互动精读从 ViT 的输入讲到 Q/K/V 和多头注意力，再回到原论文图表，比较训练数据规模和计算量怎样影响分类表现。

[论文原文（ICLR 2021）](https://arxiv.org/abs/2010.11929) · [调整 Patch 尺寸](#patch-demo) · [动手计算注意力权重](#attention-demo)

<link rel="stylesheet" href="/assets/vit-reading/reader.css">
<script type="module" src="/assets/vit-reading/reader.js"></script>

<vit-learning-progress class="vit-progress not-prose" data-pagefind-ignore>
  <div class="progress-summary"><strong>学习进度</strong><span id="hero-count">0 / 7 章已掌握</span><span id="hero-answers">已作答 0 / 21 题</span></div>
  <progress id="vit-progress" max="7" value="0" aria-label="已掌握章节"></progress>
  <details><summary>章节目录与进度管理</summary>
    <nav aria-label="精读章节"><ol id="nav-list"></ol></nav>
    <div class="progress-actions"><button type="button" id="export-progress">导出学习报告</button><button type="button" id="copy-progress">复制进度摘要</button><button type="button" id="reset-progress">重置本机记录</button></div>
    <p id="save-note">学习进度保存在当前浏览器，下次打开可以继续。</p>
  </details>
</vit-learning-progress>

## 阅读方法：先理解，再推导，最后用实验验证

每章按照<strong>看原文 → 跟着推导 → 动手实验 → 完成测验 → 不看答案复述</strong>的顺序进行。每道题选中后立即给出反馈，页首的学习进度随作答实时更新。

<strong>掌握标准：</strong>本章 3 题全部答对，并勾选“我能够不看答案复述”。这是<strong>自测状态</strong>，不能等同于由教师验证的知识掌握。复习时可修改答案，状态会重新计算。

## <span id="ch0" data-nav-label="动机：为什么是 ViT"></span>为什么要把 Transformer 用于图像？

<p class="vit-reference">对应原论文：Abstract；§1 Introduction；§2 Related Work · PDF 第 1–2 页</p>

作者想回答的不是“注意力能不能用于图像”，而是：<strong>如果把图片切成 Token，尽可能直接使用标准 Transformer，是否仍能获得有竞争力的图像分类表现？</strong>

**CNN 的优势**　卷积天然假设局部邻域重要，并具有权重共享和平移等变性；这些视觉先验帮助模型在数据较少时学习。

**ViT 的想法**　只在输入端做 Patch 切分，利用标准 Transformer Encoder 建立各区域的关系；其图像专用归纳偏置更少。

### 为什么这是一个科学问题？

如果小数据集上 CNN 更好，而扩大预训练数据集后 ViT 反超，就说明<strong>模型结构中的归纳偏置</strong>与<strong>可用于学习的数据规模</strong>之间存在重要关系。

> <b>先记住限制：</b>原论文的核心实验在<strong>监督分类预训练与图像分类迁移</strong>环境下进行；不要直接外推到所有视觉任务。

<p class="vit-reference">原文：Dosovitskiy et al., ICLR 2021，§1，PDF pp.1–2。</p>

<div class="vit-quiz not-prose" data-study="ch0"></div>

## <span id="ch1" data-nav-label="Patch、位置与分类 Token"></span>从图像到 Token：看懂 Figure 1 和公式 (1)

<p class="vit-reference">对应原论文：§3.1，Figure 1，公式 (1) · PDF 第 3–4 页</p>

<figure>
  <img src="/assets/vit-reading/figure-1.webp" alt="原论文 Figure 1：图像拆分为 Patch，线性投影，加入位置和分类 Token，再输入 Transformer Encoder" loading="lazy" width="1082" height="576">
  <figcaption>原论文 Figure 1（选取模型结构部分）。<a href="https://arxiv.org/pdf/2010.11929v2#page=3" target="_blank" rel="noopener">查看 PDF 第 3 页 ↗</a></figcaption>
</figure>

假设输入为 RGB 图像 <strong>224 × 224 × 3</strong>，Patch 为 <strong>16 × 16</strong>。一共得到：

$$
N=\frac{224\times224}{16\times16}=196
$$

每个 Patch 有 <strong>16 × 16 × 3 = 768</strong> 个像素通道数值。展平并乘以可学习矩阵 <strong>E</strong> 后，变成一个 D 维向量。注意：即使输入维度与输出维度同为 768，线性投影仍是一个可学习的变换。

$$
z_0=[x_{\mathrm{class}}\,;\,x_p^1 E\,;\,\ldots\,;\,x_p^N E]+E_{\mathrm{pos}} \tag{1}
$$

**Class Token**　在 196 个 Patch Token 前加一个可学习的分类 Token，得到 197 个 Token。最后读取它的输出表示。

**Position Embedding**　给每个 Token 加入可学习的位置向量；否则标准自注意力本身不能从排列中直接得知图像的二维位置信息。

<div class="vit-demo not-prose" id="patch-demo">
<h3>互动实验 A · 调整 Patch 尺寸</h3>
<p>固定输入分辨率为 224 × 224。改变 Patch 边长，观察 Token 数量和注意力矩阵规模。</p>
<div class="demo-controls">
<label for="patch-size">
<strong>Patch 边长 P</strong>
</label>
<select id="patch-size">
<option value="32">32 × 32</option>
<option value="16" selected>16 × 16</option>
<option value="14">14 × 14</option>
<option value="8">8 × 8（教学假设）</option>
</select>
</div>
<div class="patch-main">
<div class="patch-grid" id="patch-grid" aria-label="Patch 网格示意">
</div>
<div class="metric-grid">
<div class="metric">
<div class="metric-label">Patch 个数 N</div>
<div class="metric-value" id="patch-n">196</div>
</div>
<div class="metric">
<div class="metric-label">含 Class Token 的序列长度</div>
<div class="metric-value" id="patch-tokens">197</div>
</div>
<div class="metric">
<div class="metric-label">单个注意力矩阵元素数</div>
<div class="metric-value" id="patch-attn">38,809</div>
</div>
<div class="metric">
<div class="metric-label">与 P=32 相比的矩阵元素倍数</div>
<div class="metric-value" id="patch-ratio">15.5×</div>
</div>
</div>
</div>
<small>演示仅比较固定分辨率下的 Token 数量与单个注意力矩阵规模；不同实际 ViT 变体的隐藏维度、层数也可能不同，不能仅凭此判断完整模型的计算量。</small>
</div>

> 一句话记忆：<strong>Patch Embedding 把二维图片变成序列，Position Embedding 补充位置信息，Class Token 负责提供最终的图像分类表示。</strong>

<p class="vit-reference">原文：§3.1，Figure 1，公式 (1)；Table 1（ViT-B/16 隐藏维度 768）。</p>

<div class="vit-quiz not-prose" data-study="ch1"></div>

## <span id="ch2" data-nav-label="Self-Attention 与 MLP 的分工"></span>先弄清：Self-Attention 与 MLP 的区别

<p class="vit-reference">对应原论文：§3.1 Inductive Bias；公式 (2)–(3) · PDF 第 4 页</p>

想象 3 个 Patch Token 分别来自图像中的猫耳朵、猫身体和猫尾巴，记为 <strong>z₁、z₂、z₃</strong>。问题是：更新 z₁ 时，能不能直接用到 z₂ 的信息？

**MLP：逐个 Token 加工**　z₁ → f(z₁)<br>z₂ → f(z₂)<br>z₃ → f(z₃) 同一个 MLP 的参数作用于每个 Token，但每一行的计算不直接读取其他行。

**Self-Attention：跨 Token 聚合**　z₁、z₂、z₃ → 新的 z₁<br>z₁、z₂、z₃ → 新的 z₂<br>z₁、z₂、z₃ → 新的 z₃ 每个 Query 可以对所有 Key 计算权重，再对所有 Value 做加权聚合。

$$
\mathrm{MLP}(X)=[f(x_1)\,;\,f(x_2)\,;\,\ldots\,;\,f(x_n)]
$$

$$
o_i=\sum_j \alpha_{ij}\,v_j
$$

举例：一个 Token 的注意力输出可以写成 <strong>o₁ = 0.2v₁ + 0.5v₂ + 0.3v₃</strong>。这里的系数为教学举例，实际系数由模型计算。

> <b>关键细节：</b>MLP 不会在它<strong>自身的这一层运算中</strong>直接混合其他 Token，但它输入的特征可能已经被前一个 Self-Attention 层融合过。因此“MLP 没有跨 Token 信息”也是不准确的说法。

<p class="vit-reference">原文：§3.1（“Inductive bias” 段落），PDF 第 4 页。</p>

<div class="vit-quiz not-prose" data-study="ch2"></div>

## <span id="ch3" data-nav-label="QKV 与 Multi-Head 推导"></span>从 Q、K、V 到 Multi-Head Attention

<p class="vit-reference">对应原论文：Appendix A，公式 (5)–(8) · PDF 第 13 页</p>

### 第 1 步：从同一个 X 投影出三种向量

对 ViT-B/16，一张图像的单层输入是 <strong>X ∈ ℝ<sup>197×768</sup></strong>。在一个注意力头中，Q、K、V 使用不同的可学习参数投影：

$$
Q=XW_Q,\qquad K=XW_K,\qquad V=XW_V
$$

12 个头、隐藏维度 768，所以每个头的维度通常为 <strong>d<sub>h</sub> = 768/12 = 64</strong>。三个投影后的形状均为 <strong>197 × 64</strong>。

### 第 2 步：Q 与 K 计算两两匹配分数

$$
QK^\top:\quad (197\times64)\,(64\times197)\ \longrightarrow\ 197\times197
$$

得到的矩阵有 197 行和 197 列。第 i 行第 j 列表示：第 i 个 Query 对第 j 个 Key 的匹配分数。

### 第 3 步：缩放和 Softmax

$$
A=\operatorname{softmax}\!\left(\frac{QK^\top}{\sqrt{d_h}}\right) \tag{6}
$$

每一行做 Softmax，得到非负且总和为 1 的注意力权重。除以 √d<sub>h</sub> 是为了缓解高维点积过大带来的 Softmax 饱和问题。

### 第 4 步：真正实现信息混合的是 A · V

$$
\mathrm{SA}(X)=AV\in\mathbb{R}^{197\times64} \tag{7}
$$

其中<strong>第 i 行输出是所有 Value 向量的加权和</strong>：oᵢ = Σⱼ Aᵢⱼ vⱼ。这就是跨 Token 信息交换的数学本质。

<div class="vit-demo not-prose" id="attention-demo">
<h3>互动实验 B · 亲手调注意力权重</h3>
<p>假设某个 Query 对 3 个 Key 的匹配分数可调，Value 向量固定为 v₁=(1,0)、v₂=(0,1)、v₃=(1,1)。改变分数，查看 Softmax 与 AV 输出如何变化。</p>
<div class="attn-demo">
<div id="score-controls">
</div>
<div>
<div class="weight-list" id="weight-list">
</div>
<div class="attention-output" id="attention-output">输出 o = (0.00, 0.00)</div>
</div>
</div>
<small>这是便于理解的二维教学例子：滑块直接改变 QKᵀ 的分数，不代表训练好的 ViT 会让用户手动选择注意力。</small>
</div>

### 第 5 步：多个头并行，拼接，再投影

$$
\mathrm{MSA}(X)=\operatorname{Concat}(\mathrm{SA}_1,\dots,\mathrm{SA}_{12})\,W_O \tag{8}
$$

每个注意力头输出 <strong>197 × 64</strong>；沿特征维拼接 12 个头之后变成 <strong>197 × 768</strong>，再经过输出线性投影，得到与原输入同样的形状。

> 一条主线：<strong>Q/K 决定“向谁取信息”，Softmax 得到“取多少”，V 提供“取什么”，AV 才完成信息聚合。</strong>

<p class="vit-reference">原文：Appendix A，公式 (5)–(8)，PDF 第 13 页。演示数字为教学构造。</p>

<div class="vit-quiz not-prose" data-study="ch3"></div>

## <span id="ch4" data-nav-label="Encoder、残差与分类头"></span>把注意力放回 Transformer Encoder

<p class="vit-reference">对应原论文：§3.1，公式 (2)–(4)，Table 1 · PDF 第 4–5 页</p>

原论文采用<strong>Pre-LN（先归一化，再进入子模块）</strong>；每个 Encoder Block 由一个 MSA 子模块和一个 MLP 子模块组成，两处都加入残差连接。

**公式 (2)：跨 Token 信息交互**

$$
z'_\ell=\mathrm{MSA}(\mathrm{LN}(z_{\ell-1}))+z_{\ell-1}
$$

先做 LN，再做 MSA，把 MSA 的输出加回原输入。残差连接帮助保留原信息并改善深层网络训练。

**公式 (3)：逐 Token 特征变换**

$$
z_\ell=\mathrm{MLP}(\mathrm{LN}(z'_\ell))+z'_\ell
$$

ViT-Base 的 MLP 通常是 <strong>768 → 3072 → 768</strong>，中间使用 GELU；对每个 Token 独立应用相同的参数。

### 输出为什么仍是 197 × 768？

因为 MSA 的输出投影回 D=768，MLP 的第二层也投影回 D=768。这样才能与残差分支逐元素相加。

ViT-B/16 重复这个 Encoder Block <strong>12 层</strong>。最终取第 0 个位置的 Class Token：

$$
y=\mathrm{LN}(z_L^0) \tag{4}
$$

得到整张图像的表示 y。微调时，论文使用一个线性分类头把 y 映射到下游任务的类别数 K。<strong>注意：y 本身是特征表示，而不是概率。</strong>

| 模型 | 层数 | 隐藏维度 D | MLP 隐藏维 | 注意力头数 |
| --- | --- | --- | --- | --- |
| ViT-Base | 12 | 768 | 3072 | 12 |
| ViT-Large | 24 | 1024 | 4096 | 16 |
| ViT-Huge | 32 | 1280 | 5120 | 16 |

<p class="vit-reference">原文：§3.1，公式 (2)–(4)；Table 1（模型配置），PDF 第 4–5 页。</p>

<div class="vit-quiz not-prose" data-study="ch4"></div>

## <span id="ch5" data-nav-label="数据规模与计算效率实验"></span>读懂实验：ViT 在什么条件下更好？

<p class="vit-reference">对应原论文：§4.2–4.4，Figure 3–5，Table 2、5、6 · PDF 第 6–7、15 页</p>

### Figure 3：同一架构，换不同规模的预训练数据集

<figure>
  <img src="/assets/vit-reading/figure-3.webp" alt="原论文 Figure 3：ImageNet、ImageNet-21k 和 JFT-300M 上 ViT 与 BiT 的下游 ImageNet 准确率对比" loading="lazy" width="688" height="484">
  <figcaption>原论文 Figure 3。横轴依次是 ImageNet（约 1.3M）、ImageNet-21k（约 14M）、JFT-300M（约 303M）；纵轴为 ImageNet 微调 Top-1 准确率。</figcaption>
</figure>

| 预训练数据 | ViT-B/16 | ViT-L/16 | 更高者 |
| --- | --- | --- | --- |
| ImageNet | 77.91% | 76.53% | Base |
| ImageNet-21k | 83.97% | 85.15% | Large |
| JFT-300M | 84.15% | 87.12% | Large |

观察：在较小的 ImageNet 上，Large 比 Base 更差；预训练数据扩大后，Large 逐步超过 Base。这支持了<strong>数据规模影响 ViT 的模型容量收益</strong>这一结论。

### Figure 4：控制数据来源，改变样本数量

<figure>
  <img src="/assets/vit-reading/figure-4.webp" alt="原论文 Figure 4：在 JFT 不同随机子集上预训练后，ViT 和 ResNet 的 ImageNet 5-shot 线性分类表现" loading="lazy" width="660" height="484">
  <figcaption>原论文 Figure 4。作者从同一个 JFT 来源抽取约 9M、30M、90M、300M 样本，并用冻结表征的线性 5-shot ImageNet 分类进行评估。</figcaption>
</figure>

<strong>为什么 Figure 4 比 Figure 3 更进一步？</strong> 因为 Figure 3 还更换了数据来源，Figure 4 在同一来源内改变样本规模，减少了数据分布差异造成的混淆。但这仍不是严格孤立“归纳偏置”的因果实验。

### Figure 5：比较相似性能所需要的预训练计算量

<figure>
  <img src="/assets/vit-reading/figure-5.webp" alt="原论文 Figure 5：ViT、ResNet 和 Hybrid 的性能与预训练 FLOPs 之间的关系" loading="lazy" width="1351" height="542">
  <figcaption>原论文 Figure 5。横轴为总预训练计算量（exaFLOPs，对数刻度）；图中蓝色为 ViT、灰色为 ResNet、橙色为 Hybrid。</figcaption>
</figure>

这张图要学会两种读法：<strong>同一准确率，越靠左越省计算；同一计算量，越靠上准确率越高。</strong>

| 指标（JFT 训练 7 epochs） | ViT-B/16 | ResNet152x2 |
| --- | --- | --- |
| ImageNet 准确率 | 84.15% | 84.97% |
| 五个迁移分类任务平均准确率（计算值） | ≈94.08% | ≈94.01% |
| 预训练计算量 | <strong>224 exaFLOPs</strong> | 563 exaFLOPs |

在这组具体比较中，ViT-B/16 的计算量约是 ResNet152x2 的 <strong>40%</strong>，而五个任务的平均准确率接近。论文控制实验的整体观察为：ViT 达到相近性能所用的预训练计算量约为 ResNet 的 <strong>1/2 至 1/4</strong>。

### Table 2：最强配置是否真的有竞争力？

<figure>
  <img src="/assets/vit-reading/table-2.webp" alt="原论文 Table 2：ViT-H/14、ViT-L/16、BiT-L 和 Noisy Student 在分类基准上的准确率与 TPUv3 核日对比" loading="lazy" width="1348" height="420">
  <figcaption>原论文 Table 2，PDF 第 6 页。ViT-H/14 在 ImageNet 上达到 88.55%，但它使用了大规模预训练和特定高分辨率微调设置。</figcaption>
</figure>

> <b>科研阅读警戒线：</b>“预训练 FLOPs 更少”不等于“所有硬件上推理更快”。Figure 5 的成本指标、Table 2 的 TPUv3-core-days、模型推理延迟是不同概念。也不要把 Table 2 的 88.55% 与其他微调设置下的数字直接混用。

<p class="vit-reference">原文：§4.2–4.4、Appendix C Table 5–6。五项平均值由 Table 6 的 ImageNet、CIFAR-10/100、Pets、Flowers 结果计算。</p>

<div class="vit-quiz not-prose" data-study="ch5"></div>

## <span id="ch6" data-nav-label="Figure 7、局限与延伸"></span>Figure 7：ViT 学到了什么？还能推论什么？

<p class="vit-reference">对应原论文：§4.5–5，Figure 7；Appendix D.7 · PDF 第 8–9、20 页</p>

<figure>
  <img src="/assets/vit-reading/figure-7.webp" alt="原论文 Figure 7：左为学习到的 Patch 滤波器主成分，中为位置编码余弦相似度，右为随网络深度变化的注意力距离" loading="lazy" width="1332" height="420">
  <figcaption>原论文 Figure 7。左：输入线性投影滤波器的主成分；中：位置嵌入相似度；右：各层注意力头平均空间注意距离。</figcaption>
</figure>

### 左图：Patch Embedding 学到局部视觉结构

线性投影滤波器的主成分看起来类似边缘、条纹、颜色等局部视觉基函数。说明 ViT 即使不把标准卷积写进主干，也能够从数据中学到某些局部视觉模式。

### 中图：一维可学习位置编码能学到二维拓扑

作者比较了不同 Patch 位置向量之间的<strong>余弦相似度</strong>：邻近位置及同一行列的位置往往有相关结构。它说明位置编码捕捉到一定的二维空间关系，<strong>不意味着已经理解三维几何</strong>。

### 右图：不同层、不同头的注意力距离不同

$$
\text{平均注意力距离}\ \approx\ \sum_j A_{ij}\,\lVert r_i-r_j\rVert_2
$$

浅层既有偏局部的头，也有远距离交互的头；随网络深度增加，注意力距离整体增大。注意力距离描述的是<strong>权重聚合的空间跨度</strong>，不能单独证明某个注意力头“因果上决定了分类结果”。

**论文已经证明**　Patch 序列可用于图像分类；大规模预训练条件下 ViT 具有高性能和有竞争力的预训练效率；内部表征呈现一定空间结构。

**论文尚未解决**　检测、分割等其他视觉任务的通用适配；高效自监督预训练；仅用此论文并不能直接得到深度图、相机位姿或三维重建结果。

> 科研阅读结束时应记住：<strong>方法有效 ≠ 所有条件都有效；注意力可视化提供线索 ≠ 因果证明。</strong>

<p class="vit-reference">原文：§4.5、§4.6、§5；Figure 7；Appendix D.7。</p>

<div class="vit-quiz not-prose" data-study="ch6"></div>

## <span id="review"></span>读完之后：用自己的话讲一遍整篇论文

完整复述应包含一条科研逻辑：<strong>研究问题 → Patch Token 化 → QKV 与多头注意力 → Encoder 与分类 → 数据规模实验 → 计算成本实验 → 模型表示与局限</strong>。

1. <strong>问题：</strong>标准 Transformer 不依赖 CNN 主干，能否完成高质量图像分类？
2. <strong>方法：</strong>图像切成 Patch，再做线性投影、加入 Class Token 和位置编码、通过 Encoder 交互特征。
3. <strong>机制：</strong>Q 与 K 计算权重，AV 完成跨 Token 信息聚合，MLP 逐 Token 变换特征。
4. <strong>证据：</strong>Figure 3–4 研究数据规模，Figure 5 研究计算量，Figure 7 分析学到的特征。
5. <strong>边界：</strong>这些实验主要是分类和迁移场景，不能直接推出所有视觉任务或所有设备上的最优性。

**引用和进一步阅读**

Dosovitskiy, A., et al. <em>An Image Is Worth 16x16 Words: Transformers for Image Recognition at Scale.</em> ICLR 2021. arXiv:2010.11929v2.

<a href="https://arxiv.org/pdf/2010.11929v2" target="_blank" rel="noopener">原论文 PDF ↗</a> · <a href="https://github.com/google-research/vision_transformer" target="_blank" rel="noopener">论文代码仓库 ↗</a>

<p class="vit-reference">图表为作者原论文节选，已标注原始页码和图号。教学数值示例及文字讲解不等同于原文实验。学习状态只依据本页选择题与自主复述勾选，不构成严格的学习能力测评。</p>

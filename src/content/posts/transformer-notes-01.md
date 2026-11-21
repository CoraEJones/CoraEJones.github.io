---
title: "Transformer 学习笔记（一）：Token、d_model 与 Q/K/V 到底是什么？"
published: 2026-11-21
description: "从「小明喜欢苹果」出发，追踪 Token 到 Q/K/V 的维度变化，推导 Softmax 前为什么除以根号 d_k，再看多个注意力头能多做什么。"
category: "深度学习"
tags: ["Transformer", "入门"]
lang: "zh_CN"
---

今天开始学 Transformer，我卡在了两个形状上。输入是 $3\times128$，Q、K、V 却是 $3\times32$。这三个数字各在数什么？我用「小明喜欢苹果」从头算了一遍。

<link rel="stylesheet" href="/assets/transformer-notes/notes-01.css">
<script type="module" src="/assets/transformer-notes/dimensions.js"></script>

## 一句话怎样变成一组向量

Tokenizer 先把文本编码成一串 Token ID。假设这里的 Tokenizer 把「小明喜欢苹果」切成三个 Token。真实的切分和编号由所用的 Tokenizer 与词表决定。

<figure class="transformer-figure not-prose">
  <div class="transformer-token-flow">
    <div><span>原文</span><b>小明喜欢苹果</b></div>
    <div><span>Tokenizer 切分</span><b>[小明] [喜欢] [苹果]</b></div>
    <div><span>词表编号</span><b>[311, 728, 1052]</b></div>
  </div>
  <figcaption>分词与编号均为示意。Embedding Lookup 接着用这三个编号查表，每个编号取出一行向量。</figcaption>
</figure>

以「苹果」这个位置为例。

| 概念 | 它是什么 | 「苹果」在例子中的表示 |
| --- | --- | --- |
| Token | Tokenizer 编码文本时使用的单位 | 苹果 |
| Token ID | 这个 Token 在词表里的整数编号 | 1052（假设） |
| Token Embedding | 用编号查 Embedding 表得到的可学习向量 | $[0.2,\,0.8,\,-0.1,\,0.4,\,\ldots]$（示意） |

词表大小决定 Embedding 表有多少行。这句话用了三个 Token，所以一次查出三行。

## d_model 是每个位置的向量宽度

把三个 128 维向量按顺序叠起来，便得到 $3\times128$。$N=3$ 数的是序列位置，$d_{\text{model}}=128$ 数的是每个位置的特征。同一 Token 出现两次，就占两行。

<figure class="transformer-figure not-prose">
  <div class="transformer-legend">
    <span class="transformer-token">N · Token 数</span>
    <span class="transformer-model">d<sub>model</sub> · 模型宽度</span>
    <span class="transformer-head">d<sub>head</sub> · 单头宽度</span>
  </div>
  <table class="transformer-matrix">
    <caption>输入 X 的行与列</caption>
    <thead>
      <tr><th scope="col" class="transformer-token">3 个位置</th><th scope="col" class="transformer-model">128 个特征列</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">小明</th><td>[0.10, −0.30, …, 0.27]</td></tr>
      <tr><th scope="row">喜欢</th><td>[0.59, 0.13, …, −0.42]</td></tr>
      <tr><th scope="row">苹果</th><td>[0.20, 0.80, …, 0.16]</td></tr>
    </tbody>
  </table>
  <figcaption>每行只展示少量示意数值。绿色标 Token 数，蓝色标模型宽度，紫色标接下来会用到的单头宽度。</figcaption>
</figure>

任意长度的序列都可以写成同一个形状。

$$
\boxed{X\in\mathbb R^{N\times d_{\text{model}}}}
$$

这里省略 batch 维度。原版 Transformer 的第一层会把 Embedding 加上位置编码，更深层的 $X$ 来自前一层。

## Q、K、V 各做哪一步

更新「喜欢」这个位置时，先决定从各位置取多少信息，再加权汇总。

- **Q（Query）** 提供当前位置用于发起匹配的表示。例子里，取「喜欢」那一行的 Query。
- **K（Key）** 提供各个位置用于接受匹配的表示。把刚才的 Query 依次与「小明」「喜欢」「苹果」的 Key 做点积，得到三个分数。
- **V（Value）** 提供各个位置实际参与汇总的信息。把三个分数转成三个权重，再用这些权重对三行 Value 做加权求和。

一个头用三套可学习的参数生成这三组向量。

$$
Q=XW_Q,\qquad K=XW_K,\qquad V=XW_V.
$$

每个位置都有 Q、K、V。三组投影都读同一条序列的 $X$，因此叫 **Self-Attention（自注意力）**。投影矩阵在训练中学得，匹配结果也会随输入变化。

## 为什么单头 Q/K/V 是 3×32

这里把模型宽度 128 平均分给 $h=4$ 个头，让每头的 Query、Key 和 Value 都是 32 维。

$$
d_{\text{head}}=\frac{d_{\text{model}}}{h}=\frac{128}{4}=32.
$$

**$W_Q$ 的 128 行对应输入特征，32 列对应输出特征。** $X$ 逐行投影，输出仍有三行。

$$
\underbrace{X}_{3\times128}
\underbrace{W_Q}_{128\times32}
=\underbrace{Q}_{3\times32}.
$$

$Q$ 的第 2 行第 1 列，是「喜欢」的 128 维输入与 $W_Q$ 第一列的点积。对 32 列都做一次，就得到「喜欢」的 Query。$W_K$ 和 $W_V$ 形状也相同。

32 来自这组超参数。原论文的基础模型选择的是 $d_{\text{model}}=512$、$h=8$、$d_k=d_v=64$。一般写公式时可以分别用 $d_k$ 表示 Q/K 宽度、$d_v$ 表示 V 宽度。本文和下面的演示都取 $d_k=d_v=d_{\text{head}}$。 [原论文 §3.2.2](https://arxiv.org/html/1706.03762v7#S3.SS2.SSS2)

## 单头怎样算，多头怎样拼

先用无掩码的例子看缩放点积注意力。每个 Query 都与三个位置的 Key 匹配。

$$
A=\operatorname{softmax}_{\text{逐行}}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right),
\qquad H=AV.
$$

1. **计算匹配分数。** $QK^\top$ 的乘法是 $(3\times32)(32\times3)$，得到 $3\times3$。行对应发起查询的位置，列对应被匹配的位置。
2. **把每行分数转成权重。** 除以 $\sqrt{d_k}$ 后沿每行做 softmax。形状依然是 $3\times3$，每行权重的和为 1。
3. **用权重汇总 Value。** $AV$ 的乘法是 $(3\times3)(3\times32)$，得到 $3\times32$。例如第 2 行的权重若是 $[0.15,0.25,0.60]$，第 2 行输出就是 $0.15v_{\text{小明}}+0.25v_{\text{喜欢}}+0.60v_{\text{苹果}}$，仍是一条 32 维向量。这组权重仅用于演算。

### 为什么要在 Softmax 前除以根号 d_k

**向量越宽，点积累加的项越多。在原论文的简化假设下，点积的标准差会随 $\sqrt{d_k}$ 增长。** 先除掉这个因子，可以缓和维度带来的分数差异，让 Softmax 的权重更不容易在一开始就集中到一个位置。这里的 $d_k$ 是**单头的 Query 和 Key 宽度**，本例是 32。 [原论文 §3.2.1，式（1）及脚注 1](https://arxiv.org/html/1706.03762v7#S3.SS2.SSS1)

**先看方差在量什么。** 如果在 $[-1,1,-1,1]$ 中等概率抽一个数，均值是 0，方差是 1。把每个数乘以 10，均值仍为 0，方差变成 100。因为方差取的是「离均值的距离的平方」的平均值。

$$
\begin{aligned}
\operatorname{Var}(X)&=\mathbb E[(X-\mathbb E[X])^2]\\
&=\mathbb E[X^2]-(\mathbb E[X])^2.
\end{aligned}
$$

如果均值为 0，方差就等于平方的期望 $\mathbb E[X^2]$。下面会用到这个等式。

**先算一个乘积 $q_i k_i$。** 假设 Query 和 Key 的各个分量相互独立、均值为 0、方差为 1。可以想象 $q_i$ 和 $k_i$ 各掷一枚硬币，正面记 $+1$，反面记 $-1$。四种组合等概率出现，两种同号、两种异号，因此乘积也以相同概率取 $+1$ 或 $-1$。它的均值为 0，平方恒为 1，所以方差为 1。

一般情况下，独立性给出 $\mathbb E[q_i k_i]=\mathbb E[q_i]\mathbb E[k_i]=0$，所以乘积的方差等于乘积平方的期望。平方后的期望也能按独立性拆开。两项各自的均值为 0、方差为 1，因此各自平方的期望都是 1。

$$
\begin{aligned}
\operatorname{Var}(q_i k_i)
&=\mathbb E[(q_i k_i)^2] \\
&=\mathbb E[q_i^2]\,\mathbb E[k_i^2] \\
&=1\times1=1.
\end{aligned}
$$

**再把 $d_k$ 个乘积加起来。** 在上述独立假设下，各维乘积的协方差为 0，因此它们的方差可以相加。点积 $s=q\cdot k=\sum_{i=1}^{d_k}q_i k_i$ 的均值仍是 0，方差和标准差分别是

$$
\operatorname{Var}(s)=d_k,\qquad
\operatorname{Std}(s)=\sqrt{d_k}.
$$

乘上常数 $c$ 时，标准差乘以 $|c|$，方差乘以 $c^2$。因此除以 $\sqrt{d_k}$ 恰好让这个模型里的分数回到单位方差。

$$
\boxed{\operatorname{Var}\!\left(\frac{s}{\sqrt{d_k}}\right)=\frac{d_k}{d_k}=1.}
$$

以 $d_k=64$ 为例，点积的标准差是 8，缩放就是把这一行的分数都除以 8。下面假设「喜欢」对三个位置的原始分数是 $[0,8,16]$。三列仍对应「小明」「喜欢」「苹果」，数值是演算示例。

| 送入 Softmax 的分数 | 小明 | 喜欢 | 苹果 |
| --- | ---: | ---: | ---: |
| 原始 $[0,8,16]$ | 约 0.00001% | 0.034% | 99.966% |
| 缩放后 $[0,1,2]$ | 9.00% | 24.47% | 66.52% |

看「苹果」和「喜欢」这两列。Softmax 中，两者的权重比是分数差的指数。差 8 时比例是 $e^8$，约 2,981 比 1。差 1 时比例是 $e$，约 2.72 比 1。缩放保留了排序，缩小了差距。权重已经接近 0 或 1 时，分数变化对权重的影响很小，反向传播通过 Softmax 的梯度也容易变小。 [原论文 §3.2.1](https://arxiv.org/html/1706.03762v7#S3.SS2.SSS1)

真实模型里，各分量可能相关，均值和方差也会随层与输入变化。独立、零均值、单位方差是这段推导用来解释尺度的假设。

### 为什么需要多头注意力

**一个头对同一个查询位置只算一行权重，并把这行权重用到所有 Value 通道。** 比如前面「喜欢」对三个位置的权重是 $[0.15,0.25,0.60]$。输出的第 1 个特征用这三个数做加权求和，第 32 个特征也用这三个数。Value 的各列可以存不同信息，但在这个头里，它们共享同一次位置加权。

把一个头加宽到 128 维，能一次汇总更多特征，它仍然只产生一张 $3\times3$ 的权重矩阵。改成四个 32 维的头，每个头都从整份 $X$ 学习自己的 Q/K/V 投影，并各自做一次 Softmax，于是可以用四套权重汇总信息。

| 模型宽度都是 128 | 注意力权重 | 汇总结果 |
| --- | --- | --- |
| 1 个 128 维头 | 1 张 $3\times3$ 权重矩阵 | 1 个 $3\times128$ 输出 |
| 4 个 32 维头 | 4 张 $3\times3$ 权重矩阵 | 4 个 $3\times32$ 输出 |

仍然看「喜欢」这个位置。设其中一个头用 $[0.8,0.1,0.1]$ 多取「小明」的信息，另一个头用 $[0.1,0.1,0.8]$ 多取「苹果」的信息。前一个头偏向动作发出者，后一个头偏向动作对象。**这两次汇总各自使用该头的 Value，完成后才把结果拼起来。** 权重和分工都是示意。各头拥有各自的投影参数，最终学出的加权方式可能不同，也可能相似。 [原论文 §3.2.2](https://arxiv.org/html/1706.03762v7#S3.SS2.SSS2)

这个区别放到成像里也很直观。一个平面可以在深度上连续，同时在材料交界处出现反射率跳变。要从邻近位置找几何线索，和要从相似材料找反射线索，合适的位置权重可能不同。多头给了模型分开汇总这两种线索的空间。它们能否对应到真实的几何和材料关系，还要靠实验验证。

实现时可以一次算出所有的投影，再拆分**投影结果**。四个头的输出沿特征列拼接，再乘输出投影 $W_O$。

<figure class="transformer-figure not-prose">
  <div class="transformer-head-flow">
    <p>同一个 X · <strong><span class="transformer-token">3</span> × <span class="transformer-model">128</span></strong></p>
    <ol>
      <li>Head 1 <strong><span class="transformer-token">3</span> × <span class="transformer-head">32</span></strong></li>
      <li>Head 2 <strong><span class="transformer-token">3</span> × <span class="transformer-head">32</span></strong></li>
      <li>Head 3 <strong><span class="transformer-token">3</span> × <span class="transformer-head">32</span></strong></li>
      <li>Head 4 <strong><span class="transformer-token">3</span> × <span class="transformer-head">32</span></strong></li>
    </ol>
    <p>Concat · <strong><span class="transformer-token">3</span> × <span class="transformer-model">128</span></strong></p>
  </div>
  <figcaption>同一个位置的四条 32 维向量横向拼成一行。随后用 128 × 128 的输出投影混合各头的特征。</figcaption>
</figure>

### 动手改一组参数

把 Token 数从 3 改成 5，留意哪一个矩阵的**行和列**同时增加。然后把 Token 数改回 3，只把头数从 4 改成 8，看看单头的宽度和拼接后的宽度各有什么变化。

<transformer-dimensions class="transformer-figure not-prose">
  <form autocomplete="off">
    <fieldset disabled>
      <legend>等宽多头自注意力</legend>
      <div class="transformer-controls">
        <label class="transformer-token"><span>Token 数 N</span><input name="tokens" type="number" min="1" max="512" step="1" required value="3" aria-describedby="transformer-input-help"></label>
        <label class="transformer-model"><span>模型宽度 d<sub>model</sub></span><input name="model" type="number" min="1" max="4096" step="1" required value="128" aria-describedby="transformer-input-help"></label>
        <label class="transformer-head"><span>头数 h</span><input name="heads" type="number" min="1" max="128" step="1" required value="4" aria-describedby="transformer-input-help"></label>
      </div>
      <button type="reset">恢复正文示例</button>
    </fieldset>
  </form>
  <p class="transformer-caption" id="transformer-input-help">模型宽度须能被头数整除。这里仅演示矩阵形状。</p>
  <p class="transformer-error" role="status" data-error hidden></p>
  <div aria-live="polite" aria-atomic="true" data-results>
    <dl class="transformer-results">
      <div><dt>输入 X</dt><dd><span class="transformer-token" data-value="tokens">3</span> × <span class="transformer-model" data-value="model">128</span></dd></div>
      <div><dt>每头的 W<sub>Q</sub> / W<sub>K</sub> / W<sub>V</sub></dt><dd><span class="transformer-model" data-value="model">128</span> × <span class="transformer-head" data-value="headWidth">32</span></dd></div>
      <div><dt>每头的 Q / K / V</dt><dd><span class="transformer-token" data-value="tokens">3</span> × <span class="transformer-head" data-value="headWidth">32</span></dd></div>
      <div><dt>每头的注意力权重 A</dt><dd><span class="transformer-token" data-value="tokens">3</span> × <span class="transformer-token" data-value="tokens">3</span></dd></div>
      <div><dt>单头输出 H</dt><dd><span class="transformer-token" data-value="tokens">3</span> × <span class="transformer-head" data-value="headWidth">32</span></dd></div>
      <div><dt>Concat · <span data-value="heads">4</span> 个头</dt><dd><span class="transformer-token" data-value="tokens">3</span> × <span class="transformer-model" data-value="model">128</span></dd></div>
    </dl>
  </div>
</transformer-dimensions>

## 我最容易混淆的几个地方

| 容易混在一起的概念 | 可以怎样检查 |
| --- | --- |
| 汉字数与 Token 数 | 看 Tokenizer 返回了几个 ID。 |
| Token 数与模型宽度 | 数 $X$ 的行得到 $N$，数列得到 $d_{\text{model}}$。 |
| Q、K、V 共用输入与共用参数 | 沿三个乘法往回看，它们读取同一个 $X$，使用各自的投影矩阵。 |
| $3\times128$ 变成 $3\times32$ | 仍有三个位置，每个位置从 128 个特征投影成 32 个特征。 |
| 多头投影与切分输入 | 每个头可以用到整行输入的全部特征。统一计算时，切分发生在投影之后。 |
| 示例里的 32 与架构的固定规则 | 先确认头数和模型宽度，再确认该架构怎样分配 Q/K 和 V 的宽度。 |
| 模型宽度与缩放分母 | 看参与点积的单头 Q/K 有几维。本例除以 $\sqrt{32}$。 |
| 一个宽头与多个窄头 | 固定一个查询位置，数它有几套独立计算的位置权重。 |

### 自测三题

可以先写出形状，再展开核对。

<details class="transformer-question">
<summary>1. 五个 Token，每个位置有 128 个特征，X 是什么形状？</summary>
<p><strong>5 × 128。</strong> 五个序列位置各占一行，每行有 128 列。</p>
</details>

<details class="transformer-question">
<summary>2. 将模型宽度 128 平均分给 8 个头。若 N = 3，每头的 W<sub>Q</sub> 和 Q 分别是什么形状？</summary>
<p><strong>W<sub>Q</sub> 是 128 × 16，Q 是 3 × 16。</strong> 先算出 128 ÷ 8 = 16，再让 3 × 128 的 X 右乘 128 × 16 的投影矩阵。</p>
</details>

<details class="transformer-question">
<summary>3. Q 和 K 都是 5 × 16，注意力权重矩阵是什么形状？第 2 行表示什么？</summary>
<p><strong>5 × 5。</strong> K 转置后是 16 × 5，矩阵相乘时两个 16 对齐。第 2 行是第 2 个位置用来汇总五个位置的信息的权重。</p>
</details>

<details class="transformer-question transformer-extra">
<summary>展开另外 5 道练习</summary>
<ol start="4">
  <li>同一个 Token 在序列里出现两次，X 里有几行与这两次出现对应？</li>
  <li>为什么计算点积时，Q 和 K 的特征宽度需要相同？</li>
  <li>若 N = 3，V 是 3 × 24，单头输出是什么形状？</li>
  <li>4 个头各输出 5 × 32，沿特征列拼接后是什么形状？</li>
  <li>模型宽度为 128 时，能否用本文的等宽配置设置 6 个头？</li>
</ol>
<details class="transformer-question">
  <summary>核对答案</summary>
  <ol start="4">
    <li>两行，两个出现位置各占一行。</li>
    <li>一个 Query 与一个 Key 逐特征相乘后求和。两条向量需要相同长度，才能一一配对。</li>
    <li>3 × 24。权重矩阵 3 × 3 乘 V，保留 V 的 24 个特征列。</li>
    <li>5 × 128。拼接时同一位置的四条 32 维向量合成一行。</li>
    <li>这个配置不成立。128 除以 6 得不到整数的单头宽度。</li>
  </ol>
</details>
</details>

## 记住这几句话

1. Tokenizer 把文本编码成 Token ID，Embedding 表把 ID 映射为向量。
2. $X$ 的行数是 Token 数 $N$，列数是模型宽度 $d_{\text{model}}$。
3. 同一个 $X$ 经过三套投影得到 Q、K、V。Q 和 K 参与匹配，V 提供被汇总的信息。
4. 在本文的等宽配置里，单头宽度是 $d_{\text{model}}/h$。所以 128 维、4 个头的例子里，每头的 Q/K/V 都是 $3\times32$。
5. 注意力权重的行和列都对应序列位置。单头输出和拼接结果的列对应特征。
6. 在独立、零均值、单位方差的假设下，点积的标准差是 $\sqrt{d_k}$。Softmax 前除以它，可以缓和维度带来的分数差异。
7. 单头用同一套位置权重汇总该头的全部通道。多头可以先做多次不同的汇总，再通过输出投影把它们融合。

我现在看到 $3\times128$ 和 $3\times32$，会先问行和列各在数什么。下一步可以用同一个问题读 $QK^\top$，看看两个 3 分别是谁的位置。

进一步读原论文时，可以从 §3.2.1 的式（1）找出权重和 Value 汇总，再到 §3.2.2 对照每头投影、Concat 和输出投影。 [Vaswani 等，《Attention Is All You Need》](https://arxiv.org/abs/1706.03762)

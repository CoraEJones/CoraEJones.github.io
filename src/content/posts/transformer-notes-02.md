---
title: "Transformer 学习笔记（二）：精读《Attention Is All You Need》，从手算注意力到手写 Transformer"
published: 2026-11-21
description: "沿着 I love cats → 我喜欢猫 走完原版 Transformer。结合论文原图、手算、实验表和可运行的 PyTorch 实现，理解位置编码、Encoder、Decoder、训练与生成。"
category: "深度学习"
tags: ["Transformer", "论文精读", "PyTorch"]
lang: "zh_CN"
---

把 **I love cats** 翻成 **我喜欢猫** 时，模型先要读懂英文。等中文已经生成到「我喜欢」，它还要判断下一个位置该放什么。前一个问题允许模型看完整的英文，后一个问题只有英文和已经生成的中文可以用。理解原版 Transformer，可以从这两个位置的**可见范围**开始。

[第一篇学习笔记](/posts/transformer-notes-01/) 从 Token 追到 Q/K/V，推导了为什么点积要除以 $\sqrt{d_k}$，也比较了一个宽头和多个窄头。这一篇把它们放回 Vaswani 等人在 2017 年提出的 Encoder–Decoder 架构，沿着同一句翻译读完训练、生成和实验，再亲手实现一个能跑的小模型。

正文的手算、分词和玩具训练都标为**教学示例**。论文配置和实验结果会注明出处，图表采用 NeurIPS 2017 会议版。 [官方论文 PDF](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf)

[手算注意力](#03缩放点积注意力怎样手算一遍) · [看 Decoder 的两种注意力](#07decoder-为什么需要两种注意力) · [读论文实验](#11原论文的实验支持哪些结论) · [运行代码](#12怎样从公式写出最小-transformer) · [综合自测](#13综合自测)

<a id="paper-architecture"></a>

<figure>
  <img src="/assets/transformer-notes/paper/figure-1.png" width="458" height="665" loading="lazy" alt="原论文 Figure 1。左侧 Encoder 读取输入序列，右侧 Decoder 读取右移目标序列，中间连线把 Encoder 的输出送入 Decoder 的交叉注意力。">
  <figcaption>Figure 1，原版 Transformer 架构。来源为 Vaswani 等，NeurIPS 2017，第 3 页。<a href="https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf#page=3">在论文中查看原图</a></figcaption>
</figure>

先读图底和中间两处。左下角的 **Inputs** 是源序列，右下角的 **Outputs (shifted right)** 是右移目标序列。顺着左侧最上方横跨到右侧的线，可以看到 Encoder 的输出进入 Decoder 中间的注意力模块。后面读 Decoder 时，重点就落在这条线送来什么，以及它和右下角的序列如何配合。

## 00｜序列为什么能写成一张矩阵

假设 Tokenizer 把「I love cats」编成三个 Token，词表大小为 $|\mathcal V|$，Embedding 宽度选 4。词表负责把 Token 映射为 ID，Embedding 表 $E\in\mathbb R^{|\mathcal V|\times4}$ 负责把 ID 映射为向量。取出三个 ID 对应的三行，就得到一张 $3\times4$ 的输入矩阵。词表里可供选取的行数与一次选出的行数分别是 $|\mathcal V|$ 和 3。

$$
X=
\begin{bmatrix}
1&0&0&1\\
0&1&1&0\\
1&1&0&0
\end{bmatrix}.
$$

这是便于手算的教学矩阵。三行依次对应 I、love、cats，四列对应四个特征。Linear 层可以用同一套权重改写每行的特征。ReLU 把负数截成 0，为两次线性变换之间引入非线性。Residual 把子层输入加回输出，保留一条直达路径。LayerNorm 在**单个位置的特征轴**上计算均值和方差，再做可学习的缩放与平移。

后面会频繁遇到两种乘法。$XW$ 沿特征轴做线性投影，通常保留位置数。$QK^\top$ 逐对比较 Query 和 Key，结果的一行是一条 Query 对所有 Key 的分数。Softmax 沿这一行的 Key 轴归一化，让它成为当前查询的权重分配。

<details>
<summary>自测｜位置轴、特征轴和词表</summary>

1. $Q$ 是 $3\times2$、$K$ 是 $4\times2$，$QK^\top$ 是什么形状？**$3\times4$**。每个 Query 都和四个 Key 做一次长度为 2 的点积。
2. 对分数矩阵逐行做 Softmax，每行和是多少？**1**。每行至少要有一个可见且有限的分数。
3. 为什么一个 Token 的向量长度可以远小于词表大小？Embedding 取的是表中的一行，词表大小决定行数，向量宽度由模型设定。

</details>

## 01｜Transformer 想绕过哪一条顺序依赖

在 Seq2Seq 翻译中，Encoder 接收源句，Decoder 在源句表示和译文前缀的条件下预测目标 Token。传统 RNN 的一个位置用 $h_t=f(x_t,h_{t-1})$ 更新隐藏状态。即使训练时已知整句英文，也要先有 $h_{t-1}$ 才能算 $h_t$。LSTM 改进了信息怎么沿时间传递，计算仍然依赖前一个时间步。

Self-Attention 让 love 在同一层里直接与 I 和 cats 的表示匹配。只要这一层的输入都已准备好，同层各位置的 Q/K/V 投影和点积就可以批量计算。源句中的信息因此不必按词依次传递。训练时目标前缀也已知，可以一次算出它的各位置。推理时生成前缀本身仍有依赖，生成「喜欢」之后，下一步才拿得到它。论文主要用 WMT 2014 英德、英法机器翻译检验架构。 [原论文 §1–2](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf#page=1)

<details>
<summary>自测｜训练能并行，为什么还要逐步翻译？</summary>

1. RNN 同层多个位置在训练时为何相互等待？$h_t$ 的计算直接读取 $h_{t-1}$。
2. Transformer Decoder 为什么仍然通常逐 Token 生成？下一步的真实输入来自模型上一步生成的 Token。
3. 论文用什么任务验证架构？以 WMT 2014 英德和英法机器翻译为主，另报告英语成分句法分析。

</details>

## 02｜Attention 怎样查找并汇总信息

如果在更新 love 的表示，可以把它的 Query 当作这次匹配使用的特征，把三个位置的 Key 当作待比较的特征。每个 Key 都有一条对应的 Value。算出分数并归一化后，用权重汇总的是 Value。这样匹配所需的表示和实际传回的内容就可以分别学习。

<figure>
  <img src="/assets/transformer-notes/paper/figure-2-scaled-attention.png" width="300" height="368" loading="lazy" alt="Figure 2 左。Q 与 K 先做矩阵乘法，经过缩放、可选掩码与 Softmax，再同 V 做矩阵乘法。">
  <figcaption>Figure 2 左，缩放点积注意力。来源为 Vaswani 等，NeurIPS 2017，第 4 页。<a href="https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf#page=4">在论文中查看原图</a></figcaption>
</figure>

先找最下面和最上面的两个 **MatMul**。下面一个只接 Q 与 K，算出位置对之间的匹配分数。沿右侧的 V 往上看，它直到上面一个 MatMul 才进入计算。这时分数已经过 Softmax，V 提供的是加权求和用的内容。

在同一层的 Self-Attention 中，$Q=XW_Q$、$K=XW_K$、$V=XW_V$ 都读同一份 $X$，三套投影分别学习。一个较大的权重意味着当前这一步汇总更看重对应的 Value，但预测还受 Value、其他头、输出投影和后续层影响。要论证某个 Token 对最终预测的因果作用，还需要干预或对照。

<details>
<summary>自测｜追踪一行 Query</summary>

1. 为什么最后乘 V？K 决定匹配分数，V 提供该位置实际参与求和的特征。
2. 为什么 love 的输出能包含 cats 的信息？cats 的 Value 可以在这行加权和中占有非零权重。
3. 一行注意力权重应该满足什么性质？对于有可见位置的行，权重非负，行和为 1。被屏蔽的 Key 权重为 0。

</details>

## 03｜缩放点积注意力怎样手算一遍

设 Query 有 $m$ 个位置，Key 和 Value 共用 $n$ 个位置。$d_k$ 是 Query 与 Key 的特征宽度，$d_v$ 是 Value 的特征宽度。按第 02 章的路径，先算每对 Q、K 的点积，再决定哪几个位置可以参与汇总。 [原论文 §3.2.1，式（1）](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf#page=4)

$$
\begin{aligned}
S &= QK^\top/\sqrt{d_k} \\
A &= \operatorname{softmax}_{\mathrm{key}}(S+M) \\
H &= AV .
\end{aligned}
$$

| 步骤 | 形状 | 读法 |
| --- | --- | --- |
| 点积 | $(m,d_k)(d_k,n)\to(m,n)$ | 一行查全部 Key |
| 缩放 | $(m,n)$ | 每个分数除以 $\sqrt{d_k}$ |
| 可选 Mask | $(m,n)$ | $M_{ij}=0$ 表示允许，$-\infty$ 表示禁止 |
| Softmax | $(m,n)$ | 每个 Query 的权重沿 Key 轴和为 1 |
| 加权求和 | $(m,n)(n,d_v)\to(m,d_v)$ | 每个 Query 得到一条 $d_v$ 维向量 |

缩放的出发点是控制分数的波动。在分量相互独立、均值 0、方差 1 的简化模型中，点积方差为 $d_k$，标准差为 $\sqrt{d_k}$。除以 $\sqrt{d_k}$ 可以稳定分数的典型尺度，缓解维度增大带来的 Softmax 饱和。真实的 Q/K 分布会随模型、层和输入变化。 [第一篇的方差推导与数字对照](/posts/transformer-notes-01/#为什么要在-softmax-前除以根号-d_k)

### 手算一个 Query，两条 Key

令 $q=[1,0]$、$k_1=[1,0]$、$k_2=[0,1]$，$v_1=[2,0]$、$v_2=[0,4]$。这是一组教学示例，暂时允许 Query 看见两个位置。

1. 点积给出 $[1,0]$。第一条 Key 与 $q$ 对齐，第二条与 $q$ 正交。
2. $d_k=2$，因此缩放后的分数是 $[1/\sqrt{2},0]\approx[0.7071,0]$。
3. Softmax 权重为 $[e^{1/\sqrt{2}},1]/(e^{1/\sqrt{2}}+1)\approx[0.6698,0.3302]$。
4. 输出是 $0.6698[2,0]+0.3302[0,4]\approx[1.3395,1.3210]$。形状是 $1\times2$。

如果只允许看第一条 Key，分数变成 $[1/\sqrt{2},-\infty]$，权重变成 $[1,0]$，输出随之变为 $[2,0]$。

~~~python
import math
import torch

q = torch.tensor([[1.0, 0.0]])
k = torch.tensor([[1.0, 0.0], [0.0, 1.0]])
v = torch.tensor([[2.0, 0.0], [0.0, 4.0]])
scores = torch.matmul(q, k.T) / math.sqrt(q.shape[-1])
weights = torch.softmax(scores, dim=-1)
out = torch.matmul(weights, v)
assert out.shape == (1, 2)
torch.testing.assert_close(out, torch.tensor([[1.339523, 1.320954]]))
~~~

<details>
<summary>自测｜沿哪条轴归一化？</summary>

1. 为什么沿 Key 轴做 Softmax？每个 Query 都要独立决定自己从哪些 Key 对应的 Value 取信息。
2. 为什么宽度翻四倍时分母只翻两倍？在推导的假设下，方差随宽度线性增长，标准差取方差的平方根。
3. Q 的位置数可以和 K/V 不同吗？可以。每个 Query 都匹配全部 Key。K 和 V 的位置数须相同，才能把权重乘到对应的 Value 上。

</details>

## 04｜为什么要把注意力分成多个头

一个头为每个查询位置算出一套位置权重，再用这套权重聚合该头的全部 Value 通道。多个头拥有各自的投影，所以能为同一个查询位置分别选择位置权重。比如某个头给 I 较高权重，另一个头给 cats 较高权重，最后再融合两份信息。这里的分工只用于说明机制，训练出来的头可以有相似的权重分布。

<figure>
  <img src="/assets/transformer-notes/paper/figure-2-multihead.png" width="313" height="417" loading="lazy" alt="Figure 2 右。多组 Linear 投影分别进入多个并行的缩放点积注意力头，经 Concat 和最终 Linear 得到输出。">
  <figcaption>Figure 2 右，多头注意力。来源为 Vaswani 等，NeurIPS 2017，第 4 页。<a href="https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf#page=4">在论文中查看原图</a></figcaption>
</figure>

看图底重叠的 **Linear** 和中间重叠的 **Scaled Dot-Product Attention**，每一层叠片代表一套投影和汇总。最上面的 **Concat** 把各头的特征并排放好，最后一个 **Linear** 用新的权重混合这些特征。若在代码中一次投影出所有头，再拆开最后一维，拆分的是投影后的结果。

$$
\begin{aligned}
H_j &= \operatorname{Attention}(XW_j^Q,XW_j^K,XW_j^V) \\
\operatorname{MHA}(X) &= \operatorname{Concat}(H_1,\dots,H_h)W^O.
\end{aligned}
$$

上式写的是 Self-Attention。在论文 Base 配置下，$d_{\mathrm{model}}=512$、$h=8$，每头 $d_k=d_v=64$。三个位置的输入是 $3\times512$，每头的 $W_j^Q$、$W_j^K$、$W_j^V$ 都是 $512\times64$，每头权重是 $3\times3$，每头输出是 $3\times64$。沿特征轴拼接得到 $3\times512$，再右乘 $512\times512$ 的 $W^O$，可在列之间做跨头的线性混合，输出仍然是 $3\times512$。 [原论文 §3.2.2](https://arxiv.org/html/1706.03762v7#S3.SS2.SSS2)

<details>
<summary>自测｜从八个头变成十六个头</summary>

1. 八个头共用一套 Q/K/V 参数吗？它们有各自的参数，即使实现时将参数存进同一个大矩阵。
2. 拼接已经凑够 512 维，$W^O$ 还有什么用？拼接保留各头通道，输出投影可以用多个头的通道共同构造新的每个特征。
3. 总宽保持 512，平均分 16 个头，每头多少维？**32**。每头仍为三个查询位置各算一组权重。

</details>

## 05｜没有循环，顺序从哪里来

如果只看全可见的 Self-Attention，并且输入里没有任何位置信息，交换 I 与 cats 两行，输出也只是交换相应两行。设 $P$ 为换行的置换矩阵，逐行投影使 $Q$、$K$、$V$ 分别变成 $PQ$、$PK$、$PV$。分数矩阵变成 $P(QK^\top)P^\top$，因此逐行 Softmax 后，行和列也一同置换。最终的输出是 $(PAP^\top)(PV)=P(AV)$。这种性质叫**置换等变**。这里分析的是无位置相关掩码的情况。

<figure>
  <img src="/assets/transformer-notes/paper/figure-1-positions.png" width="470" height="178" loading="lazy" alt="Figure 1 底部局部。输入与右移目标各自经过 Embedding，并在加号处加入 Positional Encoding。">
  <figcaption>Figure 1 底部局部，Embedding 与位置编码的相加位置。来源为 Vaswani 等，NeurIPS 2017，第 3 页。<a href="https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf#page=3">在论文中查看原图</a></figcaption>
</figure>

看两个 **⊕**。源端和目标端都先查 Embedding，再把同宽的位置向量加进去。这样矩阵形状维持在 $n\times d_{\mathrm{model}}$，后面的投影从数值里同时读到词和位置，Attention 的公式也可以原样使用。论文对正弦和余弦成对使用同一频率。$pos$ 数序列位置，$i$ 数频率对的编号。 [原论文 §3.5](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf#page=6)

$$
\begin{aligned}
PE(pos,2i) &= \sin(pos/10000^{2i/d_{\mathrm{model}}}),\\
PE(pos,2i+1) &= \cos(pos/10000^{2i/d_{\mathrm{model}}}).
\end{aligned}
$$

### 四维位置编码的手算

取 $d_{\mathrm{model}}=4$，第一对频率的角度是 $pos$，第二对是 $pos/100$。前一对在相邻位置之间变化明显，后一对变化较慢。

| 位置 | 第一对 $\sin,\cos$ | 第二对 $\sin,\cos$ |
| --- | --- | --- |
| 0 | $(0,1)$ | $(0,1)$ |
| 1 | $(0.84147,0.54030)$ | $(0.01000,0.99995)$ |
| 2 | $(0.90930,-0.41615)$ | $(0.02000,0.99980)$ |

对任意一个频率 $\omega$，记 $\theta=\omega\,pos$。位置向后移 $k$ 时，角度统一加上 $\delta=\omega k$。根据和角公式，可以用一个只取决于偏移量的线性变换表示新的位置向量。

$$
\begin{bmatrix}\sin(\theta+\delta)\\\cos(\theta+\delta)\end{bmatrix}
=
\begin{bmatrix}\cos\delta&\sin\delta\\-\sin\delta&\cos\delta\end{bmatrix}
\begin{bmatrix}\sin\theta\\\cos\theta\end{bmatrix}.
$$

作者据此推测模型较容易学习相对偏移，也可能外推到训练中未见的长度。表 3 的学习位置向量对照是在指定开发集上做的比较，任意长度外推仍需要单独验证。 [原论文 §3.5](https://arxiv.org/html/1706.03762v7#S3.SS5)

<details>
<summary>自测｜位置信息怎样到达分数矩阵？</summary>

1. $pos$ 与 $i$ 各指什么？$pos$ 是 Token 位置，$i$ 是成对的正弦和余弦通道编号。
2. 为什么 PE 与 Embedding 同维？它们按对应位置和特征逐项相加。
3. PE 在哪里改变分数？它先参加 $X$，再经 $W_Q$、$W_K$ 改变 Q/K，最后改变 $QK^\top$。

</details>

## 06｜Encoder 怎样让三个词互相提供上下文

进入 Encoder 的每个位置都是词向量与位置向量之和。每层先做全源句的 Self-Attention，再对更新后的每个位置做 FFN。原论文把这种结构堆叠 6 层。每层结构一致，各层参数各自学习。 [原论文 §3.1、§3.3](https://arxiv.org/html/1706.03762v7#S3)

<figure>
  <img src="/assets/transformer-notes/paper/figure-1-encoder.png" width="285" height="499" loading="lazy" alt="Figure 1 左侧局部。Encoder 层先做 Multi-Head Attention 和 Add & Norm，再做 Feed Forward 和 Add & Norm。">
  <figcaption>Figure 1 左侧局部，Encoder。来源为 Vaswani 等，NeurIPS 2017，第 3 页。<a href="https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf#page=3">在论文中查看原图</a></figcaption>
</figure>

顺着左边的三个输入箭头看。橙色块的 Q/K/V 都来自同一层的输入。两个绕过子层的外侧箭头是残差，走到黄色 **Add & Norm** 时再与子层结果相加。蓝色的 **Feed Forward** 对每个位置独立使用同一套层内参数。

$$
\begin{aligned}
x_1 &= \operatorname{LN}(x+\operatorname{Dropout}(\operatorname{MHA}(x)))\\
x_2 &= \operatorname{LN}(x_1+\operatorname{Dropout}(\operatorname{FFN}(x_1))).
\end{aligned}
$$

LayerNorm 位于残差相加之后，这一顺序称为 **Post-LN**。在 Base 中，FFN 对每个位置做 $512\to2048\to512$，中间用 ReLU。以三个源位置为例，FFN 的中间形状是 $3\times2048$，相加前回到 $3\times512$。因此位置数保持为 3，变化的是每一行的内容。Encoder 最终输出 $Z\in\mathbb R^{3\times512}$，供 Decoder 使用。

<details>
<summary>自测｜分清注意力和 FFN 的职责</summary>

1. 为什么 FFN 不直接交换 Token 间的信息？同一套 FFN 分别作用在每行，每行的计算只读取自己的输入。
2. 残差相加为什么要求维度一致？对应位置和特征需要一一相加，所以 FFN 最后一层投回模型宽度。
3. 六个 Encoder Layer 参数完全共享吗？各层有各自的参数。共享发生在同一层的 FFN 对不同位置应用同一函数时。

</details>

## 07｜Decoder 为什么需要两种注意力

在生成「猫」之前，Decoder 已经有开头标记和「我 喜欢」。它首先在这段中文内部更新每个位置，再拿更新后的中文表示去查英文。前一次汇总回答「中文已说了什么」，后一次回答「当前要从英文取什么」。 [原论文 §3.1、§3.2.3](https://arxiv.org/html/1706.03762v7#S3.SS2.SSS3)

<figure>
  <img src="/assets/transformer-notes/paper/figure-1-decoder.png" width="285" height="781" loading="lazy" alt="Figure 1 右侧局部。Decoder 底部是带掩码的自注意力，中间块接收 Encoder 输出和 Decoder 中间状态，再经过 FFN 和词表投影。">
  <figcaption>Figure 1 右侧局部，Decoder。来源为 Vaswani 等，NeurIPS 2017，第 3 页。<a href="https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf#page=3">在论文中查看原图</a></figcaption>
</figure>

读图时先看两个橙色块。下方的 **Masked Multi-Head Attention** 三条线都来自目标序列。中间的 **Multi-Head Attention** 有两路从左侧进入，它们把 $Z$ 作为 K、V 的输入。来自下方 Decoder 的那一路提供 Q。这两块各自有 Add & Norm，最后还有一个 FFN 和 Add & Norm。原版 Decoder 也堆叠 6 层，每层都能读取最终 Encoder 表示。

| 注意力 | Q 来自 | K/V 来自 | 可见范围 |
| --- | --- | --- | --- |
| Encoder 自注意力 | 当前层的源位置 | 同一份源表示 | 全部有效源位置 |
| Decoder 掩码自注意力 | 当前层的目标位置 | 同一份目标表示 | 当前及之前的有效目标位置 |
| Encoder–Decoder 交叉注意力 | Decoder 的中间状态 | Encoder 最终输出 $Z$ | 全部有效源位置 |

### 因果掩码长什么样

行是目标查询位置，列是目标 Key 位置。用加性掩码时，允许的位置加 0，禁止的位置加 $-\infty$，Softmax 后后者的权重为 0。

$$
M=
\begin{bmatrix}
0&-\infty&-\infty&-\infty\\
0&0&-\infty&-\infty\\
0&0&0&-\infty\\
0&0&0&0
\end{bmatrix}.
$$

例如索引 2 的查询只允许看 0、1、2。这个三角掩码规定的是**目标序列内的时间顺序**。Padding mask 则负责去掉批处理中补齐的空位置，两者可以同时生效。

交叉注意力可以是长方形。若源句有 $n=3$ 个位置，目标前缀当前有 $m=2$ 个位置，则 Base 的每个头用 $Q\in\mathbb R^{2\times64}$ 匹配 $K\in\mathbb R^{3\times64}$，得到 $2\times3$ 的权重矩阵。乘 $3\times64$ 的 V 得到 $2\times64$。拼接八头之后还保留两个**目标**位置，输出宽度为 512。

<details>
<summary>自测｜三种注意力各从哪里取数据？</summary>

1. 画出 $4\times4$ 因果掩码。用上面的矩阵核对，行 $i$ 对 $j>i$ 的列赋 $-\infty$。
2. 为什么交叉注意力的 Q 来自 Decoder？由当前译文状态决定该查英文的哪些位置，英文表示提供 K 和 V。
3. 为什么不能直接用 Encoder 输出当 Decoder 输入？Decoder 输入承担「已知译文前缀」这一条件，需要在目标位置上形成查询，它与源序列在长度和作用上都可以不同。

</details>

## 08｜同一句话在训练和生成时怎么走

这次明确规定教学分词。源句是 **I / love / cats**，译文是 **我 / 喜欢 / 猫**，另用 **BOS** 表示开始、**EOS** 表示结束。Encoder 先读入三个英文 Token 得到 $Z$。训练和生成都让目标端查询同一个 $Z$，区别在于已知的目标前缀从哪里来。

### 训练时，一次预测四个位置

| 位置索引 | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| 喂给 Decoder | BOS | 我 | 喜欢 | 猫 |
| 要预测的标签 | 我 | 喜欢 | 猫 | EOS |

索引 2 的输入是「喜欢」，标签是「猫」。用上一章的因果掩码，这一行可以读到 BOS、我、喜欢。虽然「猫」在同一个输入矩阵的下一行，掩码会阻断这一行读取它的路径。所有位置的输入在训练时已经准备好，因此可以一次计算四行 logits，每行按照自己的可见范围汇总信息。这就是 **Teacher Forcing** 下的右移。

<figure>
  <img src="/assets/transformer-notes/paper/figure-1-vocabulary.png" width="255" height="238" loading="lazy" alt="Figure 1 顶部局部。Decoder 的输出经 Linear 和 Softmax 得到 Output Probabilities。">
  <figcaption>Figure 1 顶部局部，词表投影与输出概率。来源为 Vaswani 等，NeurIPS 2017，第 3 页。<a href="https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf#page=3">在论文中查看原图</a></figcaption>
</figure>

看最上方的 **Linear → Softmax**。每个目标位置的表示有 512 维，Linear 把它投影成 $|\mathcal V_{\mathrm{tgt}}|$ 个 logits，每个目标词表项一个分数。这里 Softmax 归一化的是**词表轴**。注意力内部的 Softmax 归一化的是 Key 的位置轴。训练时交叉熵可以直接读取 logits，由损失函数内部完成 log-softmax。

### 生成时，把上一步的输出接到前缀

1. 用 BOS 和 $Z$ 求下一 Token 的分布，取出「我」。
2. 用 BOS、我 和 $Z$ 预测「喜欢」。
3. 继续得到「猫」，再生成 EOS，结束。

这是模型每步都选对的教学示例。真实推理只能使用已生成的前缀，一次选错也会改变后续输入。源句没变，$Z$ 可以复用。完整模型一次走过哪些模块，可以对照篇首的[架构总图](#paper-architecture)。 [原论文 §3.4](https://arxiv.org/html/1706.03762v7#S3.SS4)

<details>
<summary>自测｜下一词概率从哪里来？</summary>

1. 训练已经知道译文，怎么防止标签泄漏？依靠输入右移和每层因果掩码。对第 $i$ 个标签而言，该标签在右移输入的未来位置。
2. 为什么 $Z$ 可以多步复用？它只依赖同一条源句。
3. 为什么输出最后一维是词表大小？每一行要为所有候选下一个 Token 各给一个分数。

</details>

## 09｜模型怎样从预测里学到参数

训练从右移输入得到 logits，在每个有效目标位置计算交叉熵。以普通的 one-hot 标签为例，目标词概率为 $p(y_t)$ 时，该位置的损失是 $-\log p(y_t)$。整句损失可以在有效位置上取平均，补齐用的 PAD 不计入。模型的 Q/K/V 投影、Embedding、FFN 和其他权重沿这条损失的梯度一起更新。

### 原论文训练设置沿哪条路径起作用

| 设置 | 在哪里起作用 | 论文配置或用意 |
| --- | --- | --- |
| 参数共享 | 输入 Embedding、输出 Embedding 和词表投影 | §3.4 描述共享权重矩阵。词表投影可用转置，Embedding 侧另乘 $\sqrt{d_{\mathrm{model}}}$ |
| Adam | 梯度算出之后 | $\beta_1=0.9$、$\beta_2=0.98$、$\epsilon=10^{-9}$ |
| Warmup | 每一步的学习率 | 前 4,000 步线性升高，之后按步数平方根的倒数衰减 |
| Dropout | 子层输出加回残差之前，以及 Embedding 与位置编码之和 | Base 的比率为 0.1 |
| Label Smoothing | 交叉熵中的目标分布 | $\epsilon_{\mathrm{ls}}=0.1$，把少量目标概率分给其他候选。作者报告 PPL 变差，同一设定下准确率和 BLEU 改善 |
| Beam Search | 推理期间保留多个候选前缀 | Beam size 为 4，长度惩罚系数 $\alpha=0.6$ |

如果共享的 Embedding 矩阵写作 $E\in\mathbb R^{|\mathcal V|\times d_{\mathrm{model}}}$，输入可以按 ID 取一行，输出可以把隐藏表示右乘 $E^\top$ 得到词表分数。共享源端和目标端要求索引与词表兼容。原论文英德训练使用约 450 万个句对和约 37,000 项的共享 BPE 词表，按近似长度组织批次。报告中的 Base 在 8 张 P100 上训练 100,000 步，约 12 小时。Big 训练 300,000 步，约 3.5 天。这些耗时属于论文的硬件和配置。 [原论文 §3.4、§5 与 §6.1](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf#page=7)

设 $t$ 是从 1 开始的步数，$w=4000$。学习率公式中的两个候选值恰好在 $t=w$ 相交。

$$
\operatorname{lr}(t)=d_{\mathrm{model}}^{-1/2}
\min\left(t^{-1/2},\,t\,w^{-3/2}\right).
$$

当 $t<w$，第二项更小，学习率随 $t$ 线性增加。当 $t>w$，第一项更小，学习率随 $t^{-1/2}$ 下降。用 Base 的 512 维计算，第 4,000 步峰值约为 $6.99\times10^{-4}$。Label Smoothing 改的是目标分布，Beam Search 改的是解码时搜索的候选。它们分别在损失和推理环节发挥作用。

<details>
<summary>自测｜分清优化、损失和解码</summary>

1. Warmup 前后怎么变化？4,000 步前取随步数线性增长的一支，之后取平方根倒数衰减的一支。
2. Label Smoothing 为什么会改变学习效果？目标分布更平滑，训练不再要求把所有目标概率都压到一个词上。
3. Teacher Forcing 和生成的输入有何区别？训练前缀来自真实译文，生成前缀由模型自己产生。

</details>

## 10｜Self-Attention 的优势与代价是什么

论文比较了三件事。**计算复杂度**数一层要做多少工作，**顺序操作数**数有多少步骤相互等待，**最长路径**取所有位置对之间信息传递路径长度的最大值。并行性来自第二项，远位置能否在同一层连接来自第三项。

<figure>
  <img src="/assets/transformer-notes/paper/table-1.png" width="750" height="235" loading="lazy" alt="论文 Table 1，比较全局注意力、循环层、卷积层、受限注意力的计算量、顺序操作数和最长依赖路径。">
  <figcaption>Table 1，层的理论复杂度对照。来源为 Vaswani 等，NeurIPS 2017，第 6 页。<a href="https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf#page=6">在论文中查看原表</a></figcaption>
</figure>

先看原表的 **Self-Attention** 行。它在顺序操作与最长路径两列都是 $O(1)$，计算量是 $O(n^2d)$。一个查询直接与所有 Key 匹配，故路径短。总共要匹配 $n^2$ 对，故工作量随长度二次增长。再看 **Recurrent** 行，逐位置传递导致 $O(n)$ 的顺序操作和最长路径。

| 层类型 | 每层计算量 | 顺序操作 | 最长路径 |
| --- | --- | --- | --- |
| 全局 Self-Attention | $O(n^2d)$ | $O(1)$ | $O(1)$ |
| 循环层 | $O(nd^2)$ | $O(n)$ | $O(n)$ |
| 卷积层 | $O(knd^2)$ | $O(1)$ | $O(\log_k n)$ |
| 局部 Self-Attention | $O(rnd)$ | $O(1)$ | $O(n/r)$ |

$n$ 是序列长度，$d$ 是表示宽度，$k$ 是卷积核宽度，$r$ 是受限注意力的邻域大小。卷积的对数路径对应论文讨论的**空洞卷积**。表里的注意力项描述位置两两匹配与汇总，完整多头层还要算投影，Encoder 和 Decoder 也有 FFN。以 $n=128,d=512$ 为例，仅比较表中两项有 $n^2d<nd^2$。$n$ 超过 $d$ 后这个不等式反转。若为每个头显式保存 $n\times n$ 的权重，序列长一倍，权重元素数就增为四倍。实际耗时还取决于内存、硬件和实现。 [原论文 §4](https://arxiv.org/html/1706.03762v7#S4)

<details>
<summary>自测｜路径很短，为什么开销仍会很大？</summary>

1. 同一层的 Self-Attention 为什么可以并行？所有位置的投影可由该层输入一起求出，再批量计算任意位置对。
2. 二次开销来自哪里？每个 Query 都对所有 Key 打分，共 $n\times n$ 对。
3. $O(1)$ 最长路径表示只用常数次计算吗？它数两个位置之间经过几个操作层级。所有位置对同时出现时，计算量仍随 $n$ 增长。

</details>

## 11｜原论文的实验支持哪些结论

### Table 2｜翻译表现和训练成本

<figure>
  <img src="/assets/transformer-notes/paper/table-2.png" width="750" height="338" loading="lazy" alt="NeurIPS 2017 版 Table 2。Transformer Base 的英德和英法 BLEU 分别为 27.3、38.1，Big 分别为 28.4、41.0。">
  <figcaption>Table 2，WMT 2014 newstest2014 翻译结果。来源为 Vaswani 等，NeurIPS 2017，第 8 页。<a href="https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf#page=8">在论文中查看原表</a></figcaption>
</figure>

先确定语言方向，再看最下面两行。**英德**实验中，Base 为 **27.3**，Big 为 **28.4**，表中先前最佳集成为 ConvS2S Ensemble 的 **26.36**。Big 高出约 2.04 BLEU。**英法**实验中，会议版 Big 为 **41.0**，高于该表所列此前的单模型结果。表内英法最佳集成是 **41.29**，因此会议版的英法结论要保留「单模型」这一比较范围。

BLEU 以生成译文与参考译文的 $n$-gram 重合度为基础，另对过短的译文施加惩罚。同一个分数要结合分词、参考译文和测试集理解。原表的 Training Cost 是作者按训练时长、GPU 数量和估计的单卡持续浮点吞吐换算出的 FLOPs。右侧成本列报告的是训练计算量估计。

**版本核对。** 会议版摘要、Table 2 和 §6.1 对 Big 的英法 BLEU 均为 **41.0**。arXiv v7 摘要和 Table 2 写 **41.8**，该版本 §6.1 的对应段落仍写 **41.0**。上面的对比统一使用会议版 Table 2。 [会议版第 8 页](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf#page=8) · [arXiv v7 §6.1](https://arxiv.org/html/1706.03762v7#S6.SS1)

### Table 3｜改变一个配置，结果怎么动

<figure>
  <img src="/assets/transformer-notes/paper/table-3.png" width="750" height="595" loading="lazy" alt="论文 Table 3。开发集上比较了头数、Key 宽度、层数、特征宽度、Dropout、Label Smoothing 以及位置编码的变体。">
  <figcaption>Table 3，英德开发集 newstest2013 消融。来源为 Vaswani 等，NeurIPS 2017，第 9 页。<a href="https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf#page=9">在论文中查看原表</a></figcaption>
</figure>

这张表先读 **base** 行，再看每组改动了哪一列。未列出的值沿用 Base。最后对照的是开发集 **BLEU (dev)** 和 **PPL (dev)**，数据集与 Table 2 的正式测试集有别。表里的 PPL 按子词单位计算，数值不宜直接和按整词计算的 PPL 比。

- **(A) 头数与单头宽度一起变。** 总宽保持 512，单头的 BLEU 为 24.9，Base 的八头为 25.8，十六头也是 25.8，三十二头回到 25.4。这个对照给多头配置提供了证据，也显示在固定总宽时继续增加头数的取舍。
- **(B) 缩小 $d_k$。** $d_k=16$ 和 32 时，BLEU 分别为 25.1、25.4，低于 Base 的 25.8。匹配用的特征宽度和模型参数量随设置一起改变。
- **(C) 层数、模型宽度与 FFN 宽度。** 例如把层数降到 2，BLEU 为 23.7，把层数设为 8 时为 25.5。读这一组时，尤其要留意哪些宽度参数是同时变化的。
- **(D) 正则化。** Dropout 设为 0 时 BLEU 为 24.6。标签平滑设为 0 时，PPL 从 Base 的 4.92 降到 4.67，BLEU 从 25.8 降到 25.3。两个指标测量的东西不同，可以朝不同方向变化。
- **(E) 位置编码。** 用学习的位置向量替换正弦编码，BLEU 为 25.7，接近 Base 的 25.8。这比较的是所报告的开发集条件。

这些实验支持的是具体翻译任务上的架构效果和配置取舍。迁移到很长的序列、不同任务或不同硬件时，需要重新测量质量、内存与耗时。 [原论文 §6.2](https://arxiv.org/html/1706.03762v7#S6.SS2)

<details>
<summary>自测｜哪些数字可以放在一起比较？</summary>

1. BLEU 衡量什么？衡量生成文本与参考译文在短语片段上的重合程度，并带有长度惩罚。
2. 为什么单头、多头比较属于消融？作者在 Base 周围改变头数和单头宽度，比较在同一数据集和其他主要设置下结果如何变化。
3. Table 3 的 25.8 与 Table 2 的 28.4 能直接用来衡量头数收益吗？它们的评测集和配置都不同。头数收益应从 Table 3 的 (A) 组内读。

</details>

## 12｜怎样从公式写出最小 Transformer

这一节实现一个小型 Encoder–Decoder。完整脚本只依赖 Python 和 PyTorch，CPU 上即可运行，数据由脚本生成。模型宽度 32，4 个头，每头 8 维，FFN 中间宽度 64，Encoder 与 Decoder 各 1 层。它保留了本文要检查的运算，使用独立的源词表和目标词表、固定学习率以及贪心解码，适合在很小的例子里逐步调试。 <a href="/assets/transformer-notes/attention_transformer.py" download data-no-swup>下载完整 PyTorch 源码</a>

~~~bash
python -X utf8 attention_transformer.py
~~~

### 先写注意力内核

约定布尔 Mask 的 **True 表示可见**，False 对应论文中的 $-\infty$。对全部被屏蔽的行先用有限值占位，Softmax 后再把权重清零，以免对整行 $-\infty$ 归一化时得到 NaN。

~~~python
def scaled_dot_product_attention(q, k, v, keep=None):
    scores = q @ k.transpose(-2, -1) / math.sqrt(q.size(-1))
    if keep is not None:
        scores = scores.masked_fill(~keep, -torch.inf)
        scores = scores.masked_fill(~keep.any(dim=-1, keepdim=True), 0.0)
    weights = torch.softmax(scores, dim=-1)
    if keep is not None:
        weights = weights.masked_fill(~keep, 0.0)
    return weights @ v, weights
~~~

### 沿着形状把组件接起来

1. **MultiHeadAttention。** 分别投影 Q、K、V，再把 $(B,L,d_{\mathrm{model}})$ reshape 成 $(B,L,h,d_{\mathrm{head}})$ 并交换轴 1、2。此时分数的乘法是 $(B,h,L_q,d_k)(B,h,d_k,L_k)\to(B,h,L_q,L_k)$。输出交换回位置轴在前的排列，再把头和头内特征合并，交给输出投影。
2. **PositionalEncoding。** 按第 05 章公式提前生成正弦和余弦表。前向取前 $L$ 行，加到每条序列的 $L$ 个向量上，以同一张表广播到整个批次。
3. **EncoderLayer。** 先送 $x,x,x$ 给自注意力，屏蔽源端的 PAD。做完残差与 LayerNorm，再用同样的 Post-LN 顺序接 FFN。
4. **DecoderLayer。** 先带因果掩码做目标自注意力，随后用更新后的 $x$ 查询 $Z,Z$。交叉注意力用源端 Padding mask。最后接 FFN。
5. **Transformer。** 先用 encode 得到 $Z$，再以目标输入和 $Z$ 调 decode。训练返回词表 logits，交叉熵用右移配对的标签计算。生成时把上一步选出的 Token 拼回前缀再调 decode，复用同一个 $Z$。

源码把最后一步写得很短。这里的 tgt 已经是右移的目标输入。

~~~python
def forward(self, src, tgt):
    memory, source_keep = self.encode(src)
    return self.decode(tgt, memory, source_keep)
~~~

### 怎样判断代码接对了

先用第 03 章的手算核对数值。再送一组不同长度的 Q/K/V 做形状检查。源码中的一组输入是 Q 为 $(2,4,3,8)$，K 为 $(2,4,5,8)$，V 为 $(2,4,5,6)$，检查得到权重 $(2,4,3,5)$ 和输出 $(2,4,3,6)$。内核支持不同的 $d_v$，完整玩具网络使用等宽的头。普通行的权重和应为 1，全部屏蔽的行按上述约定为 0。

因果测试分两步。先在注意力内核里改最后一个位置的 Value，检查前面三行输出是否保持一致。再在整个模型里改目标序列最后一个输入，检查更早的 logits 是否保持一致。训练跑一次 **loss.backward()** 后，检查参数是否得到有限梯度，并检查第一个 Encoder 自注意力的 Query 投影是否收到非零梯度。

**教学脚本实跑结果。** 八组玩具句对在一个批次里反复训练 120 步。一次固定种子的 CPU 运行中，训练损失从 **2.3247** 降到 **0.0005**，脚本生成下面这句。这次测量用于检查模型和训练循环能否拟合这组训练样本。

~~~text
shape / probability / mask / gradient checks passed
toy loss: 2.3247 -> 0.0005
I love cats -> 我 喜欢 猫 <eos>
~~~

<details>
<summary>自测｜调试时应该盯哪个轴？</summary>

1. 为什么 Cross-Attention 的 $L_q$ 与 $L_k$ 可以不同？一个数目标查询位置，另一个数源候选位置，点积只要求它们的特征宽度一致。
2. 只改未来位置输入，哪些输出应该保持一致？所有更早查询位置的输出，在关闭 Dropout 或固定随机性的测试中应相同。
3. 拆头之后哪个轴数头？本文使用 $(B,h,L,d_{\mathrm{head}})$，索引 1 是 Head 轴。

</details>

## 13｜综合自测

先闭上图和代码，试着解释每一步，再展开答案。

### 概念与计算

1. Transformer 为什么需要位置机制？不含位置机制的全可见 Self-Attention 在交换两行后会怎样？
2. Encoder 自注意力、Decoder 掩码自注意力和交叉注意力各自从哪里取得 Q/K/V？
3. 已经做过 Attention，FFN、Residual 和 LayerNorm 各还负责什么？
4. $Q\in\mathbb R^{5\times64}$、$K,V\in\mathbb R^{7\times64}$，权重和输出分别是什么形状？
5. 第 03 章的一个 Query、两个 Key 示例，怎么算到最终输出？
6. 在长度为 4 的目标序列里，索引 2 的 Query 可以看到哪些 Key？

<details>
<summary>核对第 1–6 题</summary>

1. 在全可见情形，交换输入行只会交换相应输出行。PE 把位置的信息加到输入表示。
2. Encoder 自注意力全从源端同层输入取得。Decoder 自注意力全从目标端同层输入取得，并加因果掩码。交叉注意力的 Q 读 Decoder 中间状态，K/V 读 Encoder 的最终输出。
3. FFN 在每个位置改写特征。Residual 给子层保留输入直达路径。LayerNorm 归一化每个位置的特征，论文把它放在残差相加之后。
4. 权重 $5\times7$，输出 $5\times64$。
5. 分数 $[0.7071,0]$，权重约 $[0.6698,0.3302]$，输出约为 $[1.3395,1.3210]$。
6. 索引 0、1、2。索引 3 被屏蔽。

</details>

### 迁移与实现

7. 取消目标端因果掩码后，训练和生成各会出现什么问题？
8. 保持模型总宽 512，把八个头换成一个大头，权重的自由度发生了什么变化？
9. 原始 Encoder–Decoder Transformer 与常见的 Decoder-only 自回归模型怎样组织源内容？
10. 不看图画出模型。标出三处 Attention 的 Q/K/V 和两个位置编码的输入。
11. 不调用框架的完整 Transformer 层，实现最小模型，并写一个能抓住未来信息泄漏的测试。

<details>
<summary>核对第 7–11 题</summary>

7. 训练时可以从右移输入的后续行读到当前标签。生成时未来输入还没产生，会导致训练与生成的可见条件不一致。
8. 原来同一个查询位置有最多八套分别计算的分布。换成单头后，它只有一套位置权重供该头的所有通道使用。
9. Encoder–Decoder 先用独立 Encoder 读取源序列，Decoder 用交叉注意力取源信息。常见的 Decoder-only 模型把提示与已生成内容放进同一条因果序列，通过自注意力使用上下文。
10. 画出源端 Embedding 加 PE 和目标端 Embedding 加 PE。把 Encoder 输出接到 Decoder 中间注意力的 K/V，Decoder 经过掩码自注意力后的状态接 Q。最后补上残差、归一化、FFN 和词表投影。 [对照架构原图](#paper-architecture)
11. 固定一条源句和同一目标前缀，复制一份输入，只修改最后一个目标位置。用评估模式计算两次 logits，比较最后一行之前的所有结果。增补形状与梯度断言，再训练小批量，观察损失是否下降。 [对照可运行代码](#12怎样从公式写出最小-transformer)

</details>

能答 1–3 题，可以用自己的话讲清模块。能做 4–8 题，可以追踪形状并判断掩码是否正确。能独立完成 9–11 题，就可以把同一套检查迁移到自己写的模型上。

## 回看最初的翻译例子

生成「猫」之前，中文前缀决定 Decoder 此刻问什么，完整英文提供它可以查什么。Encoder 的输出留在交叉注意力的 K/V 路径里，前缀不断延长，下一步的 Query 随之改变。沿着这两条线读矩阵乘法，就能判断它是在沿特征变换，还是在两个位置之间建立联系。

- Vaswani, A. 等，*Attention Is All You Need*，NeurIPS 2017。本文原图和实验表统一出自会议版。 [NeurIPS 官方 PDF](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf)
- 长篇阅读时也可用 HTML 版跳转公式和引用。引用具体实验数字时请标明版本。 [arXiv HTML v7](https://arxiv.org/html/1706.03762v7) · [arXiv PDF v7](https://arxiv.org/pdf/1706.03762v7)

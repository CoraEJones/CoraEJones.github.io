---
title: "宽角度超透镜为什么难做｜从理想相位到真实微结构"
published: 2026-11-24T18:44:38+08:00
description: "逐图解读宽角度超透镜的理想相位、孔径与介质间隔、采样耦合、伴随优化和悬链线结构，附论文原图、公式推导及五组互动实验。"
category: "光学"
tags: ["超透镜", "超表面", "宽视场成像", "论文精读"]
lang: "zh_CN"
draft: false
---

<link rel="stylesheet" href="/assets/wide-angle-metalens-reading/reader.css">

<metalens-reader class="metalens-reader not-prose" id="metalens-top">
  <header class="reader-intro">
    <p class="hero-summary">把视场、孔径、采样、耦合与优化放进同一条设计逻辑。循着论文的十幅图，读清一片超透镜怎样在不同入射方向下工作。</p>
    <aside class="paper-reference" aria-label="研读文献信息">
    <span class="small">所读综述</span>
    <p class="paper-title">Recent advances of wide-angle metalenses</p>
    <p>Principle, design, and applications<br>X. Luo et al.<br><em>Nanophotonics</em> 11(1), 1–20 (2022)</p>
    <a class="no-styling" href="https://doi.org/10.1515/nanoph-2021-0583" target="_blank" rel="noopener noreferrer">10.1515/nanoph-2021-0583 ↗</a>
  </aside>
  </header>
  <div class="reader-toolbar" data-pagefind-ignore>
    <details class="reader-toc" id="metalens-toc"><summary>文章目录 · 12 个阅读单元</summary><ol><li><a class="no-styling" href="#start"><span class="toc-number">01</span><span>从正入射走向整个视场</span></a></li><li><a class="no-styling" href="#ideal-phase"><span class="toc-number">02</span><span>理想相位与角度需求</span></a></li><li><a class="no-styling" href="#quadratic"><span class="toc-number">03</span><span>二次相位的平移性质</span></a></li><li><a class="no-styling" href="#aperture"><span class="toc-number">04</span><span>光阑、空气与介质间隔</span></a></li><li><a class="no-styling" href="#implementation"><span class="toc-number">05</span><span>理想目标与真实响应</span></a></li><li><a class="no-styling" href="#sampling"><span class="toc-number">06</span><span>采样、模式与邻近耦合</span></a></li><li><a class="no-styling" href="#adjoint"><span class="toc-number">07</span><span>伴随计算与数值优化</span></a></li><li><a class="no-styling" href="#catenary"><span class="toc-number">08</span><span>悬链线与几何相位</span></a></li><li><a class="no-styling" href="#streamlines"><span class="toc-number">09</span><span>二维流线与传播相位</span></a></li><li><a class="no-styling" href="#applications"><span class="toc-number">10</span><span>成像、傅里叶与角动量</span></a></li><li><a class="no-styling" href="#outlook"><span class="toc-number">11</span><span>设计取舍与研究边界</span></a></li><li><a class="no-styling" href="#reading-notes"><span class="toc-number">12</span><span>符号与校读说明</span></a></li></ol></details>
    <nav class="reader-actions" aria-label="阅读工具">
      <a class="no-styling" href="#reading-map">阅读地图</a>
      <a class="no-styling" href="#references">参考文献</a>
      <button class="utility-button" type="button" id="print-page">打印 / PDF</button>
    </nav>
    <p class="toc-reading">阅读进度 <span id="reading-percent">0%</span><progress id="toc-progress" value="0" max="100" aria-label="阅读进度"></progress></p>
  </div>
  <div class="metalens-content" id="metalens-content">
<section class="reading-map" id="reading-map" aria-labelledby="reading-map-title">
      <p class="map-title" id="reading-map-title">如何使用这篇研读</p>
      <p><strong>默认读者：</strong>理解相位、干涉和透镜聚焦，做过少量超表面设计。前半篇把理想波前与系统几何连起来；后半篇进入真实结构、数值方法和应用。关键推导放在正文，进一步的代数步骤可按需展开。</p>
      <div class="reading-legend"><span>原文事实 · 带章节 / 图号来源</span><span>补充推导 · 明确假设与步骤</span><span>阅读分析 · 解释适用范围</span></div>
      <p><strong>阅读边界：</strong>这是一篇针对原综述的解释性研读，研究进展以论文形成时的文献为准。交互是解析模型或示意，不是新器件的实验结果。</p>
      <button class="utility-button" id="expand-derivations" type="button" aria-pressed="false">展开补充推导</button>
    </section>
    <section id="start" class="article-section">
  <p class="section-kicker"><span class="chapter-num">01</span>阅读入口</p>
  <h2>从一次正入射设计，走向整个视场</h2>
  <p>如果已经做过几次超表面设计，一个熟悉的流程通常是：先确定目标相位，再扫描单元尺寸建立相位库，按照位置选择结构，最后检验焦点或远场。把同一片器件用于宽视场成像时，这个流程需要增加一个维度：<strong>同一片结构必须面对许多入射方向，而且各个方向的成像质量都要可用。</strong></p>
  <p>本文研读的 <cite>Recent advances of wide-angle metalenses: principle, design, and applications</cite> 是一篇综述。它于 <strong>2021 年 12 月在线发表，收入 Nanophotonics 2022 年第 11 卷第 1 期</strong>，讨论了宽角度超透镜的基本原理、系统构型、微结构实现与应用。文中的性能纪录和研究展望属于当时的文献背景，本文也以这一背景为边界。<a class="cite no-styling" href="#ref-review">[综述：摘要与第 1 节]</a></p>
  <div class="insight"><span class="note-label">本文的分析主线</span><p><strong>宽视场设计同时包含两项任务：在系统层面找到多角度下可用的相位与孔径方案，在微结构层面实现这些方案所需要的振幅、相位和偏振响应。</strong>前一层成立，不代表后一层自动成立；微结构效率高，也不代表整套成像系统已经校正像差。</p></div>
  <p>正文按“理想要求—系统方案—实现困难—改进方法—应用证据”的顺序展开。五个交互模块用于重算公式或展示计算关系；它们是<strong>教学模型</strong>，不提供全波电磁仿真或成像质量预测。文中将论文陈述、补充推导和阅读分析分别注明。</p>
  <div class="table-wrap" tabindex="0" role="region" aria-label="对照表，可横向滚动查看"><table><caption>开始阅读前，先区分四个常见指标</caption><thead><tr><th>量或指标</th><th>本文中的含义</th><th>阅读时应确认的条件</th></tr></thead><tbody>
    <tr><td><strong>视场 FOV</strong></td><td>系统接受并形成可用图像的角度范围</td><td>全视场还是半视场；一维角度还是两个方向；“可用”的像差与分辨率标准</td></tr>
    <tr><td><strong>有效数值孔径</strong></td><td>某个视场下实际参与成像的光束所对应的 NA</td><td>口径受到光阑、投影、渐晕等因素限制；不能只由整片结构外径判断</td></tr>
    <tr><td><strong>聚焦效率</strong></td><td>进入指定焦斑区域的功率与参考功率之比</td><td>分母、焦斑积分区域、偏振、波长与入射角</td></tr>
    <tr><td><strong>畸变与点像模糊</strong></td><td>畸变主要改变像点的位置映射；球差、彗差等像差会使点像扩展或变形</td><td>畸变也是像差的一种；规则的非线性映射可校正，不等于模糊也能被无损恢复</td></tr>
  </tbody></table></div>
  <p class="source-note">指标区分是本文的阅读整理，具体讨论见综述 §2.1–2.2、§4.1 和 §5。除单独说明外，<var>f</var> 是设计波长下的焦距，<var>k₀=2π/λ</var>，角度进入三角函数时使用弧度。</p>
</section>
<section id="ideal-phase" class="article-section">
  <p class="section-kicker"><span class="chapter-num">02</span>理想要求</p>
  <h2>理想相位首先是一个“位置 × 角度”的目标</h2>
  <h3>从等相位到焦点，写出器件需要补偿的量</h3>
  <p>在透镜平面取横向位置 <var>x</var>，目标焦平面与透镜相距 <var>f</var>，指定入射角 <var>θᵢ</var> 对应的像点横坐标为 <var>s(θᵢ)</var>。来自透镜不同位置的光，到达同一个目标像点时应该具有相同的总相位。总相位中既有入射波已经携带的横向相位，也有透镜提供的相位和出射传播相位。</p>
  <p>采用原文式（1）的横向入射相位约定 <var>+k₀x sinθᵢ</var>，以透镜中心为相位参考，理想器件相位为：</p>
  <div class="math" data-tex="\phi_m(x;\theta_i)=-k_0\left[x\sin\theta_i+\sqrt{(x-s)^2+f^2}-\sqrt{s^2+f^2}\right]+C" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="352pt" height="25pt" viewBox="0 0 352 25" version="1.1" role="img" aria-label="φₘ(x;θᵢ)=−k₀[x sinθᵢ+√((x−s)²+f²)−√(s²+f²)]+C" focusable="false">
 <title>φₘ(x;θᵢ)=−k₀[x sinθᵢ+√((x−s)²+f²)−√(s²+f²)]+C</title><defs>
 </defs>
 <g id="eq-1-figure_1">
  <g id="eq-1-patch_1">
   <path d="M 0 25  L 352 25  L 352 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-1-text_1">
   <!-- $\phi_m(x;\theta_i)=-k_0\left[x\sin\theta_i+\sqrt{(x-s)^2+f^2}-\sqrt{s^2+f^2}\right]+C$ -->
   <g style="fill: #17313d" transform="translate(0 21) scale(0.16 -0.16)">
    <defs>
     <path id="eq-1-STIXGeneral-Italic-3d5" d="M 3078 4371  L 2650 2822  Q 3098 2822 3296 2746  Q 3808 2547 3808 1939  Q 3808 1709 3728 1446  Q 3648 1184 3481 915  Q 3315 646 3088 425  Q 2861 205 2537 67  Q 2214 -70 1850 -70  L 1504 -1312  L 1005 -1312  L 1350 -70  Q 883 -70 666 0  Q 173 160 173 819  Q 173 1018 256 1274  Q 339 1530 502 1802  Q 666 2074 886 2301  Q 1107 2528 1417 2675  Q 1728 2822 2061 2822  L 2157 2822  L 2586 4371  L 3078 4371  z M 2611 2688  L 1888 64  Q 2125 64 2330 166  Q 2694 352 2982 998  Q 3270 1645 3270 2093  Q 3270 2464 2982 2643  Q 2906 2688 2611 2688  z M 1389 64  L 2118 2688  Q 1760 2688 1427 2365  Q 1094 2042 902 1568  Q 710 1094 710 646  Q 710 237 1018 115  Q 1152 64 1389 64  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Italic-6d" d="M 4506 672  L 4474 627  Q 3981 -58 3552 -58  Q 3296 -58 3296 237  Q 3296 333 3379 659  L 3750 2112  Q 3795 2291 3795 2355  Q 3795 2413 3756 2451  Q 3718 2490 3667 2490  Q 3366 2490 2829 1741  Q 2592 1408 2457 1072  Q 2323 736 2138 0  L 1658 0  L 1830 595  Q 2266 2099 2266 2330  Q 2266 2490 2125 2490  Q 1965 2490 1702 2237  Q 1440 1984 1171 1574  Q 1011 1325 899 1043  Q 787 762 557 0  L 77 0  L 352 922  Q 704 2093 704 2381  Q 704 2522 442 2522  L 282 2522  L 282 2624  L 1318 2822  L 1338 2810  L 966 1472  Q 1798 2822 2374 2822  Q 2560 2822 2659 2720  Q 2758 2618 2758 2438  Q 2758 2195 2502 1466  Q 2842 2003 3069 2275  Q 3296 2547 3526 2694  Q 3731 2822 3930 2822  Q 4102 2822 4201 2710  Q 4301 2598 4301 2419  Q 4301 2336 4282 2240  L 3846 634  Q 3782 390 3782 346  Q 3782 243 3859 243  Q 4000 243 4275 582  L 4410 749  L 4506 672  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Regular-3b" d="M 1116 2832  Q 1222 2726 1222 2579  Q 1222 2432 1116 2329  Q 1011 2227 870 2227  Q 723 2227 617 2332  Q 512 2438 512 2579  Q 512 2733 614 2835  Q 717 2938 870 2938  Q 1011 2938 1116 2832  z M 685 -902  L 621 -781  Q 1152 -435 1152 -102  Q 1152 -70 1126 -41  Q 1101 -13 1062 -13  Q 1043 -13 979 -25  Q 915 -38 883 -38  Q 512 -38 512 294  Q 512 448 621 550  Q 730 653 890 653  Q 1107 653 1254 496  Q 1402 339 1402 83  Q 1402 -218 1210 -480  Q 1018 -742 685 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Italic-3b8" d="M 3162 3270  Q 3162 2534 2925 1862  Q 2688 1190 2304 678  Q 1741 -70 992 -70  Q 608 -70 390 224  Q 173 518 173 1030  Q 173 1997 592 2813  Q 1011 3629 1594 4070  Q 1952 4339 2374 4339  Q 2733 4339 2947 4076  Q 3162 3814 3162 3270  z M 941 2221  L 2432 2221  Q 2624 2874 2624 3533  Q 2624 4205 2285 4205  Q 2029 4205 1728 3814  Q 1427 3424 1232 2992  Q 1037 2560 941 2221  z M 2387 2016  L 896 2016  Q 710 1530 710 960  Q 710 64 1069 64  Q 1286 64 1510 275  Q 1734 486 1904 806  Q 2074 1126 2198 1440  Q 2323 1754 2387 2016  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Italic-69" d="M 1690 3834  Q 1690 3699 1597 3603  Q 1504 3507 1376 3507  Q 1235 3507 1152 3600  Q 1069 3693 1069 3846  Q 1069 3994 1155 4090  Q 1242 4186 1370 4186  Q 1498 4186 1594 4080  Q 1690 3974 1690 3834  z M 1421 730  L 1504 659  Q 1235 243 1049 86  Q 864 -70 627 -70  Q 314 -70 314 282  Q 314 467 454 992  L 762 2125  Q 819 2330 819 2406  Q 819 2502 745 2528  Q 672 2554 410 2560  L 410 2662  Q 704 2688 1434 2822  L 1459 2803  L 858 608  Q 794 390 794 326  Q 794 230 883 230  Q 1043 230 1421 730  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Italic-6b" d="M 2950 2739  L 2950 2637  Q 2720 2624 2464 2448  Q 2208 2272 1510 1651  L 1747 1088  Q 2099 262 2266 262  Q 2400 262 2554 531  Q 2586 582 2650 698  L 2746 627  Q 2522 224 2374 77  Q 2227 -70 2035 -70  Q 1894 -70 1782 42  Q 1670 154 1517 454  Q 1325 826 1133 1357  L 877 1152  L 570 0  L 90 0  L 992 3379  Q 1082 3699 1107 3942  Q 1088 4096 781 4096  L 666 4096  L 666 4198  Q 1146 4256 1670 4371  L 1709 4333  L 941 1414  L 1216 1626  Q 2131 2330 2131 2522  Q 2131 2637 1894 2637  L 1805 2637  L 1805 2739  L 2950 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Regular-30" d="M 3046 2112  Q 3046 1683 2963 1302  Q 2880 922 2717 602  Q 2554 282 2266 96  Q 1978 -90 1600 -90  Q 1210 -90 915 108  Q 621 307 461 640  Q 301 973 227 1350  Q 154 1728 154 2150  Q 154 2746 301 3222  Q 448 3699 790 4012  Q 1133 4326 1626 4326  Q 2253 4326 2649 3712  Q 3046 3098 3046 2112  z M 2432 2080  Q 2432 3091 2217 3625  Q 2003 4160 1587 4160  Q 1190 4160 979 3622  Q 768 3085 768 2106  Q 768 1120 979 598  Q 1190 77 1600 77  Q 2003 77 2217 598  Q 2432 1120 2432 2080  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXSizeTwoSym-Regular-5b" d="M 2701 -1786  L 1216 -1786  L 1216 10022  L 2701 10022  L 2701 9766  L 1702 9766  L 1702 -1530  L 2701 -1530  L 2701 -1786  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Regular-73" d="M 998 1926  L 1664 1523  Q 1984 1331 2105 1164  Q 2227 998 2227 736  Q 2227 416 1961 176  Q 1696 -64 1331 -64  Q 1030 -64 864 -6  Q 691 51 570 51  Q 461 51 416 -26  L 333 -26  L 333 979  L 435 979  Q 538 512 730 294  Q 922 77 1248 77  Q 1485 77 1632 211  Q 1779 346 1779 550  Q 1779 845 1440 1030  L 1094 1222  Q 326 1651 326 2150  Q 326 2522 566 2730  Q 806 2938 1210 2938  Q 1491 2938 1638 2867  Q 1754 2816 1818 2816  Q 1862 2816 1920 2880  L 1990 2880  L 2022 2010  L 1926 2010  Q 1818 2445 1654 2621  Q 1491 2797 1203 2797  Q 986 2797 854 2688  Q 723 2579 723 2362  Q 723 2253 796 2128  Q 870 2003 998 1926  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Regular-69" d="M 1152 4045  Q 1152 3904 1056 3811  Q 960 3718 819 3718  Q 685 3718 592 3811  Q 499 3904 499 4045  Q 499 4179 595 4275  Q 691 4371 826 4371  Q 966 4371 1059 4275  Q 1152 4179 1152 4045  z M 1619 0  L 102 0  L 102 96  Q 435 115 521 211  Q 608 307 608 666  L 608 2118  Q 608 2342 563 2432  Q 518 2522 397 2522  Q 243 2522 128 2490  L 128 2592  L 1120 2944  L 1146 2918  L 1146 672  Q 1146 314 1226 218  Q 1306 122 1619 96  L 1619 0  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Regular-6e" d="M 3104 0  L 1773 0  L 1779 96  Q 2016 115 2096 233  Q 2176 352 2176 672  L 2176 1946  Q 2176 2592 1709 2592  Q 1549 2592 1408 2515  Q 1267 2438 1050 2227  L 1050 461  Q 1050 269 1136 192  Q 1222 115 1466 96  L 1466 0  L 115 0  L 115 96  Q 358 115 435 214  Q 512 314 512 602  L 512 2157  Q 512 2394 467 2483  Q 422 2573 288 2573  Q 160 2573 102 2547  L 102 2656  Q 550 2784 979 2944  L 1030 2925  L 1030 2426  L 1037 2426  Q 1491 2944 1958 2944  Q 2323 2944 2518 2688  Q 2714 2432 2714 1958  L 2714 544  Q 2714 288 2790 205  Q 2867 122 3104 96  L 3104 0  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Regular-2b" d="M 4070 1408  L 2400 1408  L 2400 -262  L 1978 -262  L 1978 1408  L 307 1408  L 307 1830  L 1978 1830  L 1978 3501  L 2400 3501  L 2400 1830  L 4070 1830  L 4070 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXSizeOneSym-Regular-221a" d="M 6970 9933  L 3373 -1888  L 3104 -1888  L 1626 2918  Q 1555 3149 1465 3251  Q 1376 3354 1229 3354  Q 1011 3354 794 3181  L 717 3309  L 1766 4115  L 1926 4115  L 3379 -602  L 3405 -602  L 6605 9933  L 6970 9933  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Italic-73" d="M 2342 2829  L 2214 1933  L 2112 1933  Q 2022 2675 1542 2675  Q 1370 2675 1267 2579  Q 1165 2483 1165 2310  Q 1165 2067 1510 1658  Q 1946 1152 1946 787  Q 1946 397 1686 163  Q 1427 -70 1024 -70  Q 838 -70 672 -6  Q 538 51 390 51  Q 262 51 205 -83  L 102 -83  L 230 934  L 333 934  Q 461 64 973 64  Q 1203 64 1331 192  Q 1459 320 1459 557  Q 1459 845 1101 1293  Q 698 1798 698 2131  Q 698 2451 909 2636  Q 1120 2822 1472 2822  Q 1600 2822 1830 2758  Q 1971 2714 2061 2714  Q 2189 2714 2253 2829  L 2342 2829  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Italic-66" d="M 262 2739  L 858 2739  Q 1107 3546 1318 3846  Q 1664 4339 2163 4339  Q 2400 4339 2557 4227  Q 2714 4115 2714 3942  Q 2714 3834 2634 3750  Q 2554 3667 2445 3667  Q 2355 3667 2281 3737  Q 2208 3808 2208 3917  Q 2208 3981 2240 4038  Q 2272 4096 2272 4115  Q 2272 4198 2131 4198  Q 1862 4198 1676 3849  Q 1491 3501 1350 2739  L 2035 2739  L 1997 2534  L 1306 2534  L 845 486  Q 435 -1325 -435 -1325  Q -653 -1325 -797 -1213  Q -941 -1101 -941 -934  Q -941 -826 -870 -746  Q -800 -666 -698 -666  Q -589 -666 -521 -733  Q -454 -800 -454 -902  Q -454 -947 -483 -1001  Q -512 -1056 -512 -1088  Q -512 -1190 -384 -1190  Q 13 -1190 237 -154  L 800 2534  L 218 2534  L 262 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXSizeTwoSym-Regular-5d" d="M 1722 -1786  L 237 -1786  L 237 -1530  L 1235 -1530  L 1235 9766  L 237 9766  L 237 10022  L 1722 10022  L 1722 -1786  z " transform="scale(0.015625)"></path>
     <path id="eq-1-STIXGeneral-Italic-43" d="M 4410 4250  L 4173 2970  L 4058 2989  Q 3942 4032 3104 4032  Q 2406 4032 1830 3411  Q 1491 3053 1315 2541  Q 1139 2029 1139 1485  Q 1139 173 2259 173  Q 2656 173 2985 339  Q 3315 506 3725 934  L 3840 838  Q 3411 333 2998 109  Q 2586 -115 2093 -115  Q 1344 -115 883 329  Q 422 774 422 1555  Q 422 2214 748 2812  Q 1075 3411 1619 3795  Q 2272 4262 3021 4262  Q 3462 4262 3770 4154  Q 3898 4109 4032 4109  Q 4205 4109 4275 4250  L 4410 4250  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-1-STIXGeneral-Italic-3d5" transform="translate(0 0.875)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Italic-6d" transform="translate(62.699997 -12.353125) scale(0.7)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-28" transform="translate(117.649359 0.875)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Italic-78" transform="translate(150.949347 0.875)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-3b" transform="translate(195.349341 0.875)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Italic-3b8" transform="translate(237.589325 0.875)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Italic-69" transform="translate(285.58931 -12.353125) scale(0.7)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-29" transform="translate(309.458676 0.875)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-3d" transform="translate(357.19866 0.875)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-2212" transform="translate(440.138641 0.875)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Italic-6b" transform="translate(508.638626 0.875)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-30" transform="translate(553.03862 -12.353125) scale(0.7)"></use>
    <use xlink:href="#eq-1-STIXSizeTwoSym-Regular-5b" transform="translate(592.447984 1.375) scale(0.763296)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Italic-78" transform="translate(627.504106 0.875)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-73" transform="translate(671.9041 0.875)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-69" transform="translate(710.804094 0.875)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-6e" transform="translate(738.604082 0.875)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Italic-3b8" transform="translate(800.637637 0.875)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Italic-69" transform="translate(848.637622 -12.353125) scale(0.7)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-2b" transform="translate(886.946985 0.875)"></use>
    <use xlink:href="#eq-1-STIXSizeOneSym-Regular-221a" transform="translate(969.886966 1.703125) scale(0.728432)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-28" transform="translate(1059.41582 1.159375)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Italic-78" transform="translate(1092.715808 1.159375)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-2212" transform="translate(1151.555798 1.159375)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Italic-73" transform="translate(1234.49578 1.159375)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-29" transform="translate(1273.395773 1.159375)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-32" transform="translate(1308.239042 36.434375) scale(0.7)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-2b" transform="translate(1362.088403 1.159375)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Italic-66" transform="translate(1445.028384 1.159375)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-32" transform="translate(1483.979153 36.434375) scale(0.7)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-2212" transform="translate(1550.328514 0.875)"></use>
    <use xlink:href="#eq-1-STIXSizeOneSym-Regular-221a" transform="translate(1633.268495 1.703125) scale(0.728432)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Italic-73" transform="translate(1722.797349 1.159375)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-32" transform="translate(1767.893437 36.434375) scale(0.7)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-2b" transform="translate(1821.742798 1.159375)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Italic-66" transform="translate(1904.682779 1.159375)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-32" transform="translate(1943.633548 36.434375) scale(0.7)"></use>
    <use xlink:href="#eq-1-STIXSizeTwoSym-Regular-5d" transform="translate(1995.542912 1.375) scale(0.763296)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Regular-2b" transform="translate(2045.03903 0.875)"></use>
    <use xlink:href="#eq-1-STIXGeneral-Italic-43" transform="translate(2127.979011 0.875)"></use>
    <path d="M 1046.91582 108.5  L 1046.91582 114.75  L 1535.888518 114.75  L 1535.888518 108.5  L 1046.91582 108.5  z "></path>
    <path d="M 1710.297349 108.5  L 1710.297349 114.75  L 1995.542912 114.75  L 1995.542912 108.5  L 1710.297349 108.5  z "></path>
   </g>
  </g>
 </g>
</svg></div>
  <p><strong>这里的 φₘ 是透镜本身需要提供的相位。</strong>常数 <var>C</var> 可以随入射条件选择，但不随 <var>x</var> 变化，因此不改变该入射条件下的相对波前。式中的 <var>s</var> 也不是自由忽略的参数：它规定了一个方向应该成像到哪里。<a class="cite no-styling" href="#ref-review">[综述 §2.1，式（1），p.2–3]</a></p>
  <p>当正入射且像点位于轴上时，上式退化为常见的双曲相位：</p>
  <div class="math" data-tex="\phi_m(x;0)=-k_0\left(\sqrt{x^2+f^2}-f\right)+C" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="212pt" height="25pt" viewBox="0 0 212 25" version="1.1" role="img" aria-label="φₘ(x;0)=−k₀(√(x²+f²)−f)+C" focusable="false">
 <title>φₘ(x;0)=−k₀(√(x²+f²)−f)+C</title><defs>
 </defs>
 <g id="eq-2-figure_1">
  <g id="eq-2-patch_1">
   <path d="M 0 25  L 212 25  L 212 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-2-text_1">
   <!-- $\phi_m(x;0)=-k_0\left(\sqrt{x^2+f^2}-f\right)+C$ -->
   <g style="fill: #17313d" transform="translate(0 21) scale(0.16 -0.16)">
    <defs>
     <path id="eq-2-STIXGeneral-Italic-3d5" d="M 3078 4371  L 2650 2822  Q 3098 2822 3296 2746  Q 3808 2547 3808 1939  Q 3808 1709 3728 1446  Q 3648 1184 3481 915  Q 3315 646 3088 425  Q 2861 205 2537 67  Q 2214 -70 1850 -70  L 1504 -1312  L 1005 -1312  L 1350 -70  Q 883 -70 666 0  Q 173 160 173 819  Q 173 1018 256 1274  Q 339 1530 502 1802  Q 666 2074 886 2301  Q 1107 2528 1417 2675  Q 1728 2822 2061 2822  L 2157 2822  L 2586 4371  L 3078 4371  z M 2611 2688  L 1888 64  Q 2125 64 2330 166  Q 2694 352 2982 998  Q 3270 1645 3270 2093  Q 3270 2464 2982 2643  Q 2906 2688 2611 2688  z M 1389 64  L 2118 2688  Q 1760 2688 1427 2365  Q 1094 2042 902 1568  Q 710 1094 710 646  Q 710 237 1018 115  Q 1152 64 1389 64  z " transform="scale(0.015625)"></path>
     <path id="eq-2-STIXGeneral-Italic-6d" d="M 4506 672  L 4474 627  Q 3981 -58 3552 -58  Q 3296 -58 3296 237  Q 3296 333 3379 659  L 3750 2112  Q 3795 2291 3795 2355  Q 3795 2413 3756 2451  Q 3718 2490 3667 2490  Q 3366 2490 2829 1741  Q 2592 1408 2457 1072  Q 2323 736 2138 0  L 1658 0  L 1830 595  Q 2266 2099 2266 2330  Q 2266 2490 2125 2490  Q 1965 2490 1702 2237  Q 1440 1984 1171 1574  Q 1011 1325 899 1043  Q 787 762 557 0  L 77 0  L 352 922  Q 704 2093 704 2381  Q 704 2522 442 2522  L 282 2522  L 282 2624  L 1318 2822  L 1338 2810  L 966 1472  Q 1798 2822 2374 2822  Q 2560 2822 2659 2720  Q 2758 2618 2758 2438  Q 2758 2195 2502 1466  Q 2842 2003 3069 2275  Q 3296 2547 3526 2694  Q 3731 2822 3930 2822  Q 4102 2822 4201 2710  Q 4301 2598 4301 2419  Q 4301 2336 4282 2240  L 3846 634  Q 3782 390 3782 346  Q 3782 243 3859 243  Q 4000 243 4275 582  L 4410 749  L 4506 672  z " transform="scale(0.015625)"></path>
     <path id="eq-2-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-2-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-2-STIXGeneral-Regular-3b" d="M 1116 2832  Q 1222 2726 1222 2579  Q 1222 2432 1116 2329  Q 1011 2227 870 2227  Q 723 2227 617 2332  Q 512 2438 512 2579  Q 512 2733 614 2835  Q 717 2938 870 2938  Q 1011 2938 1116 2832  z M 685 -902  L 621 -781  Q 1152 -435 1152 -102  Q 1152 -70 1126 -41  Q 1101 -13 1062 -13  Q 1043 -13 979 -25  Q 915 -38 883 -38  Q 512 -38 512 294  Q 512 448 621 550  Q 730 653 890 653  Q 1107 653 1254 496  Q 1402 339 1402 83  Q 1402 -218 1210 -480  Q 1018 -742 685 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-2-STIXGeneral-Regular-30" d="M 3046 2112  Q 3046 1683 2963 1302  Q 2880 922 2717 602  Q 2554 282 2266 96  Q 1978 -90 1600 -90  Q 1210 -90 915 108  Q 621 307 461 640  Q 301 973 227 1350  Q 154 1728 154 2150  Q 154 2746 301 3222  Q 448 3699 790 4012  Q 1133 4326 1626 4326  Q 2253 4326 2649 3712  Q 3046 3098 3046 2112  z M 2432 2080  Q 2432 3091 2217 3625  Q 2003 4160 1587 4160  Q 1190 4160 979 3622  Q 768 3085 768 2106  Q 768 1120 979 598  Q 1190 77 1600 77  Q 2003 77 2217 598  Q 2432 1120 2432 2080  z " transform="scale(0.015625)"></path>
     <path id="eq-2-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-2-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-2-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-2-STIXGeneral-Italic-6b" d="M 2950 2739  L 2950 2637  Q 2720 2624 2464 2448  Q 2208 2272 1510 1651  L 1747 1088  Q 2099 262 2266 262  Q 2400 262 2554 531  Q 2586 582 2650 698  L 2746 627  Q 2522 224 2374 77  Q 2227 -70 2035 -70  Q 1894 -70 1782 42  Q 1670 154 1517 454  Q 1325 826 1133 1357  L 877 1152  L 570 0  L 90 0  L 992 3379  Q 1082 3699 1107 3942  Q 1088 4096 781 4096  L 666 4096  L 666 4198  Q 1146 4256 1670 4371  L 1709 4333  L 941 1414  L 1216 1626  Q 2131 2330 2131 2522  Q 2131 2637 1894 2637  L 1805 2637  L 1805 2739  L 2950 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-2-STIXSizeTwoSym-Regular-28" d="M 3219 -1555  L 3219 -1786  Q 2144 -774 1517 730  Q 890 2234 890 4115  Q 890 6003 1533 7593  Q 2176 9184 3219 10022  L 3219 9811  Q 2490 9062 1994 7606  Q 1498 6150 1498 4115  Q 1498 563 3219 -1555  z " transform="scale(0.015625)"></path>
     <path id="eq-2-STIXSizeOneSym-Regular-221a" d="M 6970 9933  L 3373 -1888  L 3104 -1888  L 1626 2918  Q 1555 3149 1465 3251  Q 1376 3354 1229 3354  Q 1011 3354 794 3181  L 717 3309  L 1766 4115  L 1926 4115  L 3379 -602  L 3405 -602  L 6605 9933  L 6970 9933  z " transform="scale(0.015625)"></path>
     <path id="eq-2-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-2-STIXGeneral-Regular-2b" d="M 4070 1408  L 2400 1408  L 2400 -262  L 1978 -262  L 1978 1408  L 307 1408  L 307 1830  L 1978 1830  L 1978 3501  L 2400 3501  L 2400 1830  L 4070 1830  L 4070 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-2-STIXGeneral-Italic-66" d="M 262 2739  L 858 2739  Q 1107 3546 1318 3846  Q 1664 4339 2163 4339  Q 2400 4339 2557 4227  Q 2714 4115 2714 3942  Q 2714 3834 2634 3750  Q 2554 3667 2445 3667  Q 2355 3667 2281 3737  Q 2208 3808 2208 3917  Q 2208 3981 2240 4038  Q 2272 4096 2272 4115  Q 2272 4198 2131 4198  Q 1862 4198 1676 3849  Q 1491 3501 1350 2739  L 2035 2739  L 1997 2534  L 1306 2534  L 845 486  Q 435 -1325 -435 -1325  Q -653 -1325 -797 -1213  Q -941 -1101 -941 -934  Q -941 -826 -870 -746  Q -800 -666 -698 -666  Q -589 -666 -521 -733  Q -454 -800 -454 -902  Q -454 -947 -483 -1001  Q -512 -1056 -512 -1088  Q -512 -1190 -384 -1190  Q 13 -1190 237 -154  L 800 2534  L 218 2534  L 262 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-2-STIXSizeTwoSym-Regular-29" d="M 730 9792  L 730 10022  Q 1805 9011 2432 7507  Q 3059 6003 3059 4115  Q 3059 2234 2416 643  Q 1773 -947 730 -1786  L 730 -1574  Q 1459 -826 1955 633  Q 2451 2093 2451 4115  Q 2451 7674 730 9792  z " transform="scale(0.015625)"></path>
     <path id="eq-2-STIXGeneral-Italic-43" d="M 4410 4250  L 4173 2970  L 4058 2989  Q 3942 4032 3104 4032  Q 2406 4032 1830 3411  Q 1491 3053 1315 2541  Q 1139 2029 1139 1485  Q 1139 173 2259 173  Q 2656 173 2985 339  Q 3315 506 3725 934  L 3840 838  Q 3411 333 2998 109  Q 2586 -115 2093 -115  Q 1344 -115 883 329  Q 422 774 422 1555  Q 422 2214 748 2812  Q 1075 3411 1619 3795  Q 2272 4262 3021 4262  Q 3462 4262 3770 4154  Q 3898 4109 4032 4109  Q 4205 4109 4275 4250  L 4410 4250  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-2-STIXGeneral-Italic-3d5" transform="translate(0 0.875)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Italic-6d" transform="translate(62.699997 -12.353125) scale(0.7)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Regular-28" transform="translate(117.649359 0.875)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Italic-78" transform="translate(150.949347 0.875)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Regular-3b" transform="translate(195.349341 0.875)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Regular-30" transform="translate(237.589325 0.875)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Regular-29" transform="translate(287.58931 0.875)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Regular-3d" transform="translate(335.329294 0.875)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Regular-2212" transform="translate(418.269275 0.875)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Italic-6b" transform="translate(486.76926 0.875)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Regular-30" transform="translate(531.169254 -12.353125) scale(0.7)"></use>
    <use xlink:href="#eq-2-STIXSizeTwoSym-Regular-28" transform="translate(570.578618 1.375) scale(0.763296)"></use>
    <use xlink:href="#eq-2-STIXSizeOneSym-Regular-221a" transform="translate(615.563496 1.703125) scale(0.728432)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Italic-78" transform="translate(705.092351 1.159375)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Regular-32" transform="translate(755.66547 36.434375) scale(0.7)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Regular-2b" transform="translate(809.51483 1.159375)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Italic-66" transform="translate(892.454811 1.159375)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Regular-32" transform="translate(931.40558 36.434375) scale(0.7)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Regular-2212" transform="translate(997.754941 0.875)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Italic-66" transform="translate(1080.694922 0.875)"></use>
    <use xlink:href="#eq-2-STIXSizeTwoSym-Regular-29" transform="translate(1108.49491 1.375) scale(0.763296)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Regular-2b" transform="translate(1169.370911 0.875)"></use>
    <use xlink:href="#eq-2-STIXGeneral-Italic-43" transform="translate(1252.310892 0.875)"></use>
    <path d="M 692.592351 108.5  L 692.592351 114.75  L 983.314945 114.75  L 983.314945 108.5  L 692.592351 108.5  z "></path>
   </g>
  </g>
 </g>
</svg></div>
  <p>从这一式子设计出良好的轴上焦点，只完成了多角度目标中的一个截面。宽视场问题要求检查 <strong>φₘ(x;θᵢ) 如何同时随位置和入射角变化</strong>。</p>
  <figure class="paper-figure" id="figure-1"><button type="button" class="zoom-button" data-title="图 1 · 理想相位与成像映射" aria-label="放大查看图 1 · 理想相位与成像映射"><img src="/assets/wide-angle-metalens-reading/figure-1.png" loading="lazy" width="1328" height="1068" alt="图 1 · 理想相位与成像映射" decoding="async" data-figure-key="1"><span class="zoom-hint" aria-hidden="true">点击放大 ↗</span></button><figcaption><strong>图 1 · 理想相位与成像映射。</strong>A：斜入射平面波通过透镜，在指定横向位置聚焦。B：三种像点映射对应的理想相位。横轴是入射角正弦，纵轴是透镜位置，颜色为包裹后的相对相位。<span class="figure-source">论文原图 · <a class="no-styling" href="#ref-review">[R1 p.3，图 1]</a> · 保留原图中的引文与来源标注。</span></figcaption></figure>
  <h3>图 1B 的三个面板，分别改变了成像映射</h3>
  <div class="table-wrap" tabindex="0" role="region" aria-label="对照表，可横向滚动查看"><table><thead><tr><th>目标映射</th><th>主要含义</th><th>读图时的关注点</th></tr></thead><tbody>
    <tr><td><var>s=f tanθᵢ</var></td><td>常见的透视投影关系</td><td>理想相位随角度的变化较强</td></tr>
    <tr><td><var>s=f sinθᵢ</var></td><td>与入射横向波矢成正比，适合联系傅里叶映射</td><td>部分区域中的角度变化较缓，仍不能视为全局恒定</td></tr>
    <tr><td><var>s=f θᵢ</var></td><td>与角度成正比的 f-theta 映射</td><td>规定了另一种像点分布；改变映射也会改变相位需求</td></tr>
  </tbody></table></div>
  <p>这三种映射对应的是不同的系统目标。图中的颜色经过 <strong>2π 包裹</strong>，显示的是模 <var>2π</var> 的理想相位；它并不是某个已制成单元的角度响应。论文使用 <var>f=15λ</var>、透镜范围约为 <var>−1.25f 到 1.25f</var> 展示这些分布。<a class="cite no-styling" href="#ref-review">[综述 图 1及正文]</a></p>
  <h3>沿一个固定位置横向读，才能看见“同一处结构”的压力</h3>
  <ol><li><strong>竖着读：</strong>固定入射角，观察不同位置所需的相位，这是常规相位设计熟悉的读法。</li><li><strong>横着读：</strong>固定一个非中心位置，改变入射角，观察同一物理位置所需相位如何变化。</li><li><strong>检查整段曲线：</strong>相隔很远的两个点同色，只说明它们在模 <var>2π</var> 意义下相同，不能证明中间没有变化。</li></ol>
  <p>下方交互按原文式（1）重新计算理想需求。拖动位置线后，注意该行是否经历多次颜色循环；再切换映射，比较同一物理位置的角度依赖。中心行接近零，是参考相位选取的结果，不代表中心单元在所有角度下没有电磁响应。</p>
  <section class="lab" id="lab-phase" aria-labelledby="lab-phase-heading">
  <p class="lab-kicker">互动实验 · 理想相位 <span class="lab-disclaimer">解析模型，非器件仿真</span></p>
  <h3 id="lab-phase-heading">固定同一个透镜位置，横向读入射角</h3>
  <p class="lab-intro">颜色表示实现理想聚焦所需的相对相位。选择像点映射，拖动位置与角度；白色横线始终固定在同一个透镜位置。这里计算的是目标要求，不是某个元胞已经实现的响应。</p>
  <div class="lab-controls">
    <label class="lab-field"><span class="lab-label">像点映射 s/f</span><select id="phase-mapping"><option value="sin" selected>sin θᵢ</option><option value="tan">tan θᵢ</option><option value="theta">θᵢ（弧度）</option></select></label>
    <label class="lab-field"><span class="lab-label">透镜位置 x/f <output id="phase-position-label">0.50</output></span><input id="phase-position" type="range" min="-1.2" max="1.2" step="0.01" value="0.5"></label>
    <label class="lab-field"><span class="lab-label">入射方向 sin θᵢ <output id="phase-angle-label">0.50</output></span><input id="phase-angle" type="range" min="-0.95" max="0.95" step="0.01" value="0.5"></label>
  </div>
  <div class="lab-figure"><canvas class="lab-chart" id="phase-canvas" height="350" role="img" aria-label="横轴为入射角正弦，纵轴为透镜归一化位置。热图显示理想相对相位，横线标记所选位置。">相位热图需要启用 JavaScript；中心参考位置的相位为零。</canvas></div>
  <div class="lab-color-key" aria-label="蓝色负相位，白色零相位，红色正相位"><span>−π</span><i aria-hidden="true"></i><span>+π</span></div>
  <dl class="lab-values" aria-live="polite"><div><dt>所选入射角</dt><dd id="phase-angle-value">30.0°</dd></div><div><dt>该点相位（折回后）</dt><dd id="phase-value">—</dd></div><div><dt>相位参考</dt><dd>x = 0<small>f / λ = 15</small></dd></div></dl>
  <p class="lab-note">相位按 [−π, π) 折回。红蓝交界可能只是 2π 包裹，不能当成电磁场的物理不连续。横轴仅绘制 |sin θᵢ| &lt; 0.99，以避开掠入射端点。</p>
  <noscript>启用 JavaScript 后可切换映射与位置；正文和论文原图仍可直接阅读。</noscript>
</section>
  <div class="insight"><span class="note-label">阅读分析</span><p>宽视场设计可以有两种思考入口：让器件本身具有所需的角度相关响应，或调整相位形式与系统构型，使不同角度只需使用一个适合的局部区域。后文中的多层优化、二次相位与孔径配置，可以放在这两个入口下理解。</p></div>
</section>
<section id="quadratic" class="article-section">
  <p class="section-kicker"><span class="chapter-num">03</span>系统方案</p>
  <h2>二次相位：把斜入射写成横向平移</h2>
  <h3>先分清器件相位与出射总相位</h3>
  <p>固定的二次透镜相位可以写成 <var>φq=−k₀(x²+y²)/(2f)</var>。现在采用原文式（2）的入射横向相位 <var>−k₀x sinθᵢ</var>，将两者相加得到出射总相位 <strong>Φout</strong>：</p>
  <div class="math" data-tex="\Phi_{\mathrm{out}}(x,y;\theta_i)=-\frac{k_0}{2f}(x^2+y^2)-k_0x\sin\theta_i" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="239pt" height="25pt" viewBox="0 0 239 25" version="1.1" role="img" aria-label="Φout=−k₀(x²+y²)/(2f)−k₀x sinθᵢ" focusable="false">
 <title>Φout=−k₀(x²+y²)/(2f)−k₀x sinθᵢ</title><defs>
 </defs>
 <g id="eq-3-figure_1">
  <g id="eq-3-patch_1">
   <path d="M 0 25  L 239 25  L 239 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-3-text_1">
   <!-- $\Phi_{\mathrm{out}}(x,y;\theta_i)=-\frac{k_0}{2f}(x^2+y^2)-k_0x\sin\theta_i$ -->
   <g style="fill: #17313d" transform="translate(0 16) scale(0.16 -0.16)">
    <defs>
     <path id="eq-3-STIXGeneral-Regular-3a6" d="M 2765 3712  L 2765 3584  Q 3117 3584 3440 3501  Q 3763 3418 4041 3248  Q 4320 3078 4489 2787  Q 4659 2496 4659 2112  Q 4659 1754 4489 1462  Q 4320 1171 4054 1001  Q 3789 832 3494 745  Q 3200 659 2925 659  L 2765 659  L 2765 550  Q 2765 307 2909 224  Q 3053 141 3424 122  L 3424 0  L 1466 0  L 1466 122  Q 1798 122 1955 214  Q 2112 307 2112 544  L 2112 659  L 2003 659  Q 1133 659 678 1056  Q 224 1453 224 2112  Q 224 2496 387 2787  Q 550 3078 828 3248  Q 1107 3418 1430 3501  Q 1754 3584 2112 3584  L 2112 3712  Q 2112 3942 1987 4028  Q 1862 4115 1466 4115  L 1466 4237  L 3424 4237  L 3424 4115  Q 3027 4115 2896 4019  Q 2765 3923 2765 3712  z M 2752 3347  L 2752 896  Q 3232 896 3597 1206  Q 3962 1517 3962 2035  Q 3962 2554 3645 2950  Q 3328 3347 2752 3347  z M 2125 896  L 2125 3347  Q 1613 3347 1267 2940  Q 922 2534 922 2035  Q 922 1562 1245 1229  Q 1568 896 2125 896  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Regular-6f" d="M 3008 1478  Q 3008 806 2608 371  Q 2208 -64 1568 -64  Q 979 -64 582 368  Q 186 800 186 1459  Q 186 2125 582 2534  Q 979 2944 1626 2944  Q 2221 2944 2614 2537  Q 3008 2131 3008 1478  z M 2432 1306  Q 2432 2035 2112 2445  Q 1856 2765 1504 2765  Q 1171 2765 966 2493  Q 762 2221 762 1747  Q 762 928 1101 435  Q 1318 115 1677 115  Q 2029 115 2230 432  Q 2432 749 2432 1306  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Regular-75" d="M 3072 320  L 3072 230  Q 2573 96 2195 -58  L 2163 -38  L 2163 486  L 2150 486  Q 1747 -64 1235 -64  Q 870 -64 662 160  Q 454 384 454 755  L 454 2362  Q 454 2598 371 2688  Q 288 2778 58 2790  L 58 2880  L 992 2880  L 992 813  Q 992 595 1123 451  Q 1254 307 1446 307  Q 1760 307 1984 506  Q 2067 582 2099 649  Q 2131 717 2131 877  L 2131 2355  Q 2131 2605 2041 2678  Q 1952 2752 1658 2771  L 1658 2880  L 2669 2880  L 2669 685  Q 2669 461 2742 390  Q 2816 320 3034 320  L 3072 320  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Regular-74" d="M 1702 493  L 1786 422  Q 1478 -64 1011 -64  Q 448 -64 448 749  L 448 2675  L 109 2675  Q 83 2694 83 2720  Q 83 2771 192 2842  Q 435 2982 813 3526  Q 826 3546 874 3606  Q 922 3667 941 3706  Q 986 3706 986 3622  L 986 2880  L 1632 2880  L 1632 2675  L 986 2675  L 986 845  Q 986 538 1062 403  Q 1139 269 1318 269  Q 1510 269 1702 493  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Italic-79" d="M 1555 1190  L 1690 486  Q 2118 1190 2294 1558  Q 2470 1926 2470 2131  Q 2470 2234 2304 2336  Q 2138 2445 2138 2586  Q 2138 2688 2211 2755  Q 2285 2822 2394 2822  Q 2534 2822 2630 2720  Q 2726 2618 2726 2470  Q 2726 1914 1888 518  Q 1389 -307 918 -812  Q 448 -1318 173 -1318  Q 26 -1318 -64 -1241  Q -154 -1165 -154 -1043  Q -154 -934 -80 -860  Q -6 -787 96 -787  Q 218 -787 314 -876  Q 410 -966 486 -966  Q 602 -966 794 -755  Q 877 -672 1040 -457  Q 1203 -243 1248 -173  Q 1312 -45 1312 51  Q 1312 243 1113 1046  Q 915 1850 787 2176  Q 698 2413 592 2499  Q 486 2586 294 2586  Q 192 2586 96 2560  L 96 2669  Q 237 2694 301 2707  Q 563 2758 986 2822  L 1011 2822  Q 1082 2822 1277 2227  Q 1472 1632 1555 1190  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Regular-3b" d="M 1116 2832  Q 1222 2726 1222 2579  Q 1222 2432 1116 2329  Q 1011 2227 870 2227  Q 723 2227 617 2332  Q 512 2438 512 2579  Q 512 2733 614 2835  Q 717 2938 870 2938  Q 1011 2938 1116 2832  z M 685 -902  L 621 -781  Q 1152 -435 1152 -102  Q 1152 -70 1126 -41  Q 1101 -13 1062 -13  Q 1043 -13 979 -25  Q 915 -38 883 -38  Q 512 -38 512 294  Q 512 448 621 550  Q 730 653 890 653  Q 1107 653 1254 496  Q 1402 339 1402 83  Q 1402 -218 1210 -480  Q 1018 -742 685 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Italic-3b8" d="M 3162 3270  Q 3162 2534 2925 1862  Q 2688 1190 2304 678  Q 1741 -70 992 -70  Q 608 -70 390 224  Q 173 518 173 1030  Q 173 1997 592 2813  Q 1011 3629 1594 4070  Q 1952 4339 2374 4339  Q 2733 4339 2947 4076  Q 3162 3814 3162 3270  z M 941 2221  L 2432 2221  Q 2624 2874 2624 3533  Q 2624 4205 2285 4205  Q 2029 4205 1728 3814  Q 1427 3424 1232 2992  Q 1037 2560 941 2221  z M 2387 2016  L 896 2016  Q 710 1530 710 960  Q 710 64 1069 64  Q 1286 64 1510 275  Q 1734 486 1904 806  Q 2074 1126 2198 1440  Q 2323 1754 2387 2016  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Italic-69" d="M 1690 3834  Q 1690 3699 1597 3603  Q 1504 3507 1376 3507  Q 1235 3507 1152 3600  Q 1069 3693 1069 3846  Q 1069 3994 1155 4090  Q 1242 4186 1370 4186  Q 1498 4186 1594 4080  Q 1690 3974 1690 3834  z M 1421 730  L 1504 659  Q 1235 243 1049 86  Q 864 -70 627 -70  Q 314 -70 314 282  Q 314 467 454 992  L 762 2125  Q 819 2330 819 2406  Q 819 2502 745 2528  Q 672 2554 410 2560  L 410 2662  Q 704 2688 1434 2822  L 1459 2803  L 858 608  Q 794 390 794 326  Q 794 230 883 230  Q 1043 230 1421 730  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Italic-6b" d="M 2950 2739  L 2950 2637  Q 2720 2624 2464 2448  Q 2208 2272 1510 1651  L 1747 1088  Q 2099 262 2266 262  Q 2400 262 2554 531  Q 2586 582 2650 698  L 2746 627  Q 2522 224 2374 77  Q 2227 -70 2035 -70  Q 1894 -70 1782 42  Q 1670 154 1517 454  Q 1325 826 1133 1357  L 877 1152  L 570 0  L 90 0  L 992 3379  Q 1082 3699 1107 3942  Q 1088 4096 781 4096  L 666 4096  L 666 4198  Q 1146 4256 1670 4371  L 1709 4333  L 941 1414  L 1216 1626  Q 2131 2330 2131 2522  Q 2131 2637 1894 2637  L 1805 2637  L 1805 2739  L 2950 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Regular-30" d="M 3046 2112  Q 3046 1683 2963 1302  Q 2880 922 2717 602  Q 2554 282 2266 96  Q 1978 -90 1600 -90  Q 1210 -90 915 108  Q 621 307 461 640  Q 301 973 227 1350  Q 154 1728 154 2150  Q 154 2746 301 3222  Q 448 3699 790 4012  Q 1133 4326 1626 4326  Q 2253 4326 2649 3712  Q 3046 3098 3046 2112  z M 2432 2080  Q 2432 3091 2217 3625  Q 2003 4160 1587 4160  Q 1190 4160 979 3622  Q 768 3085 768 2106  Q 768 1120 979 598  Q 1190 77 1600 77  Q 2003 77 2217 598  Q 2432 1120 2432 2080  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Italic-66" d="M 262 2739  L 858 2739  Q 1107 3546 1318 3846  Q 1664 4339 2163 4339  Q 2400 4339 2557 4227  Q 2714 4115 2714 3942  Q 2714 3834 2634 3750  Q 2554 3667 2445 3667  Q 2355 3667 2281 3737  Q 2208 3808 2208 3917  Q 2208 3981 2240 4038  Q 2272 4096 2272 4115  Q 2272 4198 2131 4198  Q 1862 4198 1676 3849  Q 1491 3501 1350 2739  L 2035 2739  L 1997 2534  L 1306 2534  L 845 486  Q 435 -1325 -435 -1325  Q -653 -1325 -797 -1213  Q -941 -1101 -941 -934  Q -941 -826 -870 -746  Q -800 -666 -698 -666  Q -589 -666 -521 -733  Q -454 -800 -454 -902  Q -454 -947 -483 -1001  Q -512 -1056 -512 -1088  Q -512 -1190 -384 -1190  Q 13 -1190 237 -154  L 800 2534  L 218 2534  L 262 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Regular-2b" d="M 4070 1408  L 2400 1408  L 2400 -262  L 1978 -262  L 1978 1408  L 307 1408  L 307 1830  L 1978 1830  L 1978 3501  L 2400 3501  L 2400 1830  L 4070 1830  L 4070 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Regular-73" d="M 998 1926  L 1664 1523  Q 1984 1331 2105 1164  Q 2227 998 2227 736  Q 2227 416 1961 176  Q 1696 -64 1331 -64  Q 1030 -64 864 -6  Q 691 51 570 51  Q 461 51 416 -26  L 333 -26  L 333 979  L 435 979  Q 538 512 730 294  Q 922 77 1248 77  Q 1485 77 1632 211  Q 1779 346 1779 550  Q 1779 845 1440 1030  L 1094 1222  Q 326 1651 326 2150  Q 326 2522 566 2730  Q 806 2938 1210 2938  Q 1491 2938 1638 2867  Q 1754 2816 1818 2816  Q 1862 2816 1920 2880  L 1990 2880  L 2022 2010  L 1926 2010  Q 1818 2445 1654 2621  Q 1491 2797 1203 2797  Q 986 2797 854 2688  Q 723 2579 723 2362  Q 723 2253 796 2128  Q 870 2003 998 1926  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Regular-69" d="M 1152 4045  Q 1152 3904 1056 3811  Q 960 3718 819 3718  Q 685 3718 592 3811  Q 499 3904 499 4045  Q 499 4179 595 4275  Q 691 4371 826 4371  Q 966 4371 1059 4275  Q 1152 4179 1152 4045  z M 1619 0  L 102 0  L 102 96  Q 435 115 521 211  Q 608 307 608 666  L 608 2118  Q 608 2342 563 2432  Q 518 2522 397 2522  Q 243 2522 128 2490  L 128 2592  L 1120 2944  L 1146 2918  L 1146 672  Q 1146 314 1226 218  Q 1306 122 1619 96  L 1619 0  z " transform="scale(0.015625)"></path>
     <path id="eq-3-STIXGeneral-Regular-6e" d="M 3104 0  L 1773 0  L 1779 96  Q 2016 115 2096 233  Q 2176 352 2176 672  L 2176 1946  Q 2176 2592 1709 2592  Q 1549 2592 1408 2515  Q 1267 2438 1050 2227  L 1050 461  Q 1050 269 1136 192  Q 1222 115 1466 96  L 1466 0  L 115 0  L 115 96  Q 358 115 435 214  Q 512 314 512 602  L 512 2157  Q 512 2394 467 2483  Q 422 2573 288 2573  Q 160 2573 102 2547  L 102 2656  Q 550 2784 979 2944  L 1030 2925  L 1030 2426  L 1037 2426  Q 1491 2944 1958 2944  Q 2323 2944 2518 2688  Q 2714 2432 2714 1958  L 2714 544  Q 2714 288 2790 205  Q 2867 122 3104 96  L 3104 0  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-3-STIXGeneral-Regular-3a6" transform="translate(0 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-6f" transform="translate(77.843269 -12.781563) scale(0.7)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-75" transform="translate(112.843258 -12.781563) scale(0.7)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-74" transform="translate(147.843248 -12.781563) scale(0.7)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-28" transform="translate(171.712614 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Italic-78" transform="translate(205.012602 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-2c" transform="translate(249.412596 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Italic-79" transform="translate(288.852577 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-3b" transform="translate(333.252571 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Italic-3b8" transform="translate(375.492555 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Italic-69" transform="translate(423.49254 -12.781563) scale(0.7)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-29" transform="translate(447.361906 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-3d" transform="translate(495.10189 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-2212" transform="translate(578.041871 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Italic-6b" transform="translate(646.541856 48.192188) scale(0.7)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-30" transform="translate(677.621852 38.9325) scale(0.49)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-32" transform="translate(648.541856 -40.464375) scale(0.7)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Italic-66" transform="translate(683.541845 -40.464375) scale(0.7)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-28" transform="translate(717.708407 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Italic-78" transform="translate(751.008395 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-32" transform="translate(801.581514 35.721562) scale(0.7)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-2b" transform="translate(855.430874 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Italic-79" transform="translate(938.370855 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-32" transform="translate(988.943974 35.721562) scale(0.7)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-29" transform="translate(1028.353338 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-2212" transform="translate(1076.093323 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Italic-6b" transform="translate(1159.033304 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-30" transform="translate(1203.433298 -12.781563) scale(0.7)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Italic-78" transform="translate(1242.842662 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-73" transform="translate(1287.242656 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-69" transform="translate(1326.14265 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Regular-6e" transform="translate(1353.942637 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Italic-3b8" transform="translate(1415.976193 0.446562)"></use>
    <use xlink:href="#eq-3-STIXGeneral-Italic-69" transform="translate(1463.976178 -12.781563) scale(0.7)"></use>
    <path d="M 646.541856 13.243437  L 646.541856 19.493437  L 705.208407 19.493437  L 705.208407 13.243437  L 646.541856 13.243437  z "></path>
   </g>
  </g>
 </g>
</svg></div>
  <div class="math" data-tex="\Phi_{\mathrm{out}}=-\frac{k_0}{2f}\left[(x+f\sin\theta_i)^2+y^2\right]+\frac{k_0f}{2}\sin^2\theta_i" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="251pt" height="26pt" viewBox="0 0 251 26" version="1.1" role="img" aria-label="Φout=−k₀[(x+f sinθᵢ)²+y²]/(2f)+(k₀f/2)sin²θᵢ" focusable="false">
 <title>Φout=−k₀[(x+f sinθᵢ)²+y²]/(2f)+(k₀f/2)sin²θᵢ</title><defs>
 </defs>
 <g id="eq-4-figure_1">
  <g id="eq-4-patch_1">
   <path d="M 0 26  L 251 26  L 251 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-4-text_1">
   <!-- $\Phi_{\mathrm{out}}=-\frac{k_0}{2f}\left[(x+f\sin\theta_i)^2+y^2\right]+\frac{k_0f}{2}\sin^2\theta_i$ -->
   <g style="fill: #17313d" transform="translate(0 17) scale(0.16 -0.16)">
    <defs>
     <path id="eq-4-STIXGeneral-Regular-3a6" d="M 2765 3712  L 2765 3584  Q 3117 3584 3440 3501  Q 3763 3418 4041 3248  Q 4320 3078 4489 2787  Q 4659 2496 4659 2112  Q 4659 1754 4489 1462  Q 4320 1171 4054 1001  Q 3789 832 3494 745  Q 3200 659 2925 659  L 2765 659  L 2765 550  Q 2765 307 2909 224  Q 3053 141 3424 122  L 3424 0  L 1466 0  L 1466 122  Q 1798 122 1955 214  Q 2112 307 2112 544  L 2112 659  L 2003 659  Q 1133 659 678 1056  Q 224 1453 224 2112  Q 224 2496 387 2787  Q 550 3078 828 3248  Q 1107 3418 1430 3501  Q 1754 3584 2112 3584  L 2112 3712  Q 2112 3942 1987 4028  Q 1862 4115 1466 4115  L 1466 4237  L 3424 4237  L 3424 4115  Q 3027 4115 2896 4019  Q 2765 3923 2765 3712  z M 2752 3347  L 2752 896  Q 3232 896 3597 1206  Q 3962 1517 3962 2035  Q 3962 2554 3645 2950  Q 3328 3347 2752 3347  z M 2125 896  L 2125 3347  Q 1613 3347 1267 2940  Q 922 2534 922 2035  Q 922 1562 1245 1229  Q 1568 896 2125 896  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Regular-6f" d="M 3008 1478  Q 3008 806 2608 371  Q 2208 -64 1568 -64  Q 979 -64 582 368  Q 186 800 186 1459  Q 186 2125 582 2534  Q 979 2944 1626 2944  Q 2221 2944 2614 2537  Q 3008 2131 3008 1478  z M 2432 1306  Q 2432 2035 2112 2445  Q 1856 2765 1504 2765  Q 1171 2765 966 2493  Q 762 2221 762 1747  Q 762 928 1101 435  Q 1318 115 1677 115  Q 2029 115 2230 432  Q 2432 749 2432 1306  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Regular-75" d="M 3072 320  L 3072 230  Q 2573 96 2195 -58  L 2163 -38  L 2163 486  L 2150 486  Q 1747 -64 1235 -64  Q 870 -64 662 160  Q 454 384 454 755  L 454 2362  Q 454 2598 371 2688  Q 288 2778 58 2790  L 58 2880  L 992 2880  L 992 813  Q 992 595 1123 451  Q 1254 307 1446 307  Q 1760 307 1984 506  Q 2067 582 2099 649  Q 2131 717 2131 877  L 2131 2355  Q 2131 2605 2041 2678  Q 1952 2752 1658 2771  L 1658 2880  L 2669 2880  L 2669 685  Q 2669 461 2742 390  Q 2816 320 3034 320  L 3072 320  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Regular-74" d="M 1702 493  L 1786 422  Q 1478 -64 1011 -64  Q 448 -64 448 749  L 448 2675  L 109 2675  Q 83 2694 83 2720  Q 83 2771 192 2842  Q 435 2982 813 3526  Q 826 3546 874 3606  Q 922 3667 941 3706  Q 986 3706 986 3622  L 986 2880  L 1632 2880  L 1632 2675  L 986 2675  L 986 845  Q 986 538 1062 403  Q 1139 269 1318 269  Q 1510 269 1702 493  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Italic-6b" d="M 2950 2739  L 2950 2637  Q 2720 2624 2464 2448  Q 2208 2272 1510 1651  L 1747 1088  Q 2099 262 2266 262  Q 2400 262 2554 531  Q 2586 582 2650 698  L 2746 627  Q 2522 224 2374 77  Q 2227 -70 2035 -70  Q 1894 -70 1782 42  Q 1670 154 1517 454  Q 1325 826 1133 1357  L 877 1152  L 570 0  L 90 0  L 992 3379  Q 1082 3699 1107 3942  Q 1088 4096 781 4096  L 666 4096  L 666 4198  Q 1146 4256 1670 4371  L 1709 4333  L 941 1414  L 1216 1626  Q 2131 2330 2131 2522  Q 2131 2637 1894 2637  L 1805 2637  L 1805 2739  L 2950 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Regular-30" d="M 3046 2112  Q 3046 1683 2963 1302  Q 2880 922 2717 602  Q 2554 282 2266 96  Q 1978 -90 1600 -90  Q 1210 -90 915 108  Q 621 307 461 640  Q 301 973 227 1350  Q 154 1728 154 2150  Q 154 2746 301 3222  Q 448 3699 790 4012  Q 1133 4326 1626 4326  Q 2253 4326 2649 3712  Q 3046 3098 3046 2112  z M 2432 2080  Q 2432 3091 2217 3625  Q 2003 4160 1587 4160  Q 1190 4160 979 3622  Q 768 3085 768 2106  Q 768 1120 979 598  Q 1190 77 1600 77  Q 2003 77 2217 598  Q 2432 1120 2432 2080  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Italic-66" d="M 262 2739  L 858 2739  Q 1107 3546 1318 3846  Q 1664 4339 2163 4339  Q 2400 4339 2557 4227  Q 2714 4115 2714 3942  Q 2714 3834 2634 3750  Q 2554 3667 2445 3667  Q 2355 3667 2281 3737  Q 2208 3808 2208 3917  Q 2208 3981 2240 4038  Q 2272 4096 2272 4115  Q 2272 4198 2131 4198  Q 1862 4198 1676 3849  Q 1491 3501 1350 2739  L 2035 2739  L 1997 2534  L 1306 2534  L 845 486  Q 435 -1325 -435 -1325  Q -653 -1325 -797 -1213  Q -941 -1101 -941 -934  Q -941 -826 -870 -746  Q -800 -666 -698 -666  Q -589 -666 -521 -733  Q -454 -800 -454 -902  Q -454 -947 -483 -1001  Q -512 -1056 -512 -1088  Q -512 -1190 -384 -1190  Q 13 -1190 237 -154  L 800 2534  L 218 2534  L 262 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXSizeOneSym-Regular-5b" d="M 2323 -1050  L 1152 -1050  L 1152 6822  L 2323 6822  L 2323 6611  L 1600 6611  L 1600 -838  L 2323 -838  L 2323 -1050  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Regular-2b" d="M 4070 1408  L 2400 1408  L 2400 -262  L 1978 -262  L 1978 1408  L 307 1408  L 307 1830  L 1978 1830  L 1978 3501  L 2400 3501  L 2400 1830  L 4070 1830  L 4070 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Regular-73" d="M 998 1926  L 1664 1523  Q 1984 1331 2105 1164  Q 2227 998 2227 736  Q 2227 416 1961 176  Q 1696 -64 1331 -64  Q 1030 -64 864 -6  Q 691 51 570 51  Q 461 51 416 -26  L 333 -26  L 333 979  L 435 979  Q 538 512 730 294  Q 922 77 1248 77  Q 1485 77 1632 211  Q 1779 346 1779 550  Q 1779 845 1440 1030  L 1094 1222  Q 326 1651 326 2150  Q 326 2522 566 2730  Q 806 2938 1210 2938  Q 1491 2938 1638 2867  Q 1754 2816 1818 2816  Q 1862 2816 1920 2880  L 1990 2880  L 2022 2010  L 1926 2010  Q 1818 2445 1654 2621  Q 1491 2797 1203 2797  Q 986 2797 854 2688  Q 723 2579 723 2362  Q 723 2253 796 2128  Q 870 2003 998 1926  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Regular-69" d="M 1152 4045  Q 1152 3904 1056 3811  Q 960 3718 819 3718  Q 685 3718 592 3811  Q 499 3904 499 4045  Q 499 4179 595 4275  Q 691 4371 826 4371  Q 966 4371 1059 4275  Q 1152 4179 1152 4045  z M 1619 0  L 102 0  L 102 96  Q 435 115 521 211  Q 608 307 608 666  L 608 2118  Q 608 2342 563 2432  Q 518 2522 397 2522  Q 243 2522 128 2490  L 128 2592  L 1120 2944  L 1146 2918  L 1146 672  Q 1146 314 1226 218  Q 1306 122 1619 96  L 1619 0  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Regular-6e" d="M 3104 0  L 1773 0  L 1779 96  Q 2016 115 2096 233  Q 2176 352 2176 672  L 2176 1946  Q 2176 2592 1709 2592  Q 1549 2592 1408 2515  Q 1267 2438 1050 2227  L 1050 461  Q 1050 269 1136 192  Q 1222 115 1466 96  L 1466 0  L 115 0  L 115 96  Q 358 115 435 214  Q 512 314 512 602  L 512 2157  Q 512 2394 467 2483  Q 422 2573 288 2573  Q 160 2573 102 2547  L 102 2656  Q 550 2784 979 2944  L 1030 2925  L 1030 2426  L 1037 2426  Q 1491 2944 1958 2944  Q 2323 2944 2518 2688  Q 2714 2432 2714 1958  L 2714 544  Q 2714 288 2790 205  Q 2867 122 3104 96  L 3104 0  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Italic-3b8" d="M 3162 3270  Q 3162 2534 2925 1862  Q 2688 1190 2304 678  Q 1741 -70 992 -70  Q 608 -70 390 224  Q 173 518 173 1030  Q 173 1997 592 2813  Q 1011 3629 1594 4070  Q 1952 4339 2374 4339  Q 2733 4339 2947 4076  Q 3162 3814 3162 3270  z M 941 2221  L 2432 2221  Q 2624 2874 2624 3533  Q 2624 4205 2285 4205  Q 2029 4205 1728 3814  Q 1427 3424 1232 2992  Q 1037 2560 941 2221  z M 2387 2016  L 896 2016  Q 710 1530 710 960  Q 710 64 1069 64  Q 1286 64 1510 275  Q 1734 486 1904 806  Q 2074 1126 2198 1440  Q 2323 1754 2387 2016  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Italic-69" d="M 1690 3834  Q 1690 3699 1597 3603  Q 1504 3507 1376 3507  Q 1235 3507 1152 3600  Q 1069 3693 1069 3846  Q 1069 3994 1155 4090  Q 1242 4186 1370 4186  Q 1498 4186 1594 4080  Q 1690 3974 1690 3834  z M 1421 730  L 1504 659  Q 1235 243 1049 86  Q 864 -70 627 -70  Q 314 -70 314 282  Q 314 467 454 992  L 762 2125  Q 819 2330 819 2406  Q 819 2502 745 2528  Q 672 2554 410 2560  L 410 2662  Q 704 2688 1434 2822  L 1459 2803  L 858 608  Q 794 390 794 326  Q 794 230 883 230  Q 1043 230 1421 730  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXGeneral-Italic-79" d="M 1555 1190  L 1690 486  Q 2118 1190 2294 1558  Q 2470 1926 2470 2131  Q 2470 2234 2304 2336  Q 2138 2445 2138 2586  Q 2138 2688 2211 2755  Q 2285 2822 2394 2822  Q 2534 2822 2630 2720  Q 2726 2618 2726 2470  Q 2726 1914 1888 518  Q 1389 -307 918 -812  Q 448 -1318 173 -1318  Q 26 -1318 -64 -1241  Q -154 -1165 -154 -1043  Q -154 -934 -80 -860  Q -6 -787 96 -787  Q 218 -787 314 -876  Q 410 -966 486 -966  Q 602 -966 794 -755  Q 877 -672 1040 -457  Q 1203 -243 1248 -173  Q 1312 -45 1312 51  Q 1312 243 1113 1046  Q 915 1850 787 2176  Q 698 2413 592 2499  Q 486 2586 294 2586  Q 192 2586 96 2560  L 96 2669  Q 237 2694 301 2707  Q 563 2758 986 2822  L 1011 2822  Q 1082 2822 1277 2227  Q 1472 1632 1555 1190  z " transform="scale(0.015625)"></path>
     <path id="eq-4-STIXSizeOneSym-Regular-5d" d="M 1299 -1050  L 128 -1050  L 128 -838  L 851 -838  L 851 6611  L 128 6611  L 128 6822  L 1299 6822  L 1299 -1050  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-4-STIXGeneral-Regular-3a6" transform="translate(0 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-6f" transform="translate(77.843269 -12.325) scale(0.7)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-75" transform="translate(112.843258 -12.325) scale(0.7)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-74" transform="translate(147.843248 -12.325) scale(0.7)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-3d" transform="translate(186.15261 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-2212" transform="translate(269.092592 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Italic-6b" transform="translate(337.592576 48.64875) scale(0.7)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-30" transform="translate(368.672572 39.389063) scale(0.49)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-32" transform="translate(339.592576 -40.007812) scale(0.7)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Italic-66" transform="translate(374.592566 -40.007812) scale(0.7)"></use>
    <use xlink:href="#eq-4-STIXSizeOneSym-Regular-5b" transform="translate(408.759127 -6.01875) scale(0.839787)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-28" transform="translate(440.931124 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Italic-78" transform="translate(474.231112 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-2b" transform="translate(533.071102 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Italic-66" transform="translate(616.011083 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-73" transform="translate(643.811071 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-69" transform="translate(682.711065 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-6e" transform="translate(710.511053 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Italic-3b8" transform="translate(772.544608 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Italic-69" transform="translate(820.544593 -12.325) scale(0.7)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-29" transform="translate(844.41396 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-32" transform="translate(879.257229 36.178125) scale(0.7)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-2b" transform="translate(933.106589 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Italic-79" transform="translate(1016.04657 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-32" transform="translate(1066.619689 36.178125) scale(0.7)"></use>
    <use xlink:href="#eq-4-STIXSizeOneSym-Regular-5d" transform="translate(1106.029054 -6.01875) scale(0.839787)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-2b" transform="translate(1152.641047 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Italic-6b" transform="translate(1235.581028 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-30" transform="translate(1266.661024 43.9325) scale(0.49)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Italic-66" transform="translate(1294.247579 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-32" transform="translate(1257.581028 -39.865625) scale(0.7)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-73" transform="translate(1326.20757 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-69" transform="translate(1365.107564 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-6e" transform="translate(1392.907552 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Regular-32" transform="translate(1444.450818 36.178125) scale(0.7)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Italic-3b8" transform="translate(1495.893753 0.903125)"></use>
    <use xlink:href="#eq-4-STIXGeneral-Italic-69" transform="translate(1543.893738 -12.325) scale(0.7)"></use>
    <path d="M 337.592576 13.7  L 337.592576 19.95  L 396.259127 19.95  L 396.259127 13.7  L 337.592576 13.7  z "></path>
    <path d="M 1235.581028 13.7  L 1235.581028 19.95  L 1313.70757 19.95  L 1313.70757 13.7  L 1235.581028 13.7  z "></path>
   </g>
  </g>
 </g>
</svg></div>
  <p>最后一项只依赖入射角，在同一次照明中是空间常数。完成平方后，二次形式保留下来，其中心平移到 <strong>x=−f sinθᵢ</strong>。这就是本文反复使用的“角度变化转化为横向平移”的数学性质。<a class="cite no-styling" href="#ref-review">[综述 §2.2，式（2），p.4]</a></p>
  <div class="note"><span class="note-label">符号说明</span><p>上一节按式（1）复现理想相位热图，这一节按式（2）复现二次相位。原文两处入射线性相位写法的符号不同，因此本文明确保留各自约定，不将两个模块的正角方向直接混用。尤其要区分 <strong>φₘ：理想器件相位</strong>和<strong>Φout：器件与入射波叠加后的总相位</strong>；Φout 随角度变化，不意味着固定二次透镜自动具备所需的角度色散。</p></div>
  <h3>完成平方揭示了结构性质，还没有完成像差验证</h3>
  <p>二次形式与严格球面聚焦波前之间仍有差异。直接让大口径二次透镜面对物体，会出现明显球差及背景噪声；缩小实际参与聚焦的区域，可以让局部近似更好，但会改变有效数值孔径、通光量和分辨率。<a class="cite no-styling" href="#ref-review">[综述 §2.2，p.5–6]</a></p>
  <details class="derivation"><summary>补充推导：二次相位为什么是双曲相位的近轴项</summary>
    <p>把双曲相位中的路程展开，得到：</p>
    <div class="math" data-tex="\sqrt{f^2+r^2}-f=\frac{r^2}{2f}-\frac{r^4}{8f^3}+\cdots" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="168pt" height="31pt" viewBox="0 0 168 31" version="1.1" role="img" aria-label="√(f²+r²)−f=r²/(2f)−r⁴/(8f³)+…" focusable="false">
 <title>√(f²+r²)−f=r²/(2f)−r⁴/(8f³)+…</title><defs>
 </defs>
 <g id="eq-5-figure_1">
  <g id="eq-5-patch_1">
   <path d="M 0 31  L 168 31  L 168 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-5-text_1">
   <!-- $\sqrt{f^2+r^2}-f=\frac{r^2}{2f}-\frac{r^4}{8f^3}+\cdots$ -->
   <g style="fill: #17313d" transform="translate(0 20) scale(0.16 -0.16)">
    <defs>
     <path id="eq-5-STIXSizeOneSym-Regular-221a" d="M 6970 9933  L 3373 -1888  L 3104 -1888  L 1626 2918  Q 1555 3149 1465 3251  Q 1376 3354 1229 3354  Q 1011 3354 794 3181  L 717 3309  L 1766 4115  L 1926 4115  L 3379 -602  L 3405 -602  L 6605 9933  L 6970 9933  z " transform="scale(0.015625)"></path>
     <path id="eq-5-STIXGeneral-Italic-66" d="M 262 2739  L 858 2739  Q 1107 3546 1318 3846  Q 1664 4339 2163 4339  Q 2400 4339 2557 4227  Q 2714 4115 2714 3942  Q 2714 3834 2634 3750  Q 2554 3667 2445 3667  Q 2355 3667 2281 3737  Q 2208 3808 2208 3917  Q 2208 3981 2240 4038  Q 2272 4096 2272 4115  Q 2272 4198 2131 4198  Q 1862 4198 1676 3849  Q 1491 3501 1350 2739  L 2035 2739  L 1997 2534  L 1306 2534  L 845 486  Q 435 -1325 -435 -1325  Q -653 -1325 -797 -1213  Q -941 -1101 -941 -934  Q -941 -826 -870 -746  Q -800 -666 -698 -666  Q -589 -666 -521 -733  Q -454 -800 -454 -902  Q -454 -947 -483 -1001  Q -512 -1056 -512 -1088  Q -512 -1190 -384 -1190  Q 13 -1190 237 -154  L 800 2534  L 218 2534  L 262 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-5-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-5-STIXGeneral-Regular-2b" d="M 4070 1408  L 2400 1408  L 2400 -262  L 1978 -262  L 1978 1408  L 307 1408  L 307 1830  L 1978 1830  L 1978 3501  L 2400 3501  L 2400 1830  L 4070 1830  L 4070 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-5-STIXGeneral-Italic-72" d="M 1126 1427  L 1229 1651  Q 1446 2131 1830 2534  Q 2106 2822 2336 2822  Q 2470 2822 2553 2732  Q 2637 2643 2637 2496  Q 2637 2349 2557 2249  Q 2477 2150 2336 2150  Q 2214 2150 2112 2317  Q 2061 2406 2010 2406  Q 1837 2406 1485 1805  Q 1267 1434 1136 1104  Q 1005 774 774 0  L 288 0  L 806 1869  Q 909 2246 909 2394  Q 909 2560 666 2560  Q 614 2560 467 2541  L 467 2650  L 1459 2822  L 1478 2810  L 1126 1427  z " transform="scale(0.015625)"></path>
     <path id="eq-5-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-5-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-5-STIXGeneral-Regular-34" d="M 3027 1069  L 2368 1069  L 2368 0  L 1869 0  L 1869 1069  L 77 1069  L 77 1478  L 2086 4326  L 2368 4326  L 2368 1478  L 3027 1478  L 3027 1069  z M 1869 1478  L 1869 3674  L 333 1478  L 1869 1478  z " transform="scale(0.015625)"></path>
     <path id="eq-5-STIXGeneral-Regular-38" d="M 2848 992  Q 2848 499 2505 204  Q 2163 -90 1587 -90  Q 1050 -90 704 204  Q 358 499 358 954  Q 358 1293 524 1533  Q 691 1773 1190 2125  Q 710 2522 553 2765  Q 397 3008 397 3328  Q 397 3782 745 4054  Q 1094 4326 1638 4326  Q 2106 4326 2410 4060  Q 2714 3795 2714 3411  Q 2714 3059 2531 2848  Q 2349 2637 1856 2374  Q 2432 1990 2640 1689  Q 2848 1389 2848 992  z M 2272 3411  Q 2272 3744 2086 3945  Q 1901 4147 1574 4147  Q 1248 4147 1059 3977  Q 870 3808 870 3513  Q 870 3219 1059 2979  Q 1248 2739 1670 2490  Q 1997 2682 2134 2896  Q 2272 3110 2272 3411  z M 1734 1741  L 1357 1997  Q 1075 1766 960 1545  Q 845 1325 845 1011  Q 845 576 1065 333  Q 1286 90 1658 90  Q 1971 90 2166 285  Q 2362 480 2362 794  Q 2362 1082 2214 1299  Q 2067 1517 1734 1741  z " transform="scale(0.015625)"></path>
     <path id="eq-5-STIXGeneral-Regular-33" d="M 390 3264  L 288 3290  Q 435 3770 748 4048  Q 1062 4326 1542 4326  Q 1990 4326 2265 4083  Q 2541 3840 2541 3450  Q 2541 2925 1946 2566  Q 2298 2413 2477 2227  Q 2758 1914 2758 1402  Q 2758 890 2464 506  Q 2246 211 1840 60  Q 1434 -90 979 -90  Q 262 -90 262 275  Q 262 378 339 442  Q 416 506 525 506  Q 685 506 915 339  Q 1197 141 1466 141  Q 1818 141 2058 425  Q 2298 710 2298 1120  Q 2298 1856 1632 2048  Q 1434 2112 979 2112  L 979 2202  Q 1338 2323 1517 2432  Q 2035 2726 2035 3290  Q 2035 3610 1852 3776  Q 1670 3942 1344 3942  Q 768 3942 390 3264  z " transform="scale(0.015625)"></path>
     <path id="eq-5-STIXGeneral-Regular-22ef" d="M 5235 1619  Q 5235 1453 5123 1331  Q 5011 1210 4832 1210  Q 4646 1210 4534 1322  Q 4422 1434 4422 1619  Q 4422 1792 4547 1907  Q 4672 2022 4832 2022  Q 4992 2022 5113 1907  Q 5235 1792 5235 1619  z M 3366 1619  Q 3366 1453 3254 1331  Q 3142 1210 2963 1210  Q 2778 1210 2666 1322  Q 2554 1434 2554 1619  Q 2554 1792 2678 1907  Q 2803 2022 2963 2022  Q 3123 2022 3244 1907  Q 3366 1792 3366 1619  z M 1504 1619  Q 1504 1453 1392 1331  Q 1280 1210 1101 1210  Q 915 1210 803 1322  Q 691 1434 691 1619  Q 691 1792 816 1907  Q 941 2022 1101 2022  Q 1261 2022 1382 1907  Q 1504 1792 1504 1619  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-5-STIXSizeOneSym-Regular-221a" transform="translate(0 1.703125) scale(0.728432)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Italic-66" transform="translate(89.528854 1.159375)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Regular-32" transform="translate(128.479623 36.434375) scale(0.7)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Regular-2b" transform="translate(182.328984 1.159375)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Italic-72" transform="translate(265.268965 1.159375)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Regular-32" transform="translate(310.342084 36.434375) scale(0.7)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Regular-2212" transform="translate(376.691445 0.875)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Italic-66" transform="translate(459.631426 0.875)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Regular-3d" transform="translate(501.87141 0.875)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Italic-72" transform="translate(584.811391 38.671875) scale(0.7)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Regular-32" transform="translate(616.362574 63.364375) scale(0.49)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Regular-32" transform="translate(586.811391 -40.035937) scale(0.7)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Italic-66" transform="translate(621.81138 -40.035937) scale(0.7)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Regular-2212" transform="translate(670.889126 0.875)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Italic-72" transform="translate(768.829107 38.671875) scale(0.7)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Regular-34" transform="translate(800.38029 63.364375) scale(0.49)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Regular-38" transform="translate(753.829107 -50.391562) scale(0.7)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Italic-66" transform="translate(788.829096 -50.391562) scale(0.7)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Regular-33" transform="translate(816.094634 -25.699062) scale(0.49)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Regular-2b" transform="translate(870.621186 0.875)"></use>
    <use xlink:href="#eq-5-STIXGeneral-Regular-22ef" transform="translate(953.561167 0.875)"></use>
    <path d="M 77.028854 108.5  L 77.028854 114.75  L 362.251448 114.75  L 362.251448 108.5  L 77.028854 108.5  z "></path>
    <path d="M 584.811391 13.671875  L 584.811391 19.921875  L 643.949129 19.921875  L 643.949129 13.671875  L 584.811391 13.671875  z "></path>
    <path d="M 753.829107 13.671875  L 753.829107 19.921875  L 843.681189 19.921875  L 843.681189 13.671875  L 753.829107 13.671875  z "></path>
   </g>
  </g>
 </g>
</svg></div>
    <p>二次相位保留了最前面的二次项，忽略了更高阶项。对于有限波长，是否可以忽略，最终应按波前误差或点扩散函数等指标判断。这个展开解释了局部区域缩小时近似改善的原因，并不把宽角度的全部行为简化为近轴模型。</p>
  </details>
  <figure class="paper-figure" id="figure-2"><button type="button" class="zoom-button" data-title="图 2 · 宽视场透镜的五类系统构型" aria-label="放大查看图 2 · 宽视场透镜的五类系统构型"><img src="/assets/wide-angle-metalens-reading/figure-2.jpg" loading="lazy" width="1328" height="796" alt="图 2 · 宽视场透镜的五类系统构型" decoding="async" data-figure-key="2"><span class="zoom-hint" aria-hidden="true">点击放大 ↗</span></button><figcaption><strong>图 2 · 宽视场透镜的五类系统构型。</strong>A：角度色散设计；B：二次相位；C：光阑与空气间隔；D：光阑与介质间隔；E：超透镜双片。构型的区别在于增加了哪些可用的设计自由度。<span class="figure-source">论文原图 · <a class="no-styling" href="#ref-review">[R1 p.4，图 2]</a> · 保留原图中的引文与来源标注。</span></figcaption></figure>
  <div class="table-wrap" tabindex="0" role="region" aria-label="对照表，可横向滚动查看"><table><caption>图 2 的五类构型，应按它们增加了什么设计自由度来读</caption><thead><tr><th>构型</th><th>主要作用</th><th>需要同时考虑的条件</th></tr></thead><tbody>
    <tr><td><strong>A：角度响应优化</strong></td><td>通过复杂、多层或多参数结构调整角度相关响应</td><td>优化角度采样、计算规模与制造复杂度；图示案例并非仅一层结构</td></tr>
    <tr><td><strong>B：二次相位</strong></td><td>利用斜入射与横向平移之间的关系</td><td>大口径直接工作时的球差和背景</td></tr>
    <tr><td><strong>C：光阑与空气间隔</strong></td><td>各入射角选择透镜上的局部区域</td><td>实际照明中心与理想中心的角度依赖不完全匹配</td></tr>
    <tr><td><strong>D：光阑与介质间隔</strong></td><td>通过折射改善照明中心随角度的移动关系</td><td>厚度、折射率、有效孔径与像差需要联合设计</td></tr>
    <tr><td><strong>E：超透镜双片</strong></td><td>增加像差校正自由度</td><td>层间作用、加工和对准；更复杂结构的实现成本</td></tr>
  </tbody></table></div>
  <p class="source-note">依据综述 §2.2、图 2；“单结构侧/双结构侧”是综述的系统分类，不宜直接等同于单层/双层微结构。</p>
</section>
<section id="aperture" class="article-section">
  <p class="section-kicker"><span class="chapter-num">04</span>从相位走到光路</p>
  <h2>孔径与介质：让实际照明区域跟上理想关系</h2>
  <h3>先给两个位置不同的名字</h3>
  <p>本节用 <strong>xc</strong> 表示<strong>透镜平面上的受照区域中心</strong>，用 <strong>s</strong> 表示<strong>焦平面上的像点位置</strong>。在本节约定中，两者的理想横坐标可能具有相同的函数形式，但它们处在不同平面，物理意义也不同。</p>
  <p>光阑限制某个入射方向能照亮透镜上的哪一块区域。对于二次透镜，作者希望受照中心接近完成平方所指示的局部中心：</p>
  <div class="math" data-tex="x_c^\ast=-f\sin\theta_i" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="81pt" height="16pt" viewBox="0 0 81 16" version="1.1" role="img" aria-label="x*c=−f sinθᵢ" focusable="false">
 <title>x*c=−f sinθᵢ</title><defs>
 </defs>
 <g id="eq-6-figure_1">
  <g id="eq-6-patch_1">
   <path d="M 0 16  L 81 16  L 81 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-6-text_1">
   <!-- $x_c^\ast=-f\sin\theta_i$ -->
   <g style="fill: #17313d" transform="translate(0 11) scale(0.16 -0.16)">
    <defs>
     <path id="eq-6-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-6-STIXGeneral-Regular-2217" d="M 2925 2157  Q 2925 2042 2784 1958  Q 2739 1933 2400 1843  Q 2061 1754 1792 1600  Q 2022 1466 2371 1370  Q 2720 1274 2778 1242  Q 2912 1165 2912 1037  Q 2912 934 2845 860  Q 2778 787 2662 787  Q 2554 787 2432 905  Q 2310 1024 2131 1213  Q 1952 1402 1747 1517  Q 1747 1267 1840 908  Q 1933 550 1933 480  Q 1933 378 1856 294  Q 1779 211 1689 211  Q 1600 211 1523 294  Q 1446 378 1446 480  Q 1446 550 1539 908  Q 1632 1267 1632 1517  Q 1440 1408 1174 1139  Q 909 870 858 845  Q 768 794 685 794  Q 576 794 512 854  Q 448 915 448 998  Q 448 1165 582 1248  Q 646 1280 1011 1385  Q 1376 1491 1562 1600  Q 1376 1709 1005 1814  Q 634 1920 557 1965  Q 429 2042 429 2157  Q 429 2259 496 2342  Q 563 2426 659 2426  Q 723 2426 800 2387  Q 864 2349 1145 2077  Q 1427 1805 1632 1696  Q 1632 1946 1539 2317  Q 1446 2688 1446 2758  Q 1446 2861 1523 2937  Q 1600 3014 1689 3014  Q 1779 3014 1856 2934  Q 1933 2854 1933 2758  Q 1933 2688 1840 2320  Q 1747 1952 1747 1702  Q 2016 1843 2262 2102  Q 2509 2362 2554 2387  Q 2630 2426 2694 2426  Q 2790 2426 2857 2342  Q 2925 2259 2925 2157  z " transform="scale(0.015625)"></path>
     <path id="eq-6-STIXGeneral-Italic-63" d="M 2240 685  L 2342 621  Q 2048 250 1769 90  Q 1491 -70 1133 -70  Q 678 -70 435 179  Q 192 429 192 915  Q 192 1344 409 1744  Q 627 2144 979 2432  Q 1472 2822 2048 2822  Q 2342 2822 2531 2675  Q 2720 2528 2720 2304  Q 2720 2176 2630 2086  Q 2541 1997 2413 1997  Q 2285 1997 2224 2070  Q 2163 2144 2163 2253  Q 2163 2310 2211 2403  Q 2259 2496 2259 2560  Q 2259 2688 2022 2688  Q 1619 2688 1325 2381  Q 742 1766 742 890  Q 742 544 889 352  Q 1037 160 1312 160  Q 1562 160 1766 281  Q 1971 403 2240 685  z " transform="scale(0.015625)"></path>
     <path id="eq-6-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-6-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-6-STIXGeneral-Italic-66" d="M 262 2739  L 858 2739  Q 1107 3546 1318 3846  Q 1664 4339 2163 4339  Q 2400 4339 2557 4227  Q 2714 4115 2714 3942  Q 2714 3834 2634 3750  Q 2554 3667 2445 3667  Q 2355 3667 2281 3737  Q 2208 3808 2208 3917  Q 2208 3981 2240 4038  Q 2272 4096 2272 4115  Q 2272 4198 2131 4198  Q 1862 4198 1676 3849  Q 1491 3501 1350 2739  L 2035 2739  L 1997 2534  L 1306 2534  L 845 486  Q 435 -1325 -435 -1325  Q -653 -1325 -797 -1213  Q -941 -1101 -941 -934  Q -941 -826 -870 -746  Q -800 -666 -698 -666  Q -589 -666 -521 -733  Q -454 -800 -454 -902  Q -454 -947 -483 -1001  Q -512 -1056 -512 -1088  Q -512 -1190 -384 -1190  Q 13 -1190 237 -154  L 800 2534  L 218 2534  L 262 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-6-STIXGeneral-Regular-73" d="M 998 1926  L 1664 1523  Q 1984 1331 2105 1164  Q 2227 998 2227 736  Q 2227 416 1961 176  Q 1696 -64 1331 -64  Q 1030 -64 864 -6  Q 691 51 570 51  Q 461 51 416 -26  L 333 -26  L 333 979  L 435 979  Q 538 512 730 294  Q 922 77 1248 77  Q 1485 77 1632 211  Q 1779 346 1779 550  Q 1779 845 1440 1030  L 1094 1222  Q 326 1651 326 2150  Q 326 2522 566 2730  Q 806 2938 1210 2938  Q 1491 2938 1638 2867  Q 1754 2816 1818 2816  Q 1862 2816 1920 2880  L 1990 2880  L 2022 2010  L 1926 2010  Q 1818 2445 1654 2621  Q 1491 2797 1203 2797  Q 986 2797 854 2688  Q 723 2579 723 2362  Q 723 2253 796 2128  Q 870 2003 998 1926  z " transform="scale(0.015625)"></path>
     <path id="eq-6-STIXGeneral-Regular-69" d="M 1152 4045  Q 1152 3904 1056 3811  Q 960 3718 819 3718  Q 685 3718 592 3811  Q 499 3904 499 4045  Q 499 4179 595 4275  Q 691 4371 826 4371  Q 966 4371 1059 4275  Q 1152 4179 1152 4045  z M 1619 0  L 102 0  L 102 96  Q 435 115 521 211  Q 608 307 608 666  L 608 2118  Q 608 2342 563 2432  Q 518 2522 397 2522  Q 243 2522 128 2490  L 128 2592  L 1120 2944  L 1146 2918  L 1146 672  Q 1146 314 1226 218  Q 1306 122 1619 96  L 1619 0  z " transform="scale(0.015625)"></path>
     <path id="eq-6-STIXGeneral-Regular-6e" d="M 3104 0  L 1773 0  L 1779 96  Q 2016 115 2096 233  Q 2176 352 2176 672  L 2176 1946  Q 2176 2592 1709 2592  Q 1549 2592 1408 2515  Q 1267 2438 1050 2227  L 1050 461  Q 1050 269 1136 192  Q 1222 115 1466 96  L 1466 0  L 115 0  L 115 96  Q 358 115 435 214  Q 512 314 512 602  L 512 2157  Q 512 2394 467 2483  Q 422 2573 288 2573  Q 160 2573 102 2547  L 102 2656  Q 550 2784 979 2944  L 1030 2925  L 1030 2426  L 1037 2426  Q 1491 2944 1958 2944  Q 2323 2944 2518 2688  Q 2714 2432 2714 1958  L 2714 544  Q 2714 288 2790 205  Q 2867 122 3104 96  L 3104 0  z " transform="scale(0.015625)"></path>
     <path id="eq-6-STIXGeneral-Italic-3b8" d="M 3162 3270  Q 3162 2534 2925 1862  Q 2688 1190 2304 678  Q 1741 -70 992 -70  Q 608 -70 390 224  Q 173 518 173 1030  Q 173 1997 592 2813  Q 1011 3629 1594 4070  Q 1952 4339 2374 4339  Q 2733 4339 2947 4076  Q 3162 3814 3162 3270  z M 941 2221  L 2432 2221  Q 2624 2874 2624 3533  Q 2624 4205 2285 4205  Q 2029 4205 1728 3814  Q 1427 3424 1232 2992  Q 1037 2560 941 2221  z M 2387 2016  L 896 2016  Q 710 1530 710 960  Q 710 64 1069 64  Q 1286 64 1510 275  Q 1734 486 1904 806  Q 2074 1126 2198 1440  Q 2323 1754 2387 2016  z " transform="scale(0.015625)"></path>
     <path id="eq-6-STIXGeneral-Italic-69" d="M 1690 3834  Q 1690 3699 1597 3603  Q 1504 3507 1376 3507  Q 1235 3507 1152 3600  Q 1069 3693 1069 3846  Q 1069 3994 1155 4090  Q 1242 4186 1370 4186  Q 1498 4186 1594 4080  Q 1690 3974 1690 3834  z M 1421 730  L 1504 659  Q 1235 243 1049 86  Q 864 -70 627 -70  Q 314 -70 314 282  Q 314 467 454 992  L 762 2125  Q 819 2330 819 2406  Q 819 2502 745 2528  Q 672 2554 410 2560  L 410 2662  Q 704 2688 1434 2822  L 1459 2803  L 858 608  Q 794 390 794 326  Q 794 230 883 230  Q 1043 230 1421 730  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-6-STIXGeneral-Italic-78" transform="translate(0 0.703125)"></use>
    <use xlink:href="#eq-6-STIXGeneral-Regular-2217" transform="translate(60.681116 35.978125) scale(0.7)"></use>
    <use xlink:href="#eq-6-STIXGeneral-Italic-63" transform="translate(44.399994 -25.753125) scale(0.7)"></use>
    <use xlink:href="#eq-6-STIXGeneral-Regular-3d" transform="translate(126.248477 0.703125)"></use>
    <use xlink:href="#eq-6-STIXGeneral-Regular-2212" transform="translate(209.188458 0.703125)"></use>
    <use xlink:href="#eq-6-STIXGeneral-Italic-66" transform="translate(277.688442 0.703125)"></use>
    <use xlink:href="#eq-6-STIXGeneral-Regular-73" transform="translate(305.48843 0.703125)"></use>
    <use xlink:href="#eq-6-STIXGeneral-Regular-69" transform="translate(344.388424 0.703125)"></use>
    <use xlink:href="#eq-6-STIXGeneral-Regular-6e" transform="translate(372.188412 0.703125)"></use>
    <use xlink:href="#eq-6-STIXGeneral-Italic-3b8" transform="translate(434.221968 0.703125)"></use>
    <use xlink:href="#eq-6-STIXGeneral-Italic-69" transform="translate(482.221952 -12.525) scale(0.7)"></use>
   </g>
  </g>
 </g>
</svg></div>
  <h3>空气间隔为什么给出 tan，而不是 sin</h3>
  <p>设光阑到透镜的<strong>轴向间隔</strong>为 <var>d</var>。一条倾斜主光线与光轴构成直角三角形：轴向间隔是邻边，横向位移是对边，因此 <var>|xc|/d=tan|θᵢ|</var>。按本节横向方向约定：</p>
  <div class="math" data-tex="x_{c,\mathrm{air}}=-d\tan\theta_i" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="97pt" height="15pt" viewBox="0 0 97 15" version="1.1" role="img" aria-label="xc,air=−d tanθᵢ" focusable="false">
 <title>xc,air=−d tanθᵢ</title><defs>
 </defs>
 <g id="eq-7-figure_1">
  <g id="eq-7-patch_1">
   <path d="M 0 15  L 97 15  L 97 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-7-text_1">
   <!-- $x_{c,\mathrm{air}}=-d\tan\theta_i$ -->
   <g style="fill: #17313d" transform="translate(0 11) scale(0.16 -0.16)">
    <defs>
     <path id="eq-7-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-7-STIXGeneral-Italic-63" d="M 2240 685  L 2342 621  Q 2048 250 1769 90  Q 1491 -70 1133 -70  Q 678 -70 435 179  Q 192 429 192 915  Q 192 1344 409 1744  Q 627 2144 979 2432  Q 1472 2822 2048 2822  Q 2342 2822 2531 2675  Q 2720 2528 2720 2304  Q 2720 2176 2630 2086  Q 2541 1997 2413 1997  Q 2285 1997 2224 2070  Q 2163 2144 2163 2253  Q 2163 2310 2211 2403  Q 2259 2496 2259 2560  Q 2259 2688 2022 2688  Q 1619 2688 1325 2381  Q 742 1766 742 890  Q 742 544 889 352  Q 1037 160 1312 160  Q 1562 160 1766 281  Q 1971 403 2240 685  z " transform="scale(0.015625)"></path>
     <path id="eq-7-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-7-STIXGeneral-Regular-61" d="M 2829 422  L 2829 243  Q 2586 -64 2253 -64  Q 1888 -64 1843 403  L 1837 403  Q 1427 -64 909 -64  Q 608 -64 422 112  Q 237 288 237 602  Q 237 1050 685 1350  Q 992 1555 1837 1869  L 1837 2214  Q 1837 2502 1699 2646  Q 1562 2790 1338 2790  Q 1146 2790 1018 2697  Q 890 2605 890 2477  Q 890 2419 909 2348  Q 928 2278 928 2208  Q 928 2112 841 2029  Q 755 1946 634 1946  Q 525 1946 441 2029  Q 358 2112 358 2240  Q 358 2547 685 2752  Q 986 2944 1421 2944  Q 1939 2944 2176 2656  Q 2291 2522 2323 2384  Q 2355 2246 2355 1946  L 2355 723  Q 2355 301 2554 301  Q 2682 301 2829 422  z M 1837 813  L 1837 1715  Q 1248 1510 1018 1293  Q 800 1094 800 800  Q 800 557 921 432  Q 1043 307 1242 307  Q 1453 307 1613 410  Q 1747 506 1792 589  Q 1837 672 1837 813  z " transform="scale(0.015625)"></path>
     <path id="eq-7-STIXGeneral-Regular-69" d="M 1152 4045  Q 1152 3904 1056 3811  Q 960 3718 819 3718  Q 685 3718 592 3811  Q 499 3904 499 4045  Q 499 4179 595 4275  Q 691 4371 826 4371  Q 966 4371 1059 4275  Q 1152 4179 1152 4045  z M 1619 0  L 102 0  L 102 96  Q 435 115 521 211  Q 608 307 608 666  L 608 2118  Q 608 2342 563 2432  Q 518 2522 397 2522  Q 243 2522 128 2490  L 128 2592  L 1120 2944  L 1146 2918  L 1146 672  Q 1146 314 1226 218  Q 1306 122 1619 96  L 1619 0  z " transform="scale(0.015625)"></path>
     <path id="eq-7-STIXGeneral-Regular-72" d="M 1024 2931  L 1024 2342  Q 1267 2688 1430 2816  Q 1594 2944 1792 2944  Q 1958 2944 2051 2854  Q 2144 2765 2144 2605  Q 2144 2470 2077 2393  Q 2010 2317 1894 2317  Q 1773 2317 1638 2445  Q 1536 2541 1472 2541  Q 1338 2541 1181 2355  Q 1024 2170 1024 2016  L 1024 576  Q 1024 301 1133 205  Q 1242 109 1568 96  L 1568 0  L 32 0  L 32 96  Q 339 154 412 224  Q 486 294 486 538  L 486 2138  Q 486 2349 438 2435  Q 390 2522 269 2522  Q 166 2522 45 2496  L 45 2598  Q 448 2726 992 2944  L 1024 2931  z " transform="scale(0.015625)"></path>
     <path id="eq-7-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-7-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-7-STIXGeneral-Italic-64" d="M 3334 4371  L 3373 4333  L 3123 3360  L 2739 1958  Q 2323 429 2323 384  Q 2323 256 2438 256  Q 2522 256 2614 336  Q 2707 416 2963 710  L 3040 646  Q 2547 -83 2099 -83  Q 1978 -83 1907 -6  Q 1837 70 1837 205  Q 1837 397 1920 774  Q 1645 307 1379 118  Q 1114 -70 781 -70  Q 461 -70 278 125  Q 96 320 96 678  Q 96 1440 713 2131  Q 1331 2822 1965 2822  Q 2163 2822 2256 2732  Q 2349 2643 2381 2451  L 2387 2451  L 2675 3494  Q 2765 3808 2765 3949  Q 2765 4051 2694 4076  Q 2624 4102 2355 4115  L 2355 4224  Q 2848 4269 3334 4371  z M 2278 2310  Q 2278 2477 2185 2576  Q 2093 2675 1978 2675  Q 1677 2675 1395 2381  Q 1075 2042 864 1571  Q 653 1101 653 704  Q 653 486 752 361  Q 851 237 1024 237  Q 1312 237 1606 550  Q 1901 864 2089 1350  Q 2278 1837 2278 2310  z " transform="scale(0.015625)"></path>
     <path id="eq-7-STIXGeneral-Regular-74" d="M 1702 493  L 1786 422  Q 1478 -64 1011 -64  Q 448 -64 448 749  L 448 2675  L 109 2675  Q 83 2694 83 2720  Q 83 2771 192 2842  Q 435 2982 813 3526  Q 826 3546 874 3606  Q 922 3667 941 3706  Q 986 3706 986 3622  L 986 2880  L 1632 2880  L 1632 2675  L 986 2675  L 986 845  Q 986 538 1062 403  Q 1139 269 1318 269  Q 1510 269 1702 493  z " transform="scale(0.015625)"></path>
     <path id="eq-7-STIXGeneral-Regular-6e" d="M 3104 0  L 1773 0  L 1779 96  Q 2016 115 2096 233  Q 2176 352 2176 672  L 2176 1946  Q 2176 2592 1709 2592  Q 1549 2592 1408 2515  Q 1267 2438 1050 2227  L 1050 461  Q 1050 269 1136 192  Q 1222 115 1466 96  L 1466 0  L 115 0  L 115 96  Q 358 115 435 214  Q 512 314 512 602  L 512 2157  Q 512 2394 467 2483  Q 422 2573 288 2573  Q 160 2573 102 2547  L 102 2656  Q 550 2784 979 2944  L 1030 2925  L 1030 2426  L 1037 2426  Q 1491 2944 1958 2944  Q 2323 2944 2518 2688  Q 2714 2432 2714 1958  L 2714 544  Q 2714 288 2790 205  Q 2867 122 3104 96  L 3104 0  z " transform="scale(0.015625)"></path>
     <path id="eq-7-STIXGeneral-Italic-3b8" d="M 3162 3270  Q 3162 2534 2925 1862  Q 2688 1190 2304 678  Q 1741 -70 992 -70  Q 608 -70 390 224  Q 173 518 173 1030  Q 173 1997 592 2813  Q 1011 3629 1594 4070  Q 1952 4339 2374 4339  Q 2733 4339 2947 4076  Q 3162 3814 3162 3270  z M 941 2221  L 2432 2221  Q 2624 2874 2624 3533  Q 2624 4205 2285 4205  Q 2029 4205 1728 3814  Q 1427 3424 1232 2992  Q 1037 2560 941 2221  z M 2387 2016  L 896 2016  Q 710 1530 710 960  Q 710 64 1069 64  Q 1286 64 1510 275  Q 1734 486 1904 806  Q 2074 1126 2198 1440  Q 2323 1754 2387 2016  z " transform="scale(0.015625)"></path>
     <path id="eq-7-STIXGeneral-Italic-69" d="M 1690 3834  Q 1690 3699 1597 3603  Q 1504 3507 1376 3507  Q 1235 3507 1152 3600  Q 1069 3693 1069 3846  Q 1069 3994 1155 4090  Q 1242 4186 1370 4186  Q 1498 4186 1594 4080  Q 1690 3974 1690 3834  z M 1421 730  L 1504 659  Q 1235 243 1049 86  Q 864 -70 627 -70  Q 314 -70 314 282  Q 314 467 454 992  L 762 2125  Q 819 2330 819 2406  Q 819 2502 745 2528  Q 672 2554 410 2560  L 410 2662  Q 704 2688 1434 2822  L 1459 2803  L 858 608  Q 794 390 794 326  Q 794 230 883 230  Q 1043 230 1421 730  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-7-STIXGeneral-Italic-78" transform="translate(0 0.703125)"></use>
    <use xlink:href="#eq-7-STIXGeneral-Italic-63" transform="translate(44.399994 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-7-STIXGeneral-Regular-2c" transform="translate(75.47999 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-7-STIXGeneral-Regular-61" transform="translate(103.087976 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-7-STIXGeneral-Regular-69" transform="translate(134.167972 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-7-STIXGeneral-Regular-72" transform="translate(153.627964 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-7-STIXGeneral-Regular-3d" transform="translate(195.787326 0.703125)"></use>
    <use xlink:href="#eq-7-STIXGeneral-Regular-2212" transform="translate(278.727307 0.703125)"></use>
    <use xlink:href="#eq-7-STIXGeneral-Italic-64" transform="translate(347.227292 0.703125)"></use>
    <use xlink:href="#eq-7-STIXGeneral-Regular-74" transform="translate(397.227277 0.703125)"></use>
    <use xlink:href="#eq-7-STIXGeneral-Regular-61" transform="translate(425.027265 0.703125)"></use>
    <use xlink:href="#eq-7-STIXGeneral-Regular-6e" transform="translate(469.427259 0.703125)"></use>
    <use xlink:href="#eq-7-STIXGeneral-Italic-3b8" transform="translate(531.460814 0.703125)"></use>
    <use xlink:href="#eq-7-STIXGeneral-Italic-69" transform="translate(579.460799 -12.525) scale(0.7)"></use>
   </g>
  </g>
 </g>
</svg></div>
  <p>如果采用的是斜线传播长度而不是轴向间隔，表达式会出现正弦；这里的 <var>d</var> 明确是两个平面之间的轴向距离。大角度下，正切的增长比正弦快，所以空气间隔的实际落点曲线逐渐离开理想直线。<a class="cite no-styling" href="#ref-review">[综述 p.5–6，图 3C]</a></p>
  <h3>加入介质后，折射压缩了内部传播角</h3>
  <p>设外部为空气，平板折射率为 <var>n</var>，板内角度为 <var>θt</var>。由斯涅尔定律 <var>sinθt=sinθᵢ/n</var>，可得：</p>
  <div class="math" data-tex="x_{c,\mathrm{plate}}=-d\tan\theta_t=-\frac{d\sin\theta_i}{\sqrt{n^2-\sin^2\theta_i}}" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="197pt" height="30pt" viewBox="0 0 197 30" version="1.1" role="img" aria-label="xc,plate=−d tanθt=−d sinθᵢ/√(n²−sin²θᵢ)" focusable="false">
 <title>xc,plate=−d tanθt=−d sinθᵢ/√(n²−sin²θᵢ)</title><defs>
 </defs>
 <g id="eq-8-figure_1">
  <g id="eq-8-patch_1">
   <path d="M 0 30  L 197 30  L 197 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-8-text_1">
   <!-- $x_{c,\mathrm{plate}}=-d\tan\theta_t=-\frac{d\sin\theta_i}{\sqrt{n^2-\sin^2\theta_i}}$ -->
   <g style="fill: #17313d" transform="translate(0 16) scale(0.16 -0.16)">
    <defs>
     <path id="eq-8-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Italic-63" d="M 2240 685  L 2342 621  Q 2048 250 1769 90  Q 1491 -70 1133 -70  Q 678 -70 435 179  Q 192 429 192 915  Q 192 1344 409 1744  Q 627 2144 979 2432  Q 1472 2822 2048 2822  Q 2342 2822 2531 2675  Q 2720 2528 2720 2304  Q 2720 2176 2630 2086  Q 2541 1997 2413 1997  Q 2285 1997 2224 2070  Q 2163 2144 2163 2253  Q 2163 2310 2211 2403  Q 2259 2496 2259 2560  Q 2259 2688 2022 2688  Q 1619 2688 1325 2381  Q 742 1766 742 890  Q 742 544 889 352  Q 1037 160 1312 160  Q 1562 160 1766 281  Q 1971 403 2240 685  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Regular-70" d="M 1018 2931  L 1018 2438  Q 1421 2944 1939 2944  Q 2406 2944 2707 2560  Q 3008 2176 3008 1581  Q 3008 883 2621 409  Q 2234 -64 1664 -64  Q 1466 -64 1328 -6  Q 1190 51 1018 211  L 1018 -794  Q 1018 -1094 1120 -1180  Q 1222 -1267 1581 -1274  L 1581 -1389  L 32 -1389  L 32 -1280  Q 314 -1254 397 -1171  Q 480 -1088 480 -838  L 480 2157  Q 480 2381 429 2451  Q 378 2522 218 2522  Q 115 2522 58 2515  L 58 2618  Q 506 2752 979 2944  L 1018 2931  z M 1018 2138  L 1018 563  Q 1018 422 1238 281  Q 1459 141 1683 141  Q 2029 141 2243 467  Q 2458 794 2458 1325  Q 2458 1888 2243 2224  Q 2029 2560 1670 2560  Q 1446 2560 1232 2419  Q 1018 2278 1018 2138  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Regular-6c" d="M 1645 0  L 134 0  L 134 96  Q 435 122 531 221  Q 627 320 627 589  L 627 3590  Q 627 3821 569 3910  Q 512 4000 358 4000  Q 224 4000 122 3987  L 122 4090  Q 730 4237 1133 4371  L 1165 4346  L 1165 557  Q 1165 288 1254 201  Q 1344 115 1645 96  L 1645 0  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Regular-61" d="M 2829 422  L 2829 243  Q 2586 -64 2253 -64  Q 1888 -64 1843 403  L 1837 403  Q 1427 -64 909 -64  Q 608 -64 422 112  Q 237 288 237 602  Q 237 1050 685 1350  Q 992 1555 1837 1869  L 1837 2214  Q 1837 2502 1699 2646  Q 1562 2790 1338 2790  Q 1146 2790 1018 2697  Q 890 2605 890 2477  Q 890 2419 909 2348  Q 928 2278 928 2208  Q 928 2112 841 2029  Q 755 1946 634 1946  Q 525 1946 441 2029  Q 358 2112 358 2240  Q 358 2547 685 2752  Q 986 2944 1421 2944  Q 1939 2944 2176 2656  Q 2291 2522 2323 2384  Q 2355 2246 2355 1946  L 2355 723  Q 2355 301 2554 301  Q 2682 301 2829 422  z M 1837 813  L 1837 1715  Q 1248 1510 1018 1293  Q 800 1094 800 800  Q 800 557 921 432  Q 1043 307 1242 307  Q 1453 307 1613 410  Q 1747 506 1792 589  Q 1837 672 1837 813  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Regular-74" d="M 1702 493  L 1786 422  Q 1478 -64 1011 -64  Q 448 -64 448 749  L 448 2675  L 109 2675  Q 83 2694 83 2720  Q 83 2771 192 2842  Q 435 2982 813 3526  Q 826 3546 874 3606  Q 922 3667 941 3706  Q 986 3706 986 3622  L 986 2880  L 1632 2880  L 1632 2675  L 986 2675  L 986 845  Q 986 538 1062 403  Q 1139 269 1318 269  Q 1510 269 1702 493  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Regular-65" d="M 2611 1050  L 2714 1005  Q 2330 -64 1376 -64  Q 813 -64 486 329  Q 160 723 160 1389  Q 160 2074 525 2509  Q 890 2944 1485 2944  Q 2061 2944 2374 2502  Q 2560 2246 2592 1773  L 621 1773  Q 646 1370 700 1158  Q 755 947 915 730  Q 1184 378 1626 378  Q 1939 378 2153 531  Q 2368 685 2611 1050  z M 634 1978  L 1939 1978  Q 1882 2381 1750 2547  Q 1619 2714 1312 2714  Q 1043 2714 864 2525  Q 685 2336 634 1978  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Italic-64" d="M 3334 4371  L 3373 4333  L 3123 3360  L 2739 1958  Q 2323 429 2323 384  Q 2323 256 2438 256  Q 2522 256 2614 336  Q 2707 416 2963 710  L 3040 646  Q 2547 -83 2099 -83  Q 1978 -83 1907 -6  Q 1837 70 1837 205  Q 1837 397 1920 774  Q 1645 307 1379 118  Q 1114 -70 781 -70  Q 461 -70 278 125  Q 96 320 96 678  Q 96 1440 713 2131  Q 1331 2822 1965 2822  Q 2163 2822 2256 2732  Q 2349 2643 2381 2451  L 2387 2451  L 2675 3494  Q 2765 3808 2765 3949  Q 2765 4051 2694 4076  Q 2624 4102 2355 4115  L 2355 4224  Q 2848 4269 3334 4371  z M 2278 2310  Q 2278 2477 2185 2576  Q 2093 2675 1978 2675  Q 1677 2675 1395 2381  Q 1075 2042 864 1571  Q 653 1101 653 704  Q 653 486 752 361  Q 851 237 1024 237  Q 1312 237 1606 550  Q 1901 864 2089 1350  Q 2278 1837 2278 2310  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Regular-6e" d="M 3104 0  L 1773 0  L 1779 96  Q 2016 115 2096 233  Q 2176 352 2176 672  L 2176 1946  Q 2176 2592 1709 2592  Q 1549 2592 1408 2515  Q 1267 2438 1050 2227  L 1050 461  Q 1050 269 1136 192  Q 1222 115 1466 96  L 1466 0  L 115 0  L 115 96  Q 358 115 435 214  Q 512 314 512 602  L 512 2157  Q 512 2394 467 2483  Q 422 2573 288 2573  Q 160 2573 102 2547  L 102 2656  Q 550 2784 979 2944  L 1030 2925  L 1030 2426  L 1037 2426  Q 1491 2944 1958 2944  Q 2323 2944 2518 2688  Q 2714 2432 2714 1958  L 2714 544  Q 2714 288 2790 205  Q 2867 122 3104 96  L 3104 0  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Italic-3b8" d="M 3162 3270  Q 3162 2534 2925 1862  Q 2688 1190 2304 678  Q 1741 -70 992 -70  Q 608 -70 390 224  Q 173 518 173 1030  Q 173 1997 592 2813  Q 1011 3629 1594 4070  Q 1952 4339 2374 4339  Q 2733 4339 2947 4076  Q 3162 3814 3162 3270  z M 941 2221  L 2432 2221  Q 2624 2874 2624 3533  Q 2624 4205 2285 4205  Q 2029 4205 1728 3814  Q 1427 3424 1232 2992  Q 1037 2560 941 2221  z M 2387 2016  L 896 2016  Q 710 1530 710 960  Q 710 64 1069 64  Q 1286 64 1510 275  Q 1734 486 1904 806  Q 2074 1126 2198 1440  Q 2323 1754 2387 2016  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Italic-74" d="M 1894 2739  L 1862 2534  L 1325 2534  L 768 435  Q 755 384 755 346  Q 755 243 851 243  Q 928 243 1030 342  Q 1133 442 1370 749  L 1453 704  Q 1158 256 969 93  Q 781 -70 538 -70  Q 243 -70 243 166  Q 243 230 346 640  L 845 2534  L 365 2534  L 358 2573  Q 358 2688 570 2733  Q 730 2771 992 2979  Q 1254 3187 1421 3437  Q 1459 3494 1510 3494  Q 1568 3494 1568 3443  Q 1568 3411 1562 3398  L 1382 2739  L 1894 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Regular-73" d="M 998 1926  L 1664 1523  Q 1984 1331 2105 1164  Q 2227 998 2227 736  Q 2227 416 1961 176  Q 1696 -64 1331 -64  Q 1030 -64 864 -6  Q 691 51 570 51  Q 461 51 416 -26  L 333 -26  L 333 979  L 435 979  Q 538 512 730 294  Q 922 77 1248 77  Q 1485 77 1632 211  Q 1779 346 1779 550  Q 1779 845 1440 1030  L 1094 1222  Q 326 1651 326 2150  Q 326 2522 566 2730  Q 806 2938 1210 2938  Q 1491 2938 1638 2867  Q 1754 2816 1818 2816  Q 1862 2816 1920 2880  L 1990 2880  L 2022 2010  L 1926 2010  Q 1818 2445 1654 2621  Q 1491 2797 1203 2797  Q 986 2797 854 2688  Q 723 2579 723 2362  Q 723 2253 796 2128  Q 870 2003 998 1926  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Regular-69" d="M 1152 4045  Q 1152 3904 1056 3811  Q 960 3718 819 3718  Q 685 3718 592 3811  Q 499 3904 499 4045  Q 499 4179 595 4275  Q 691 4371 826 4371  Q 966 4371 1059 4275  Q 1152 4179 1152 4045  z M 1619 0  L 102 0  L 102 96  Q 435 115 521 211  Q 608 307 608 666  L 608 2118  Q 608 2342 563 2432  Q 518 2522 397 2522  Q 243 2522 128 2490  L 128 2592  L 1120 2944  L 1146 2918  L 1146 672  Q 1146 314 1226 218  Q 1306 122 1619 96  L 1619 0  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Italic-69" d="M 1690 3834  Q 1690 3699 1597 3603  Q 1504 3507 1376 3507  Q 1235 3507 1152 3600  Q 1069 3693 1069 3846  Q 1069 3994 1155 4090  Q 1242 4186 1370 4186  Q 1498 4186 1594 4080  Q 1690 3974 1690 3834  z M 1421 730  L 1504 659  Q 1235 243 1049 86  Q 864 -70 627 -70  Q 314 -70 314 282  Q 314 467 454 992  L 762 2125  Q 819 2330 819 2406  Q 819 2502 745 2528  Q 672 2554 410 2560  L 410 2662  Q 704 2688 1434 2822  L 1459 2803  L 858 608  Q 794 390 794 326  Q 794 230 883 230  Q 1043 230 1421 730  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Regular-221a" d="M 6163 6227  L 3104 -1658  L 2899 -1658  L 1606 1734  Q 1466 2112 1210 2112  Q 1011 2112 794 1914  L 717 2042  L 1715 2835  L 1837 2835  L 3142 -595  L 3168 -595  L 5818 6227  L 6163 6227  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Italic-6e" d="M 2944 749  L 3034 666  Q 2707 218 2534 80  Q 2362 -58 2138 -58  Q 2010 -58 1923 28  Q 1837 115 1837 288  Q 1837 390 1939 768  L 2221 1805  Q 2310 2150 2310 2310  Q 2310 2496 2157 2496  Q 1971 2496 1750 2275  Q 1530 2054 1210 1587  Q 998 1274 899 1024  Q 800 774 570 0  L 90 0  L 704 2240  Q 717 2304 717 2349  Q 717 2445 630 2480  Q 544 2515 301 2522  L 301 2624  Q 550 2675 857 2729  Q 1165 2784 1338 2822  L 1363 2810  L 934 1414  Q 1408 2170 1753 2496  Q 2099 2822 2413 2822  Q 2611 2822 2720 2716  Q 2829 2611 2829 2432  Q 2829 2272 2765 2048  L 2406 749  Q 2317 429 2317 358  Q 2317 243 2419 243  Q 2541 243 2810 582  Q 2854 634 2944 749  z " transform="scale(0.015625)"></path>
     <path id="eq-8-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-8-STIXGeneral-Italic-78" transform="translate(0 0.599688)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Italic-63" transform="translate(44.399994 -12.628438) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-2c" transform="translate(75.47999 -12.628438) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-70" transform="translate(103.087976 -12.628438) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-6c" transform="translate(138.087966 -12.628438) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-61" transform="translate(157.547957 -12.628438) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-74" transform="translate(188.627953 -12.628438) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-65" transform="translate(208.087944 -12.628438) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-3d" transform="translate(258.017311 0.599688)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-2212" transform="translate(340.957292 0.599688)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Italic-64" transform="translate(409.457277 0.599688)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-74" transform="translate(459.457262 0.599688)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-61" transform="translate(487.25725 0.599688)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-6e" transform="translate(531.657244 0.599688)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Italic-3b8" transform="translate(593.690799 0.599688)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Italic-74" transform="translate(641.690784 -12.628438) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-3d" transform="translate(680.000147 0.599688)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-2212" transform="translate(762.940128 0.599688)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Italic-64" transform="translate(937.440113 48.192188) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-73" transform="translate(972.440102 48.192188) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-69" transform="translate(999.670098 48.192188) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-6e" transform="translate(1019.130089 48.192188) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Italic-3b8" transform="translate(1062.553578 48.192188) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Italic-69" transform="translate(1096.153567 38.9325) scale(0.49)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-221a" transform="translate(831.440113 -65.16125) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Italic-6e" transform="translate(905.150104 -65.041875) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-32" transform="translate(944.471281 -40.349375) scale(0.49)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-2212" transform="translate(982.165833 -65.041875) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-73" transform="translate(1040.22382 -65.041875) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-69" transform="translate(1067.453816 -65.041875) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-6e" transform="translate(1086.913807 -65.041875) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Regular-32" transform="translate(1122.994094 -40.349375) scale(0.49)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Italic-3b8" transform="translate(1159.004148 -65.041875) scale(0.7)"></use>
    <use xlink:href="#eq-8-STIXGeneral-Italic-69" transform="translate(1192.604138 -74.301562) scale(0.49)"></use>
    <path d="M 831.440113 13.396563  L 831.440113 19.646563  L 1218.062694 19.646563  L 1218.062694 13.396563  L 831.440113 13.396563  z "></path>
    <path d="M 896.400104 -1.603437  L 896.400104 2.771563  L 1218.062694 2.771563  L 1218.062694 -1.603437  L 896.400104 -1.603437  z "></path>
   </g>
  </g>
 </g>
</svg></div>
  <p>令 <var>u=sinθᵢ</var> 后，理想关系为 <var>xc*/f=−u</var>，所以图 3 中的黑色参考线是一条直线。介质方案可以在合适厚度下，让实际曲线在较宽角域内接近它；这种匹配改善仍需要与具体孔径和像差条件一起评价。<a class="cite no-styling" href="#ref-review">[综述 §2.2，图 3D]</a></p>
  <figure class="paper-figure" id="figure-3"><button type="button" class="zoom-button" data-title="图 3 · 角谱与受照中心的移动" aria-label="放大查看图 3 · 角谱与受照中心的移动"><img src="/assets/wide-angle-metalens-reading/figure-3.png" loading="lazy" width="1328" height="1261" alt="图 3 · 角谱与受照中心的移动" decoding="async" data-figure-key="3"><span class="zoom-hint" aria-hidden="true">点击放大 ↗</span></button><figcaption><strong>图 3 · 角谱与受照中心的移动。</strong>A、B：不同几何 NA 下的归一化傅里叶振幅及斜入射时的角谱变化。C、D：空气间隔与介质间隔的透镜面落点，与理想 −sinθᵢ 关系比较。<span class="figure-source">论文原图 · <a class="no-styling" href="#ref-review">[R1 p.5，图 3]</a> · 保留原图中的引文与来源标注。</span></figcaption></figure>
  <p>图 3A、B 从角谱角度说明二次相位的宽角度性质。这里要看的是<strong>可传播波矢窗口内的谱形与覆盖</strong>，不能把图理解为整个傅里叶谱在任意平移后都不变。图注使用的几何 NA 也应与实际受照区域决定的有效 NA 分开。C、D 则把系统问题转成了可直接比较的落点曲线。</p>
  <section class="lab" id="lab-aperture" aria-labelledby="lab-aperture-heading">
  <p class="lab-kicker">互动实验 · 孔径与间隔 <span class="lab-disclaimer">几何落点模型</span></p>
  <h3 id="lab-aperture-heading">空气与介质怎样改变透镜面的受照中心</h3>
  <p class="lab-intro">三条曲线比较透镜面上的光束中心 x<sub>c</sub>/f。理想位置为 −sin θᵢ；空气间隔产生 −(d/f) tan θᵢ；介质内折射使实际位移发生改变。</p>
  <div class="lab-controls">
    <label class="lab-field"><span class="lab-label">入射角 θᵢ <output id="aperture-angle-label">45°</output></span><input id="aperture-angle" type="range" min="-80" max="80" step="1" value="45"></label>
    <label class="lab-field"><span class="lab-label">间隔厚度 d/f <output id="aperture-gap-label">1.20</output></span><input id="aperture-gap" type="range" min="0.5" max="2" step="0.01" value="1.2"></label>
    <label class="lab-field"><span class="lab-label">介质折射率 n <output id="aperture-index-label">1.45</output></span><input id="aperture-index" type="range" min="1" max="2" step="0.01" value="1.45"></label>
  </div>
  <div class="lab-legend"><span><i class="lab-swatch target" aria-hidden="true"></i>理想中心</span><span><i class="lab-swatch air" aria-hidden="true"></i>空气间隔</span><span><i class="lab-swatch" aria-hidden="true"></i>介质间隔</span></div>
  <div class="lab-figure"><svg class="lab-chart" id="aperture-svg" role="img" aria-label="横轴 sin θᵢ，纵轴镜面光束中心 x_c/f；三个圆点表示当前选择角度下的落点。"></svg></div>
  <dl class="lab-values" aria-live="polite"><div><dt>理想中心 x<sub>c</sub>/f</dt><dd id="aperture-ideal">—</dd></div><div><dt>空气间隔 x<sub>c</sub>/f</dt><dd id="aperture-air">—</dd></div><div><dt>介质间隔 x<sub>c</sub>/f</dt><dd id="aperture-plate">—</dd></div></dl>
  <p class="lab-note">误差为实际中心减理想中心，单位为 f。纵轴随当前角度自动扩展，超出绘图区的曲线段被截断。此模型只检验几何位置匹配，不计算焦斑、成像像差或聚焦效率。</p>
  <noscript>启用 JavaScript 后可调整入射角、厚度和折射率。</noscript>
</section>
  <div class="worked"><span class="note-label">补充计算</span><p>取 <strong>u=0.8、d/f=1.2、n=1.45</strong>，理想受照中心为 <strong>−0.8f</strong>，空气间隔为 <strong>−1.6f</strong>，介质间隔约为 <strong>−0.794f</strong>。这是一组展示匹配原理的参数，不是对所有角度最优的系统设计。交互中的中心偏差不能直接换算为 Strehl 比、分辨率或聚焦效率。</p></div>
  <details class="derivation"><summary>补充推导：小角度下的厚度选择与剩余误差</summary>
    <div class="math" data-tex="\frac{x_{c,\mathrm{plate}}}{f}=-\frac{d}{nf}u\left(1+\frac{u^2}{2n^2}+\cdots\right)" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="163pt" height="25pt" viewBox="0 0 163 25" version="1.1" role="img" aria-label="xc,plate/f=−(d/nf)u[1+u²/(2n²)+…]" focusable="false">
 <title>xc,plate/f=−(d/nf)u[1+u²/(2n²)+…]</title><defs>
 </defs>
 <g id="eq-9-figure_1">
  <g id="eq-9-patch_1">
   <path d="M 0 25  L 163 25  L 163 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-9-text_1">
   <!-- $\frac{x_{c,\mathrm{plate}}}{f}=-\frac{d}{nf}u\left(1+\frac{u^2}{2n^2}+\cdots\right)$ -->
   <g style="fill: #17313d" transform="translate(0 16) scale(0.16 -0.16)">
    <defs>
     <path id="eq-9-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Italic-63" d="M 2240 685  L 2342 621  Q 2048 250 1769 90  Q 1491 -70 1133 -70  Q 678 -70 435 179  Q 192 429 192 915  Q 192 1344 409 1744  Q 627 2144 979 2432  Q 1472 2822 2048 2822  Q 2342 2822 2531 2675  Q 2720 2528 2720 2304  Q 2720 2176 2630 2086  Q 2541 1997 2413 1997  Q 2285 1997 2224 2070  Q 2163 2144 2163 2253  Q 2163 2310 2211 2403  Q 2259 2496 2259 2560  Q 2259 2688 2022 2688  Q 1619 2688 1325 2381  Q 742 1766 742 890  Q 742 544 889 352  Q 1037 160 1312 160  Q 1562 160 1766 281  Q 1971 403 2240 685  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Regular-70" d="M 1018 2931  L 1018 2438  Q 1421 2944 1939 2944  Q 2406 2944 2707 2560  Q 3008 2176 3008 1581  Q 3008 883 2621 409  Q 2234 -64 1664 -64  Q 1466 -64 1328 -6  Q 1190 51 1018 211  L 1018 -794  Q 1018 -1094 1120 -1180  Q 1222 -1267 1581 -1274  L 1581 -1389  L 32 -1389  L 32 -1280  Q 314 -1254 397 -1171  Q 480 -1088 480 -838  L 480 2157  Q 480 2381 429 2451  Q 378 2522 218 2522  Q 115 2522 58 2515  L 58 2618  Q 506 2752 979 2944  L 1018 2931  z M 1018 2138  L 1018 563  Q 1018 422 1238 281  Q 1459 141 1683 141  Q 2029 141 2243 467  Q 2458 794 2458 1325  Q 2458 1888 2243 2224  Q 2029 2560 1670 2560  Q 1446 2560 1232 2419  Q 1018 2278 1018 2138  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Regular-6c" d="M 1645 0  L 134 0  L 134 96  Q 435 122 531 221  Q 627 320 627 589  L 627 3590  Q 627 3821 569 3910  Q 512 4000 358 4000  Q 224 4000 122 3987  L 122 4090  Q 730 4237 1133 4371  L 1165 4346  L 1165 557  Q 1165 288 1254 201  Q 1344 115 1645 96  L 1645 0  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Regular-61" d="M 2829 422  L 2829 243  Q 2586 -64 2253 -64  Q 1888 -64 1843 403  L 1837 403  Q 1427 -64 909 -64  Q 608 -64 422 112  Q 237 288 237 602  Q 237 1050 685 1350  Q 992 1555 1837 1869  L 1837 2214  Q 1837 2502 1699 2646  Q 1562 2790 1338 2790  Q 1146 2790 1018 2697  Q 890 2605 890 2477  Q 890 2419 909 2348  Q 928 2278 928 2208  Q 928 2112 841 2029  Q 755 1946 634 1946  Q 525 1946 441 2029  Q 358 2112 358 2240  Q 358 2547 685 2752  Q 986 2944 1421 2944  Q 1939 2944 2176 2656  Q 2291 2522 2323 2384  Q 2355 2246 2355 1946  L 2355 723  Q 2355 301 2554 301  Q 2682 301 2829 422  z M 1837 813  L 1837 1715  Q 1248 1510 1018 1293  Q 800 1094 800 800  Q 800 557 921 432  Q 1043 307 1242 307  Q 1453 307 1613 410  Q 1747 506 1792 589  Q 1837 672 1837 813  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Regular-74" d="M 1702 493  L 1786 422  Q 1478 -64 1011 -64  Q 448 -64 448 749  L 448 2675  L 109 2675  Q 83 2694 83 2720  Q 83 2771 192 2842  Q 435 2982 813 3526  Q 826 3546 874 3606  Q 922 3667 941 3706  Q 986 3706 986 3622  L 986 2880  L 1632 2880  L 1632 2675  L 986 2675  L 986 845  Q 986 538 1062 403  Q 1139 269 1318 269  Q 1510 269 1702 493  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Regular-65" d="M 2611 1050  L 2714 1005  Q 2330 -64 1376 -64  Q 813 -64 486 329  Q 160 723 160 1389  Q 160 2074 525 2509  Q 890 2944 1485 2944  Q 2061 2944 2374 2502  Q 2560 2246 2592 1773  L 621 1773  Q 646 1370 700 1158  Q 755 947 915 730  Q 1184 378 1626 378  Q 1939 378 2153 531  Q 2368 685 2611 1050  z M 634 1978  L 1939 1978  Q 1882 2381 1750 2547  Q 1619 2714 1312 2714  Q 1043 2714 864 2525  Q 685 2336 634 1978  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Italic-66" d="M 262 2739  L 858 2739  Q 1107 3546 1318 3846  Q 1664 4339 2163 4339  Q 2400 4339 2557 4227  Q 2714 4115 2714 3942  Q 2714 3834 2634 3750  Q 2554 3667 2445 3667  Q 2355 3667 2281 3737  Q 2208 3808 2208 3917  Q 2208 3981 2240 4038  Q 2272 4096 2272 4115  Q 2272 4198 2131 4198  Q 1862 4198 1676 3849  Q 1491 3501 1350 2739  L 2035 2739  L 1997 2534  L 1306 2534  L 845 486  Q 435 -1325 -435 -1325  Q -653 -1325 -797 -1213  Q -941 -1101 -941 -934  Q -941 -826 -870 -746  Q -800 -666 -698 -666  Q -589 -666 -521 -733  Q -454 -800 -454 -902  Q -454 -947 -483 -1001  Q -512 -1056 -512 -1088  Q -512 -1190 -384 -1190  Q 13 -1190 237 -154  L 800 2534  L 218 2534  L 262 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Italic-64" d="M 3334 4371  L 3373 4333  L 3123 3360  L 2739 1958  Q 2323 429 2323 384  Q 2323 256 2438 256  Q 2522 256 2614 336  Q 2707 416 2963 710  L 3040 646  Q 2547 -83 2099 -83  Q 1978 -83 1907 -6  Q 1837 70 1837 205  Q 1837 397 1920 774  Q 1645 307 1379 118  Q 1114 -70 781 -70  Q 461 -70 278 125  Q 96 320 96 678  Q 96 1440 713 2131  Q 1331 2822 1965 2822  Q 2163 2822 2256 2732  Q 2349 2643 2381 2451  L 2387 2451  L 2675 3494  Q 2765 3808 2765 3949  Q 2765 4051 2694 4076  Q 2624 4102 2355 4115  L 2355 4224  Q 2848 4269 3334 4371  z M 2278 2310  Q 2278 2477 2185 2576  Q 2093 2675 1978 2675  Q 1677 2675 1395 2381  Q 1075 2042 864 1571  Q 653 1101 653 704  Q 653 486 752 361  Q 851 237 1024 237  Q 1312 237 1606 550  Q 1901 864 2089 1350  Q 2278 1837 2278 2310  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Italic-6e" d="M 2944 749  L 3034 666  Q 2707 218 2534 80  Q 2362 -58 2138 -58  Q 2010 -58 1923 28  Q 1837 115 1837 288  Q 1837 390 1939 768  L 2221 1805  Q 2310 2150 2310 2310  Q 2310 2496 2157 2496  Q 1971 2496 1750 2275  Q 1530 2054 1210 1587  Q 998 1274 899 1024  Q 800 774 570 0  L 90 0  L 704 2240  Q 717 2304 717 2349  Q 717 2445 630 2480  Q 544 2515 301 2522  L 301 2624  Q 550 2675 857 2729  Q 1165 2784 1338 2822  L 1363 2810  L 934 1414  Q 1408 2170 1753 2496  Q 2099 2822 2413 2822  Q 2611 2822 2720 2716  Q 2829 2611 2829 2432  Q 2829 2272 2765 2048  L 2406 749  Q 2317 429 2317 358  Q 2317 243 2419 243  Q 2541 243 2810 582  Q 2854 634 2944 749  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Italic-75" d="M 2950 762  L 3040 704  Q 2733 237 2560 89  Q 2387 -58 2157 -58  Q 1850 -58 1850 250  Q 1850 538 2138 1510  Q 1568 576 1257 253  Q 947 -70 608 -70  Q 269 -70 269 269  Q 269 384 442 1088  L 666 1978  Q 755 2349 755 2406  Q 755 2483 684 2521  Q 614 2560 365 2560  L 365 2650  Q 806 2701 1325 2822  L 1350 2803  L 781 531  Q 762 474 762 429  Q 762 269 890 269  Q 1178 269 1798 1210  Q 2010 1530 2128 1795  Q 2246 2061 2502 2765  L 2976 2765  L 2470 851  Q 2349 390 2349 352  Q 2349 243 2419 243  Q 2496 243 2605 345  Q 2714 448 2950 762  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXSizeTwoSym-Regular-28" d="M 3219 -1555  L 3219 -1786  Q 2144 -774 1517 730  Q 890 2234 890 4115  Q 890 6003 1533 7593  Q 2176 9184 3219 10022  L 3219 9811  Q 2490 9062 1994 7606  Q 1498 6150 1498 4115  Q 1498 563 3219 -1555  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Regular-31" d="M 2522 0  L 755 0  L 755 96  Q 1107 115 1235 227  Q 1363 339 1363 608  L 1363 3482  Q 1363 3795 1171 3795  Q 1082 3795 883 3718  L 710 3654  L 710 3744  L 1856 4326  L 1914 4307  L 1914 486  Q 1914 275 2042 185  Q 2170 96 2522 96  L 2522 0  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Regular-2b" d="M 4070 1408  L 2400 1408  L 2400 -262  L 1978 -262  L 1978 1408  L 307 1408  L 307 1830  L 1978 1830  L 1978 3501  L 2400 3501  L 2400 1830  L 4070 1830  L 4070 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXGeneral-Regular-22ef" d="M 5235 1619  Q 5235 1453 5123 1331  Q 5011 1210 4832 1210  Q 4646 1210 4534 1322  Q 4422 1434 4422 1619  Q 4422 1792 4547 1907  Q 4672 2022 4832 2022  Q 4992 2022 5113 1907  Q 5235 1792 5235 1619  z M 3366 1619  Q 3366 1453 3254 1331  Q 3142 1210 2963 1210  Q 2778 1210 2666 1322  Q 2554 1434 2554 1619  Q 2554 1792 2678 1907  Q 2803 2022 2963 2022  Q 3123 2022 3244 1907  Q 3366 1792 3366 1619  z M 1504 1619  Q 1504 1453 1392 1331  Q 1280 1210 1101 1210  Q 915 1210 803 1322  Q 691 1434 691 1619  Q 691 1792 816 1907  Q 941 2022 1101 2022  Q 1261 2022 1382 1907  Q 1504 1792 1504 1619  z " transform="scale(0.015625)"></path>
     <path id="eq-9-STIXSizeTwoSym-Regular-29" d="M 730 9792  L 730 10022  Q 1805 9011 2432 7507  Q 3059 6003 3059 4115  Q 3059 2234 2416 643  Q 1773 -947 730 -1786  L 730 -1574  Q 1459 -826 1955 633  Q 2451 2093 2451 4115  Q 2451 7674 730 9792  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-9-STIXGeneral-Italic-78" transform="translate(0 58.315156) scale(0.7)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Italic-63" transform="translate(31.079996 49.055469) scale(0.49)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Regular-2c" transform="translate(52.835993 49.055469) scale(0.49)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Regular-70" transform="translate(72.161583 49.055469) scale(0.49)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Regular-6c" transform="translate(96.661576 49.055469) scale(0.49)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Regular-61" transform="translate(110.28357 49.055469) scale(0.49)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Regular-74" transform="translate(132.039567 49.055469) scale(0.49)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Regular-65" transform="translate(145.661561 49.055469) scale(0.49)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Italic-66" transform="translate(76 -40.286875) scale(0.7)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Regular-3d" transform="translate(197.444117 0.624063)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Regular-2212" transform="translate(280.384098 0.624063)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Italic-64" transform="translate(358.884083 39.32875) scale(0.7)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Italic-6e" transform="translate(348.884083 -40.286875) scale(0.7)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Italic-66" transform="translate(383.884072 -40.286875) scale(0.7)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Italic-75" transform="translate(415.844063 0.624063)"></use>
    <use xlink:href="#eq-9-STIXSizeTwoSym-Regular-28" transform="translate(465.844048 -28.964375) scale(0.803669)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Regular-31" transform="translate(513.184914 0.624063)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Regular-2b" transform="translate(577.624895 0.624063)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Italic-75" transform="translate(677.564876 39.186563) scale(0.7)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Regular-32" transform="translate(716.886053 63.879063) scale(0.49)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Regular-32" transform="translate(660.564876 -50.6425) scale(0.7)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Italic-6e" transform="translate(695.564866 -50.6425) scale(0.7)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Regular-32" transform="translate(734.886043 -25.95) scale(0.49)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Regular-2b" transform="translate(789.412594 0.624063)"></use>
    <use xlink:href="#eq-9-STIXGeneral-Regular-22ef" transform="translate(872.352575 0.624063)"></use>
    <use xlink:href="#eq-9-STIXSizeTwoSym-Regular-29" transform="translate(964.952566 -28.964375) scale(0.803669)"></use>
    <path d="M 0 13.420938  L 0 19.670938  L 170.504121 19.670938  L 170.504121 13.420938  L 0 13.420938  z "></path>
    <path d="M 348.884083 13.420938  L 348.884083 19.670938  L 403.344063 19.670938  L 403.344063 13.420938  L 348.884083 13.420938  z "></path>
    <path d="M 660.564876 13.420938  L 660.564876 19.670938  L 762.472598 19.670938  L 762.472598 13.420938  L 660.564876 13.420938  z "></path>
   </g>
  </g>
 </g>
</svg></div>
    <p>小角度希望一次项与 <var>−u</var> 匹配，会得到 <var>d≈nf</var>。但有限角域的实际优化还要处理高阶项，最优厚度不必恰好等于这个近轴估计。折射率增大可减弱此展开中的非线性项，但材料、厚度和器件整体要求仍需要共同考虑。</p>
  </details>
  <div class="insight"><span class="note-label">阅读分析</span><p>这一组图说明，相位函数与系统几何必须配套。评价方案时应同时记录视场和有效孔径：限制局部受照区域有助于控制像差，也改变了分辨率与收光能力。双片结构提供进一步校正的自由度，代价则转移到制造和对准。</p></div>
</section>
<section id="implementation" class="article-section">
  <p class="section-kicker"><span class="chapter-num">05</span>从连续目标走到实际器件</p>
  <h2>理想相位相同，实际角度响应仍可能不同</h2>
  <h3>图 4 比较的是具体结构的斜入射行为</h3>
  <p>第 3.1 节强调：轴上或近轴相位相似的体透镜和二次超透镜，在斜入射下不一定表现相同。图 4 对比了 <strong>0°、15°、30°</strong> 入射时的聚焦行为；在所比较的结构中，二次超透镜保持图示的轴向焦平面关系，而体二次透镜的最佳聚焦位置随角度移动。<a class="cite no-styling" href="#ref-review">[综述 §3.1，图 4；原文参考文献 85]</a></p>
  <figure class="paper-figure" id="figure-4"><button type="button" class="zoom-button" data-title="图 4 · 体二次透镜与二次超透镜" aria-label="放大查看图 4 · 体二次透镜与二次超透镜"><img src="/assets/wide-angle-metalens-reading/figure-4.png" loading="lazy" width="809" height="1242" alt="图 4 · 体二次透镜与二次超透镜" decoding="async" data-figure-key="4"><span class="zoom-hint" aria-hidden="true">点击放大 ↗</span></button><figcaption><strong>图 4 · 体二次透镜与二次超透镜。</strong>原文在三个入射角下比较两种具体结构的聚焦行为。读图时同时查看焦斑形态和轴向位置，不把这一结构比较推广成全部体光学与全部超表面的优劣判断。<span class="figure-source">论文原图 · <a class="no-styling" href="#ref-review">[R1 p.6，图 4]</a> · 保留原图中的引文与来源标注。</span></figcaption></figure>
  <p>这一比较提示我们关注<strong>器件的真实角度响应</strong>。它不能被推广为“所有体光学系统都无法广角成像”，也不意味着任何平面结构天然角度鲁棒。对于复杂折射系统，多片设计本身就提供了像差校正的自由度。</p>
  <h3>相位按 2π 折回，与实体边界是两件事</h3>
  <div class="math" data-tex="\exp[i(\phi+2\pi m)]=\exp(i\phi),\qquad m\in\mathbb{Z}" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="235pt" height="15pt" viewBox="0 0 235 15" version="1.1" role="img" aria-label="exp[i(φ+2πm)]=exp(iφ)，m 为整数" focusable="false">
 <title>exp[i(φ+2πm)]=exp(iφ)，m 为整数</title><defs>
 </defs>
 <g id="eq-10-figure_1">
  <g id="eq-10-patch_1">
   <path d="M 0 15  L 235 15  L 235 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-10-text_1">
   <!-- $\exp[i(\phi+2\pi m)]=\exp(i\phi),\qquad m\in\mathbb{Z}$ -->
   <g style="fill: #17313d" transform="translate(0 11) scale(0.16 -0.16)">
    <defs>
     <path id="eq-10-STIXGeneral-Regular-65" d="M 2611 1050  L 2714 1005  Q 2330 -64 1376 -64  Q 813 -64 486 329  Q 160 723 160 1389  Q 160 2074 525 2509  Q 890 2944 1485 2944  Q 2061 2944 2374 2502  Q 2560 2246 2592 1773  L 621 1773  Q 646 1370 700 1158  Q 755 947 915 730  Q 1184 378 1626 378  Q 1939 378 2153 531  Q 2368 685 2611 1050  z M 634 1978  L 1939 1978  Q 1882 2381 1750 2547  Q 1619 2714 1312 2714  Q 1043 2714 864 2525  Q 685 2336 634 1978  z " transform="scale(0.015625)"></path>
     <path id="eq-10-STIXGeneral-Regular-78" d="M 3066 0  L 1779 0  L 1779 96  Q 1939 109 1987 137  Q 2035 166 2035 250  Q 2035 307 1997 365  L 1414 1261  L 909 474  Q 781 275 781 211  Q 781 96 1037 96  L 1037 0  L 109 0  L 109 96  Q 269 109 355 169  Q 442 230 576 422  L 1306 1478  L 704 2400  Q 557 2624 454 2704  Q 352 2784 211 2784  L 154 2784  L 154 2880  L 1478 2880  L 1478 2784  Q 1203 2778 1203 2643  Q 1203 2509 1498 2074  Q 1581 1958 1587 1946  Q 1619 1990 1779 2227  Q 1811 2285 1856 2349  Q 1901 2413 1923 2451  Q 1946 2490 1971 2528  Q 1997 2566 2006 2595  Q 2016 2624 2016 2643  Q 2016 2765 1760 2784  L 1760 2880  L 2771 2880  L 2771 2784  Q 2445 2771 2253 2502  L 1722 1734  L 2541 480  Q 2790 96 3066 96  L 3066 0  z " transform="scale(0.015625)"></path>
     <path id="eq-10-STIXGeneral-Regular-70" d="M 1018 2931  L 1018 2438  Q 1421 2944 1939 2944  Q 2406 2944 2707 2560  Q 3008 2176 3008 1581  Q 3008 883 2621 409  Q 2234 -64 1664 -64  Q 1466 -64 1328 -6  Q 1190 51 1018 211  L 1018 -794  Q 1018 -1094 1120 -1180  Q 1222 -1267 1581 -1274  L 1581 -1389  L 32 -1389  L 32 -1280  Q 314 -1254 397 -1171  Q 480 -1088 480 -838  L 480 2157  Q 480 2381 429 2451  Q 378 2522 218 2522  Q 115 2522 58 2515  L 58 2618  Q 506 2752 979 2944  L 1018 2931  z M 1018 2138  L 1018 563  Q 1018 422 1238 281  Q 1459 141 1683 141  Q 2029 141 2243 467  Q 2458 794 2458 1325  Q 2458 1888 2243 2224  Q 2029 2560 1670 2560  Q 1446 2560 1232 2419  Q 1018 2278 1018 2138  z " transform="scale(0.015625)"></path>
     <path id="eq-10-STIXGeneral-Regular-5b" d="M 1914 -998  L 563 -998  L 563 4237  L 1914 4237  L 1914 4077  L 1382 4077  Q 1216 4077 1133 4006  Q 1050 3936 1050 3770  L 1050 -493  Q 1050 -838 1382 -838  L 1914 -838  L 1914 -998  z " transform="scale(0.015625)"></path>
     <path id="eq-10-STIXGeneral-Italic-69" d="M 1690 3834  Q 1690 3699 1597 3603  Q 1504 3507 1376 3507  Q 1235 3507 1152 3600  Q 1069 3693 1069 3846  Q 1069 3994 1155 4090  Q 1242 4186 1370 4186  Q 1498 4186 1594 4080  Q 1690 3974 1690 3834  z M 1421 730  L 1504 659  Q 1235 243 1049 86  Q 864 -70 627 -70  Q 314 -70 314 282  Q 314 467 454 992  L 762 2125  Q 819 2330 819 2406  Q 819 2502 745 2528  Q 672 2554 410 2560  L 410 2662  Q 704 2688 1434 2822  L 1459 2803  L 858 608  Q 794 390 794 326  Q 794 230 883 230  Q 1043 230 1421 730  z " transform="scale(0.015625)"></path>
     <path id="eq-10-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-10-STIXGeneral-Italic-3d5" d="M 3078 4371  L 2650 2822  Q 3098 2822 3296 2746  Q 3808 2547 3808 1939  Q 3808 1709 3728 1446  Q 3648 1184 3481 915  Q 3315 646 3088 425  Q 2861 205 2537 67  Q 2214 -70 1850 -70  L 1504 -1312  L 1005 -1312  L 1350 -70  Q 883 -70 666 0  Q 173 160 173 819  Q 173 1018 256 1274  Q 339 1530 502 1802  Q 666 2074 886 2301  Q 1107 2528 1417 2675  Q 1728 2822 2061 2822  L 2157 2822  L 2586 4371  L 3078 4371  z M 2611 2688  L 1888 64  Q 2125 64 2330 166  Q 2694 352 2982 998  Q 3270 1645 3270 2093  Q 3270 2464 2982 2643  Q 2906 2688 2611 2688  z M 1389 64  L 2118 2688  Q 1760 2688 1427 2365  Q 1094 2042 902 1568  Q 710 1094 710 646  Q 710 237 1018 115  Q 1152 64 1389 64  z " transform="scale(0.015625)"></path>
     <path id="eq-10-STIXGeneral-Regular-2b" d="M 4070 1408  L 2400 1408  L 2400 -262  L 1978 -262  L 1978 1408  L 307 1408  L 307 1830  L 1978 1830  L 1978 3501  L 2400 3501  L 2400 1830  L 4070 1830  L 4070 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-10-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-10-STIXGeneral-Italic-3c0" d="M 3430 2739  L 3296 2266  L 2643 2266  Q 2624 2195 2502 1782  Q 2381 1370 2297 1072  Q 2214 774 2214 717  Q 2214 448 2413 448  Q 2694 448 2867 838  L 2970 838  Q 2886 486 2652 208  Q 2419 -70 2093 -70  Q 1901 -70 1808 67  Q 1715 205 1715 410  Q 1715 627 1824 922  L 2310 2266  L 1645 2266  Q 1568 2061 1401 1469  Q 1235 877 1068 512  Q 902 147 672 -38  Q 563 -115 442 -115  Q 314 -115 218 -32  Q 122 51 122 166  Q 122 429 314 480  Q 634 563 774 928  L 1299 2266  L 1261 2266  Q 973 2266 819 2208  Q 666 2150 474 1914  L 371 1914  Q 640 2362 931 2550  Q 1222 2739 1696 2739  L 3430 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-10-STIXGeneral-Italic-6d" d="M 4506 672  L 4474 627  Q 3981 -58 3552 -58  Q 3296 -58 3296 237  Q 3296 333 3379 659  L 3750 2112  Q 3795 2291 3795 2355  Q 3795 2413 3756 2451  Q 3718 2490 3667 2490  Q 3366 2490 2829 1741  Q 2592 1408 2457 1072  Q 2323 736 2138 0  L 1658 0  L 1830 595  Q 2266 2099 2266 2330  Q 2266 2490 2125 2490  Q 1965 2490 1702 2237  Q 1440 1984 1171 1574  Q 1011 1325 899 1043  Q 787 762 557 0  L 77 0  L 352 922  Q 704 2093 704 2381  Q 704 2522 442 2522  L 282 2522  L 282 2624  L 1318 2822  L 1338 2810  L 966 1472  Q 1798 2822 2374 2822  Q 2560 2822 2659 2720  Q 2758 2618 2758 2438  Q 2758 2195 2502 1466  Q 2842 2003 3069 2275  Q 3296 2547 3526 2694  Q 3731 2822 3930 2822  Q 4102 2822 4201 2710  Q 4301 2598 4301 2419  Q 4301 2336 4282 2240  L 3846 634  Q 3782 390 3782 346  Q 3782 243 3859 243  Q 4000 243 4275 582  L 4410 749  L 4506 672  z " transform="scale(0.015625)"></path>
     <path id="eq-10-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-10-STIXGeneral-Regular-5d" d="M 1568 -998  L 218 -998  L 218 -838  L 781 -838  Q 947 -838 1014 -768  Q 1082 -698 1082 -544  L 1082 3731  Q 1082 4077 755 4077  L 218 4077  L 218 4237  L 1568 4237  L 1568 -998  z " transform="scale(0.015625)"></path>
     <path id="eq-10-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-10-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-10-STIXGeneral-Regular-2208" d="M 4000 -173  L 2138 -173  Q 1382 -173 883 355  Q 384 883 384 1612  Q 384 2342 877 2870  Q 1370 3398 2118 3398  L 4000 3398  L 4000 2976  L 2144 2976  Q 1664 2976 1286 2633  Q 909 2291 826 1824  L 4000 1824  L 4000 1402  L 819 1402  Q 902 934 1280 592  Q 1658 250 2138 250  L 4000 250  L 4000 -173  z " transform="scale(0.015625)"></path>
     <path id="eq-10-STIXGeneral-Italic-2124" d="M 4800 3942  L 1382 256  L 1382 237  L 4128 237  L 4070 0  L 45 0  L 45 237  L 3494 3930  L 3494 3942  L 909 3942  L 966 4179  L 4800 4179  L 4800 3942  z M 4467 3942  L 3827 3942  L 390 237  L 1050 237  L 4467 3942  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-10-STIXGeneral-Regular-65" transform="translate(0 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Regular-78" transform="translate(44.399994 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Regular-70" transform="translate(94.399979 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Regular-5b" transform="translate(144.399963 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Italic-69" transform="translate(177.699951 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Regular-28" transform="translate(205.499939 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Italic-3d5" transform="translate(238.799927 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Regular-2b" transform="translate(315.93992 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Regular-32" transform="translate(398.879901 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Italic-3c0" transform="translate(448.879886 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Italic-6d" transform="translate(499.27988 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Regular-29" transform="translate(571.479861 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Regular-5d" transform="translate(604.779849 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Regular-3d" transform="translate(652.519833 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Regular-65" transform="translate(735.459814 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Regular-78" transform="translate(779.859808 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Regular-70" transform="translate(829.859793 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Regular-28" transform="translate(879.859778 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Italic-69" transform="translate(913.159766 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Italic-3d5" transform="translate(940.959753 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Regular-29" transform="translate(1003.65975 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Regular-2c" transform="translate(1036.959738 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Italic-6d" transform="translate(1220.799683 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Regular-2208" transform="translate(1307.439661 0.703125)"></use>
    <use xlink:href="#eq-10-STIXGeneral-Italic-2124" transform="translate(1390.379642 0.703125)"></use>
   </g>
  </g>
 </g>
</svg></div>
  <p>在设计波长下，理想相位掩模中的整数圈相位等价。传统浮雕衍射结构把相位延迟转换成材料厚度时，折回可能对应实体表面的高度突变。真实台阶与侧壁会带来遮挡、散射和非目标衍射级次，短周期结构尤其需要超出简单标量相位屏的分析。<strong>数学上的取模本身不产生阴影；困难来自具体物理实现。</strong><a class="cite no-styling" href="#ref-review">[综述 §3.1末，p.6–7]</a></p>
  <details class="derivation"><summary>补充推导：曲率、厚度差与二次相位的薄透镜关系</summary>
    <p>用空气中的对称双凸薄透镜作独立示例，半径为 <var>R</var> 的球面在径向位置 <var>r</var> 的矢高为：</p>
    <div class="math" data-tex="h(r)=R-\sqrt{R^2-r^2}\simeq\frac{r^2}{2R}" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="162pt" height="24pt" viewBox="0 0 162 24" version="1.1" role="img" aria-label="h(r)=R−√(R²−r²)≈r²/(2R)" focusable="false">
 <title>h(r)=R−√(R²−r²)≈r²/(2R)</title><defs>
 </defs>
 <g id="eq-11-figure_1">
  <g id="eq-11-patch_1">
   <path d="M 0 24  L 162 24  L 162 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-11-text_1">
   <!-- $h(r)=R-\sqrt{R^2-r^2}\simeq\frac{r^2}{2R}$ -->
   <g style="fill: #17313d" transform="translate(0 17) scale(0.16 -0.16)">
    <defs>
     <path id="eq-11-STIXGeneral-Italic-68" d="M 2976 755  L 3059 672  Q 2765 256 2566 99  Q 2368 -58 2125 -58  Q 1997 -58 1920 16  Q 1843 90 1843 211  Q 1843 320 1971 800  L 2323 2125  Q 2368 2304 2368 2336  Q 2368 2496 2189 2496  Q 2016 2496 1744 2240  Q 1472 1984 1216 1600  Q 1018 1293 902 1001  Q 787 710 602 0  L 122 0  L 1056 3546  Q 1139 3866 1139 3942  Q 1139 4019 1056 4060  Q 973 4102 877 4102  L 704 4102  L 704 4198  Q 1190 4256 1709 4371  L 1754 4333  L 979 1472  Q 1811 2822 2451 2822  Q 2662 2822 2764 2704  Q 2867 2586 2867 2394  Q 2867 2118 2560 1158  Q 2349 512 2349 358  Q 2349 243 2451 243  Q 2528 243 2621 336  Q 2714 429 2976 755  z " transform="scale(0.015625)"></path>
     <path id="eq-11-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-11-STIXGeneral-Italic-72" d="M 1126 1427  L 1229 1651  Q 1446 2131 1830 2534  Q 2106 2822 2336 2822  Q 2470 2822 2553 2732  Q 2637 2643 2637 2496  Q 2637 2349 2557 2249  Q 2477 2150 2336 2150  Q 2214 2150 2112 2317  Q 2061 2406 2010 2406  Q 1837 2406 1485 1805  Q 1267 1434 1136 1104  Q 1005 774 774 0  L 288 0  L 806 1869  Q 909 2246 909 2394  Q 909 2560 666 2560  Q 614 2560 467 2541  L 467 2650  L 1459 2822  L 1478 2810  L 1126 1427  z " transform="scale(0.015625)"></path>
     <path id="eq-11-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-11-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-11-STIXGeneral-Italic-52" d="M 845 4179  L 2458 4179  Q 3078 4179 3420 3936  Q 3763 3693 3763 3277  Q 3763 2778 3341 2458  Q 3091 2266 2502 2131  L 3072 627  Q 3181 333 3299 217  Q 3418 102 3629 102  L 3629 0  L 2688 0  L 1901 2074  L 1478 2106  L 1126 806  Q 1043 512 1043 403  Q 1043 256 1126 192  Q 1210 128 1472 102  L 1472 0  L -83 0  L -83 102  Q 173 134 278 243  Q 384 352 461 646  L 1222 3405  Q 1299 3699 1299 3808  Q 1299 3923 1210 3987  Q 1133 4038 845 4077  L 845 4179  z M 1958 3795  L 1555 2342  Q 1754 2310 1882 2310  Q 2451 2310 2771 2566  Q 3091 2822 3091 3270  Q 3091 3603 2892 3795  Q 2694 3987 2323 3987  Q 2010 3987 1958 3795  z " transform="scale(0.015625)"></path>
     <path id="eq-11-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-11-STIXGeneral-Regular-221a" d="M 6163 6227  L 3104 -1658  L 2899 -1658  L 1606 1734  Q 1466 2112 1210 2112  Q 1011 2112 794 1914  L 717 2042  L 1715 2835  L 1837 2835  L 3142 -595  L 3168 -595  L 5818 6227  L 6163 6227  z " transform="scale(0.015625)"></path>
     <path id="eq-11-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-11-STIXGeneral-Regular-2243" d="M 3866 2848  L 4077 2848  Q 4045 2374 3769 1958  Q 3494 1542 3066 1542  Q 2803 1542 2460 1747  Q 2118 1952 1804 2157  Q 1491 2362 1306 2362  Q 992 2362 800 2112  Q 608 1862 518 1478  L 307 1478  Q 333 1997 617 2390  Q 902 2784 1350 2784  Q 1613 2784 1955 2579  Q 2298 2374 2611 2169  Q 2925 1965 3117 1965  Q 3680 1965 3866 2848  z M 4077 352  L 307 352  L 307 774  L 4077 774  L 4077 352  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-11-STIXGeneral-Italic-68" transform="translate(0 0.703125)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Regular-28" transform="translate(49.999985 0.703125)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Italic-72" transform="translate(83.299973 0.703125)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Regular-29" transform="translate(122.199966 0.703125)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Regular-3d" transform="translate(169.939951 0.703125)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Italic-52" transform="translate(252.879932 0.703125)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Regular-2212" transform="translate(328.419919 0.703125)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Regular-221a" transform="translate(411.3599 0.703125)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Italic-52" transform="translate(516.659888 1.159375)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Regular-32" transform="translate(588.38566 36.434375) scale(0.7)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Regular-2212" transform="translate(642.23502 1.159375)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Italic-72" transform="translate(725.175002 1.159375)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Regular-32" transform="translate(770.24812 36.434375) scale(0.7)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Regular-2243" transform="translate(836.597481 0.703125)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Italic-72" transform="translate(928.537462 38.5) scale(0.7)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Regular-32" transform="translate(960.088645 63.1925) scale(0.49)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Regular-32" transform="translate(919.537462 -40.065625) scale(0.7)"></use>
    <use xlink:href="#eq-11-STIXGeneral-Italic-52" transform="translate(954.537451 -40.065625) scale(0.7)"></use>
    <path d="M 504.159888 91.5  L 504.159888 97.75  L 822.157485 97.75  L 822.157485 91.5  L 504.159888 91.5  z "></path>
    <path d="M 919.537462 13.5  L 919.537462 19.75  L 997.307445 19.75  L 997.307445 13.5  L 919.537462 13.5  z "></path>
   </g>
  </g>
 </g>
</svg></div>
    <div class="math" data-tex="\Delta\phi\simeq-2k_0(n-1)h(r)=-\frac{k_0(n-1)}{R}r^2" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="223pt" height="23pt" viewBox="0 0 223 23" version="1.1" role="img" aria-label="Δφ≈−2k₀(n−1)h(r)=−k₀(n−1)r²/R" focusable="false">
 <title>Δφ≈−2k₀(n−1)h(r)=−k₀(n−1)r²/R</title><defs>
 </defs>
 <g id="eq-12-figure_1">
  <g id="eq-12-patch_1">
   <path d="M 0 23  L 223 23  L 223 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-12-text_1">
   <!-- $\Delta\phi\simeq-2k_0(n-1)h(r)=-\frac{k_0(n-1)}{R}r^2$ -->
   <g style="fill: #17313d" transform="translate(0 16) scale(0.16 -0.16)">
    <defs>
     <path id="eq-12-STIXGeneral-Regular-394" d="M 4320 0  L 307 0  L 2221 4314  L 2349 4314  L 4320 0  z M 3354 589  L 2118 3405  L 870 589  L 3354 589  z " transform="scale(0.015625)"></path>
     <path id="eq-12-STIXGeneral-Italic-3d5" d="M 3078 4371  L 2650 2822  Q 3098 2822 3296 2746  Q 3808 2547 3808 1939  Q 3808 1709 3728 1446  Q 3648 1184 3481 915  Q 3315 646 3088 425  Q 2861 205 2537 67  Q 2214 -70 1850 -70  L 1504 -1312  L 1005 -1312  L 1350 -70  Q 883 -70 666 0  Q 173 160 173 819  Q 173 1018 256 1274  Q 339 1530 502 1802  Q 666 2074 886 2301  Q 1107 2528 1417 2675  Q 1728 2822 2061 2822  L 2157 2822  L 2586 4371  L 3078 4371  z M 2611 2688  L 1888 64  Q 2125 64 2330 166  Q 2694 352 2982 998  Q 3270 1645 3270 2093  Q 3270 2464 2982 2643  Q 2906 2688 2611 2688  z M 1389 64  L 2118 2688  Q 1760 2688 1427 2365  Q 1094 2042 902 1568  Q 710 1094 710 646  Q 710 237 1018 115  Q 1152 64 1389 64  z " transform="scale(0.015625)"></path>
     <path id="eq-12-STIXGeneral-Regular-2243" d="M 3866 2848  L 4077 2848  Q 4045 2374 3769 1958  Q 3494 1542 3066 1542  Q 2803 1542 2460 1747  Q 2118 1952 1804 2157  Q 1491 2362 1306 2362  Q 992 2362 800 2112  Q 608 1862 518 1478  L 307 1478  Q 333 1997 617 2390  Q 902 2784 1350 2784  Q 1613 2784 1955 2579  Q 2298 2374 2611 2169  Q 2925 1965 3117 1965  Q 3680 1965 3866 2848  z M 4077 352  L 307 352  L 307 774  L 4077 774  L 4077 352  z " transform="scale(0.015625)"></path>
     <path id="eq-12-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-12-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-12-STIXGeneral-Italic-6b" d="M 2950 2739  L 2950 2637  Q 2720 2624 2464 2448  Q 2208 2272 1510 1651  L 1747 1088  Q 2099 262 2266 262  Q 2400 262 2554 531  Q 2586 582 2650 698  L 2746 627  Q 2522 224 2374 77  Q 2227 -70 2035 -70  Q 1894 -70 1782 42  Q 1670 154 1517 454  Q 1325 826 1133 1357  L 877 1152  L 570 0  L 90 0  L 992 3379  Q 1082 3699 1107 3942  Q 1088 4096 781 4096  L 666 4096  L 666 4198  Q 1146 4256 1670 4371  L 1709 4333  L 941 1414  L 1216 1626  Q 2131 2330 2131 2522  Q 2131 2637 1894 2637  L 1805 2637  L 1805 2739  L 2950 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-12-STIXGeneral-Regular-30" d="M 3046 2112  Q 3046 1683 2963 1302  Q 2880 922 2717 602  Q 2554 282 2266 96  Q 1978 -90 1600 -90  Q 1210 -90 915 108  Q 621 307 461 640  Q 301 973 227 1350  Q 154 1728 154 2150  Q 154 2746 301 3222  Q 448 3699 790 4012  Q 1133 4326 1626 4326  Q 2253 4326 2649 3712  Q 3046 3098 3046 2112  z M 2432 2080  Q 2432 3091 2217 3625  Q 2003 4160 1587 4160  Q 1190 4160 979 3622  Q 768 3085 768 2106  Q 768 1120 979 598  Q 1190 77 1600 77  Q 2003 77 2217 598  Q 2432 1120 2432 2080  z " transform="scale(0.015625)"></path>
     <path id="eq-12-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-12-STIXGeneral-Italic-6e" d="M 2944 749  L 3034 666  Q 2707 218 2534 80  Q 2362 -58 2138 -58  Q 2010 -58 1923 28  Q 1837 115 1837 288  Q 1837 390 1939 768  L 2221 1805  Q 2310 2150 2310 2310  Q 2310 2496 2157 2496  Q 1971 2496 1750 2275  Q 1530 2054 1210 1587  Q 998 1274 899 1024  Q 800 774 570 0  L 90 0  L 704 2240  Q 717 2304 717 2349  Q 717 2445 630 2480  Q 544 2515 301 2522  L 301 2624  Q 550 2675 857 2729  Q 1165 2784 1338 2822  L 1363 2810  L 934 1414  Q 1408 2170 1753 2496  Q 2099 2822 2413 2822  Q 2611 2822 2720 2716  Q 2829 2611 2829 2432  Q 2829 2272 2765 2048  L 2406 749  Q 2317 429 2317 358  Q 2317 243 2419 243  Q 2541 243 2810 582  Q 2854 634 2944 749  z " transform="scale(0.015625)"></path>
     <path id="eq-12-STIXGeneral-Regular-31" d="M 2522 0  L 755 0  L 755 96  Q 1107 115 1235 227  Q 1363 339 1363 608  L 1363 3482  Q 1363 3795 1171 3795  Q 1082 3795 883 3718  L 710 3654  L 710 3744  L 1856 4326  L 1914 4307  L 1914 486  Q 1914 275 2042 185  Q 2170 96 2522 96  L 2522 0  z " transform="scale(0.015625)"></path>
     <path id="eq-12-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-12-STIXGeneral-Italic-68" d="M 2976 755  L 3059 672  Q 2765 256 2566 99  Q 2368 -58 2125 -58  Q 1997 -58 1920 16  Q 1843 90 1843 211  Q 1843 320 1971 800  L 2323 2125  Q 2368 2304 2368 2336  Q 2368 2496 2189 2496  Q 2016 2496 1744 2240  Q 1472 1984 1216 1600  Q 1018 1293 902 1001  Q 787 710 602 0  L 122 0  L 1056 3546  Q 1139 3866 1139 3942  Q 1139 4019 1056 4060  Q 973 4102 877 4102  L 704 4102  L 704 4198  Q 1190 4256 1709 4371  L 1754 4333  L 979 1472  Q 1811 2822 2451 2822  Q 2662 2822 2764 2704  Q 2867 2586 2867 2394  Q 2867 2118 2560 1158  Q 2349 512 2349 358  Q 2349 243 2451 243  Q 2528 243 2621 336  Q 2714 429 2976 755  z " transform="scale(0.015625)"></path>
     <path id="eq-12-STIXGeneral-Italic-72" d="M 1126 1427  L 1229 1651  Q 1446 2131 1830 2534  Q 2106 2822 2336 2822  Q 2470 2822 2553 2732  Q 2637 2643 2637 2496  Q 2637 2349 2557 2249  Q 2477 2150 2336 2150  Q 2214 2150 2112 2317  Q 2061 2406 2010 2406  Q 1837 2406 1485 1805  Q 1267 1434 1136 1104  Q 1005 774 774 0  L 288 0  L 806 1869  Q 909 2246 909 2394  Q 909 2560 666 2560  Q 614 2560 467 2541  L 467 2650  L 1459 2822  L 1478 2810  L 1126 1427  z " transform="scale(0.015625)"></path>
     <path id="eq-12-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-12-STIXGeneral-Italic-52" d="M 845 4179  L 2458 4179  Q 3078 4179 3420 3936  Q 3763 3693 3763 3277  Q 3763 2778 3341 2458  Q 3091 2266 2502 2131  L 3072 627  Q 3181 333 3299 217  Q 3418 102 3629 102  L 3629 0  L 2688 0  L 1901 2074  L 1478 2106  L 1126 806  Q 1043 512 1043 403  Q 1043 256 1126 192  Q 1210 128 1472 102  L 1472 0  L -83 0  L -83 102  Q 173 134 278 243  Q 384 352 461 646  L 1222 3405  Q 1299 3699 1299 3808  Q 1299 3923 1210 3987  Q 1133 4038 845 4077  L 845 4179  z M 1958 3795  L 1555 2342  Q 1754 2310 1882 2310  Q 2451 2310 2771 2566  Q 3091 2822 3091 3270  Q 3091 3603 2892 3795  Q 2694 3987 2323 3987  Q 2010 3987 1958 3795  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-12-STIXGeneral-Regular-394" transform="translate(0 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Italic-3d5" transform="translate(72.199982 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-2243" transform="translate(149.339975 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-2212" transform="translate(246.719952 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-32" transform="translate(329.659933 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Italic-6b" transform="translate(379.659918 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-30" transform="translate(424.059912 -13.225) scale(0.7)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-28" transform="translate(463.469276 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Italic-6e" transform="translate(496.769264 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-2212" transform="translate(561.209245 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-31" transform="translate(644.149226 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-29" transform="translate(694.149211 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Italic-68" transform="translate(727.449199 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-28" transform="translate(777.449184 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Italic-72" transform="translate(810.749171 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-29" transform="translate(849.649165 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-3d" transform="translate(897.389149 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-2212" transform="translate(980.329131 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Italic-6b" transform="translate(1048.829115 50.192188) scale(0.7)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-30" transform="translate(1079.909111 40.9325) scale(0.49)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-28" transform="translate(1107.495666 50.192188) scale(0.7)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Italic-6e" transform="translate(1130.805658 50.192188) scale(0.7)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-2212" transform="translate(1175.913644 50.192188) scale(0.7)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-31" transform="translate(1233.971631 50.192188) scale(0.7)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-29" transform="translate(1268.97162 50.192188) scale(0.7)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Italic-52" transform="translate(1148.829115 -39.157812) scale(0.7)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Italic-72" transform="translate(1304.781612 0.003125)"></use>
    <use xlink:href="#eq-12-STIXGeneral-Regular-32" transform="translate(1349.854731 35.278125) scale(0.7)"></use>
    <path d="M 1048.829115 12.8  L 1048.829115 19.05  L 1292.281612 19.05  L 1292.281612 12.8  L 1048.829115 12.8  z "></path>
   </g>
  </g>
 </g>
</svg></div>
    <p>若 <var>f=R/[2(n−1)]</var>，就得到二次项 <var>−k₀r²/(2f)</var>。这仅用于说明相位项如何出现；斜入射的厚度路径、界面折射和像差行为需要另行计算。本篇采用这一独立推导，不把原文式（3）的疑似符号问题当作已确认勘误，详见文末校读说明。</p>
  </details>
</section>
<section id="sampling" class="article-section">
  <p class="section-kicker"><span class="chapter-num">06</span>实现困难</p>
  <h2>采样与耦合：单元越密，问题并不只剩制造精度</h2>
  <h3>先区分局部相位周期与单元间距</h3>
  <p>对于二次相位，径向相位梯度的绝对值为：</p>
  <div class="math" data-tex="\left|\frac{d\phi_q}{dr}\right|=\frac{k_0r}{f},\qquad \Lambda_{\mathrm{loc}}(r)\simeq\frac{2\pi}{|d\phi_q/dr|}=\frac{\lambda f}{r}" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="215pt" height="27pt" viewBox="0 0 215 27" version="1.1" role="img" aria-label="|dφq/dr|=k₀r/f；Λloc≈λf/r" focusable="false">
 <title>|dφq/dr|=k₀r/f；Λloc≈λf/r</title><defs>
 </defs>
 <g id="eq-13-figure_1">
  <g id="eq-13-patch_1">
   <path d="M 0 27  L 215 27  L 215 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-13-text_1">
   <!-- $\left|\frac{d\phi_q}{dr}\right|=\frac{k_0r}{f},\qquad \Lambda_{\mathrm{loc}}(r)\simeq\frac{2\pi}{|d\phi_q/dr|}=\frac{\lambda f}{r}$ -->
   <g style="fill: #17313d" transform="translate(0 17) scale(0.16 -0.16)">
    <defs>
     <path id="eq-13-STIXGeneral-Regular-7c" d="M 851 -90  L 429 -90  L 429 4326  L 851 4326  L 851 -90  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Italic-64" d="M 3334 4371  L 3373 4333  L 3123 3360  L 2739 1958  Q 2323 429 2323 384  Q 2323 256 2438 256  Q 2522 256 2614 336  Q 2707 416 2963 710  L 3040 646  Q 2547 -83 2099 -83  Q 1978 -83 1907 -6  Q 1837 70 1837 205  Q 1837 397 1920 774  Q 1645 307 1379 118  Q 1114 -70 781 -70  Q 461 -70 278 125  Q 96 320 96 678  Q 96 1440 713 2131  Q 1331 2822 1965 2822  Q 2163 2822 2256 2732  Q 2349 2643 2381 2451  L 2387 2451  L 2675 3494  Q 2765 3808 2765 3949  Q 2765 4051 2694 4076  Q 2624 4102 2355 4115  L 2355 4224  Q 2848 4269 3334 4371  z M 2278 2310  Q 2278 2477 2185 2576  Q 2093 2675 1978 2675  Q 1677 2675 1395 2381  Q 1075 2042 864 1571  Q 653 1101 653 704  Q 653 486 752 361  Q 851 237 1024 237  Q 1312 237 1606 550  Q 1901 864 2089 1350  Q 2278 1837 2278 2310  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Italic-3d5" d="M 3078 4371  L 2650 2822  Q 3098 2822 3296 2746  Q 3808 2547 3808 1939  Q 3808 1709 3728 1446  Q 3648 1184 3481 915  Q 3315 646 3088 425  Q 2861 205 2537 67  Q 2214 -70 1850 -70  L 1504 -1312  L 1005 -1312  L 1350 -70  Q 883 -70 666 0  Q 173 160 173 819  Q 173 1018 256 1274  Q 339 1530 502 1802  Q 666 2074 886 2301  Q 1107 2528 1417 2675  Q 1728 2822 2061 2822  L 2157 2822  L 2586 4371  L 3078 4371  z M 2611 2688  L 1888 64  Q 2125 64 2330 166  Q 2694 352 2982 998  Q 3270 1645 3270 2093  Q 3270 2464 2982 2643  Q 2906 2688 2611 2688  z M 1389 64  L 2118 2688  Q 1760 2688 1427 2365  Q 1094 2042 902 1568  Q 710 1094 710 646  Q 710 237 1018 115  Q 1152 64 1389 64  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Italic-71" d="M 3098 2739  L 2042 -966  Q 2029 -1018 2029 -1037  Q 2029 -1235 2394 -1235  L 2490 -1235  L 2490 -1338  L 973 -1338  L 973 -1235  Q 1267 -1216 1382 -1139  Q 1498 -1062 1555 -877  L 2131 979  Q 1754 378 1466 154  Q 1178 -70 800 -70  Q 499 -70 329 128  Q 160 326 160 672  Q 160 1165 445 1670  Q 730 2176 1168 2499  Q 1606 2822 2035 2822  Q 2438 2822 2528 2426  L 2630 2739  L 3098 2739  z M 2432 2298  Q 2432 2458 2323 2570  Q 2214 2682 2054 2682  Q 1792 2682 1459 2368  Q 1133 2054 921 1606  Q 710 1158 710 762  Q 710 269 1050 269  Q 1312 269 1574 499  Q 1901 781 2166 1341  Q 2432 1901 2432 2298  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Italic-72" d="M 1126 1427  L 1229 1651  Q 1446 2131 1830 2534  Q 2106 2822 2336 2822  Q 2470 2822 2553 2732  Q 2637 2643 2637 2496  Q 2637 2349 2557 2249  Q 2477 2150 2336 2150  Q 2214 2150 2112 2317  Q 2061 2406 2010 2406  Q 1837 2406 1485 1805  Q 1267 1434 1136 1104  Q 1005 774 774 0  L 288 0  L 806 1869  Q 909 2246 909 2394  Q 909 2560 666 2560  Q 614 2560 467 2541  L 467 2650  L 1459 2822  L 1478 2810  L 1126 1427  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Italic-6b" d="M 2950 2739  L 2950 2637  Q 2720 2624 2464 2448  Q 2208 2272 1510 1651  L 1747 1088  Q 2099 262 2266 262  Q 2400 262 2554 531  Q 2586 582 2650 698  L 2746 627  Q 2522 224 2374 77  Q 2227 -70 2035 -70  Q 1894 -70 1782 42  Q 1670 154 1517 454  Q 1325 826 1133 1357  L 877 1152  L 570 0  L 90 0  L 992 3379  Q 1082 3699 1107 3942  Q 1088 4096 781 4096  L 666 4096  L 666 4198  Q 1146 4256 1670 4371  L 1709 4333  L 941 1414  L 1216 1626  Q 2131 2330 2131 2522  Q 2131 2637 1894 2637  L 1805 2637  L 1805 2739  L 2950 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Regular-30" d="M 3046 2112  Q 3046 1683 2963 1302  Q 2880 922 2717 602  Q 2554 282 2266 96  Q 1978 -90 1600 -90  Q 1210 -90 915 108  Q 621 307 461 640  Q 301 973 227 1350  Q 154 1728 154 2150  Q 154 2746 301 3222  Q 448 3699 790 4012  Q 1133 4326 1626 4326  Q 2253 4326 2649 3712  Q 3046 3098 3046 2112  z M 2432 2080  Q 2432 3091 2217 3625  Q 2003 4160 1587 4160  Q 1190 4160 979 3622  Q 768 3085 768 2106  Q 768 1120 979 598  Q 1190 77 1600 77  Q 2003 77 2217 598  Q 2432 1120 2432 2080  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Italic-66" d="M 262 2739  L 858 2739  Q 1107 3546 1318 3846  Q 1664 4339 2163 4339  Q 2400 4339 2557 4227  Q 2714 4115 2714 3942  Q 2714 3834 2634 3750  Q 2554 3667 2445 3667  Q 2355 3667 2281 3737  Q 2208 3808 2208 3917  Q 2208 3981 2240 4038  Q 2272 4096 2272 4115  Q 2272 4198 2131 4198  Q 1862 4198 1676 3849  Q 1491 3501 1350 2739  L 2035 2739  L 1997 2534  L 1306 2534  L 845 486  Q 435 -1325 -435 -1325  Q -653 -1325 -797 -1213  Q -941 -1101 -941 -934  Q -941 -826 -870 -746  Q -800 -666 -698 -666  Q -589 -666 -521 -733  Q -454 -800 -454 -902  Q -454 -947 -483 -1001  Q -512 -1056 -512 -1088  Q -512 -1190 -384 -1190  Q 13 -1190 237 -154  L 800 2534  L 218 2534  L 262 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Regular-39b" d="M 4397 0  L 2765 0  L 2765 122  Q 2790 122 2841 125  Q 2893 128 2918 128  Q 2944 128 2985 131  Q 3027 134 3049 140  Q 3072 147 3101 156  Q 3130 166 3146 182  Q 3162 198 3178 220  Q 3194 243 3200 268  Q 3206 294 3206 333  Q 3206 474 3085 781  L 2061 3411  L 2048 3411  L 979 653  Q 922 506 922 384  Q 922 237 1027 179  Q 1133 122 1370 122  L 1370 0  L 96 0  L 96 122  Q 371 147 499 323  Q 627 499 902 1190  L 2157 4314  L 2285 4314  L 3795 710  Q 3930 384 4042 265  Q 4154 147 4397 122  L 4397 0  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Regular-6c" d="M 1645 0  L 134 0  L 134 96  Q 435 122 531 221  Q 627 320 627 589  L 627 3590  Q 627 3821 569 3910  Q 512 4000 358 4000  Q 224 4000 122 3987  L 122 4090  Q 730 4237 1133 4371  L 1165 4346  L 1165 557  Q 1165 288 1254 201  Q 1344 115 1645 96  L 1645 0  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Regular-6f" d="M 3008 1478  Q 3008 806 2608 371  Q 2208 -64 1568 -64  Q 979 -64 582 368  Q 186 800 186 1459  Q 186 2125 582 2534  Q 979 2944 1626 2944  Q 2221 2944 2614 2537  Q 3008 2131 3008 1478  z M 2432 1306  Q 2432 2035 2112 2445  Q 1856 2765 1504 2765  Q 1171 2765 966 2493  Q 762 2221 762 1747  Q 762 928 1101 435  Q 1318 115 1677 115  Q 2029 115 2230 432  Q 2432 749 2432 1306  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Regular-63" d="M 2547 998  L 2637 941  Q 2362 403 2112 205  Q 1786 -64 1376 -64  Q 845 -64 502 336  Q 160 736 160 1357  Q 160 2170 698 2618  Q 1094 2944 1562 2944  Q 1965 2944 2256 2749  Q 2547 2554 2547 2285  Q 2547 2176 2457 2096  Q 2368 2016 2246 2016  Q 2022 2016 1939 2310  L 1901 2451  Q 1850 2630 1773 2694  Q 1696 2758 1523 2758  Q 1133 2758 893 2451  Q 653 2144 653 1645  Q 653 1094 928 745  Q 1203 397 1645 397  Q 1920 397 2118 528  Q 2317 659 2547 998  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Regular-2243" d="M 3866 2848  L 4077 2848  Q 4045 2374 3769 1958  Q 3494 1542 3066 1542  Q 2803 1542 2460 1747  Q 2118 1952 1804 2157  Q 1491 2362 1306 2362  Q 992 2362 800 2112  Q 608 1862 518 1478  L 307 1478  Q 333 1997 617 2390  Q 902 2784 1350 2784  Q 1613 2784 1955 2579  Q 2298 2374 2611 2169  Q 2925 1965 3117 1965  Q 3680 1965 3866 2848  z M 4077 352  L 307 352  L 307 774  L 4077 774  L 4077 352  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Italic-3c0" d="M 3430 2739  L 3296 2266  L 2643 2266  Q 2624 2195 2502 1782  Q 2381 1370 2297 1072  Q 2214 774 2214 717  Q 2214 448 2413 448  Q 2694 448 2867 838  L 2970 838  Q 2886 486 2652 208  Q 2419 -70 2093 -70  Q 1901 -70 1808 67  Q 1715 205 1715 410  Q 1715 627 1824 922  L 2310 2266  L 1645 2266  Q 1568 2061 1401 1469  Q 1235 877 1068 512  Q 902 147 672 -38  Q 563 -115 442 -115  Q 314 -115 218 -32  Q 122 51 122 166  Q 122 429 314 480  Q 634 563 774 928  L 1299 2266  L 1261 2266  Q 973 2266 819 2208  Q 666 2150 474 1914  L 371 1914  Q 640 2362 931 2550  Q 1222 2739 1696 2739  L 3430 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Regular-2f" d="M 1837 4326  L 378 -90  L -58 -90  L 1408 4326  L 1837 4326  z " transform="scale(0.015625)"></path>
     <path id="eq-13-STIXGeneral-Italic-3bb" d="M 2656 787  L 2758 787  Q 2560 -102 2112 -102  Q 1965 -102 1869 48  Q 1773 198 1773 499  Q 1773 672 1789 889  Q 1805 1107 1833 1446  Q 1862 1786 1875 2016  L 538 0  L -77 0  L 1907 2739  Q 1933 2970 1933 3245  Q 1933 3936 1619 3936  Q 1530 3936 1408 3821  Q 1286 3706 1203 3462  L 1101 3462  Q 1312 4339 1747 4339  Q 1926 4339 2041 4115  Q 2157 3891 2157 3475  Q 2157 3040 2093 2192  Q 2029 1344 2029 941  Q 2029 602 2089 451  Q 2150 301 2291 301  Q 2483 301 2656 787  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-13-STIXGeneral-Regular-7c" transform="translate(0 -38.292812) scale(2.134452)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-64" transform="translate(42.699997 58.192188) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-3d5" transform="translate(77.699986 58.192188) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-71" transform="translate(121.589984 48.9325) scale(0.49)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-64" transform="translate(64.699997 -40.369375) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-72" transform="translate(99.699986 -40.369375) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Regular-7c" transform="translate(161.676539 -38.292812) scale(2.134452)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Regular-3d" transform="translate(218.816532 0.891563)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-6b" transform="translate(301.756514 48.637188) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Regular-30" transform="translate(332.836509 39.3775) scale(0.49)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-72" transform="translate(360.423064 48.637188) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-66" transform="translate(334.756514 -40.019375) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Regular-2c" transform="translate(400.15306 0.891563)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Regular-39b" transform="translate(583.993004 0.891563)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Regular-6c" transform="translate(655.736267 -12.336562) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Regular-6f" transform="translate(675.196259 -12.336562) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Regular-63" transform="translate(710.196248 -12.336562) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Regular-28" transform="translate(745.685619 0.891563)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-72" transform="translate(778.985607 0.891563)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Regular-29" transform="translate(817.885601 0.891563)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Regular-2243" transform="translate(865.625585 0.891563)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Regular-32" transform="translate(1021.565566 39.94625) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-3c0" transform="translate(1056.565555 39.94625) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Regular-7c" transform="translate(948.565566 -40.369375) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-64" transform="translate(962.565555 -40.369375) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-3d5" transform="translate(997.565544 -40.369375) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-71" transform="translate(1041.455542 -49.629062) scale(0.49)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Regular-2f" transform="translate(1069.042097 -40.369375) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-64" transform="translate(1088.502089 -40.369375) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-72" transform="translate(1123.502078 -40.369375) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Regular-7c" transform="translate(1150.732074 -40.369375) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Regular-3d" transform="translate(1191.672059 0.891563)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-3bb" transform="translate(1274.612041 53.180625) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-66" transform="translate(1306.672032 53.180625) scale(0.7)"></use>
    <use xlink:href="#eq-13-STIXGeneral-Italic-72" transform="translate(1286.612041 -23.427188) scale(0.7)"></use>
    <path d="M 42.699997 13.688438  L 42.699997 19.938438  L 149.176539 19.938438  L 149.176539 13.688438  L 42.699997 13.688438  z "></path>
    <path d="M 301.756514 13.688438  L 301.756514 19.938438  L 387.65306 19.938438  L 387.65306 13.688438  L 301.756514 13.688438  z "></path>
    <path d="M 948.565566 13.688438  L 948.565566 19.938438  L 1164.732063 19.938438  L 1164.732063 13.688438  L 948.565566 13.688438  z "></path>
    <path d="M 1274.612041 13.688437  L 1274.612041 19.938437  L 1326.132023 19.938437  L 1326.132023 13.688437  L 1274.612041 13.688437  z "></path>
   </g>
  </g>
 </g>
</svg></div>
  <p><strong>Λloc</strong> 是相位在局部变化一圈 <var>2π</var> 所需的距离，<strong>p</strong> 是相邻单元中心间距。两者的比值 <var>M≈Λloc/p</var> 可以粗略表示每个局部相位周期内有多少个采样间隔。这里的 <var>M</var> 可以是非整数，只是密度估计。</p>
  <div class="worked"><span class="note-label">补充计算</span><p>原文在 <strong>r=1.2f</strong> 处讨论大相位梯度。此时 <strong>Λloc≈0.833λ</strong>。若 <strong>p=0.5λ</strong>，一个相位周期大约只有 <strong>1.67 个采样间隔</strong>。若用 <strong>p=0.4λ</strong>，则约为 <strong>2.08 个</strong>。因此，这个例子适合概括为“每圈相位只有约两格”，不能把整段参数范围都写成严格少于两格。<a class="cite no-styling" href="#ref-review">[综述 p.7；比值为补充推导]</a></p></div>
  <h3>N 级量化公式说明什么</h3>
  <p>原文用等宽、均匀量化的理想相位斜坡讨论采样损失。在该标量模型中，<strong>整数相位级数 N</strong> 对应的目标衍射级效率为：</p>
  <div class="math" data-tex="\eta_N=\left[\frac{N}{\pi}\sin\left(\frac{\pi}{N}\right)\right]^2" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="104pt" height="21pt" viewBox="0 0 104 21" version="1.1" role="img" aria-label="ηN=[(N/π)sin(π/N)]²" focusable="false">
 <title>ηN=[(N/π)sin(π/N)]²</title><defs>
 </defs>
 <g id="eq-14-figure_1">
  <g id="eq-14-patch_1">
   <path d="M 0 21  L 104 21  L 104 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-14-text_1">
   <!-- $\eta_N=\left[\frac{N}{\pi}\sin\left(\frac{\pi}{N}\right)\right]^2$ -->
   <g style="fill: #17313d" transform="translate(0 14) scale(0.16 -0.16)">
    <defs>
     <path id="eq-14-STIXGeneral-Italic-3b7" d="M 947 1459  L 960 1453  Q 1811 2822 2374 2822  Q 2573 2822 2701 2729  Q 2829 2637 2829 2458  Q 2829 2304 2765 2054  L 2208 0  Q 2016 -698 2016 -1094  Q 2016 -1190 2067 -1312  L 1600 -1312  Q 1530 -1229 1530 -1030  Q 1530 -710 1741 58  L 2221 1811  Q 2310 2112 2310 2272  Q 2310 2496 2150 2496  Q 1894 2496 1427 1897  Q 960 1299 774 678  L 570 0  L 90 0  L 614 1952  Q 704 2272 704 2349  Q 704 2458 614 2458  Q 589 2458 560 2445  Q 531 2432 499 2403  Q 467 2374 438 2348  Q 410 2323 374 2281  Q 339 2240 316 2211  Q 294 2182 259 2140  Q 224 2099 211 2086  L 134 2150  Q 218 2291 320 2413  Q 634 2803 941 2803  Q 1197 2803 1197 2515  Q 1197 2253 947 1459  z " transform="scale(0.015625)"></path>
     <path id="eq-14-STIXGeneral-Italic-4e" d="M 4653 4179  L 4653 4077  Q 4480 4038 4413 4016  Q 4346 3994 4266 3882  Q 4186 3770 4144 3635  Q 4102 3501 4000 3149  L 3066 -96  L 2950 -96  L 1478 3424  L 749 723  Q 691 525 691 378  Q 691 243 790 182  Q 890 122 1139 102  L 1139 0  L -128 0  L -128 102  Q 147 141 262 304  Q 378 467 550 1075  L 1299 3731  Q 1152 4077 749 4077  L 749 4179  L 1773 4179  L 3098 986  L 3776 3469  Q 3827 3648 3827 3750  Q 3827 3923 3740 3987  Q 3654 4051 3386 4077  L 3386 4179  L 4653 4179  z " transform="scale(0.015625)"></path>
     <path id="eq-14-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-14-STIXSizeOneSym-Regular-5b" d="M 2323 -1050  L 1152 -1050  L 1152 6822  L 2323 6822  L 2323 6611  L 1600 6611  L 1600 -838  L 2323 -838  L 2323 -1050  z " transform="scale(0.015625)"></path>
     <path id="eq-14-STIXGeneral-Italic-3c0" d="M 3430 2739  L 3296 2266  L 2643 2266  Q 2624 2195 2502 1782  Q 2381 1370 2297 1072  Q 2214 774 2214 717  Q 2214 448 2413 448  Q 2694 448 2867 838  L 2970 838  Q 2886 486 2652 208  Q 2419 -70 2093 -70  Q 1901 -70 1808 67  Q 1715 205 1715 410  Q 1715 627 1824 922  L 2310 2266  L 1645 2266  Q 1568 2061 1401 1469  Q 1235 877 1068 512  Q 902 147 672 -38  Q 563 -115 442 -115  Q 314 -115 218 -32  Q 122 51 122 166  Q 122 429 314 480  Q 634 563 774 928  L 1299 2266  L 1261 2266  Q 973 2266 819 2208  Q 666 2150 474 1914  L 371 1914  Q 640 2362 931 2550  Q 1222 2739 1696 2739  L 3430 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-14-STIXGeneral-Regular-73" d="M 998 1926  L 1664 1523  Q 1984 1331 2105 1164  Q 2227 998 2227 736  Q 2227 416 1961 176  Q 1696 -64 1331 -64  Q 1030 -64 864 -6  Q 691 51 570 51  Q 461 51 416 -26  L 333 -26  L 333 979  L 435 979  Q 538 512 730 294  Q 922 77 1248 77  Q 1485 77 1632 211  Q 1779 346 1779 550  Q 1779 845 1440 1030  L 1094 1222  Q 326 1651 326 2150  Q 326 2522 566 2730  Q 806 2938 1210 2938  Q 1491 2938 1638 2867  Q 1754 2816 1818 2816  Q 1862 2816 1920 2880  L 1990 2880  L 2022 2010  L 1926 2010  Q 1818 2445 1654 2621  Q 1491 2797 1203 2797  Q 986 2797 854 2688  Q 723 2579 723 2362  Q 723 2253 796 2128  Q 870 2003 998 1926  z " transform="scale(0.015625)"></path>
     <path id="eq-14-STIXGeneral-Regular-69" d="M 1152 4045  Q 1152 3904 1056 3811  Q 960 3718 819 3718  Q 685 3718 592 3811  Q 499 3904 499 4045  Q 499 4179 595 4275  Q 691 4371 826 4371  Q 966 4371 1059 4275  Q 1152 4179 1152 4045  z M 1619 0  L 102 0  L 102 96  Q 435 115 521 211  Q 608 307 608 666  L 608 2118  Q 608 2342 563 2432  Q 518 2522 397 2522  Q 243 2522 128 2490  L 128 2592  L 1120 2944  L 1146 2918  L 1146 672  Q 1146 314 1226 218  Q 1306 122 1619 96  L 1619 0  z " transform="scale(0.015625)"></path>
     <path id="eq-14-STIXGeneral-Regular-6e" d="M 3104 0  L 1773 0  L 1779 96  Q 2016 115 2096 233  Q 2176 352 2176 672  L 2176 1946  Q 2176 2592 1709 2592  Q 1549 2592 1408 2515  Q 1267 2438 1050 2227  L 1050 461  Q 1050 269 1136 192  Q 1222 115 1466 96  L 1466 0  L 115 0  L 115 96  Q 358 115 435 214  Q 512 314 512 602  L 512 2157  Q 512 2394 467 2483  Q 422 2573 288 2573  Q 160 2573 102 2547  L 102 2656  Q 550 2784 979 2944  L 1030 2925  L 1030 2426  L 1037 2426  Q 1491 2944 1958 2944  Q 2323 2944 2518 2688  Q 2714 2432 2714 1958  L 2714 544  Q 2714 288 2790 205  Q 2867 122 3104 96  L 3104 0  z " transform="scale(0.015625)"></path>
     <path id="eq-14-STIXSizeOneSym-Regular-28" d="M 2445 -858  L 2445 -1050  Q 1728 -371 1309 630  Q 890 1632 890 2886  Q 890 4122 1309 5136  Q 1728 6150 2445 6822  L 2445 6630  Q 1408 5363 1408 2886  Q 1408 410 2445 -858  z " transform="scale(0.015625)"></path>
     <path id="eq-14-STIXSizeOneSym-Regular-29" d="M 550 6630  L 550 6822  Q 1267 6144 1686 5142  Q 2106 4141 2106 2886  Q 2106 1651 1686 636  Q 1267 -378 550 -1050  L 550 -858  Q 1587 410 1587 2886  Q 1587 5363 550 6630  z " transform="scale(0.015625)"></path>
     <path id="eq-14-STIXSizeOneSym-Regular-5d" d="M 1299 -1050  L 128 -1050  L 128 -838  L 851 -838  L 851 6611  L 128 6611  L 128 6822  L 1299 6822  L 1299 -1050  z " transform="scale(0.015625)"></path>
     <path id="eq-14-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-14-STIXGeneral-Italic-3b7" transform="translate(0 0.445312)"></use>
    <use xlink:href="#eq-14-STIXGeneral-Italic-4e" transform="translate(47.399994 -12.782813) scale(0.7)"></use>
    <use xlink:href="#eq-14-STIXGeneral-Regular-3d" transform="translate(112.939363 0.445312)"></use>
    <use xlink:href="#eq-14-STIXSizeOneSym-Regular-5b" transform="translate(195.879344 -23.203125) scale(1.014355)"></use>
    <use xlink:href="#eq-14-STIXGeneral-Italic-4e" transform="translate(234.705974 39.292188) scale(0.7)"></use>
    <use xlink:href="#eq-14-STIXGeneral-Italic-3c0" transform="translate(240.705974 -22.965625) scale(0.7)"></use>
    <use xlink:href="#eq-14-STIXGeneral-Regular-73" transform="translate(293.895972 0.445312)"></use>
    <use xlink:href="#eq-14-STIXGeneral-Regular-69" transform="translate(332.795966 0.445312)"></use>
    <use xlink:href="#eq-14-STIXGeneral-Regular-6e" transform="translate(360.595953 0.445312)"></use>
    <use xlink:href="#eq-14-STIXSizeOneSym-Regular-28" transform="translate(422.629509 -25.171875) scale(0.887995)"></use>
    <use xlink:href="#eq-14-STIXGeneral-Italic-3c0" transform="translate(470.164497 39.5) scale(0.7)"></use>
    <use xlink:href="#eq-14-STIXGeneral-Italic-4e" transform="translate(464.164497 -38.715625) scale(0.7)"></use>
    <use xlink:href="#eq-14-STIXSizeOneSym-Regular-29" transform="translate(523.354495 -25.171875) scale(0.887995)"></use>
    <use xlink:href="#eq-14-STIXSizeOneSym-Regular-5d" transform="translate(564.889484 -23.203125) scale(1.014355)"></use>
    <use xlink:href="#eq-14-STIXGeneral-Regular-32" transform="translate(605.259395 35.720312) scale(0.7)"></use>
    <path d="M 234.705974 13.242188  L 234.705974 19.492188  L 281.395972 19.492188  L 281.395972 13.242188  L 234.705974 13.242188  z "></path>
    <path d="M 464.164497 13.242188  L 464.164497 19.492188  L 510.854495 19.492188  L 510.854495 13.242188  L 464.164497 13.242188  z "></path>
   </g>
  </g>
 </g>
</svg></div>
  <div class="table-wrap" tabindex="0" role="region" aria-label="对照表，可横向滚动查看"><table><thead><tr><th>N</th><th>理想目标级次效率</th><th>该数值的范围</th></tr></thead><tbody>
  <tr><td>2</td><td>40.5%</td><td rowspan="4">理想量化模型；不包含真实器件的反射、吸收、非均匀振幅与实际耦合等影响</td></tr>
  <tr><td>4</td><td>81.1%</td></tr><tr><td>8</td><td>95.0%</td></tr><tr><td>16</td><td>98.7%</td></tr>
  </tbody></table></div>
  <p>这个公式适合解释相位量化这一项损失。它不是任意超透镜的通用效率上限，也不能把前面的非整数 <var>M=1.67</var> 直接代入作为实际器件效率。<a class="cite no-styling" href="#ref-review">[综述 §3.2，p.7]</a></p>
  <section class="lab" id="lab-sampling" aria-labelledby="lab-sampling-heading">
  <p class="lab-kicker">互动实验 · 相位量化 <span class="lab-disclaimer">理想标量模型</span></p>
  <h3 id="lab-sampling-heading">用有限级相位逼近一个完整的 2π 斜坡</h3>
  <p class="lab-intro">将一个周期划分为 N 个等宽区域，每格使用该格中心的相位。级数增加时，台阶更接近连续斜坡；这里单独观察量化误差。</p>
  <div class="lab-controls"><label class="lab-field"><span class="lab-label">整数相位级数 N</span><select id="sampling-levels"><option value="2">2 级</option><option value="4" selected>4 级</option><option value="8">8 级</option><option value="16">16 级</option></select></label></div>
  <div class="lab-legend"><span><i class="lab-swatch target" aria-hidden="true"></i>连续相位</span><span><i class="lab-swatch quantized" aria-hidden="true"></i>N 级相位</span></div>
  <div class="lab-figure"><svg class="lab-chart" id="sampling-svg" role="img" aria-label="横轴为一个相位周期内的位置 x/Λ，纵轴为归一化相位 φ/2π；比较连续斜坡与台阶近似。"></svg></div>
  <dl class="lab-values" aria-live="polite"><div><dt>相位级数</dt><dd id="sampling-n">4</dd></div><div><dt>理想目标衍射级效率</dt><dd id="sampling-efficiency">81.1%</dd></div><div><dt>每格最大相位偏差</dt><dd id="sampling-error">π/4 rad</dd></div></dl>
  <p class="lab-note">效率按 η<sub>N</sub> = [sin(π/N)/(π/N)]² 计算，未计入反射、吸收、偏振转换、邻近耦合等影响。它不是实际超透镜的聚焦效率。N 是整数相位级数，不能直接替换为局部采样密度 Λ/p 的非整数估计。</p>
  <noscript>2、4、8、16 级对应的理想效率约为 40.5%、81.1%、95.0%、98.7%。</noscript>
</section>
  <h3>图 5 展示另一侧的代价：结构间相互作用</h3>
  <figure class="paper-figure" id="figure-5"><button type="button" class="zoom-button" data-title="图 5 · 间距、传播超模与耦合" aria-label="放大查看图 5 · 间距、传播超模与耦合"><img src="/assets/wide-angle-metalens-reading/figure-5.jpg" loading="lazy" width="1328" height="430" alt="图 5 · 间距、传播超模与耦合" decoding="async" data-figure-key="5"><span class="zoom-hint" aria-hidden="true">点击放大 ↗</span></button><figcaption><strong>图 5 · 间距、传播超模与耦合。</strong>大、中、小三类单元间距对应不同的场分布与模式色散。右侧 k∥ 与 kz 的关系连接了入射方向、阵列模式与传播相位。<span class="figure-source">论文原图 · <a class="no-styling" href="#ref-review">[R1 p.7，图 5]</a> · 保留原图中的引文与来源标注。</span></figcaption></figure>
  <div class="table-wrap" tabindex="0" role="region" aria-label="对照表，可横向滚动查看"><table><thead><tr><th>图示间距</th><th>电磁模式示意</th><th>对设计的影响</th></tr></thead><tbody>
  <tr><td><strong>大间距</strong></td><td>图示存在两种传播超模</td><td>多个模式共同贡献，使相位及其角度响应更难控制</td></tr>
  <tr><td><strong>中等间距</strong></td><td>场较局域于各个柱体，耦合较弱</td><td>在图示条件下更接近单一主导、角度较稳定的响应</td></tr>
  <tr><td><strong>小间距</strong></td><td>相邻柱的场显著重叠，形成耦合响应</td><td>采样更细，但模式传播常数会依赖入射面内波矢</td></tr>
  </tbody></table></div>
  <p>图中 <strong>k∥</strong> 是入射面内波矢，<strong>kz</strong> 是阵列传播模式沿柱高方向的传播常数。对于传播相位主导的结构，柱内相位项可近似理解为 <var>kzh</var>。因此，<var>kz</var> 随 <var>k∥</var> 变化，意味着入射角改变时相位延迟也可能改变。这里的 <var>kz</var> 不能直接套用自由空间的 <var>k₀cosθ</var>。<a class="cite no-styling" href="#ref-review">[综述 图 5与 §3.2]</a></p>
  <p>这些是文中波导型结构的典型工作状态，并非所有材料和几何的普遍间距定律。文中提及的 <strong>p/λ≈0.4–0.5</strong> 也需要结合具体结构理解。</p>
  <h3>为什么把周期单元库拼起来，还会产生相位误差</h3>
  <p>周期单元仿真通常计算“相同单元不断重复”的邻域，它已经包含这种邻域中的相互作用。实际透镜中，相邻单元可能具有不同尺寸。当目标相位变化较慢时，局部周期近似比较容易成立；当相位和几何变化很快时，真实非周期邻域与库中的环境差异增大，单元的相位、振幅及偏振响应都可能偏离预期。<a class="cite no-styling" href="#ref-review">[综述 p.7末–8首]</a></p>
  <div class="insight"><span class="note-label">设计分析</span><p>“把 p 做小”主要改善几何采样；“把实际邻域算对”改善电磁建模。它们是相关但不同的任务。耦合也可以被设计利用，关键是模型和优化目标能否描述、约束或利用实际响应。</p></div>
</section>
<section id="adjoint" class="article-section">
  <p class="section-kicker"><span class="chapter-num">07</span>设计方法之一</p>
  <h2>伴随优化：让整体电磁响应指导结构修改</h2>
  <h3>优化目标先于算法</h3>
  <p>将可调参数记为 <var>a₁,a₂,…</var>，可以是柱宽、边界位置或材料分布。先定义<strong>目标函数 J</strong>，例如进入指定焦斑区域的功率比例，再计算各参数的敏感度 <var>∂J/∂aⱼ</var>。如果需要多角度成像，应让目标与约束覆盖相应角度；只优化轴上指标，不会自动保证整个视场。</p>
  <p>逐个扰动大量参数，需要反复求解电磁场。<strong>伴随方法</strong>在固定激励、固定频率及一个标量目标下，通过一次正向场和一次伴随场计算，就能获得许多参数的梯度。这里的“两次”是获取一次梯度的核心场求解数；整个优化仍需迭代，独立入射条件和线搜索等步骤也可能增加求解。<a class="cite no-styling" href="#ref-review">[综述 §3.3.1]</a><a class="cite no-styling" href="#ref-111">[Lalau-Keraly 等，2013]</a></p>
  <h3>为什么在目标位置放一个辅助源有用</h3>
  <p>用单频、线性、互易的标量模型解释。设要提高焦点 <var>F</var> 的场强，在位置 <var>A</var> 做一小块材料改动。首先，原有正向场决定这处改动会激发怎样的微小散射；其次，需要知道这份扰动怎样传播到 <var>F</var>。后一个信息就是从 <var>A</var> 到 <var>F</var> 的复数传递关系。</p>
  <div class="math" data-tex="\delta E_F\propto G_{A\to F}\,E_{\mathrm{fwd}}(A)\,\delta\epsilon(A)" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="167pt" height="14pt" viewBox="0 0 167 14" version="1.1" role="img" aria-label="δEF ∝ GA→F · Efwd(A) · δε(A)" focusable="false">
 <title>δEF ∝ GA→F · Efwd(A) · δε(A)</title><defs>
 </defs>
 <g id="eq-15-figure_1">
  <g id="eq-15-patch_1">
   <path d="M 0 14  L 167 14  L 167 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-15-text_1">
   <!-- $\delta E_F\propto G_{A\to F}\,E_{\mathrm{fwd}}(A)\,\delta\epsilon(A)$ -->
   <g style="fill: #17313d" transform="translate(0 11) scale(0.16 -0.16)">
    <defs>
     <path id="eq-15-STIXGeneral-Italic-3b4" d="M 2944 3866  Q 2944 3744 2883 3651  Q 2822 3558 2694 3558  Q 2579 3558 2508 3606  Q 2438 3654 2403 3721  Q 2368 3789 2323 3856  Q 2278 3923 2179 3971  Q 2080 4019 1920 4019  Q 1715 4019 1516 3916  Q 1318 3814 1318 3648  Q 1318 3482 1484 3328  Q 1651 3174 1942 2985  Q 2234 2797 2381 2656  Q 2605 2445 2701 2249  Q 2797 2054 2797 1709  Q 2797 1037 2313 483  Q 1830 -70 1101 -70  Q 646 -70 400 166  Q 154 403 154 838  Q 154 1453 640 1981  Q 1126 2509 1741 2566  Q 1690 2618 1526 2771  Q 1363 2925 1299 2998  Q 1235 3072 1164 3203  Q 1094 3334 1094 3456  Q 1094 3744 1286 3939  Q 1478 4134 1712 4204  Q 1946 4275 2176 4275  Q 2458 4275 2701 4169  Q 2944 4064 2944 3866  z M 2278 1702  Q 2278 2086 2156 2259  Q 2035 2432 1850 2432  Q 1427 2432 1059 1869  Q 691 1306 691 646  Q 691 384 828 224  Q 966 64 1190 64  Q 1466 64 1728 371  Q 1990 678 2134 1056  Q 2278 1434 2278 1702  z " transform="scale(0.015625)"></path>
     <path id="eq-15-STIXGeneral-Italic-45" d="M 4058 4179  L 3859 3194  L 3718 3206  Q 3738 3366 3738 3501  Q 3738 3789 3501 3878  Q 3264 3968 2509 3968  Q 2240 3968 2157 3939  Q 2074 3910 2042 3802  L 1619 2310  L 2118 2310  Q 2541 2310 2681 2412  Q 2822 2515 3008 2931  L 3123 2906  L 2688 1421  L 2560 1453  Q 2605 1651 2605 1786  Q 2605 1939 2560 1984  Q 2451 2080 2061 2080  L 1562 2080  L 1357 1363  Q 1126 550 1126 429  Q 1126 211 1632 211  Q 2458 211 2931 461  Q 3174 589 3533 1088  L 3635 1037  L 3238 0  L -6 0  L -6 102  Q 269 154 352 227  Q 435 301 512 576  L 1299 3405  Q 1370 3642 1370 3814  Q 1370 3942 1270 3996  Q 1171 4051 877 4077  L 877 4179  L 4058 4179  z " transform="scale(0.015625)"></path>
     <path id="eq-15-STIXGeneral-Italic-46" d="M 4128 4179  L 3923 3194  L 3789 3206  Q 3808 3347 3808 3418  Q 3808 3667 3718 3772  Q 3629 3878 3373 3923  Q 3117 3968 2534 3968  Q 2310 3968 2220 3926  Q 2131 3885 2099 3763  L 1690 2310  Q 2003 2317 2147 2317  Q 2291 2317 2457 2345  Q 2624 2374 2678 2396  Q 2733 2419 2822 2505  Q 2912 2592 2950 2665  Q 2989 2739 3072 2912  L 3187 2880  L 2701 1376  L 2592 1408  Q 2643 1670 2643 1798  Q 2643 1978 2531 2029  Q 2419 2080 2163 2080  Q 1984 2080 1632 2099  L 1254 736  Q 1165 416 1165 352  Q 1165 237 1273 179  Q 1382 122 1658 102  L 1658 0  L 51 0  L 51 102  Q 314 122 410 224  Q 506 326 582 602  L 1370 3430  Q 1434 3661 1434 3821  Q 1434 3955 1347 4003  Q 1261 4051 947 4077  L 947 4179  L 4128 4179  z " transform="scale(0.015625)"></path>
     <path id="eq-15-STIXGeneral-Regular-221d" d="M 4115 538  L 4115 0  Q 3674 0 3360 224  Q 3046 448 2726 928  Q 2266 0 1389 0  Q 934 0 598 329  Q 262 659 262 1280  Q 262 1613 355 1881  Q 448 2150 585 2307  Q 723 2464 896 2569  Q 1069 2675 1213 2713  Q 1357 2752 1485 2752  Q 1869 2752 2160 2569  Q 2451 2387 2880 1811  Q 3142 2285 3408 2518  Q 3674 2752 4115 2752  L 4115 2214  Q 3725 2214 3443 2025  Q 3162 1837 3008 1568  L 3008 1549  Q 3328 1018 3581 778  Q 3834 538 4115 538  z M 2586 1158  L 2586 1178  Q 2221 1779 1910 2076  Q 1600 2374 1286 2374  Q 1018 2374 832 2147  Q 646 1920 646 1613  Q 646 1178 889 858  Q 1133 538 1536 538  Q 1734 538 1907 595  Q 2080 653 2214 765  Q 2349 877 2422 957  Q 2496 1037 2586 1158  z " transform="scale(0.015625)"></path>
     <path id="eq-15-STIXGeneral-Italic-47" d="M 4621 2042  L 4621 1939  Q 4307 1920 4188 1833  Q 4070 1747 4000 1478  L 3686 282  Q 2976 -115 2170 -115  Q 1293 -115 806 371  Q 582 595 457 934  Q 333 1274 333 1606  Q 333 2266 653 2848  Q 973 3430 1504 3802  Q 2170 4262 2912 4262  Q 3373 4262 3770 4109  Q 3936 4045 4051 4045  Q 4282 4045 4435 4262  L 4531 4230  L 4218 2970  L 4102 2989  Q 4083 3398 3866 3667  Q 3558 4045 2963 4045  Q 2214 4045 1715 3411  Q 1395 3008 1216 2496  Q 1037 1984 1037 1459  Q 1037 826 1376 474  Q 1715 122 2330 122  Q 2784 122 3002 339  Q 3059 397 3104 509  Q 3149 621 3251 986  Q 3418 1542 3418 1709  Q 3418 1894 3117 1920  L 2912 1939  L 2912 2042  L 4621 2042  z " transform="scale(0.015625)"></path>
     <path id="eq-15-STIXGeneral-Italic-41" d="M 3610 0  L 2042 0  L 2042 102  Q 2330 115 2432 192  Q 2534 269 2534 442  Q 2534 493 2522 608  L 2394 1446  L 986 1446  L 608 736  Q 467 474 467 314  Q 467 122 864 102  L 864 0  L -326 0  L -326 102  Q -109 147 28 307  Q 166 467 531 1101  L 2355 4275  L 2522 4275  L 3110 736  Q 3174 339 3264 230  Q 3354 122 3610 102  L 3610 0  z M 2362 1677  L 2074 3360  L 1120 1677  L 2362 1677  z " transform="scale(0.015625)"></path>
     <path id="eq-15-STIXGeneral-Regular-2192" d="M 5478 1651  L 5478 1587  Q 4742 1274 3955 365  L 3827 486  Q 4006 742 4352 1101  Q 4442 1190 4442 1280  Q 4442 1408 4275 1408  L 448 1408  L 448 1830  L 4282 1830  Q 4333 1830 4390 1878  Q 4448 1926 4448 1971  Q 4448 2042 4358 2131  Q 4032 2445 3834 2746  L 3962 2867  Q 4755 1952 5478 1651  z " transform="scale(0.015625)"></path>
     <path id="eq-15-STIXGeneral-Regular-66" d="M 134 2880  L 659 2880  Q 666 3264 710 3478  Q 755 3693 883 3910  Q 1152 4371 1786 4371  Q 2074 4371 2262 4259  Q 2451 4147 2451 3974  Q 2451 3866 2374 3789  Q 2298 3712 2182 3712  Q 2029 3712 1894 3942  Q 1741 4192 1555 4192  Q 1197 4192 1197 3622  L 1197 2880  L 1978 2880  L 1978 2675  L 1197 2675  L 1197 666  Q 1197 307 1299 208  Q 1402 109 1792 96  L 1792 0  L 128 0  L 128 96  Q 474 115 566 214  Q 659 314 659 666  L 659 2675  L 134 2675  L 134 2880  z " transform="scale(0.015625)"></path>
     <path id="eq-15-STIXGeneral-Regular-77" d="M 4442 2880  L 4442 2784  Q 4346 2752 4301 2691  Q 4256 2630 4179 2438  L 3296 224  Q 3168 -90 3117 -90  Q 3085 -90 3062 -48  Q 3040 -6 2963 186  L 2381 1696  L 1664 160  Q 1549 -90 1504 -90  Q 1446 -90 1338 192  L 474 2381  Q 378 2630 314 2700  Q 250 2771 134 2784  L 134 2880  L 1286 2880  L 1286 2784  Q 1120 2765 1056 2720  Q 992 2675 992 2573  Q 992 2477 1030 2381  L 1664 710  L 2246 1984  L 2118 2342  Q 2029 2598 1942 2681  Q 1856 2765 1677 2784  L 1677 2880  L 2976 2880  L 2976 2784  Q 2752 2752 2678 2707  Q 2605 2662 2605 2560  Q 2605 2458 2714 2176  L 3251 742  L 3827 2163  Q 3936 2432 3936 2592  Q 3936 2669 3875 2710  Q 3814 2752 3654 2784  L 3654 2880  L 4442 2880  z " transform="scale(0.015625)"></path>
     <path id="eq-15-STIXGeneral-Regular-64" d="M 3142 269  L 2202 -64  L 2176 -45  L 2176 365  Q 1869 -64 1357 -64  Q 826 -64 499 317  Q 173 698 173 1312  Q 173 1990 563 2467  Q 954 2944 1504 2944  Q 1850 2944 2176 2669  L 2176 3667  Q 2176 3866 2118 3930  Q 2061 3994 1882 3994  Q 1792 3994 1741 3987  L 1741 4090  Q 2323 4243 2682 4371  L 2714 4358  L 2714 730  Q 2714 506 2768 435  Q 2822 365 2995 365  Q 3034 365 3142 371  L 3142 269  z M 2176 653  L 2176 2125  Q 2176 2381 1981 2573  Q 1786 2765 1523 2765  Q 1158 2765 940 2438  Q 723 2112 723 1568  Q 723 979 963 624  Q 1203 269 1606 269  Q 1907 269 2080 474  Q 2176 582 2176 653  z " transform="scale(0.015625)"></path>
     <path id="eq-15-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-15-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-15-STIXGeneral-Italic-3b5" d="M 2304 627  L 2406 563  Q 1907 -70 1133 -70  Q 192 -70 192 640  Q 192 928 403 1158  Q 614 1389 934 1472  Q 774 1498 684 1616  Q 595 1734 595 1882  Q 602 2266 995 2544  Q 1389 2822 2029 2822  Q 2336 2822 2528 2672  Q 2720 2522 2720 2291  Q 2720 2163 2617 2080  Q 2515 1997 2413 1997  Q 2298 1997 2230 2067  Q 2163 2138 2163 2253  Q 2163 2317 2211 2409  Q 2259 2502 2259 2560  Q 2259 2688 2022 2688  Q 1683 2688 1401 2496  Q 1120 2304 1120 1907  Q 1120 1741 1251 1654  Q 1382 1568 1594 1568  Q 1613 1568 1728 1590  Q 1843 1613 1932 1613  Q 2022 1613 2086 1574  Q 2150 1536 2150 1478  Q 2150 1306 1862 1306  Q 1805 1306 1721 1334  Q 1638 1363 1568 1363  Q 1286 1363 1014 1184  Q 742 1005 742 678  Q 742 410 908 285  Q 1075 160 1312 160  Q 1869 160 2304 627  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-15-STIXGeneral-Italic-3b4" transform="translate(0 0.40625)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Italic-45" transform="translate(45.999985 0.40625)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Italic-46" transform="translate(107.099976 -12.821875) scale(0.7)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Regular-221d" transform="translate(168.719341 0.40625)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Italic-47" transform="translate(251.659322 0.40625)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Italic-41" transform="translate(323.859303 -12.821875) scale(0.7)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Regular-2192" transform="translate(376.737294 -12.821875) scale(0.7)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Italic-46" transform="translate(451.665285 -12.821875) scale(0.7)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Italic-45" transform="translate(510.878225 0.40625)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Regular-66" transform="translate(571.978216 -12.821875) scale(0.7)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Regular-77" transform="translate(595.288207 -12.821875) scale(0.7)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Regular-64" transform="translate(645.828194 -12.821875) scale(0.7)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Regular-28" transform="translate(685.237559 0.40625)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Italic-41" transform="translate(718.537546 0.40625)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Regular-29" transform="translate(779.637537 0.40625)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Italic-3b4" transform="translate(824.971096 0.40625)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Italic-3b5" transform="translate(870.971081 0.40625)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Regular-28" transform="translate(915.371075 0.40625)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Italic-41" transform="translate(948.671062 0.40625)"></use>
    <use xlink:href="#eq-15-STIXGeneral-Regular-29" transform="translate(1009.771053 0.40625)"></use>
   </g>
  </g>
 </g>
</svg></div>
  <p>互易性允许在对应的源与观测分量下交换源点和探测点：<var>GA→F=GF→A</var>。因此，在焦点放一个计算用的单位探针源，一次求解得到整片结构的场，就同时提供了许多位置到焦点的传递信息。正式伴随源再把目标函数的权重包含进去。辅助源仅用于设计计算，器件正常工作时仍采用原来的入射照明。</p>
  <section class="lab" id="lab-adjoint" aria-labelledby="lab-adjoint-heading">
  <p class="lab-kicker">互动示意 · 伴随计算 <span class="lab-disclaimer">传递关系示意，非电磁场仿真</span></p>
  <h3 id="lab-adjoint-heading">同一个器件，切换计算中的激励源</h3>
  <p class="lab-intro">在单频、标量、线性且互易的简化模型中，焦点 F 的单位探针源可同时提供 F 与 A、B、C 等位置的复数传递信息。正式伴随源再由目标函数赋予相应权重。</p>
  <div class="lab-buttons" role="group" aria-label="选择示意的计算类型"><button type="button" id="adjoint-forward" aria-pressed="true">正向：原入射源</button><button type="button" id="adjoint-probe" aria-pressed="false">辅助：焦点探针源</button></div>
  <div class="lab-figure"><svg class="lab-chart" id="adjoint-svg" role="img" aria-label="正向计算激发原光源并记录 A、B、C 和焦点 F 的场；辅助计算在 F 放置探针源并记录各处传递信息。"></svg></div>
  <p class="lab-state" id="adjoint-state" aria-live="polite">正向计算获得当前器件中的复电场，包括各可调位置与焦点处的振幅和相位。</p>
  <p class="lab-note">箭头表示源与观测位置之间的联系，不是实际光线。两次计算结果需要保留相位并组合，才能判断某处改动是否改善目标；探针返回较强不等于该处应增加材料。</p>
  <noscript>伴随法以正向场与由目标构造的伴随场计算梯度；辅助源只存在于设计仿真。</noscript>
</section>
  <details class="derivation"><summary>补充推导：目标强度如何决定伴随源的权重</summary>
    <p>对单点目标 <var>J=|EF|²</var>，一阶变化为：</p>
    <div class="math" data-tex="\delta J\simeq 2\,\mathrm{Re}\left(E_F^\ast\,\delta E_F\right)" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="118pt" height="16pt" viewBox="0 0 118 16" version="1.1" role="img" aria-label="δJ≈2 Re(EF* δEF)" focusable="false">
 <title>δJ≈2 Re(EF* δEF)</title><defs>
 </defs>
 <g id="eq-16-figure_1">
  <g id="eq-16-patch_1">
   <path d="M 0 16  L 118 16  L 118 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-16-text_1">
   <!-- $\delta J\simeq 2\,\mathrm{Re}\left(E_F^\ast\,\delta E_F\right)$ -->
   <g style="fill: #17313d" transform="translate(0 11) scale(0.16 -0.16)">
    <defs>
     <path id="eq-16-STIXGeneral-Italic-3b4" d="M 2944 3866  Q 2944 3744 2883 3651  Q 2822 3558 2694 3558  Q 2579 3558 2508 3606  Q 2438 3654 2403 3721  Q 2368 3789 2323 3856  Q 2278 3923 2179 3971  Q 2080 4019 1920 4019  Q 1715 4019 1516 3916  Q 1318 3814 1318 3648  Q 1318 3482 1484 3328  Q 1651 3174 1942 2985  Q 2234 2797 2381 2656  Q 2605 2445 2701 2249  Q 2797 2054 2797 1709  Q 2797 1037 2313 483  Q 1830 -70 1101 -70  Q 646 -70 400 166  Q 154 403 154 838  Q 154 1453 640 1981  Q 1126 2509 1741 2566  Q 1690 2618 1526 2771  Q 1363 2925 1299 2998  Q 1235 3072 1164 3203  Q 1094 3334 1094 3456  Q 1094 3744 1286 3939  Q 1478 4134 1712 4204  Q 1946 4275 2176 4275  Q 2458 4275 2701 4169  Q 2944 4064 2944 3866  z M 2278 1702  Q 2278 2086 2156 2259  Q 2035 2432 1850 2432  Q 1427 2432 1059 1869  Q 691 1306 691 646  Q 691 384 828 224  Q 966 64 1190 64  Q 1466 64 1728 371  Q 1990 678 2134 1056  Q 2278 1434 2278 1702  z " transform="scale(0.015625)"></path>
     <path id="eq-16-STIXGeneral-Italic-4a" d="M 3142 4179  L 3142 4077  Q 2867 4038 2784 3964  Q 2701 3891 2618 3603  L 1958 1254  Q 1773 589 1504 237  Q 1235 -115 710 -115  Q 371 -115 166 38  Q -38 192 -38 448  Q -38 602 42 704  Q 122 806 250 806  Q 378 806 477 720  Q 576 634 576 512  Q 576 474 566 419  Q 557 365 557 339  Q 557 90 781 90  Q 1005 90 1120 499  L 1933 3405  Q 2010 3686 2010 3814  Q 2010 3942 1914 3996  Q 1818 4051 1517 4077  L 1517 4179  L 3142 4179  z " transform="scale(0.015625)"></path>
     <path id="eq-16-STIXGeneral-Regular-2243" d="M 3866 2848  L 4077 2848  Q 4045 2374 3769 1958  Q 3494 1542 3066 1542  Q 2803 1542 2460 1747  Q 2118 1952 1804 2157  Q 1491 2362 1306 2362  Q 992 2362 800 2112  Q 608 1862 518 1478  L 307 1478  Q 333 1997 617 2390  Q 902 2784 1350 2784  Q 1613 2784 1955 2579  Q 2298 2374 2611 2169  Q 2925 1965 3117 1965  Q 3680 1965 3866 2848  z M 4077 352  L 307 352  L 307 774  L 4077 774  L 4077 352  z " transform="scale(0.015625)"></path>
     <path id="eq-16-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-16-STIXGeneral-Regular-52" d="M 4224 0  L 3187 0  L 1664 1971  L 1306 1958  L 1306 717  Q 1306 352 1405 249  Q 1504 147 1875 122  L 1875 0  L 109 0  L 109 122  Q 474 154 563 262  Q 653 371 653 794  L 653 3526  Q 653 3885 563 3987  Q 474 4090 109 4115  L 109 4237  L 1850 4237  Q 2726 4237 3187 3859  Q 3501 3603 3501 3091  Q 3501 2221 2342 2042  L 3622 422  Q 3757 256 3878 198  Q 4000 141 4224 122  L 4224 0  z M 1306 3731  L 1306 2195  Q 1766 2202 1990 2246  Q 2214 2291 2438 2413  Q 2803 2618 2803 3142  Q 2803 4000 1632 4000  Q 1459 4000 1382 3945  Q 1306 3891 1306 3731  z " transform="scale(0.015625)"></path>
     <path id="eq-16-STIXGeneral-Regular-65" d="M 2611 1050  L 2714 1005  Q 2330 -64 1376 -64  Q 813 -64 486 329  Q 160 723 160 1389  Q 160 2074 525 2509  Q 890 2944 1485 2944  Q 2061 2944 2374 2502  Q 2560 2246 2592 1773  L 621 1773  Q 646 1370 700 1158  Q 755 947 915 730  Q 1184 378 1626 378  Q 1939 378 2153 531  Q 2368 685 2611 1050  z M 634 1978  L 1939 1978  Q 1882 2381 1750 2547  Q 1619 2714 1312 2714  Q 1043 2714 864 2525  Q 685 2336 634 1978  z " transform="scale(0.015625)"></path>
     <path id="eq-16-STIXSizeOneSym-Regular-28" d="M 2445 -858  L 2445 -1050  Q 1728 -371 1309 630  Q 890 1632 890 2886  Q 890 4122 1309 5136  Q 1728 6150 2445 6822  L 2445 6630  Q 1408 5363 1408 2886  Q 1408 410 2445 -858  z " transform="scale(0.015625)"></path>
     <path id="eq-16-STIXGeneral-Italic-45" d="M 4058 4179  L 3859 3194  L 3718 3206  Q 3738 3366 3738 3501  Q 3738 3789 3501 3878  Q 3264 3968 2509 3968  Q 2240 3968 2157 3939  Q 2074 3910 2042 3802  L 1619 2310  L 2118 2310  Q 2541 2310 2681 2412  Q 2822 2515 3008 2931  L 3123 2906  L 2688 1421  L 2560 1453  Q 2605 1651 2605 1786  Q 2605 1939 2560 1984  Q 2451 2080 2061 2080  L 1562 2080  L 1357 1363  Q 1126 550 1126 429  Q 1126 211 1632 211  Q 2458 211 2931 461  Q 3174 589 3533 1088  L 3635 1037  L 3238 0  L -6 0  L -6 102  Q 269 154 352 227  Q 435 301 512 576  L 1299 3405  Q 1370 3642 1370 3814  Q 1370 3942 1270 3996  Q 1171 4051 877 4077  L 877 4179  L 4058 4179  z " transform="scale(0.015625)"></path>
     <path id="eq-16-STIXGeneral-Regular-2217" d="M 2925 2157  Q 2925 2042 2784 1958  Q 2739 1933 2400 1843  Q 2061 1754 1792 1600  Q 2022 1466 2371 1370  Q 2720 1274 2778 1242  Q 2912 1165 2912 1037  Q 2912 934 2845 860  Q 2778 787 2662 787  Q 2554 787 2432 905  Q 2310 1024 2131 1213  Q 1952 1402 1747 1517  Q 1747 1267 1840 908  Q 1933 550 1933 480  Q 1933 378 1856 294  Q 1779 211 1689 211  Q 1600 211 1523 294  Q 1446 378 1446 480  Q 1446 550 1539 908  Q 1632 1267 1632 1517  Q 1440 1408 1174 1139  Q 909 870 858 845  Q 768 794 685 794  Q 576 794 512 854  Q 448 915 448 998  Q 448 1165 582 1248  Q 646 1280 1011 1385  Q 1376 1491 1562 1600  Q 1376 1709 1005 1814  Q 634 1920 557 1965  Q 429 2042 429 2157  Q 429 2259 496 2342  Q 563 2426 659 2426  Q 723 2426 800 2387  Q 864 2349 1145 2077  Q 1427 1805 1632 1696  Q 1632 1946 1539 2317  Q 1446 2688 1446 2758  Q 1446 2861 1523 2937  Q 1600 3014 1689 3014  Q 1779 3014 1856 2934  Q 1933 2854 1933 2758  Q 1933 2688 1840 2320  Q 1747 1952 1747 1702  Q 2016 1843 2262 2102  Q 2509 2362 2554 2387  Q 2630 2426 2694 2426  Q 2790 2426 2857 2342  Q 2925 2259 2925 2157  z " transform="scale(0.015625)"></path>
     <path id="eq-16-STIXGeneral-Italic-46" d="M 4128 4179  L 3923 3194  L 3789 3206  Q 3808 3347 3808 3418  Q 3808 3667 3718 3772  Q 3629 3878 3373 3923  Q 3117 3968 2534 3968  Q 2310 3968 2220 3926  Q 2131 3885 2099 3763  L 1690 2310  Q 2003 2317 2147 2317  Q 2291 2317 2457 2345  Q 2624 2374 2678 2396  Q 2733 2419 2822 2505  Q 2912 2592 2950 2665  Q 2989 2739 3072 2912  L 3187 2880  L 2701 1376  L 2592 1408  Q 2643 1670 2643 1798  Q 2643 1978 2531 2029  Q 2419 2080 2163 2080  Q 1984 2080 1632 2099  L 1254 736  Q 1165 416 1165 352  Q 1165 237 1273 179  Q 1382 122 1658 102  L 1658 0  L 51 0  L 51 102  Q 314 122 410 224  Q 506 326 582 602  L 1370 3430  Q 1434 3661 1434 3821  Q 1434 3955 1347 4003  Q 1261 4051 947 4077  L 947 4179  L 4128 4179  z " transform="scale(0.015625)"></path>
     <path id="eq-16-STIXSizeOneSym-Regular-29" d="M 550 6630  L 550 6822  Q 1267 6144 1686 5142  Q 2106 4141 2106 2886  Q 2106 1651 1686 636  Q 1267 -378 550 -1050  L 550 -858  Q 1587 410 1587 2886  Q 1587 5363 550 6630  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-16-STIXGeneral-Italic-3b4" transform="translate(0 0.753125)"></use>
    <use xlink:href="#eq-16-STIXGeneral-Italic-4a" transform="translate(45.999985 0.753125)"></use>
    <use xlink:href="#eq-16-STIXGeneral-Regular-2243" transform="translate(104.839975 0.753125)"></use>
    <use xlink:href="#eq-16-STIXGeneral-Regular-32" transform="translate(187.779956 0.753125)"></use>
    <use xlink:href="#eq-16-STIXGeneral-Regular-52" transform="translate(249.813512 0.753125)"></use>
    <use xlink:href="#eq-16-STIXGeneral-Regular-65" transform="translate(316.513509 0.753125)"></use>
    <use xlink:href="#eq-16-STIXSizeOneSym-Regular-28" transform="translate(360.913503 -13.078125) scale(0.769893)"></use>
    <use xlink:href="#eq-16-STIXGeneral-Italic-45" transform="translate(396.949498 0.753125)"></use>
    <use xlink:href="#eq-16-STIXGeneral-Regular-2217" transform="translate(478.783268 36.028125) scale(0.7)"></use>
    <use xlink:href="#eq-16-STIXGeneral-Italic-46" transform="translate(458.049489 -25.703125) scale(0.7)"></use>
    <use xlink:href="#eq-16-STIXGeneral-Italic-3b4" transform="translate(541.944202 0.753125)"></use>
    <use xlink:href="#eq-16-STIXGeneral-Italic-45" transform="translate(587.944187 0.753125)"></use>
    <use xlink:href="#eq-16-STIXGeneral-Italic-46" transform="translate(649.044178 -12.475) scale(0.7)"></use>
    <use xlink:href="#eq-16-STIXSizeOneSym-Regular-29" transform="translate(696.223547 -13.078125) scale(0.769893)"></use>
   </g>
  </g>
 </g>
</svg></div>
    <p>同样大小的新增场，与原焦点场同相时可以增强目标，反相时则可能降低目标。因此，振幅和相位都必须参与判断。把 <var>EF*</var> 等目标权重吸收到焦点探针源，就得到一种伴随场定义；在这种定义下，局部敏感度由正向场与伴随场的复数乘积实部给出。其他文献可能使用厄米伴随场记号，公式中的共轭位置会相应变化，不能混用。<a class="cite no-styling" href="#ref-111">[参考文献 111，第 2 节；此处为简化标量解释]</a></p>
  </details>
  <h3>拓扑与形状优化规定结构允许怎样改变</h3>
  <div class="table-wrap" tabindex="0" role="region" aria-label="对照表，可横向滚动查看"><table><thead><tr><th>维度</th><th>拓扑优化</th><th>形状优化</th></tr></thead><tbody>
    <tr><td>主要变量</td><td>设计区域的材料分布</td><td>已有结构的边界、尺寸或几何参数</td></tr>
    <tr><td>可发生的变化</td><td>孔洞、连接和分离关系可以改变</td><td>通常保留基本拓扑，移动现有边界</td></tr>
    <tr><td>常见优势</td><td>结构自由度高，可产生自由形状</td><td>便于利用已有设计与参数化约束</td></tr>
    <tr><td>需处理的问题</td><td>材料二值化、最小尺寸和制造约束</td><td>参数化范围、初值与局部最优</td></tr>
  </tbody></table></div>
  <p>伴随是求梯度的方法，拓扑和形状则规定允许怎样修改结构。两者均受到目标、参数化、初值和模型精度影响。原文对具体优化流程的比较，不宜推广为“拓扑方法绝不能从二值设计出发”或“形状优化必然保证任意指标每步上升”。</p>
  <figure class="paper-figure" id="figure-6"><button type="button" class="zoom-button" data-title="图 6 · 四个优化案例" aria-label="放大查看图 6 · 四个优化案例"><img src="/assets/wide-angle-metalens-reading/figure-6.png" loading="lazy" width="974" height="686" alt="图 6 · 四个优化案例" decoding="async" data-figure-key="6"><span class="zoom-hint" aria-hidden="true">点击放大 ↗</span></button><figcaption><strong>图 6 · 四个优化案例。</strong>A：随角度改变偏振的功能；B：大角度偏转器的拓扑优化；C：双波长超透镜的形状优化；D：耦合模模型与 FEM 的计算时间比较。各面板的研究对象和评价口径不同。<span class="figure-source">论文原图 · <a class="no-styling" href="#ref-review">[R1 p.9，图 6]</a> · 保留原图中的引文与来源标注。</span></figcaption></figure>
  <h3>图 6 是四项不同研究，最适合先读 C，再读 D</h3>
  <div class="table-wrap" tabindex="0" role="region" aria-label="对照表，可横向滚动查看"><table><thead><tr><th>分图</th><th>图中证据</th><th>能够支持的结论</th></tr></thead><tbody>
    <tr><td><strong>A</strong></td><td>固定线偏振输入，输出偏振随入射角连续变化</td><td>自由形状设计可实现复杂的角度相关偏振功能</td></tr>
    <tr><td><strong>B</strong></td><td>75° 偏转器随拓扑优化提高效率，约 350 次迭代后约 81%</td><td>这里的 75° 是偏转角；曲线有回落，不能理解为每步单调改善</td></tr>
    <tr><td><strong>C</strong></td><td>780 nm 与 915 nm 下，平均聚焦效率约从 30% 提高到 50%</td><td>把柱间与层间作用纳入形状优化可以改善双波长目标；两个波长不等于全连续带宽</td></tr>
    <tr><td><strong>D</strong></td><td>黑线为一次 CMT+伴随迭代，红线为单次 FEM 仿真；双对数坐标</td><td>更快的响应模型扩大可处理规模；两条线不代表完成整个优化的同口径总时间</td></tr>
  </tbody></table></div>
  <p class="source-note">依据综述图 6及 p.8–9；B 末端约 81% 为读图近似。D 所报告约 10⁴λ 与 200λ 的尺寸范围属于该研究算例与计算条件，不是所有计算机或求解器的普遍上限。</p>
  <div class="insight"><span class="note-label">阅读分析</span><p>伴随方法使“从大量变量中找到局部改进方向”更有效率。最终结果仍依赖模型、目标与初始结构；器件变大，每次场计算也会更昂贵。它提供了处理耦合响应的工具，而不是把耦合从物理系统中消除。</p></div>
</section>
<section id="catenary" class="article-section">
  <p class="section-kicker"><span class="chapter-num">08</span>设计方法之二</p>
  <h2>悬链线：让局部方向连续地编码几何相位</h2>
  <h3>几何相位作用于转换后的圆偏振分量</h3>
  <p>本文的另一条路径是改变结构的组织方式。对于局部各向异性结构，设其面内主轴方向角为 <var>ξ</var>，入射圆偏振手性为 <var>σ=±1</var>。按照综述的符号约定，转换到相反圆偏振手性的输出分量获得 <strong>Pancharatnam–Berry 几何相位</strong>：</p>
  <div class="math" data-tex="\phi_{\mathrm{PB}}=-2\sigma\xi" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="75pt" height="15pt" viewBox="0 0 75 15" version="1.1" role="img" aria-label="φPB=−2σξ" focusable="false">
 <title>φPB=−2σξ</title><defs>
 </defs>
 <g id="eq-17-figure_1">
  <g id="eq-17-patch_1">
   <path d="M 0 15  L 75 15  L 75 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-17-text_1">
   <!-- $\phi_{\mathrm{PB}}=-2\sigma\xi$ -->
   <g style="fill: #17313d" transform="translate(0 11) scale(0.16 -0.16)">
    <defs>
     <path id="eq-17-STIXGeneral-Italic-3d5" d="M 3078 4371  L 2650 2822  Q 3098 2822 3296 2746  Q 3808 2547 3808 1939  Q 3808 1709 3728 1446  Q 3648 1184 3481 915  Q 3315 646 3088 425  Q 2861 205 2537 67  Q 2214 -70 1850 -70  L 1504 -1312  L 1005 -1312  L 1350 -70  Q 883 -70 666 0  Q 173 160 173 819  Q 173 1018 256 1274  Q 339 1530 502 1802  Q 666 2074 886 2301  Q 1107 2528 1417 2675  Q 1728 2822 2061 2822  L 2157 2822  L 2586 4371  L 3078 4371  z M 2611 2688  L 1888 64  Q 2125 64 2330 166  Q 2694 352 2982 998  Q 3270 1645 3270 2093  Q 3270 2464 2982 2643  Q 2906 2688 2611 2688  z M 1389 64  L 2118 2688  Q 1760 2688 1427 2365  Q 1094 2042 902 1568  Q 710 1094 710 646  Q 710 237 1018 115  Q 1152 64 1389 64  z " transform="scale(0.015625)"></path>
     <path id="eq-17-STIXGeneral-Regular-50" d="M 102 4237  L 1760 4237  Q 2669 4237 3149 3834  Q 3469 3565 3469 3072  Q 3469 2560 3104 2234  Q 2835 1990 2553 1916  Q 2272 1843 1734 1843  Q 1549 1843 1293 1862  L 1293 717  Q 1293 352 1398 246  Q 1504 141 1894 122  L 1894 0  L 102 0  L 102 122  Q 474 147 557 256  Q 640 365 640 781  L 640 3526  Q 640 3885 547 3987  Q 454 4090 102 4115  L 102 4237  z M 1293 3770  L 1293 2118  Q 1510 2099 1683 2099  Q 2202 2099 2486 2352  Q 2771 2605 2771 3040  Q 2771 3558 2476 3779  Q 2182 4000 1517 4000  Q 1382 4000 1337 3952  Q 1293 3904 1293 3770  z " transform="scale(0.015625)"></path>
     <path id="eq-17-STIXGeneral-Regular-42" d="M 2701 2234  L 2701 2227  Q 3181 2150 3482 1875  Q 3795 1594 3795 1139  Q 3795 608 3379 304  Q 2963 0 2266 0  L 109 0  L 109 122  Q 486 134 604 246  Q 723 358 723 723  L 723 3520  Q 723 3891 614 3990  Q 506 4090 109 4115  L 109 4237  L 1901 4237  Q 2726 4237 3152 3958  Q 3578 3680 3578 3168  Q 3578 2733 3315 2502  Q 3130 2342 2701 2234  z M 1376 2342  L 1965 2342  Q 2925 2342 2925 3136  Q 2925 3546 2640 3773  Q 2355 4000 1792 4000  L 1530 4000  Q 1376 4000 1376 3795  L 1376 2342  z M 1376 2086  L 1376 525  Q 1376 365 1462 301  Q 1549 237 1773 237  Q 2208 237 2413 285  Q 2618 333 2816 512  Q 3059 723 3059 1146  Q 3059 1632 2758 1830  Q 2688 1882 2617 1917  Q 2547 1952 2492 1974  Q 2438 1997 2348 2016  Q 2259 2035 2211 2044  Q 2163 2054 2041 2060  Q 1920 2067 1862 2070  Q 1805 2074 1635 2080  Q 1466 2086 1376 2086  z " transform="scale(0.015625)"></path>
     <path id="eq-17-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-17-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-17-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-17-STIXGeneral-Italic-3c3" d="M 3398 2739  L 3283 2266  L 2195 2266  Q 2291 2112 2457 1981  Q 2624 1850 2717 1725  Q 2810 1600 2810 1389  Q 2810 851 2288 390  Q 1766 -70 1107 -70  Q 659 -70 416 170  Q 173 410 173 832  Q 173 1274 409 1706  Q 646 2138 1113 2438  Q 1581 2739 2157 2739  L 3398 2739  z M 2272 1414  Q 2272 1709 2166 1939  Q 2061 2170 1901 2266  Q 1530 2266 1120 1770  Q 710 1274 710 640  Q 710 358 844 211  Q 979 64 1210 64  Q 1638 64 1955 525  Q 2272 986 2272 1414  z " transform="scale(0.015625)"></path>
     <path id="eq-17-STIXGeneral-Italic-3be" d="M 1894 4371  L 1920 4269  Q 1453 4115 1453 3808  Q 1453 3654 1638 3622  Q 2221 4013 2554 4013  Q 2854 4013 2854 3814  Q 2854 3622 2601 3510  Q 2349 3398 1856 3398  Q 1619 3398 1465 3180  Q 1312 2963 1312 2790  Q 1312 2573 1478 2451  Q 1856 2714 2362 2714  Q 2701 2714 2701 2522  Q 2701 2406 2617 2326  Q 2534 2246 2406 2208  Q 2278 2170 2169 2154  Q 2061 2138 1965 2138  Q 1779 2138 1504 2221  Q 1158 2106 841 1741  Q 525 1376 518 1043  Q 518 730 694 589  Q 870 448 1216 448  Q 1261 448 1350 451  Q 1440 454 1459 454  Q 1862 454 2080 294  Q 2298 134 2298 -134  Q 2298 -422 2118 -678  Q 1978 -896 1728 -1040  Q 1478 -1184 1261 -1184  Q 1082 -1184 957 -1101  Q 832 -1018 832 -851  Q 832 -742 909 -662  Q 986 -582 1107 -582  Q 1210 -582 1328 -675  Q 1446 -768 1523 -768  Q 1734 -768 1888 -643  Q 2042 -518 2042 -326  Q 2042 -6 1555 -6  Q 1472 -6 1270 -38  Q 1069 -70 973 -70  Q 192 -70 192 685  Q 198 1210 508 1651  Q 819 2093 1312 2336  Q 1075 2496 1075 2739  Q 1075 3117 1446 3424  Q 1363 3424 1254 3510  Q 1146 3597 1146 3712  Q 1146 4179 1894 4371  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-17-STIXGeneral-Italic-3d5" transform="translate(0 0.703125)"></use>
    <use xlink:href="#eq-17-STIXGeneral-Regular-50" transform="translate(62.699997 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-17-STIXGeneral-Regular-42" transform="translate(101.689995 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-17-STIXGeneral-Regular-3d" transform="translate(167.229364 0.703125)"></use>
    <use xlink:href="#eq-17-STIXGeneral-Regular-2212" transform="translate(250.169345 0.703125)"></use>
    <use xlink:href="#eq-17-STIXGeneral-Regular-32" transform="translate(318.66933 0.703125)"></use>
    <use xlink:href="#eq-17-STIXGeneral-Italic-3c3" transform="translate(368.669315 0.703125)"></use>
    <use xlink:href="#eq-17-STIXGeneral-Italic-3be" transform="translate(418.469302 0.703125)"></use>
   </g>
  </g>
 </g>
</svg></div>
  <p>这个关系把局部方向角与相位联系起来，但没有决定转换分量的振幅。<strong>方向角控制相位</strong>与<strong>多少光被成功转换</strong>需要分别评价。<a class="cite no-styling" href="#ref-review">[综述 §3.3.2，p.10]</a></p>
  <h3>等强度悬链线的特殊之处是切线角</h3>
  <p>原文式（4）采用等强度悬链线形式，而不是普通均匀悬链线的双曲余弦形式：</p>
  <div class="math" data-tex="y(x)=\frac{\Lambda}{\pi}\ln\left|\sec\left(\frac{\pi x}{\Lambda}\right)\right|,\qquad -\frac{\Lambda}{2}&lt;x&lt;\frac{\Lambda}{2}" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="227pt" height="21pt" viewBox="0 0 227 21" version="1.1" role="img" aria-label="y(x)=(Λ/π) ln|sec(πx/Λ)|，−Λ/2&lt;x&lt;Λ/2" focusable="false">
 <title>y(x)=(Λ/π) ln|sec(πx/Λ)|，−Λ/2&lt;x&lt;Λ/2</title><defs>
 </defs>
 <g id="eq-18-figure_1">
  <g id="eq-18-patch_1">
   <path d="M 0 21  L 227 21  L 227 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-18-text_1">
   <!-- $y(x)=\frac{\Lambda}{\pi}\ln\left|\sec\left(\frac{\pi x}{\Lambda}\right)\right|,\qquad -\frac{\Lambda}{2}&lt;x&lt;\frac{\Lambda}{2}$ -->
   <g style="fill: #17313d" transform="translate(0 14) scale(0.16 -0.16)">
    <defs>
     <path id="eq-18-STIXGeneral-Italic-79" d="M 1555 1190  L 1690 486  Q 2118 1190 2294 1558  Q 2470 1926 2470 2131  Q 2470 2234 2304 2336  Q 2138 2445 2138 2586  Q 2138 2688 2211 2755  Q 2285 2822 2394 2822  Q 2534 2822 2630 2720  Q 2726 2618 2726 2470  Q 2726 1914 1888 518  Q 1389 -307 918 -812  Q 448 -1318 173 -1318  Q 26 -1318 -64 -1241  Q -154 -1165 -154 -1043  Q -154 -934 -80 -860  Q -6 -787 96 -787  Q 218 -787 314 -876  Q 410 -966 486 -966  Q 602 -966 794 -755  Q 877 -672 1040 -457  Q 1203 -243 1248 -173  Q 1312 -45 1312 51  Q 1312 243 1113 1046  Q 915 1850 787 2176  Q 698 2413 592 2499  Q 486 2586 294 2586  Q 192 2586 96 2560  L 96 2669  Q 237 2694 301 2707  Q 563 2758 986 2822  L 1011 2822  Q 1082 2822 1277 2227  Q 1472 1632 1555 1190  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXGeneral-Regular-39b" d="M 4397 0  L 2765 0  L 2765 122  Q 2790 122 2841 125  Q 2893 128 2918 128  Q 2944 128 2985 131  Q 3027 134 3049 140  Q 3072 147 3101 156  Q 3130 166 3146 182  Q 3162 198 3178 220  Q 3194 243 3200 268  Q 3206 294 3206 333  Q 3206 474 3085 781  L 2061 3411  L 2048 3411  L 979 653  Q 922 506 922 384  Q 922 237 1027 179  Q 1133 122 1370 122  L 1370 0  L 96 0  L 96 122  Q 371 147 499 323  Q 627 499 902 1190  L 2157 4314  L 2285 4314  L 3795 710  Q 3930 384 4042 265  Q 4154 147 4397 122  L 4397 0  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXGeneral-Italic-3c0" d="M 3430 2739  L 3296 2266  L 2643 2266  Q 2624 2195 2502 1782  Q 2381 1370 2297 1072  Q 2214 774 2214 717  Q 2214 448 2413 448  Q 2694 448 2867 838  L 2970 838  Q 2886 486 2652 208  Q 2419 -70 2093 -70  Q 1901 -70 1808 67  Q 1715 205 1715 410  Q 1715 627 1824 922  L 2310 2266  L 1645 2266  Q 1568 2061 1401 1469  Q 1235 877 1068 512  Q 902 147 672 -38  Q 563 -115 442 -115  Q 314 -115 218 -32  Q 122 51 122 166  Q 122 429 314 480  Q 634 563 774 928  L 1299 2266  L 1261 2266  Q 973 2266 819 2208  Q 666 2150 474 1914  L 371 1914  Q 640 2362 931 2550  Q 1222 2739 1696 2739  L 3430 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXGeneral-Regular-6c" d="M 1645 0  L 134 0  L 134 96  Q 435 122 531 221  Q 627 320 627 589  L 627 3590  Q 627 3821 569 3910  Q 512 4000 358 4000  Q 224 4000 122 3987  L 122 4090  Q 730 4237 1133 4371  L 1165 4346  L 1165 557  Q 1165 288 1254 201  Q 1344 115 1645 96  L 1645 0  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXGeneral-Regular-6e" d="M 3104 0  L 1773 0  L 1779 96  Q 2016 115 2096 233  Q 2176 352 2176 672  L 2176 1946  Q 2176 2592 1709 2592  Q 1549 2592 1408 2515  Q 1267 2438 1050 2227  L 1050 461  Q 1050 269 1136 192  Q 1222 115 1466 96  L 1466 0  L 115 0  L 115 96  Q 358 115 435 214  Q 512 314 512 602  L 512 2157  Q 512 2394 467 2483  Q 422 2573 288 2573  Q 160 2573 102 2547  L 102 2656  Q 550 2784 979 2944  L 1030 2925  L 1030 2426  L 1037 2426  Q 1491 2944 1958 2944  Q 2323 2944 2518 2688  Q 2714 2432 2714 1958  L 2714 544  Q 2714 288 2790 205  Q 2867 122 3104 96  L 3104 0  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXGeneral-Regular-7c" d="M 851 -90  L 429 -90  L 429 4326  L 851 4326  L 851 -90  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXGeneral-Regular-73" d="M 998 1926  L 1664 1523  Q 1984 1331 2105 1164  Q 2227 998 2227 736  Q 2227 416 1961 176  Q 1696 -64 1331 -64  Q 1030 -64 864 -6  Q 691 51 570 51  Q 461 51 416 -26  L 333 -26  L 333 979  L 435 979  Q 538 512 730 294  Q 922 77 1248 77  Q 1485 77 1632 211  Q 1779 346 1779 550  Q 1779 845 1440 1030  L 1094 1222  Q 326 1651 326 2150  Q 326 2522 566 2730  Q 806 2938 1210 2938  Q 1491 2938 1638 2867  Q 1754 2816 1818 2816  Q 1862 2816 1920 2880  L 1990 2880  L 2022 2010  L 1926 2010  Q 1818 2445 1654 2621  Q 1491 2797 1203 2797  Q 986 2797 854 2688  Q 723 2579 723 2362  Q 723 2253 796 2128  Q 870 2003 998 1926  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXGeneral-Regular-65" d="M 2611 1050  L 2714 1005  Q 2330 -64 1376 -64  Q 813 -64 486 329  Q 160 723 160 1389  Q 160 2074 525 2509  Q 890 2944 1485 2944  Q 2061 2944 2374 2502  Q 2560 2246 2592 1773  L 621 1773  Q 646 1370 700 1158  Q 755 947 915 730  Q 1184 378 1626 378  Q 1939 378 2153 531  Q 2368 685 2611 1050  z M 634 1978  L 1939 1978  Q 1882 2381 1750 2547  Q 1619 2714 1312 2714  Q 1043 2714 864 2525  Q 685 2336 634 1978  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXGeneral-Regular-63" d="M 2547 998  L 2637 941  Q 2362 403 2112 205  Q 1786 -64 1376 -64  Q 845 -64 502 336  Q 160 736 160 1357  Q 160 2170 698 2618  Q 1094 2944 1562 2944  Q 1965 2944 2256 2749  Q 2547 2554 2547 2285  Q 2547 2176 2457 2096  Q 2368 2016 2246 2016  Q 2022 2016 1939 2310  L 1901 2451  Q 1850 2630 1773 2694  Q 1696 2758 1523 2758  Q 1133 2758 893 2451  Q 653 2144 653 1645  Q 653 1094 928 745  Q 1203 397 1645 397  Q 1920 397 2118 528  Q 2317 659 2547 998  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXSizeOneSym-Regular-28" d="M 2445 -858  L 2445 -1050  Q 1728 -371 1309 630  Q 890 1632 890 2886  Q 890 4122 1309 5136  Q 1728 6150 2445 6822  L 2445 6630  Q 1408 5363 1408 2886  Q 1408 410 2445 -858  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXSizeOneSym-Regular-29" d="M 550 6630  L 550 6822  Q 1267 6144 1686 5142  Q 2106 4141 2106 2886  Q 2106 1651 1686 636  Q 1267 -378 550 -1050  L 550 -858  Q 1587 410 1587 2886  Q 1587 5363 550 6630  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-18-STIXGeneral-Regular-3c" d="M 3974 -154  L 358 1594  L 358 1658  L 3974 3418  L 3974 3002  L 1210 1626  L 3974 250  L 3974 -154  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-18-STIXGeneral-Italic-79" transform="translate(0 0.01875)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-28" transform="translate(44.399994 0.01875)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Italic-78" transform="translate(77.699982 0.01875)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-29" transform="translate(122.099976 0.01875)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-3d" transform="translate(169.83996 0.01875)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-39b" transform="translate(252.779941 37.815625) scale(0.7)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Italic-3c0" transform="translate(259.779941 -23.392187) scale(0.7)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-6c" transform="translate(314.419928 0.01875)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-6e" transform="translate(342.219916 0.01875)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-7c" transform="translate(404.253471 -38.384375) scale(1.604393)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-73" transform="translate(436.353462 0.01875)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-65" transform="translate(475.253456 0.01875)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-63" transform="translate(519.65345 0.01875)"></use>
    <use xlink:href="#eq-18-STIXSizeOneSym-Regular-28" transform="translate(576.087015 -25.853125) scale(0.898844)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Italic-3c0" transform="translate(618.148508 39.073438) scale(0.7)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Italic-78" transform="translate(653.428504 39.073438) scale(0.7)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-39b" transform="translate(627.148508 -40.61875) scale(0.7)"></use>
    <use xlink:href="#eq-18-STIXSizeOneSym-Regular-29" transform="translate(697.008499 -25.853125) scale(0.898844)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-7c" transform="translate(739.069992 -38.384375) scale(1.604393)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-2c" transform="translate(771.169983 0.01875)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-2212" transform="translate(969.449924 0.01875)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-39b" transform="translate(1052.389905 37.815625) scale(0.7)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-32" transform="translate(1059.389905 -40.75) scale(0.7)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-3c" transform="translate(1128.469888 0.01875)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Italic-78" transform="translate(1211.40987 0.01875)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-3c" transform="translate(1270.24986 0.01875)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-39b" transform="translate(1353.189841 37.815625) scale(0.7)"></use>
    <use xlink:href="#eq-18-STIXGeneral-Regular-32" transform="translate(1360.189841 -40.75) scale(0.7)"></use>
    <path d="M 252.779941 12.815625  L 252.779941 19.065625  L 301.919928 19.065625  L 301.919928 12.815625  L 252.779941 12.815625  z "></path>
    <path d="M 618.148508 12.815625  L 618.148508 19.065625  L 684.508499 19.065625  L 684.508499 12.815625  L 618.148508 12.815625  z "></path>
    <path d="M 1052.389905 12.815625  L 1052.389905 19.065625  L 1101.529892 19.065625  L 1101.529892 12.815625  L 1052.389905 12.815625  z "></path>
    <path d="M 1353.189841 12.815625  L 1353.189841 19.065625  L 1402.329828 19.065625  L 1402.329828 12.815625  L 1353.189841 12.815625  z "></path>
   </g>
  </g>
 </g>
</svg></div>
  <p><strong>x、y 都是器件平面内的坐标</strong>，<var>y</var> 不表示柱高。<strong>ξ 是曲线的局部切线方位角</strong>，不表示入射角。对上式求导，在所列主区间内有：</p>
  <div class="math" data-tex="\frac{dy}{dx}=\tan\left(\frac{\pi x}{\Lambda}\right),\qquad \xi(x)=\arctan\frac{dy}{dx}=\frac{\pi x}{\Lambda}" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="228pt" height="23pt" viewBox="0 0 228 23" version="1.1" role="img" aria-label="dy/dx=tan(πx/Λ)，ξ(x)=πx/Λ" focusable="false">
 <title>dy/dx=tan(πx/Λ)，ξ(x)=πx/Λ</title><defs>
 </defs>
 <g id="eq-19-figure_1">
  <g id="eq-19-patch_1">
   <path d="M 0 23  L 228 23  L 228 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-19-text_1">
   <!-- $\frac{dy}{dx}=\tan\left(\frac{\pi x}{\Lambda}\right),\qquad \xi(x)=\arctan\frac{dy}{dx}=\frac{\pi x}{\Lambda}$ -->
   <g style="fill: #17313d" transform="translate(0 16) scale(0.16 -0.16)">
    <defs>
     <path id="eq-19-STIXGeneral-Italic-64" d="M 3334 4371  L 3373 4333  L 3123 3360  L 2739 1958  Q 2323 429 2323 384  Q 2323 256 2438 256  Q 2522 256 2614 336  Q 2707 416 2963 710  L 3040 646  Q 2547 -83 2099 -83  Q 1978 -83 1907 -6  Q 1837 70 1837 205  Q 1837 397 1920 774  Q 1645 307 1379 118  Q 1114 -70 781 -70  Q 461 -70 278 125  Q 96 320 96 678  Q 96 1440 713 2131  Q 1331 2822 1965 2822  Q 2163 2822 2256 2732  Q 2349 2643 2381 2451  L 2387 2451  L 2675 3494  Q 2765 3808 2765 3949  Q 2765 4051 2694 4076  Q 2624 4102 2355 4115  L 2355 4224  Q 2848 4269 3334 4371  z M 2278 2310  Q 2278 2477 2185 2576  Q 2093 2675 1978 2675  Q 1677 2675 1395 2381  Q 1075 2042 864 1571  Q 653 1101 653 704  Q 653 486 752 361  Q 851 237 1024 237  Q 1312 237 1606 550  Q 1901 864 2089 1350  Q 2278 1837 2278 2310  z " transform="scale(0.015625)"></path>
     <path id="eq-19-STIXGeneral-Italic-79" d="M 1555 1190  L 1690 486  Q 2118 1190 2294 1558  Q 2470 1926 2470 2131  Q 2470 2234 2304 2336  Q 2138 2445 2138 2586  Q 2138 2688 2211 2755  Q 2285 2822 2394 2822  Q 2534 2822 2630 2720  Q 2726 2618 2726 2470  Q 2726 1914 1888 518  Q 1389 -307 918 -812  Q 448 -1318 173 -1318  Q 26 -1318 -64 -1241  Q -154 -1165 -154 -1043  Q -154 -934 -80 -860  Q -6 -787 96 -787  Q 218 -787 314 -876  Q 410 -966 486 -966  Q 602 -966 794 -755  Q 877 -672 1040 -457  Q 1203 -243 1248 -173  Q 1312 -45 1312 51  Q 1312 243 1113 1046  Q 915 1850 787 2176  Q 698 2413 592 2499  Q 486 2586 294 2586  Q 192 2586 96 2560  L 96 2669  Q 237 2694 301 2707  Q 563 2758 986 2822  L 1011 2822  Q 1082 2822 1277 2227  Q 1472 1632 1555 1190  z " transform="scale(0.015625)"></path>
     <path id="eq-19-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-19-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-19-STIXGeneral-Regular-74" d="M 1702 493  L 1786 422  Q 1478 -64 1011 -64  Q 448 -64 448 749  L 448 2675  L 109 2675  Q 83 2694 83 2720  Q 83 2771 192 2842  Q 435 2982 813 3526  Q 826 3546 874 3606  Q 922 3667 941 3706  Q 986 3706 986 3622  L 986 2880  L 1632 2880  L 1632 2675  L 986 2675  L 986 845  Q 986 538 1062 403  Q 1139 269 1318 269  Q 1510 269 1702 493  z " transform="scale(0.015625)"></path>
     <path id="eq-19-STIXGeneral-Regular-61" d="M 2829 422  L 2829 243  Q 2586 -64 2253 -64  Q 1888 -64 1843 403  L 1837 403  Q 1427 -64 909 -64  Q 608 -64 422 112  Q 237 288 237 602  Q 237 1050 685 1350  Q 992 1555 1837 1869  L 1837 2214  Q 1837 2502 1699 2646  Q 1562 2790 1338 2790  Q 1146 2790 1018 2697  Q 890 2605 890 2477  Q 890 2419 909 2348  Q 928 2278 928 2208  Q 928 2112 841 2029  Q 755 1946 634 1946  Q 525 1946 441 2029  Q 358 2112 358 2240  Q 358 2547 685 2752  Q 986 2944 1421 2944  Q 1939 2944 2176 2656  Q 2291 2522 2323 2384  Q 2355 2246 2355 1946  L 2355 723  Q 2355 301 2554 301  Q 2682 301 2829 422  z M 1837 813  L 1837 1715  Q 1248 1510 1018 1293  Q 800 1094 800 800  Q 800 557 921 432  Q 1043 307 1242 307  Q 1453 307 1613 410  Q 1747 506 1792 589  Q 1837 672 1837 813  z " transform="scale(0.015625)"></path>
     <path id="eq-19-STIXGeneral-Regular-6e" d="M 3104 0  L 1773 0  L 1779 96  Q 2016 115 2096 233  Q 2176 352 2176 672  L 2176 1946  Q 2176 2592 1709 2592  Q 1549 2592 1408 2515  Q 1267 2438 1050 2227  L 1050 461  Q 1050 269 1136 192  Q 1222 115 1466 96  L 1466 0  L 115 0  L 115 96  Q 358 115 435 214  Q 512 314 512 602  L 512 2157  Q 512 2394 467 2483  Q 422 2573 288 2573  Q 160 2573 102 2547  L 102 2656  Q 550 2784 979 2944  L 1030 2925  L 1030 2426  L 1037 2426  Q 1491 2944 1958 2944  Q 2323 2944 2518 2688  Q 2714 2432 2714 1958  L 2714 544  Q 2714 288 2790 205  Q 2867 122 3104 96  L 3104 0  z " transform="scale(0.015625)"></path>
     <path id="eq-19-STIXSizeOneSym-Regular-28" d="M 2445 -858  L 2445 -1050  Q 1728 -371 1309 630  Q 890 1632 890 2886  Q 890 4122 1309 5136  Q 1728 6150 2445 6822  L 2445 6630  Q 1408 5363 1408 2886  Q 1408 410 2445 -858  z " transform="scale(0.015625)"></path>
     <path id="eq-19-STIXGeneral-Italic-3c0" d="M 3430 2739  L 3296 2266  L 2643 2266  Q 2624 2195 2502 1782  Q 2381 1370 2297 1072  Q 2214 774 2214 717  Q 2214 448 2413 448  Q 2694 448 2867 838  L 2970 838  Q 2886 486 2652 208  Q 2419 -70 2093 -70  Q 1901 -70 1808 67  Q 1715 205 1715 410  Q 1715 627 1824 922  L 2310 2266  L 1645 2266  Q 1568 2061 1401 1469  Q 1235 877 1068 512  Q 902 147 672 -38  Q 563 -115 442 -115  Q 314 -115 218 -32  Q 122 51 122 166  Q 122 429 314 480  Q 634 563 774 928  L 1299 2266  L 1261 2266  Q 973 2266 819 2208  Q 666 2150 474 1914  L 371 1914  Q 640 2362 931 2550  Q 1222 2739 1696 2739  L 3430 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-19-STIXGeneral-Regular-39b" d="M 4397 0  L 2765 0  L 2765 122  Q 2790 122 2841 125  Q 2893 128 2918 128  Q 2944 128 2985 131  Q 3027 134 3049 140  Q 3072 147 3101 156  Q 3130 166 3146 182  Q 3162 198 3178 220  Q 3194 243 3200 268  Q 3206 294 3206 333  Q 3206 474 3085 781  L 2061 3411  L 2048 3411  L 979 653  Q 922 506 922 384  Q 922 237 1027 179  Q 1133 122 1370 122  L 1370 0  L 96 0  L 96 122  Q 371 147 499 323  Q 627 499 902 1190  L 2157 4314  L 2285 4314  L 3795 710  Q 3930 384 4042 265  Q 4154 147 4397 122  L 4397 0  z " transform="scale(0.015625)"></path>
     <path id="eq-19-STIXSizeOneSym-Regular-29" d="M 550 6630  L 550 6822  Q 1267 6144 1686 5142  Q 2106 4141 2106 2886  Q 2106 1651 1686 636  Q 1267 -378 550 -1050  L 550 -858  Q 1587 410 1587 2886  Q 1587 5363 550 6630  z " transform="scale(0.015625)"></path>
     <path id="eq-19-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-19-STIXGeneral-Italic-3be" d="M 1894 4371  L 1920 4269  Q 1453 4115 1453 3808  Q 1453 3654 1638 3622  Q 2221 4013 2554 4013  Q 2854 4013 2854 3814  Q 2854 3622 2601 3510  Q 2349 3398 1856 3398  Q 1619 3398 1465 3180  Q 1312 2963 1312 2790  Q 1312 2573 1478 2451  Q 1856 2714 2362 2714  Q 2701 2714 2701 2522  Q 2701 2406 2617 2326  Q 2534 2246 2406 2208  Q 2278 2170 2169 2154  Q 2061 2138 1965 2138  Q 1779 2138 1504 2221  Q 1158 2106 841 1741  Q 525 1376 518 1043  Q 518 730 694 589  Q 870 448 1216 448  Q 1261 448 1350 451  Q 1440 454 1459 454  Q 1862 454 2080 294  Q 2298 134 2298 -134  Q 2298 -422 2118 -678  Q 1978 -896 1728 -1040  Q 1478 -1184 1261 -1184  Q 1082 -1184 957 -1101  Q 832 -1018 832 -851  Q 832 -742 909 -662  Q 986 -582 1107 -582  Q 1210 -582 1328 -675  Q 1446 -768 1523 -768  Q 1734 -768 1888 -643  Q 2042 -518 2042 -326  Q 2042 -6 1555 -6  Q 1472 -6 1270 -38  Q 1069 -70 973 -70  Q 192 -70 192 685  Q 198 1210 508 1651  Q 819 2093 1312 2336  Q 1075 2496 1075 2739  Q 1075 3117 1446 3424  Q 1363 3424 1254 3510  Q 1146 3597 1146 3712  Q 1146 4179 1894 4371  z " transform="scale(0.015625)"></path>
     <path id="eq-19-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-19-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-19-STIXGeneral-Regular-72" d="M 1024 2931  L 1024 2342  Q 1267 2688 1430 2816  Q 1594 2944 1792 2944  Q 1958 2944 2051 2854  Q 2144 2765 2144 2605  Q 2144 2470 2077 2393  Q 2010 2317 1894 2317  Q 1773 2317 1638 2445  Q 1536 2541 1472 2541  Q 1338 2541 1181 2355  Q 1024 2170 1024 2016  L 1024 576  Q 1024 301 1133 205  Q 1242 109 1568 96  L 1568 0  L 32 0  L 32 96  Q 339 154 412 224  Q 486 294 486 538  L 486 2138  Q 486 2349 438 2435  Q 390 2522 269 2522  Q 166 2522 45 2496  L 45 2598  Q 448 2726 992 2944  L 1024 2931  z " transform="scale(0.015625)"></path>
     <path id="eq-19-STIXGeneral-Regular-63" d="M 2547 998  L 2637 941  Q 2362 403 2112 205  Q 1786 -64 1376 -64  Q 845 -64 502 336  Q 160 736 160 1357  Q 160 2170 698 2618  Q 1094 2944 1562 2944  Q 1965 2944 2256 2749  Q 2547 2554 2547 2285  Q 2547 2176 2457 2096  Q 2368 2016 2246 2016  Q 2022 2016 1939 2310  L 1901 2451  Q 1850 2630 1773 2694  Q 1696 2758 1523 2758  Q 1133 2758 893 2451  Q 653 2144 653 1645  Q 653 1094 928 745  Q 1203 397 1645 397  Q 1920 397 2118 528  Q 2317 659 2547 998  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-19-STIXGeneral-Italic-64" transform="translate(0 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Italic-79" transform="translate(34.999989 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Italic-64" transform="translate(0 -40.28125) scale(0.7)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Italic-78" transform="translate(34.999989 -40.28125) scale(0.7)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-3d" transform="translate(93.019981 0.979687)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-74" transform="translate(175.959962 0.979687)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-61" transform="translate(203.75995 0.979687)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-6e" transform="translate(248.159944 0.979687)"></use>
    <use xlink:href="#eq-19-STIXSizeOneSym-Regular-28" transform="translate(310.1935 -24.892188) scale(0.898844)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Italic-3c0" transform="translate(352.254993 40.034375) scale(0.7)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Italic-78" transform="translate(387.534988 40.034375) scale(0.7)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-39b" transform="translate(361.254993 -39.657813) scale(0.7)"></use>
    <use xlink:href="#eq-19-STIXSizeOneSym-Regular-29" transform="translate(431.114984 -24.892188) scale(0.898844)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-2c" transform="translate(473.176477 0.979687)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Italic-3be" transform="translate(657.016422 0.979687)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-28" transform="translate(702.416415 0.979687)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Italic-78" transform="translate(735.716403 0.979687)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-29" transform="translate(780.116397 0.979687)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-3d" transform="translate(827.856381 0.979687)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-61" transform="translate(910.796362 0.979687)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-72" transform="translate(955.196356 0.979687)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-63" transform="translate(988.496344 0.979687)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-74" transform="translate(1032.896338 0.979687)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-61" transform="translate(1060.696326 0.979687)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-6e" transform="translate(1105.09632 0.979687)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Italic-64" transform="translate(1167.129875 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Italic-79" transform="translate(1202.129865 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Italic-64" transform="translate(1167.129875 -40.28125) scale(0.7)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Italic-78" transform="translate(1202.129865 -40.28125) scale(0.7)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-3d" transform="translate(1260.149857 0.979687)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Italic-3c0" transform="translate(1343.089838 40.034375) scale(0.7)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Italic-78" transform="translate(1378.369834 40.034375) scale(0.7)"></use>
    <use xlink:href="#eq-19-STIXGeneral-Regular-39b" transform="translate(1352.089838 -39.657813) scale(0.7)"></use>
    <path d="M 0 13.776563  L 0 20.026563  L 66.079985 20.026563  L 66.079985 13.776563  L 0 13.776563  z "></path>
    <path d="M 352.254993 13.776562  L 352.254993 20.026562  L 418.614984 20.026562  L 418.614984 13.776562  L 352.254993 13.776562  z "></path>
    <path d="M 1167.129875 13.776563  L 1167.129875 20.026563  L 1233.20986 20.026563  L 1233.20986 13.776563  L 1167.129875 13.776563  z "></path>
    <path d="M 1343.089838 13.776562  L 1343.089838 20.026562  L 1409.449829 20.026562  L 1409.449829 13.776562  L 1343.089838 13.776562  z "></path>
   </g>
  </g>
 </g>
</svg></div>
  <div class="math" data-tex="\phi_{\mathrm{PB}}(x)=-\frac{2\sigma\pi}{\Lambda}x,\qquad \frac{d\phi_{\mathrm{PB}}}{dx}=-\frac{2\sigma\pi}{\Lambda}" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="195pt" height="23pt" viewBox="0 0 195 23" version="1.1" role="img" aria-label="φPB(x)=−2σπx/Λ，dφPB/dx=−2σπ/Λ" focusable="false">
 <title>φPB(x)=−2σπx/Λ，dφPB/dx=−2σπ/Λ</title><defs>
 </defs>
 <g id="eq-20-figure_1">
  <g id="eq-20-patch_1">
   <path d="M 0 23  L 195 23  L 195 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-20-text_1">
   <!-- $\phi_{\mathrm{PB}}(x)=-\frac{2\sigma\pi}{\Lambda}x,\qquad \frac{d\phi_{\mathrm{PB}}}{dx}=-\frac{2\sigma\pi}{\Lambda}$ -->
   <g style="fill: #17313d" transform="translate(0 16) scale(0.16 -0.16)">
    <defs>
     <path id="eq-20-STIXGeneral-Italic-3d5" d="M 3078 4371  L 2650 2822  Q 3098 2822 3296 2746  Q 3808 2547 3808 1939  Q 3808 1709 3728 1446  Q 3648 1184 3481 915  Q 3315 646 3088 425  Q 2861 205 2537 67  Q 2214 -70 1850 -70  L 1504 -1312  L 1005 -1312  L 1350 -70  Q 883 -70 666 0  Q 173 160 173 819  Q 173 1018 256 1274  Q 339 1530 502 1802  Q 666 2074 886 2301  Q 1107 2528 1417 2675  Q 1728 2822 2061 2822  L 2157 2822  L 2586 4371  L 3078 4371  z M 2611 2688  L 1888 64  Q 2125 64 2330 166  Q 2694 352 2982 998  Q 3270 1645 3270 2093  Q 3270 2464 2982 2643  Q 2906 2688 2611 2688  z M 1389 64  L 2118 2688  Q 1760 2688 1427 2365  Q 1094 2042 902 1568  Q 710 1094 710 646  Q 710 237 1018 115  Q 1152 64 1389 64  z " transform="scale(0.015625)"></path>
     <path id="eq-20-STIXGeneral-Regular-50" d="M 102 4237  L 1760 4237  Q 2669 4237 3149 3834  Q 3469 3565 3469 3072  Q 3469 2560 3104 2234  Q 2835 1990 2553 1916  Q 2272 1843 1734 1843  Q 1549 1843 1293 1862  L 1293 717  Q 1293 352 1398 246  Q 1504 141 1894 122  L 1894 0  L 102 0  L 102 122  Q 474 147 557 256  Q 640 365 640 781  L 640 3526  Q 640 3885 547 3987  Q 454 4090 102 4115  L 102 4237  z M 1293 3770  L 1293 2118  Q 1510 2099 1683 2099  Q 2202 2099 2486 2352  Q 2771 2605 2771 3040  Q 2771 3558 2476 3779  Q 2182 4000 1517 4000  Q 1382 4000 1337 3952  Q 1293 3904 1293 3770  z " transform="scale(0.015625)"></path>
     <path id="eq-20-STIXGeneral-Regular-42" d="M 2701 2234  L 2701 2227  Q 3181 2150 3482 1875  Q 3795 1594 3795 1139  Q 3795 608 3379 304  Q 2963 0 2266 0  L 109 0  L 109 122  Q 486 134 604 246  Q 723 358 723 723  L 723 3520  Q 723 3891 614 3990  Q 506 4090 109 4115  L 109 4237  L 1901 4237  Q 2726 4237 3152 3958  Q 3578 3680 3578 3168  Q 3578 2733 3315 2502  Q 3130 2342 2701 2234  z M 1376 2342  L 1965 2342  Q 2925 2342 2925 3136  Q 2925 3546 2640 3773  Q 2355 4000 1792 4000  L 1530 4000  Q 1376 4000 1376 3795  L 1376 2342  z M 1376 2086  L 1376 525  Q 1376 365 1462 301  Q 1549 237 1773 237  Q 2208 237 2413 285  Q 2618 333 2816 512  Q 3059 723 3059 1146  Q 3059 1632 2758 1830  Q 2688 1882 2617 1917  Q 2547 1952 2492 1974  Q 2438 1997 2348 2016  Q 2259 2035 2211 2044  Q 2163 2054 2041 2060  Q 1920 2067 1862 2070  Q 1805 2074 1635 2080  Q 1466 2086 1376 2086  z " transform="scale(0.015625)"></path>
     <path id="eq-20-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-20-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-20-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-20-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-20-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-20-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-20-STIXGeneral-Italic-3c3" d="M 3398 2739  L 3283 2266  L 2195 2266  Q 2291 2112 2457 1981  Q 2624 1850 2717 1725  Q 2810 1600 2810 1389  Q 2810 851 2288 390  Q 1766 -70 1107 -70  Q 659 -70 416 170  Q 173 410 173 832  Q 173 1274 409 1706  Q 646 2138 1113 2438  Q 1581 2739 2157 2739  L 3398 2739  z M 2272 1414  Q 2272 1709 2166 1939  Q 2061 2170 1901 2266  Q 1530 2266 1120 1770  Q 710 1274 710 640  Q 710 358 844 211  Q 979 64 1210 64  Q 1638 64 1955 525  Q 2272 986 2272 1414  z " transform="scale(0.015625)"></path>
     <path id="eq-20-STIXGeneral-Italic-3c0" d="M 3430 2739  L 3296 2266  L 2643 2266  Q 2624 2195 2502 1782  Q 2381 1370 2297 1072  Q 2214 774 2214 717  Q 2214 448 2413 448  Q 2694 448 2867 838  L 2970 838  Q 2886 486 2652 208  Q 2419 -70 2093 -70  Q 1901 -70 1808 67  Q 1715 205 1715 410  Q 1715 627 1824 922  L 2310 2266  L 1645 2266  Q 1568 2061 1401 1469  Q 1235 877 1068 512  Q 902 147 672 -38  Q 563 -115 442 -115  Q 314 -115 218 -32  Q 122 51 122 166  Q 122 429 314 480  Q 634 563 774 928  L 1299 2266  L 1261 2266  Q 973 2266 819 2208  Q 666 2150 474 1914  L 371 1914  Q 640 2362 931 2550  Q 1222 2739 1696 2739  L 3430 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-20-STIXGeneral-Regular-39b" d="M 4397 0  L 2765 0  L 2765 122  Q 2790 122 2841 125  Q 2893 128 2918 128  Q 2944 128 2985 131  Q 3027 134 3049 140  Q 3072 147 3101 156  Q 3130 166 3146 182  Q 3162 198 3178 220  Q 3194 243 3200 268  Q 3206 294 3206 333  Q 3206 474 3085 781  L 2061 3411  L 2048 3411  L 979 653  Q 922 506 922 384  Q 922 237 1027 179  Q 1133 122 1370 122  L 1370 0  L 96 0  L 96 122  Q 371 147 499 323  Q 627 499 902 1190  L 2157 4314  L 2285 4314  L 3795 710  Q 3930 384 4042 265  Q 4154 147 4397 122  L 4397 0  z " transform="scale(0.015625)"></path>
     <path id="eq-20-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-20-STIXGeneral-Italic-64" d="M 3334 4371  L 3373 4333  L 3123 3360  L 2739 1958  Q 2323 429 2323 384  Q 2323 256 2438 256  Q 2522 256 2614 336  Q 2707 416 2963 710  L 3040 646  Q 2547 -83 2099 -83  Q 1978 -83 1907 -6  Q 1837 70 1837 205  Q 1837 397 1920 774  Q 1645 307 1379 118  Q 1114 -70 781 -70  Q 461 -70 278 125  Q 96 320 96 678  Q 96 1440 713 2131  Q 1331 2822 1965 2822  Q 2163 2822 2256 2732  Q 2349 2643 2381 2451  L 2387 2451  L 2675 3494  Q 2765 3808 2765 3949  Q 2765 4051 2694 4076  Q 2624 4102 2355 4115  L 2355 4224  Q 2848 4269 3334 4371  z M 2278 2310  Q 2278 2477 2185 2576  Q 2093 2675 1978 2675  Q 1677 2675 1395 2381  Q 1075 2042 864 1571  Q 653 1101 653 704  Q 653 486 752 361  Q 851 237 1024 237  Q 1312 237 1606 550  Q 1901 864 2089 1350  Q 2278 1837 2278 2310  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-20-STIXGeneral-Italic-3d5" transform="translate(0 0.045313)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Regular-50" transform="translate(62.699997 -13.182812) scale(0.7)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Regular-42" transform="translate(101.689995 -13.182812) scale(0.7)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Regular-28" transform="translate(152.789368 0.045313)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Italic-78" transform="translate(186.089355 0.045313)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Regular-29" transform="translate(230.489349 0.045313)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Regular-3d" transform="translate(278.229333 0.045313)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Regular-2212" transform="translate(361.169315 0.045313)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Regular-32" transform="translate(429.669299 39.1) scale(0.7)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Italic-3c3" transform="translate(464.669289 39.1) scale(0.7)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Italic-3c0" transform="translate(499.52928 39.1) scale(0.7)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Regular-39b" transform="translate(457.669299 -40.592187) scale(0.7)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Italic-78" transform="translate(547.309276 0.045313)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Regular-2c" transform="translate(591.70927 0.045313)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Italic-64" transform="translate(775.549214 52.192188) scale(0.7)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Italic-3d5" transform="translate(810.549203 52.192188) scale(0.7)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Regular-50" transform="translate(854.439201 42.9325) scale(0.49)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Regular-42" transform="translate(881.7322 42.9325) scale(0.49)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Italic-64" transform="translate(813.549214 -41.215625) scale(0.7)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Italic-78" transform="translate(848.549203 -41.215625) scale(0.7)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Regular-3d" transform="translate(944.441757 0.045313)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Regular-2212" transform="translate(1027.381738 0.045313)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Regular-32" transform="translate(1095.881723 39.1) scale(0.7)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Italic-3c3" transform="translate(1130.881712 39.1) scale(0.7)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Italic-3c0" transform="translate(1165.741704 39.1) scale(0.7)"></use>
    <use xlink:href="#eq-20-STIXGeneral-Regular-39b" transform="translate(1123.881723 -40.592187) scale(0.7)"></use>
    <path d="M 429.669299 12.842188  L 429.669299 19.092188  L 534.809276 19.092188  L 534.809276 12.842188  L 429.669299 12.842188  z "></path>
    <path d="M 775.549214 12.842187  L 775.549214 19.092187  L 917.501761 19.092187  L 917.501761 12.842187  L 775.549214 12.842187  z "></path>
    <path d="M 1095.881723 12.842188  L 1095.881723 19.092188  L 1201.0217 19.092188  L 1201.0217 12.842188  L 1095.881723 12.842188  z "></path>
   </g>
  </g>
 </g>
</svg></div>
  <p><strong>曲线是弯曲的，切线角却随横坐标线性变化；这使几何相位也随横坐标线性变化。</strong>当 <var>x</var> 趋近理想端点 <var>±Λ/2</var> 时，轮廓发散，所以实际结构必须截断。一整圈 <var>2π</var> 的相位跨度对应理想端点极限，不能忽略实际截断。<a class="cite no-styling" href="#ref-review">[综述式（4）及后文；求导为补充步骤]</a></p>
  <section class="lab" id="lab-catenary" aria-labelledby="lab-catenary-heading">
  <p class="lab-kicker">互动实验 · 悬链线与几何相位 <span class="lab-disclaimer">解析轮廓与理想 PB 相位</span></p>
  <h3 id="lab-catenary-heading">沿曲线移动，观察切线角怎样写入相位</h3>
  <p class="lab-intro">曲线位于器件的 x–y 平面内：y 不是结构高度。橙线为所选位置的切线；下方标尺显示相反圆偏振分量的几何相位。改变 σ 只翻转此相位项的符号。</p>
  <div class="lab-controls">
    <label class="lab-field"><span class="lab-label">曲线位置 x/Λ <output id="catenary-position-label">0.200</output></span><input id="catenary-position" type="range" min="-0.45" max="0.45" step="0.005" value="0.2"></label>
    <label class="lab-field"><span class="lab-label">入射手性符号 σ</span><select id="catenary-spin"><option value="1" selected>σ = +1</option><option value="-1">σ = −1</option></select></label>
  </div>
  <div class="lab-figure"><svg class="lab-chart" id="catenary-svg" role="img" aria-label="等比例坐标中的悬链线、所选位置的局部切线，以及相应 PB 几何相位。"></svg></div>
  <dl class="lab-values" aria-live="polite"><div><dt>面内切线角 ξ</dt><dd id="catenary-angle">36.0°</dd></div><div><dt>几何相位 φ<sub>PB</sub></dt><dd id="catenary-phase">−0.40π rad</dd></div><div><dt>面内轮廓 y/Λ</dt><dd id="catenary-height">—</dd></div></dl>
  <p class="lab-note">采用 y/Λ = ln|sec(πx/Λ)|/π、ξ = πx/Λ、φ<sub>PB</sub> = −2σξ。图中只展示 |x/Λ| ≤ 0.45；理想端点 ±0.5 处发散，实际器件需要截断。此图不计算转换效率、传播相位或器件色差。</p>
  <noscript>切线角 ξ 随横坐标线性变化，交叉圆偏振的几何相位为 −2σξ。</noscript>
</section>
  <figure class="paper-figure" id="figure-7"><button type="button" class="zoom-button" data-title="图 7 · 悬链线、转换效率与流线" aria-label="放大查看图 7 · 悬链线、转换效率与流线"><img src="/assets/wide-angle-metalens-reading/figure-7.png" loading="lazy" width="799" height="1393" alt="图 7 · 悬链线、转换效率与流线" decoding="async" data-figure-key="7"><span class="zoom-hint" aria-hidden="true">点击放大 ↗</span></button><figcaption><strong>图 7 · 悬链线、转换效率与流线。</strong>A、B：连续与离散轮廓及单元近似；C：转换效率比较；D：把目标相位转化为局部主轴与连续结构轮廓。图内条长 s 与本文前述的焦点横坐标 s 含义不同。<span class="figure-source">论文原图 · <a class="no-styling" href="#ref-review">[R1 p.10，图 7]</a> · 保留原图中的引文与来源标注。</span></figcaption></figure>
  <h3>图 7A–C 把结构连续性与转换效率联系起来</h3>
  <p>A 中的连续轮廓在局部单元里对应贯穿周期的条带，条长等于周期 <var>p</var>；B 中的短杆长度小于 <var>p</var>。原图用 <var>s</var> 表示条长，本篇称为“条长”以免与前文焦点坐标 <var>s</var> 混淆。二者给定周期和宽度后的主要区别，在于条带是否在长度方向连续连接。</p>
  <div class="table-wrap" tabindex="0" role="region" aria-label="对照表，可横向滚动查看"><table><thead><tr><th>图 7C 标记</th><th>结构参数</th><th>正确读法</th></tr></thead><tbody>
    <tr><td>灰色区域</td><td>Cell A，p=100–400 nm，条长=p</td><td>不同周期的结果范围；不是统计误差带</td></tr>
    <tr><td>蓝色虚线</td><td>Cell B，p=400 nm，条长=350 nm</td><td>离散短杆的一种尺寸设计</td></tr>
    <tr><td>绿色实线</td><td>Cell B，p=400 nm，条长=300 nm</td><td>另一种短杆长度设计</td></tr>
    <tr><td>黑色菱形</td><td>Measurements</td><td>实验测量点</td></tr>
  </tbody></table></div>
  <p>横轴为频率 THz。低频区域的灰带约在 50% 附近，而两种离散短杆响应较低；频率增大后，离散结构出现明显峰谷，连续结构的参数范围也会展开。这支持所比较结构在一定频段内的带宽优势，不能推广成所有频率、所有连续形状都优于离散结构。<a class="cite no-styling" href="#ref-126">[Pu 等，2015，原图 5；综述图 7A–C]</a></p>
  <p>原研究的转换效率 <strong>η 以总透射功率为分母</strong>，表示目标调制／交叉圆偏振分量在透射光中的比例。若还要评价相对于入射功率的绝对利用率，需要同时知道总透射率。图中的百分比不能直接作为整片透镜的聚焦效率。<a class="cite no-styling" href="#ref-126">[原研究正文与补充式 S8的定义]</a></p>
  <div class="note"><span class="note-label">“无色散”的范围</span><p>几何相位项 <var>−2σξ</var> 不显含波长，说明旋转引入的相位由几何方向决定。实际转换振幅、寄生传播相位、偏转角或焦距仍可能随波长改变。几何相位的这一性质，不能单独证明整片器件具有宽带消色差成像能力。</p></div>
  <p>伴随优化与悬链线并非互斥：前者是求梯度和更新结构的方法，后者提供组织准连续相位的一类结构思路。综述也提到拓扑优化中出现类似悬链线形状的结果。下一步需要把“一个方向上具有线性相位”的曲线，推广到整个二维透镜。</p>
</section>
<section id="streamlines" class="article-section">
  <p class="section-kicker"><span class="chapter-num">09</span>从几何相位到制造轮廓</p><h2>从目标相位到可加工流线：把图 7D 读完整</h2>
  <p><strong>前面的等强度悬链线解决了恒定相位梯度；真正的透镜还需要把任意目标相位变成二维结构。</strong>论文在图 7D 中给出的做法，是先确定目标波前，再把每个位置需要的几何相位换算成局部结构主轴，最后沿这些主轴积分出连续轮廓。这一部分采用的是<strong>类悬链线流线设计</strong>，不要求整个器件都由同一条标准悬链线重复拼接。<a class="cite no-styling" href="#ref-review">[R1 §3.3.2, p10–11, Fig7D]</a> <a class="cite no-styling" href="#ref-82">[原文文献82]</a></p>
  <figure class="paper-figure" id="figure-7d">
    <button type="button" class="zoom-button" data-title="图 7D · 目标场到结构流线" aria-label="放大查看图 7D · 目标场到结构流线"><img src="/assets/wide-angle-metalens-reading/figure-7d.png" loading="lazy" width="800" height="528" alt="图 7D · 目标场到结构流线" decoding="async" data-figure-key="7D">
    <span class="zoom-hint" aria-hidden="true">点击放大 ↗</span></button><figcaption>图 7D：从目标电场的相位分布，构造局部主轴方向，再积分成实体结构的轮廓。蓝箭头、橙箭头和红曲线承担不同角色。来源：<a class="no-styling" href="#ref-review">[R1 p10, Fig7D]</a>，综述转引<a class="no-styling" href="#ref-82">[原文文献82]</a>。</figcaption>
  </figure>
  <h3>先看三种对象：目标场、主轴方向、结构轮廓</h3>
  <p><strong>原文方法。</strong>以所选圆偏振光聚焦为例，从目标焦点反向确定器件面上所需的相位 <em>φ(x,y)</em>。这里是在确定目标波前，并非再次计算上一节的优化梯度。对本文采用的手性和相位符号，局部主轴方位角取<strong>−φ/2</strong>；这样，交叉圆偏振分量通过 PB 几何相位获得所需的 φ。论文用辅助复向量来表达这个关系：<a class="cite no-styling" href="#ref-review">[R1 §3.3.2, p10, Eq5]</a></p>
  <div class="math" data-tex="U_x=e^{i\phi/2},\qquad U_y=i e^{i\phi/2}" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="155pt" height="19pt" viewBox="0 0 155 19" version="1.1" role="img" aria-label="Ux = exp(iφ/2)，Uy = i exp(iφ/2)。" focusable="false">
 <title>Ux = exp(iφ/2)，Uy = i exp(iφ/2)。</title><defs>
 </defs>
 <g id="eq-21-figure_1">
  <g id="eq-21-patch_1">
   <path d="M 0 19  L 155 19  L 155 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-21-text_1">
   <!-- $U_x=e^{i\phi/2},\qquad U_y=i e^{i\phi/2}$ -->
   <g style="fill: #17313d" transform="translate(0 14) scale(0.16 -0.16)">
    <defs>
     <path id="eq-21-STIXGeneral-Italic-55" d="M 4896 4179  L 4896 4077  Q 4762 4045 4694 4016  Q 4627 3987 4563 3945  Q 4499 3904 4451 3789  Q 4403 3674 4358 3539  Q 4314 3405 4230 3123  L 3699 1299  Q 3482 557 3078 218  Q 2694 -115 2067 -115  Q 1440 -115 1046 179  Q 653 474 653 934  Q 653 1286 934 2317  L 1267 3526  Q 1325 3731 1325 3814  Q 1325 3942 1213 4006  Q 1101 4070 813 4077  L 813 4179  L 2554 4179  L 2554 4077  Q 2227 4045 2102 3936  Q 1978 3827 1888 3494  L 1485 2048  Q 1229 1146 1229 902  Q 1229 563 1481 355  Q 1734 147 2112 147  Q 2650 147 2976 492  Q 3302 838 3520 1632  L 3930 3123  Q 4077 3667 4077 3782  Q 4077 3923 3981 3987  Q 3885 4051 3629 4077  L 3629 4179  L 4896 4179  z " transform="scale(0.015625)"></path>
     <path id="eq-21-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-21-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-21-STIXGeneral-Italic-65" d="M 2291 698  L 2368 621  Q 1805 -70 1062 -70  Q 672 -70 435 170  Q 198 410 198 806  Q 198 1555 796 2188  Q 1395 2822 2112 2822  Q 2362 2822 2499 2707  Q 2637 2592 2637 2387  Q 2637 1965 2147 1632  Q 1658 1299 819 1190  Q 755 1062 755 800  Q 755 538 918 378  Q 1082 218 1350 218  Q 1562 218 1754 317  Q 1946 416 2291 698  z M 973 1613  L 864 1331  Q 1581 1504 1894 1805  Q 2214 2112 2214 2426  Q 2214 2675 1990 2675  Q 1722 2675 1430 2364  Q 1139 2054 973 1613  z " transform="scale(0.015625)"></path>
     <path id="eq-21-STIXGeneral-Italic-69" d="M 1690 3834  Q 1690 3699 1597 3603  Q 1504 3507 1376 3507  Q 1235 3507 1152 3600  Q 1069 3693 1069 3846  Q 1069 3994 1155 4090  Q 1242 4186 1370 4186  Q 1498 4186 1594 4080  Q 1690 3974 1690 3834  z M 1421 730  L 1504 659  Q 1235 243 1049 86  Q 864 -70 627 -70  Q 314 -70 314 282  Q 314 467 454 992  L 762 2125  Q 819 2330 819 2406  Q 819 2502 745 2528  Q 672 2554 410 2560  L 410 2662  Q 704 2688 1434 2822  L 1459 2803  L 858 608  Q 794 390 794 326  Q 794 230 883 230  Q 1043 230 1421 730  z " transform="scale(0.015625)"></path>
     <path id="eq-21-STIXGeneral-Italic-3d5" d="M 3078 4371  L 2650 2822  Q 3098 2822 3296 2746  Q 3808 2547 3808 1939  Q 3808 1709 3728 1446  Q 3648 1184 3481 915  Q 3315 646 3088 425  Q 2861 205 2537 67  Q 2214 -70 1850 -70  L 1504 -1312  L 1005 -1312  L 1350 -70  Q 883 -70 666 0  Q 173 160 173 819  Q 173 1018 256 1274  Q 339 1530 502 1802  Q 666 2074 886 2301  Q 1107 2528 1417 2675  Q 1728 2822 2061 2822  L 2157 2822  L 2586 4371  L 3078 4371  z M 2611 2688  L 1888 64  Q 2125 64 2330 166  Q 2694 352 2982 998  Q 3270 1645 3270 2093  Q 3270 2464 2982 2643  Q 2906 2688 2611 2688  z M 1389 64  L 2118 2688  Q 1760 2688 1427 2365  Q 1094 2042 902 1568  Q 710 1094 710 646  Q 710 237 1018 115  Q 1152 64 1389 64  z " transform="scale(0.015625)"></path>
     <path id="eq-21-STIXGeneral-Regular-2f" d="M 1837 4326  L 378 -90  L -58 -90  L 1408 4326  L 1837 4326  z " transform="scale(0.015625)"></path>
     <path id="eq-21-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-21-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-21-STIXGeneral-Italic-79" d="M 1555 1190  L 1690 486  Q 2118 1190 2294 1558  Q 2470 1926 2470 2131  Q 2470 2234 2304 2336  Q 2138 2445 2138 2586  Q 2138 2688 2211 2755  Q 2285 2822 2394 2822  Q 2534 2822 2630 2720  Q 2726 2618 2726 2470  Q 2726 1914 1888 518  Q 1389 -307 918 -812  Q 448 -1318 173 -1318  Q 26 -1318 -64 -1241  Q -154 -1165 -154 -1043  Q -154 -934 -80 -860  Q -6 -787 96 -787  Q 218 -787 314 -876  Q 410 -966 486 -966  Q 602 -966 794 -755  Q 877 -672 1040 -457  Q 1203 -243 1248 -173  Q 1312 -45 1312 51  Q 1312 243 1113 1046  Q 915 1850 787 2176  Q 698 2413 592 2499  Q 486 2586 294 2586  Q 192 2586 96 2560  L 96 2669  Q 237 2694 301 2707  Q 563 2758 986 2822  L 1011 2822  Q 1082 2822 1277 2227  Q 1472 1632 1555 1190  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-21-STIXGeneral-Italic-55" transform="translate(0 0.917188)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Italic-78" transform="translate(72.199982 -12.310937) scale(0.7)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Regular-3d" transform="translate(122.129349 0.917188)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Italic-65" transform="translate(205.06933 0.917188)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Italic-69" transform="translate(255.642449 36.192188) scale(0.7)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Italic-3d5" transform="translate(275.10244 36.192188) scale(0.7)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Regular-2f" transform="translate(318.992438 36.192188) scale(0.7)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Regular-32" transform="translate(338.45243 36.192188) scale(0.7)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Regular-2c" transform="translate(377.861794 0.917188)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Italic-55" transform="translate(561.701738 0.917188)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Italic-79" transform="translate(633.90172 -12.310937) scale(0.7)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Regular-3d" transform="translate(683.831087 0.917188)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Italic-69" transform="translate(766.771068 0.917188)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Italic-65" transform="translate(794.571056 0.917188)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Italic-69" transform="translate(845.144175 36.192188) scale(0.7)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Italic-3d5" transform="translate(864.604166 36.192188) scale(0.7)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Regular-2f" transform="translate(908.494164 36.192188) scale(0.7)"></use>
    <use xlink:href="#eq-21-STIXGeneral-Regular-32" transform="translate(927.954156 36.192188) scale(0.7)"></use>
   </g>
  </g>
 </g>
</svg></div>
  <div class="math" data-tex="\mathbf{v}=(\mathrm{Re}\,U_x,\mathrm{Re}\,U_y)=(\cos(\phi/2),-\sin(\phi/2))" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="269pt" height="16pt" viewBox="0 0 269 16" version="1.1" role="img" aria-label="取实部得到方向 v = (cos(φ/2), −sin(φ/2))。" focusable="false">
 <title>取实部得到方向 v = (cos(φ/2), −sin(φ/2))。</title><defs>
 </defs>
 <g id="eq-22-figure_1">
  <g id="eq-22-patch_1">
   <path d="M 0 16  L 269 16  L 269 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-22-text_1">
   <!-- $\mathbf{v}=(\mathrm{Re}\,U_x,\mathrm{Re}\,U_y)=(\cos(\phi/2),-\sin(\phi/2))$ -->
   <g style="fill: #17313d" transform="translate(0 11) scale(0.16 -0.16)">
    <defs>
     <path id="eq-22-STIXGeneral-Bold-76" d="M 3104 2950  L 3104 2797  Q 2950 2784 2886 2723  Q 2822 2662 2733 2445  L 1709 -90  L 1542 -90  L 774 1805  Q 474 2547 352 2707  Q 301 2771 134 2797  L 134 2950  L 1734 2950  L 1734 2797  L 1619 2784  Q 1395 2758 1395 2630  Q 1395 2573 1453 2432  L 1958 1133  L 2419 2298  Q 2490 2464 2490 2586  Q 2490 2701 2416 2742  Q 2342 2784 2138 2797  L 2138 2950  L 3104 2950  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Regular-52" d="M 4224 0  L 3187 0  L 1664 1971  L 1306 1958  L 1306 717  Q 1306 352 1405 249  Q 1504 147 1875 122  L 1875 0  L 109 0  L 109 122  Q 474 154 563 262  Q 653 371 653 794  L 653 3526  Q 653 3885 563 3987  Q 474 4090 109 4115  L 109 4237  L 1850 4237  Q 2726 4237 3187 3859  Q 3501 3603 3501 3091  Q 3501 2221 2342 2042  L 3622 422  Q 3757 256 3878 198  Q 4000 141 4224 122  L 4224 0  z M 1306 3731  L 1306 2195  Q 1766 2202 1990 2246  Q 2214 2291 2438 2413  Q 2803 2618 2803 3142  Q 2803 4000 1632 4000  Q 1459 4000 1382 3945  Q 1306 3891 1306 3731  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Regular-65" d="M 2611 1050  L 2714 1005  Q 2330 -64 1376 -64  Q 813 -64 486 329  Q 160 723 160 1389  Q 160 2074 525 2509  Q 890 2944 1485 2944  Q 2061 2944 2374 2502  Q 2560 2246 2592 1773  L 621 1773  Q 646 1370 700 1158  Q 755 947 915 730  Q 1184 378 1626 378  Q 1939 378 2153 531  Q 2368 685 2611 1050  z M 634 1978  L 1939 1978  Q 1882 2381 1750 2547  Q 1619 2714 1312 2714  Q 1043 2714 864 2525  Q 685 2336 634 1978  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Italic-55" d="M 4896 4179  L 4896 4077  Q 4762 4045 4694 4016  Q 4627 3987 4563 3945  Q 4499 3904 4451 3789  Q 4403 3674 4358 3539  Q 4314 3405 4230 3123  L 3699 1299  Q 3482 557 3078 218  Q 2694 -115 2067 -115  Q 1440 -115 1046 179  Q 653 474 653 934  Q 653 1286 934 2317  L 1267 3526  Q 1325 3731 1325 3814  Q 1325 3942 1213 4006  Q 1101 4070 813 4077  L 813 4179  L 2554 4179  L 2554 4077  Q 2227 4045 2102 3936  Q 1978 3827 1888 3494  L 1485 2048  Q 1229 1146 1229 902  Q 1229 563 1481 355  Q 1734 147 2112 147  Q 2650 147 2976 492  Q 3302 838 3520 1632  L 3930 3123  Q 4077 3667 4077 3782  Q 4077 3923 3981 3987  Q 3885 4051 3629 4077  L 3629 4179  L 4896 4179  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Italic-79" d="M 1555 1190  L 1690 486  Q 2118 1190 2294 1558  Q 2470 1926 2470 2131  Q 2470 2234 2304 2336  Q 2138 2445 2138 2586  Q 2138 2688 2211 2755  Q 2285 2822 2394 2822  Q 2534 2822 2630 2720  Q 2726 2618 2726 2470  Q 2726 1914 1888 518  Q 1389 -307 918 -812  Q 448 -1318 173 -1318  Q 26 -1318 -64 -1241  Q -154 -1165 -154 -1043  Q -154 -934 -80 -860  Q -6 -787 96 -787  Q 218 -787 314 -876  Q 410 -966 486 -966  Q 602 -966 794 -755  Q 877 -672 1040 -457  Q 1203 -243 1248 -173  Q 1312 -45 1312 51  Q 1312 243 1113 1046  Q 915 1850 787 2176  Q 698 2413 592 2499  Q 486 2586 294 2586  Q 192 2586 96 2560  L 96 2669  Q 237 2694 301 2707  Q 563 2758 986 2822  L 1011 2822  Q 1082 2822 1277 2227  Q 1472 1632 1555 1190  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Regular-63" d="M 2547 998  L 2637 941  Q 2362 403 2112 205  Q 1786 -64 1376 -64  Q 845 -64 502 336  Q 160 736 160 1357  Q 160 2170 698 2618  Q 1094 2944 1562 2944  Q 1965 2944 2256 2749  Q 2547 2554 2547 2285  Q 2547 2176 2457 2096  Q 2368 2016 2246 2016  Q 2022 2016 1939 2310  L 1901 2451  Q 1850 2630 1773 2694  Q 1696 2758 1523 2758  Q 1133 2758 893 2451  Q 653 2144 653 1645  Q 653 1094 928 745  Q 1203 397 1645 397  Q 1920 397 2118 528  Q 2317 659 2547 998  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Regular-6f" d="M 3008 1478  Q 3008 806 2608 371  Q 2208 -64 1568 -64  Q 979 -64 582 368  Q 186 800 186 1459  Q 186 2125 582 2534  Q 979 2944 1626 2944  Q 2221 2944 2614 2537  Q 3008 2131 3008 1478  z M 2432 1306  Q 2432 2035 2112 2445  Q 1856 2765 1504 2765  Q 1171 2765 966 2493  Q 762 2221 762 1747  Q 762 928 1101 435  Q 1318 115 1677 115  Q 2029 115 2230 432  Q 2432 749 2432 1306  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Regular-73" d="M 998 1926  L 1664 1523  Q 1984 1331 2105 1164  Q 2227 998 2227 736  Q 2227 416 1961 176  Q 1696 -64 1331 -64  Q 1030 -64 864 -6  Q 691 51 570 51  Q 461 51 416 -26  L 333 -26  L 333 979  L 435 979  Q 538 512 730 294  Q 922 77 1248 77  Q 1485 77 1632 211  Q 1779 346 1779 550  Q 1779 845 1440 1030  L 1094 1222  Q 326 1651 326 2150  Q 326 2522 566 2730  Q 806 2938 1210 2938  Q 1491 2938 1638 2867  Q 1754 2816 1818 2816  Q 1862 2816 1920 2880  L 1990 2880  L 2022 2010  L 1926 2010  Q 1818 2445 1654 2621  Q 1491 2797 1203 2797  Q 986 2797 854 2688  Q 723 2579 723 2362  Q 723 2253 796 2128  Q 870 2003 998 1926  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Italic-3d5" d="M 3078 4371  L 2650 2822  Q 3098 2822 3296 2746  Q 3808 2547 3808 1939  Q 3808 1709 3728 1446  Q 3648 1184 3481 915  Q 3315 646 3088 425  Q 2861 205 2537 67  Q 2214 -70 1850 -70  L 1504 -1312  L 1005 -1312  L 1350 -70  Q 883 -70 666 0  Q 173 160 173 819  Q 173 1018 256 1274  Q 339 1530 502 1802  Q 666 2074 886 2301  Q 1107 2528 1417 2675  Q 1728 2822 2061 2822  L 2157 2822  L 2586 4371  L 3078 4371  z M 2611 2688  L 1888 64  Q 2125 64 2330 166  Q 2694 352 2982 998  Q 3270 1645 3270 2093  Q 3270 2464 2982 2643  Q 2906 2688 2611 2688  z M 1389 64  L 2118 2688  Q 1760 2688 1427 2365  Q 1094 2042 902 1568  Q 710 1094 710 646  Q 710 237 1018 115  Q 1152 64 1389 64  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Regular-2f" d="M 1837 4326  L 378 -90  L -58 -90  L 1408 4326  L 1837 4326  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Regular-69" d="M 1152 4045  Q 1152 3904 1056 3811  Q 960 3718 819 3718  Q 685 3718 592 3811  Q 499 3904 499 4045  Q 499 4179 595 4275  Q 691 4371 826 4371  Q 966 4371 1059 4275  Q 1152 4179 1152 4045  z M 1619 0  L 102 0  L 102 96  Q 435 115 521 211  Q 608 307 608 666  L 608 2118  Q 608 2342 563 2432  Q 518 2522 397 2522  Q 243 2522 128 2490  L 128 2592  L 1120 2944  L 1146 2918  L 1146 672  Q 1146 314 1226 218  Q 1306 122 1619 96  L 1619 0  z " transform="scale(0.015625)"></path>
     <path id="eq-22-STIXGeneral-Regular-6e" d="M 3104 0  L 1773 0  L 1779 96  Q 2016 115 2096 233  Q 2176 352 2176 672  L 2176 1946  Q 2176 2592 1709 2592  Q 1549 2592 1408 2515  Q 1267 2438 1050 2227  L 1050 461  Q 1050 269 1136 192  Q 1222 115 1466 96  L 1466 0  L 115 0  L 115 96  Q 358 115 435 214  Q 512 314 512 602  L 512 2157  Q 512 2394 467 2483  Q 422 2573 288 2573  Q 160 2573 102 2547  L 102 2656  Q 550 2784 979 2944  L 1030 2925  L 1030 2426  L 1037 2426  Q 1491 2944 1958 2944  Q 2323 2944 2518 2688  Q 2714 2432 2714 1958  L 2714 544  Q 2714 288 2790 205  Q 2867 122 3104 96  L 3104 0  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-22-STIXGeneral-Bold-76" transform="translate(0 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-3d" transform="translate(64.439981 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-28" transform="translate(147.379962 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-52" transform="translate(180.67995 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-65" transform="translate(247.379947 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Italic-55" transform="translate(303.813512 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Italic-78" transform="translate(376.013493 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-2c" transform="translate(411.502864 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-52" transform="translate(450.942845 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-65" transform="translate(517.642842 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Italic-55" transform="translate(574.076407 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Italic-79" transform="translate(646.276389 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-29" transform="translate(681.765759 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-3d" transform="translate(729.505744 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-28" transform="translate(812.445725 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-63" transform="translate(845.745712 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-6f" transform="translate(890.145706 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-73" transform="translate(940.145691 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-28" transform="translate(979.045685 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Italic-3d5" transform="translate(1012.345673 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-2f" transform="translate(1075.04567 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-32" transform="translate(1102.845658 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-29" transform="translate(1152.845642 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-2c" transform="translate(1186.14563 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-2212" transform="translate(1240.025607 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-73" transform="translate(1322.965589 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-69" transform="translate(1361.865582 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-6e" transform="translate(1389.66557 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-28" transform="translate(1439.665555 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Italic-3d5" transform="translate(1472.965543 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-2f" transform="translate(1535.66554 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-32" transform="translate(1563.465528 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-29" transform="translate(1613.465512 0.703125)"></use>
    <use xlink:href="#eq-22-STIXGeneral-Regular-29" transform="translate(1646.7655 0.703125)"></use>
   </g>
  </g>
 </g>
</svg></div>
  <p><strong>理解辅助。</strong>可以把橙箭头理解成铺在平面上的“局部主轴指南”：每一小段结构应该沿着哪个方向延伸。<strong>红线的切线跟随这些主轴方向</strong>，所以它不是光线的传播轨迹，也不是相位梯度 ∇φ 的流线。等相位线要求沿线 φ 不变，而这里的要求是“沿线的切线角实现当地所需相位”，两种条件不同。由这个构造还可知：φ 增加 2π 会让箭头反向，却不改变同一根条状结构的主轴。</p>
  <div class="math" data-tex="\frac{dy}{dx}=-\tan\!\left(\frac{\phi(x,y)}{2}\right)" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="105pt" height="23pt" viewBox="0 0 105 23" version="1.1" role="img" aria-label="流线斜率 dy/dx = −tan[φ(x,y)/2]。" focusable="false">
 <title>流线斜率 dy/dx = −tan[φ(x,y)/2]。</title><defs>
 </defs>
 <g id="eq-23-figure_1">
  <g id="eq-23-patch_1">
   <path d="M 0 23  L 105 23  L 105 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-23-text_1">
   <!-- $\frac{dy}{dx}=-\tan\!\left(\frac{\phi(x,y)}{2}\right)$ -->
   <g style="fill: #17313d" transform="translate(0 16) scale(0.16 -0.16)">
    <defs>
     <path id="eq-23-STIXGeneral-Italic-64" d="M 3334 4371  L 3373 4333  L 3123 3360  L 2739 1958  Q 2323 429 2323 384  Q 2323 256 2438 256  Q 2522 256 2614 336  Q 2707 416 2963 710  L 3040 646  Q 2547 -83 2099 -83  Q 1978 -83 1907 -6  Q 1837 70 1837 205  Q 1837 397 1920 774  Q 1645 307 1379 118  Q 1114 -70 781 -70  Q 461 -70 278 125  Q 96 320 96 678  Q 96 1440 713 2131  Q 1331 2822 1965 2822  Q 2163 2822 2256 2732  Q 2349 2643 2381 2451  L 2387 2451  L 2675 3494  Q 2765 3808 2765 3949  Q 2765 4051 2694 4076  Q 2624 4102 2355 4115  L 2355 4224  Q 2848 4269 3334 4371  z M 2278 2310  Q 2278 2477 2185 2576  Q 2093 2675 1978 2675  Q 1677 2675 1395 2381  Q 1075 2042 864 1571  Q 653 1101 653 704  Q 653 486 752 361  Q 851 237 1024 237  Q 1312 237 1606 550  Q 1901 864 2089 1350  Q 2278 1837 2278 2310  z " transform="scale(0.015625)"></path>
     <path id="eq-23-STIXGeneral-Italic-79" d="M 1555 1190  L 1690 486  Q 2118 1190 2294 1558  Q 2470 1926 2470 2131  Q 2470 2234 2304 2336  Q 2138 2445 2138 2586  Q 2138 2688 2211 2755  Q 2285 2822 2394 2822  Q 2534 2822 2630 2720  Q 2726 2618 2726 2470  Q 2726 1914 1888 518  Q 1389 -307 918 -812  Q 448 -1318 173 -1318  Q 26 -1318 -64 -1241  Q -154 -1165 -154 -1043  Q -154 -934 -80 -860  Q -6 -787 96 -787  Q 218 -787 314 -876  Q 410 -966 486 -966  Q 602 -966 794 -755  Q 877 -672 1040 -457  Q 1203 -243 1248 -173  Q 1312 -45 1312 51  Q 1312 243 1113 1046  Q 915 1850 787 2176  Q 698 2413 592 2499  Q 486 2586 294 2586  Q 192 2586 96 2560  L 96 2669  Q 237 2694 301 2707  Q 563 2758 986 2822  L 1011 2822  Q 1082 2822 1277 2227  Q 1472 1632 1555 1190  z " transform="scale(0.015625)"></path>
     <path id="eq-23-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-23-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-23-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-23-STIXGeneral-Regular-74" d="M 1702 493  L 1786 422  Q 1478 -64 1011 -64  Q 448 -64 448 749  L 448 2675  L 109 2675  Q 83 2694 83 2720  Q 83 2771 192 2842  Q 435 2982 813 3526  Q 826 3546 874 3606  Q 922 3667 941 3706  Q 986 3706 986 3622  L 986 2880  L 1632 2880  L 1632 2675  L 986 2675  L 986 845  Q 986 538 1062 403  Q 1139 269 1318 269  Q 1510 269 1702 493  z " transform="scale(0.015625)"></path>
     <path id="eq-23-STIXGeneral-Regular-61" d="M 2829 422  L 2829 243  Q 2586 -64 2253 -64  Q 1888 -64 1843 403  L 1837 403  Q 1427 -64 909 -64  Q 608 -64 422 112  Q 237 288 237 602  Q 237 1050 685 1350  Q 992 1555 1837 1869  L 1837 2214  Q 1837 2502 1699 2646  Q 1562 2790 1338 2790  Q 1146 2790 1018 2697  Q 890 2605 890 2477  Q 890 2419 909 2348  Q 928 2278 928 2208  Q 928 2112 841 2029  Q 755 1946 634 1946  Q 525 1946 441 2029  Q 358 2112 358 2240  Q 358 2547 685 2752  Q 986 2944 1421 2944  Q 1939 2944 2176 2656  Q 2291 2522 2323 2384  Q 2355 2246 2355 1946  L 2355 723  Q 2355 301 2554 301  Q 2682 301 2829 422  z M 1837 813  L 1837 1715  Q 1248 1510 1018 1293  Q 800 1094 800 800  Q 800 557 921 432  Q 1043 307 1242 307  Q 1453 307 1613 410  Q 1747 506 1792 589  Q 1837 672 1837 813  z " transform="scale(0.015625)"></path>
     <path id="eq-23-STIXGeneral-Regular-6e" d="M 3104 0  L 1773 0  L 1779 96  Q 2016 115 2096 233  Q 2176 352 2176 672  L 2176 1946  Q 2176 2592 1709 2592  Q 1549 2592 1408 2515  Q 1267 2438 1050 2227  L 1050 461  Q 1050 269 1136 192  Q 1222 115 1466 96  L 1466 0  L 115 0  L 115 96  Q 358 115 435 214  Q 512 314 512 602  L 512 2157  Q 512 2394 467 2483  Q 422 2573 288 2573  Q 160 2573 102 2547  L 102 2656  Q 550 2784 979 2944  L 1030 2925  L 1030 2426  L 1037 2426  Q 1491 2944 1958 2944  Q 2323 2944 2518 2688  Q 2714 2432 2714 1958  L 2714 544  Q 2714 288 2790 205  Q 2867 122 3104 96  L 3104 0  z " transform="scale(0.015625)"></path>
     <path id="eq-23-STIXSizeTwoSym-Regular-28" d="M 3219 -1555  L 3219 -1786  Q 2144 -774 1517 730  Q 890 2234 890 4115  Q 890 6003 1533 7593  Q 2176 9184 3219 10022  L 3219 9811  Q 2490 9062 1994 7606  Q 1498 6150 1498 4115  Q 1498 563 3219 -1555  z " transform="scale(0.015625)"></path>
     <path id="eq-23-STIXGeneral-Italic-3d5" d="M 3078 4371  L 2650 2822  Q 3098 2822 3296 2746  Q 3808 2547 3808 1939  Q 3808 1709 3728 1446  Q 3648 1184 3481 915  Q 3315 646 3088 425  Q 2861 205 2537 67  Q 2214 -70 1850 -70  L 1504 -1312  L 1005 -1312  L 1350 -70  Q 883 -70 666 0  Q 173 160 173 819  Q 173 1018 256 1274  Q 339 1530 502 1802  Q 666 2074 886 2301  Q 1107 2528 1417 2675  Q 1728 2822 2061 2822  L 2157 2822  L 2586 4371  L 3078 4371  z M 2611 2688  L 1888 64  Q 2125 64 2330 166  Q 2694 352 2982 998  Q 3270 1645 3270 2093  Q 3270 2464 2982 2643  Q 2906 2688 2611 2688  z M 1389 64  L 2118 2688  Q 1760 2688 1427 2365  Q 1094 2042 902 1568  Q 710 1094 710 646  Q 710 237 1018 115  Q 1152 64 1389 64  z " transform="scale(0.015625)"></path>
     <path id="eq-23-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-23-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-23-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-23-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-23-STIXSizeTwoSym-Regular-29" d="M 730 9792  L 730 10022  Q 1805 9011 2432 7507  Q 3059 6003 3059 4115  Q 3059 2234 2416 643  Q 1773 -947 730 -1786  L 730 -1574  Q 1459 -826 1955 633  Q 2451 2093 2451 4115  Q 2451 7674 730 9792  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-23-STIXGeneral-Italic-64" transform="translate(0 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-23-STIXGeneral-Italic-79" transform="translate(34.999989 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-23-STIXGeneral-Italic-64" transform="translate(0 -40.28125) scale(0.7)"></use>
    <use xlink:href="#eq-23-STIXGeneral-Italic-78" transform="translate(34.999989 -40.28125) scale(0.7)"></use>
    <use xlink:href="#eq-23-STIXGeneral-Regular-3d" transform="translate(93.019981 0.979687)"></use>
    <use xlink:href="#eq-23-STIXGeneral-Regular-2212" transform="translate(175.959962 0.979687)"></use>
    <use xlink:href="#eq-23-STIXGeneral-Regular-74" transform="translate(244.459947 0.979687)"></use>
    <use xlink:href="#eq-23-STIXGeneral-Regular-61" transform="translate(272.259935 0.979687)"></use>
    <use xlink:href="#eq-23-STIXGeneral-Regular-6e" transform="translate(316.659929 0.979687)"></use>
    <use xlink:href="#eq-23-STIXSizeTwoSym-Regular-28" transform="translate(366.659914 -18.585938) scale(0.763084)"></use>
    <use xlink:href="#eq-23-STIXGeneral-Italic-3d5" transform="translate(411.571153 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-23-STIXGeneral-Regular-28" transform="translate(455.461151 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-23-STIXGeneral-Italic-78" transform="translate(478.771143 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-23-STIXGeneral-Regular-2c" transform="translate(509.851138 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-23-STIXGeneral-Italic-79" transform="translate(537.459125 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-23-STIXGeneral-Regular-29" transform="translate(568.539121 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-23-STIXGeneral-Regular-32" transform="translate(484.571153 -39.789062) scale(0.7)"></use>
    <use xlink:href="#eq-23-STIXSizeTwoSym-Regular-29" transform="translate(604.349112 -18.585938) scale(0.763084)"></use>
    <path d="M 0 13.776563  L 0 20.026563  L 66.079985 20.026563  L 66.079985 13.776563  L 0 13.776563  z "></path>
    <path d="M 411.571153 13.776563  L 411.571153 20.026563  L 591.849112 20.026563  L 591.849112 13.776563  L 411.571153 13.776563  z "></path>
   </g>
  </g>
 </g>
</svg></div>
  <details class="derivation">
    <summary>展开：式（6）怎样一步一步画出红线</summary>
    <p>从选定的起点出发，每一步沿方向 v 前进一个很小的长度。下面把原文的步长 <em>dr</em> 改记为 <strong>Δℓ</strong>，以免与透镜的径向坐标混淆：<a class="cite no-styling" href="#ref-review">[R1 p10–11, Eq6]</a></p>
    <div class="math" data-tex="x_{m+1}=x_m+\cos\!\left(\frac{\phi(x_m,y_m)}{2}\right)\Delta\ell" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="180pt" height="23pt" viewBox="0 0 180 23" version="1.1" role="img" aria-label="下一点的 x 坐标 = 当前 x + cos(φ/2)Δℓ。" focusable="false">
 <title>下一点的 x 坐标 = 当前 x + cos(φ/2)Δℓ。</title><defs>
 </defs>
 <g id="eq-24-figure_1">
  <g id="eq-24-patch_1">
   <path d="M 0 23  L 180 23  L 180 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-24-text_1">
   <!-- $x_{m+1}=x_m+\cos\!\left(\frac{\phi(x_m,y_m)}{2}\right)\Delta\ell$ -->
   <g style="fill: #17313d" transform="translate(0 16) scale(0.16 -0.16)">
    <defs>
     <path id="eq-24-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXGeneral-Italic-6d" d="M 4506 672  L 4474 627  Q 3981 -58 3552 -58  Q 3296 -58 3296 237  Q 3296 333 3379 659  L 3750 2112  Q 3795 2291 3795 2355  Q 3795 2413 3756 2451  Q 3718 2490 3667 2490  Q 3366 2490 2829 1741  Q 2592 1408 2457 1072  Q 2323 736 2138 0  L 1658 0  L 1830 595  Q 2266 2099 2266 2330  Q 2266 2490 2125 2490  Q 1965 2490 1702 2237  Q 1440 1984 1171 1574  Q 1011 1325 899 1043  Q 787 762 557 0  L 77 0  L 352 922  Q 704 2093 704 2381  Q 704 2522 442 2522  L 282 2522  L 282 2624  L 1318 2822  L 1338 2810  L 966 1472  Q 1798 2822 2374 2822  Q 2560 2822 2659 2720  Q 2758 2618 2758 2438  Q 2758 2195 2502 1466  Q 2842 2003 3069 2275  Q 3296 2547 3526 2694  Q 3731 2822 3930 2822  Q 4102 2822 4201 2710  Q 4301 2598 4301 2419  Q 4301 2336 4282 2240  L 3846 634  Q 3782 390 3782 346  Q 3782 243 3859 243  Q 4000 243 4275 582  L 4410 749  L 4506 672  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXGeneral-Regular-2b" d="M 4070 1408  L 2400 1408  L 2400 -262  L 1978 -262  L 1978 1408  L 307 1408  L 307 1830  L 1978 1830  L 1978 3501  L 2400 3501  L 2400 1830  L 4070 1830  L 4070 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXGeneral-Regular-31" d="M 2522 0  L 755 0  L 755 96  Q 1107 115 1235 227  Q 1363 339 1363 608  L 1363 3482  Q 1363 3795 1171 3795  Q 1082 3795 883 3718  L 710 3654  L 710 3744  L 1856 4326  L 1914 4307  L 1914 486  Q 1914 275 2042 185  Q 2170 96 2522 96  L 2522 0  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXGeneral-Regular-63" d="M 2547 998  L 2637 941  Q 2362 403 2112 205  Q 1786 -64 1376 -64  Q 845 -64 502 336  Q 160 736 160 1357  Q 160 2170 698 2618  Q 1094 2944 1562 2944  Q 1965 2944 2256 2749  Q 2547 2554 2547 2285  Q 2547 2176 2457 2096  Q 2368 2016 2246 2016  Q 2022 2016 1939 2310  L 1901 2451  Q 1850 2630 1773 2694  Q 1696 2758 1523 2758  Q 1133 2758 893 2451  Q 653 2144 653 1645  Q 653 1094 928 745  Q 1203 397 1645 397  Q 1920 397 2118 528  Q 2317 659 2547 998  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXGeneral-Regular-6f" d="M 3008 1478  Q 3008 806 2608 371  Q 2208 -64 1568 -64  Q 979 -64 582 368  Q 186 800 186 1459  Q 186 2125 582 2534  Q 979 2944 1626 2944  Q 2221 2944 2614 2537  Q 3008 2131 3008 1478  z M 2432 1306  Q 2432 2035 2112 2445  Q 1856 2765 1504 2765  Q 1171 2765 966 2493  Q 762 2221 762 1747  Q 762 928 1101 435  Q 1318 115 1677 115  Q 2029 115 2230 432  Q 2432 749 2432 1306  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXGeneral-Regular-73" d="M 998 1926  L 1664 1523  Q 1984 1331 2105 1164  Q 2227 998 2227 736  Q 2227 416 1961 176  Q 1696 -64 1331 -64  Q 1030 -64 864 -6  Q 691 51 570 51  Q 461 51 416 -26  L 333 -26  L 333 979  L 435 979  Q 538 512 730 294  Q 922 77 1248 77  Q 1485 77 1632 211  Q 1779 346 1779 550  Q 1779 845 1440 1030  L 1094 1222  Q 326 1651 326 2150  Q 326 2522 566 2730  Q 806 2938 1210 2938  Q 1491 2938 1638 2867  Q 1754 2816 1818 2816  Q 1862 2816 1920 2880  L 1990 2880  L 2022 2010  L 1926 2010  Q 1818 2445 1654 2621  Q 1491 2797 1203 2797  Q 986 2797 854 2688  Q 723 2579 723 2362  Q 723 2253 796 2128  Q 870 2003 998 1926  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXSizeTwoSym-Regular-28" d="M 3219 -1555  L 3219 -1786  Q 2144 -774 1517 730  Q 890 2234 890 4115  Q 890 6003 1533 7593  Q 2176 9184 3219 10022  L 3219 9811  Q 2490 9062 1994 7606  Q 1498 6150 1498 4115  Q 1498 563 3219 -1555  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXGeneral-Italic-3d5" d="M 3078 4371  L 2650 2822  Q 3098 2822 3296 2746  Q 3808 2547 3808 1939  Q 3808 1709 3728 1446  Q 3648 1184 3481 915  Q 3315 646 3088 425  Q 2861 205 2537 67  Q 2214 -70 1850 -70  L 1504 -1312  L 1005 -1312  L 1350 -70  Q 883 -70 666 0  Q 173 160 173 819  Q 173 1018 256 1274  Q 339 1530 502 1802  Q 666 2074 886 2301  Q 1107 2528 1417 2675  Q 1728 2822 2061 2822  L 2157 2822  L 2586 4371  L 3078 4371  z M 2611 2688  L 1888 64  Q 2125 64 2330 166  Q 2694 352 2982 998  Q 3270 1645 3270 2093  Q 3270 2464 2982 2643  Q 2906 2688 2611 2688  z M 1389 64  L 2118 2688  Q 1760 2688 1427 2365  Q 1094 2042 902 1568  Q 710 1094 710 646  Q 710 237 1018 115  Q 1152 64 1389 64  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXGeneral-Italic-79" d="M 1555 1190  L 1690 486  Q 2118 1190 2294 1558  Q 2470 1926 2470 2131  Q 2470 2234 2304 2336  Q 2138 2445 2138 2586  Q 2138 2688 2211 2755  Q 2285 2822 2394 2822  Q 2534 2822 2630 2720  Q 2726 2618 2726 2470  Q 2726 1914 1888 518  Q 1389 -307 918 -812  Q 448 -1318 173 -1318  Q 26 -1318 -64 -1241  Q -154 -1165 -154 -1043  Q -154 -934 -80 -860  Q -6 -787 96 -787  Q 218 -787 314 -876  Q 410 -966 486 -966  Q 602 -966 794 -755  Q 877 -672 1040 -457  Q 1203 -243 1248 -173  Q 1312 -45 1312 51  Q 1312 243 1113 1046  Q 915 1850 787 2176  Q 698 2413 592 2499  Q 486 2586 294 2586  Q 192 2586 96 2560  L 96 2669  Q 237 2694 301 2707  Q 563 2758 986 2822  L 1011 2822  Q 1082 2822 1277 2227  Q 1472 1632 1555 1190  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXSizeTwoSym-Regular-29" d="M 730 9792  L 730 10022  Q 1805 9011 2432 7507  Q 3059 6003 3059 4115  Q 3059 2234 2416 643  Q 1773 -947 730 -1786  L 730 -1574  Q 1459 -826 1955 633  Q 2451 2093 2451 4115  Q 2451 7674 730 9792  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXGeneral-Regular-394" d="M 4320 0  L 307 0  L 2221 4314  L 2349 4314  L 4320 0  z M 3354 589  L 2118 3405  L 870 589  L 3354 589  z " transform="scale(0.015625)"></path>
     <path id="eq-24-STIXGeneral-Italic-2113" d="M 493 2490  L 582 2656  Q 813 2496 1184 2496  Q 1728 3296 2301 3846  Q 2874 4397 3245 4397  Q 3654 4397 3654 3968  Q 3654 3450 3036 2938  Q 2419 2426 1594 2304  Q 678 826 678 397  Q 678 122 909 122  Q 1120 122 1398 365  Q 1677 608 2182 1190  L 2317 1082  Q 1773 448 1462 189  Q 1152 -70 864 -70  Q 627 -70 467 74  Q 307 218 307 486  Q 307 1024 800 1882  Q 877 2022 1056 2304  Q 742 2317 493 2490  z M 1715 2534  L 1722 2528  Q 2470 2694 2966 3113  Q 3462 3533 3462 3994  Q 3462 4192 3238 4192  Q 3002 4192 2714 3891  Q 2342 3514 1715 2534  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-24-STIXGeneral-Italic-78" transform="translate(0 0.979687)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Italic-6d" transform="translate(44.399994 -12.248438) scale(0.7)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Regular-2b" transform="translate(105.047979 -12.248438) scale(0.7)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Regular-31" transform="translate(163.105965 -12.248438) scale(0.7)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Regular-3d" transform="translate(216.955326 0.979687)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Italic-78" transform="translate(299.895307 0.979687)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Italic-6d" transform="translate(344.295301 -12.248438) scale(0.7)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Regular-2b" transform="translate(413.684659 0.979687)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Regular-63" transform="translate(496.624641 0.979687)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Regular-6f" transform="translate(541.024634 0.979687)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Regular-73" transform="translate(591.024619 0.979687)"></use>
    <use xlink:href="#eq-24-STIXSizeTwoSym-Regular-28" transform="translate(629.924613 -18.585938) scale(0.763084)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Italic-3d5" transform="translate(674.835853 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Regular-28" transform="translate(718.725851 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Italic-78" transform="translate(742.035842 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Italic-6d" transform="translate(773.115838 43.9325) scale(0.49)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Regular-2c" transform="translate(811.580391 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Italic-79" transform="translate(839.188378 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Italic-6d" transform="translate(870.268374 43.9325) scale(0.49)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Regular-29" transform="translate(908.732927 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Regular-32" transform="translate(785.835853 -39.789062) scale(0.7)"></use>
    <use xlink:href="#eq-24-STIXSizeTwoSym-Regular-29" transform="translate(944.542919 -18.585938) scale(0.763084)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Regular-394" transform="translate(990.902904 0.979687)"></use>
    <use xlink:href="#eq-24-STIXGeneral-Italic-2113" transform="translate(1063.102886 0.979687)"></use>
    <path d="M 674.835853 13.776563  L 674.835853 20.026563  L 932.042919 20.026563  L 932.042919 13.776563  L 674.835853 13.776563  z "></path>
   </g>
  </g>
 </g>
</svg></div>
    <div class="math" data-tex="y_{m+1}=y_m-\sin\!\left(\frac{\phi(x_m,y_m)}{2}\right)\Delta\ell" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="177pt" height="23pt" viewBox="0 0 177 23" version="1.1" role="img" aria-label="下一点的 y 坐标 = 当前 y − sin(φ/2)Δℓ。" focusable="false">
 <title>下一点的 y 坐标 = 当前 y − sin(φ/2)Δℓ。</title><defs>
 </defs>
 <g id="eq-25-figure_1">
  <g id="eq-25-patch_1">
   <path d="M 0 23  L 177 23  L 177 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-25-text_1">
   <!-- $y_{m+1}=y_m-\sin\!\left(\frac{\phi(x_m,y_m)}{2}\right)\Delta\ell$ -->
   <g style="fill: #17313d" transform="translate(0 16) scale(0.16 -0.16)">
    <defs>
     <path id="eq-25-STIXGeneral-Italic-79" d="M 1555 1190  L 1690 486  Q 2118 1190 2294 1558  Q 2470 1926 2470 2131  Q 2470 2234 2304 2336  Q 2138 2445 2138 2586  Q 2138 2688 2211 2755  Q 2285 2822 2394 2822  Q 2534 2822 2630 2720  Q 2726 2618 2726 2470  Q 2726 1914 1888 518  Q 1389 -307 918 -812  Q 448 -1318 173 -1318  Q 26 -1318 -64 -1241  Q -154 -1165 -154 -1043  Q -154 -934 -80 -860  Q -6 -787 96 -787  Q 218 -787 314 -876  Q 410 -966 486 -966  Q 602 -966 794 -755  Q 877 -672 1040 -457  Q 1203 -243 1248 -173  Q 1312 -45 1312 51  Q 1312 243 1113 1046  Q 915 1850 787 2176  Q 698 2413 592 2499  Q 486 2586 294 2586  Q 192 2586 96 2560  L 96 2669  Q 237 2694 301 2707  Q 563 2758 986 2822  L 1011 2822  Q 1082 2822 1277 2227  Q 1472 1632 1555 1190  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXGeneral-Italic-6d" d="M 4506 672  L 4474 627  Q 3981 -58 3552 -58  Q 3296 -58 3296 237  Q 3296 333 3379 659  L 3750 2112  Q 3795 2291 3795 2355  Q 3795 2413 3756 2451  Q 3718 2490 3667 2490  Q 3366 2490 2829 1741  Q 2592 1408 2457 1072  Q 2323 736 2138 0  L 1658 0  L 1830 595  Q 2266 2099 2266 2330  Q 2266 2490 2125 2490  Q 1965 2490 1702 2237  Q 1440 1984 1171 1574  Q 1011 1325 899 1043  Q 787 762 557 0  L 77 0  L 352 922  Q 704 2093 704 2381  Q 704 2522 442 2522  L 282 2522  L 282 2624  L 1318 2822  L 1338 2810  L 966 1472  Q 1798 2822 2374 2822  Q 2560 2822 2659 2720  Q 2758 2618 2758 2438  Q 2758 2195 2502 1466  Q 2842 2003 3069 2275  Q 3296 2547 3526 2694  Q 3731 2822 3930 2822  Q 4102 2822 4201 2710  Q 4301 2598 4301 2419  Q 4301 2336 4282 2240  L 3846 634  Q 3782 390 3782 346  Q 3782 243 3859 243  Q 4000 243 4275 582  L 4410 749  L 4506 672  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXGeneral-Regular-2b" d="M 4070 1408  L 2400 1408  L 2400 -262  L 1978 -262  L 1978 1408  L 307 1408  L 307 1830  L 1978 1830  L 1978 3501  L 2400 3501  L 2400 1830  L 4070 1830  L 4070 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXGeneral-Regular-31" d="M 2522 0  L 755 0  L 755 96  Q 1107 115 1235 227  Q 1363 339 1363 608  L 1363 3482  Q 1363 3795 1171 3795  Q 1082 3795 883 3718  L 710 3654  L 710 3744  L 1856 4326  L 1914 4307  L 1914 486  Q 1914 275 2042 185  Q 2170 96 2522 96  L 2522 0  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXGeneral-Regular-73" d="M 998 1926  L 1664 1523  Q 1984 1331 2105 1164  Q 2227 998 2227 736  Q 2227 416 1961 176  Q 1696 -64 1331 -64  Q 1030 -64 864 -6  Q 691 51 570 51  Q 461 51 416 -26  L 333 -26  L 333 979  L 435 979  Q 538 512 730 294  Q 922 77 1248 77  Q 1485 77 1632 211  Q 1779 346 1779 550  Q 1779 845 1440 1030  L 1094 1222  Q 326 1651 326 2150  Q 326 2522 566 2730  Q 806 2938 1210 2938  Q 1491 2938 1638 2867  Q 1754 2816 1818 2816  Q 1862 2816 1920 2880  L 1990 2880  L 2022 2010  L 1926 2010  Q 1818 2445 1654 2621  Q 1491 2797 1203 2797  Q 986 2797 854 2688  Q 723 2579 723 2362  Q 723 2253 796 2128  Q 870 2003 998 1926  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXGeneral-Regular-69" d="M 1152 4045  Q 1152 3904 1056 3811  Q 960 3718 819 3718  Q 685 3718 592 3811  Q 499 3904 499 4045  Q 499 4179 595 4275  Q 691 4371 826 4371  Q 966 4371 1059 4275  Q 1152 4179 1152 4045  z M 1619 0  L 102 0  L 102 96  Q 435 115 521 211  Q 608 307 608 666  L 608 2118  Q 608 2342 563 2432  Q 518 2522 397 2522  Q 243 2522 128 2490  L 128 2592  L 1120 2944  L 1146 2918  L 1146 672  Q 1146 314 1226 218  Q 1306 122 1619 96  L 1619 0  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXGeneral-Regular-6e" d="M 3104 0  L 1773 0  L 1779 96  Q 2016 115 2096 233  Q 2176 352 2176 672  L 2176 1946  Q 2176 2592 1709 2592  Q 1549 2592 1408 2515  Q 1267 2438 1050 2227  L 1050 461  Q 1050 269 1136 192  Q 1222 115 1466 96  L 1466 0  L 115 0  L 115 96  Q 358 115 435 214  Q 512 314 512 602  L 512 2157  Q 512 2394 467 2483  Q 422 2573 288 2573  Q 160 2573 102 2547  L 102 2656  Q 550 2784 979 2944  L 1030 2925  L 1030 2426  L 1037 2426  Q 1491 2944 1958 2944  Q 2323 2944 2518 2688  Q 2714 2432 2714 1958  L 2714 544  Q 2714 288 2790 205  Q 2867 122 3104 96  L 3104 0  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXSizeTwoSym-Regular-28" d="M 3219 -1555  L 3219 -1786  Q 2144 -774 1517 730  Q 890 2234 890 4115  Q 890 6003 1533 7593  Q 2176 9184 3219 10022  L 3219 9811  Q 2490 9062 1994 7606  Q 1498 6150 1498 4115  Q 1498 563 3219 -1555  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXGeneral-Italic-3d5" d="M 3078 4371  L 2650 2822  Q 3098 2822 3296 2746  Q 3808 2547 3808 1939  Q 3808 1709 3728 1446  Q 3648 1184 3481 915  Q 3315 646 3088 425  Q 2861 205 2537 67  Q 2214 -70 1850 -70  L 1504 -1312  L 1005 -1312  L 1350 -70  Q 883 -70 666 0  Q 173 160 173 819  Q 173 1018 256 1274  Q 339 1530 502 1802  Q 666 2074 886 2301  Q 1107 2528 1417 2675  Q 1728 2822 2061 2822  L 2157 2822  L 2586 4371  L 3078 4371  z M 2611 2688  L 1888 64  Q 2125 64 2330 166  Q 2694 352 2982 998  Q 3270 1645 3270 2093  Q 3270 2464 2982 2643  Q 2906 2688 2611 2688  z M 1389 64  L 2118 2688  Q 1760 2688 1427 2365  Q 1094 2042 902 1568  Q 710 1094 710 646  Q 710 237 1018 115  Q 1152 64 1389 64  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXSizeTwoSym-Regular-29" d="M 730 9792  L 730 10022  Q 1805 9011 2432 7507  Q 3059 6003 3059 4115  Q 3059 2234 2416 643  Q 1773 -947 730 -1786  L 730 -1574  Q 1459 -826 1955 633  Q 2451 2093 2451 4115  Q 2451 7674 730 9792  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXGeneral-Regular-394" d="M 4320 0  L 307 0  L 2221 4314  L 2349 4314  L 4320 0  z M 3354 589  L 2118 3405  L 870 589  L 3354 589  z " transform="scale(0.015625)"></path>
     <path id="eq-25-STIXGeneral-Italic-2113" d="M 493 2490  L 582 2656  Q 813 2496 1184 2496  Q 1728 3296 2301 3846  Q 2874 4397 3245 4397  Q 3654 4397 3654 3968  Q 3654 3450 3036 2938  Q 2419 2426 1594 2304  Q 678 826 678 397  Q 678 122 909 122  Q 1120 122 1398 365  Q 1677 608 2182 1190  L 2317 1082  Q 1773 448 1462 189  Q 1152 -70 864 -70  Q 627 -70 467 74  Q 307 218 307 486  Q 307 1024 800 1882  Q 877 2022 1056 2304  Q 742 2317 493 2490  z M 1715 2534  L 1722 2528  Q 2470 2694 2966 3113  Q 3462 3533 3462 3994  Q 3462 4192 3238 4192  Q 3002 4192 2714 3891  Q 2342 3514 1715 2534  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-25-STIXGeneral-Italic-79" transform="translate(0 0.979687)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Italic-6d" transform="translate(44.399994 -12.248438) scale(0.7)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Regular-2b" transform="translate(105.047979 -12.248438) scale(0.7)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Regular-31" transform="translate(163.105965 -12.248438) scale(0.7)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Regular-3d" transform="translate(216.955326 0.979687)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Italic-79" transform="translate(299.895307 0.979687)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Italic-6d" transform="translate(344.295301 -12.248438) scale(0.7)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Regular-2212" transform="translate(413.684659 0.979687)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Regular-73" transform="translate(496.624641 0.979687)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Regular-69" transform="translate(535.524634 0.979687)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Regular-6e" transform="translate(563.324622 0.979687)"></use>
    <use xlink:href="#eq-25-STIXSizeTwoSym-Regular-28" transform="translate(613.324607 -18.585938) scale(0.763084)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Italic-3d5" transform="translate(658.235847 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Regular-28" transform="translate(702.125844 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Italic-78" transform="translate(725.435836 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Italic-6d" transform="translate(756.515832 43.9325) scale(0.49)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Regular-2c" transform="translate(794.980385 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Italic-79" transform="translate(822.588372 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Italic-6d" transform="translate(853.668368 43.9325) scale(0.49)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Regular-29" transform="translate(892.132921 53.192188) scale(0.7)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Regular-32" transform="translate(769.235847 -39.789062) scale(0.7)"></use>
    <use xlink:href="#eq-25-STIXSizeTwoSym-Regular-29" transform="translate(927.942913 -18.585938) scale(0.763084)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Regular-394" transform="translate(974.302898 0.979687)"></use>
    <use xlink:href="#eq-25-STIXGeneral-Italic-2113" transform="translate(1046.50288 0.979687)"></use>
    <path d="M 658.235847 13.776563  L 658.235847 20.026563  L 915.442913 20.026563  L 915.442913 13.776563  L 658.235847 13.776563  z "></path>
   </g>
  </g>
 </g>
</svg></div>
    <p>改变起点及终点，就能铺出不同密度的流线。这个向量步进形式也能越过竖直切线，而斜率表达式在相应位置会趋于无穷大。积分得到的是中心线或边界线，制造时还要给它宽度，成为金属条、孔隙或介质结构。</p>
  </details>
  <h3>“等相位优化”校平的是传播相位</h3>
  <p><strong>原文指出的实现问题。</strong>把流线变成介质结构后，局部间距和宽度会随位置变化，结构同时产生额外的传播相位。若这部分相位也在空间中变化，目标波前就会被附加的相位梯度扰动。金属结构则还要面对欧姆损耗；不同材料路线的代价并不相同。<a class="cite no-styling" href="#ref-review">[R1 §3.3.2, p11]</a></p>
  <p>因此，<strong>等相位流线优化</strong>先建立“局部周期—线宽—传播相位”数据库，再随位置调整线宽，使传播相位尽量保持同一参考值。目标的空间相位变化仍由几何相位承担。它不是把整片透镜的总相位抹平，也不是要求每条红线上 φ 恒定。<a class="cite no-styling" href="#ref-review">[R1 §3.3.2, p11]</a> <a class="cite no-styling" href="#ref-82">[原文文献82]</a></p>
  <div class="math" data-tex="\phi_{\mathrm{tot}}(x,y)=\phi_{\mathrm{PB}}(x,y)+\phi_{\mathrm{prop}}(x,y),\qquad \phi_{\mathrm{prop}}\approx C" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="290pt" height="16pt" viewBox="0 0 290 16" version="1.1" role="img" aria-label="总相位 = PB 几何相位 + 传播相位；设计中使传播相位近似等于常数 C。" focusable="false">
 <title>总相位 = PB 几何相位 + 传播相位；设计中使传播相位近似等于常数 C。</title><defs>
 </defs>
 <g id="eq-26-figure_1">
  <g id="eq-26-patch_1">
   <path d="M 0 16  L 290 16  L 290 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-26-text_1">
   <!-- $\phi_{\mathrm{tot}}(x,y)=\phi_{\mathrm{PB}}(x,y)+\phi_{\mathrm{prop}}(x,y),\qquad \phi_{\mathrm{prop}}\approx C$ -->
   <g style="fill: #17313d" transform="translate(0 11) scale(0.16 -0.16)">
    <defs>
     <path id="eq-26-STIXGeneral-Italic-3d5" d="M 3078 4371  L 2650 2822  Q 3098 2822 3296 2746  Q 3808 2547 3808 1939  Q 3808 1709 3728 1446  Q 3648 1184 3481 915  Q 3315 646 3088 425  Q 2861 205 2537 67  Q 2214 -70 1850 -70  L 1504 -1312  L 1005 -1312  L 1350 -70  Q 883 -70 666 0  Q 173 160 173 819  Q 173 1018 256 1274  Q 339 1530 502 1802  Q 666 2074 886 2301  Q 1107 2528 1417 2675  Q 1728 2822 2061 2822  L 2157 2822  L 2586 4371  L 3078 4371  z M 2611 2688  L 1888 64  Q 2125 64 2330 166  Q 2694 352 2982 998  Q 3270 1645 3270 2093  Q 3270 2464 2982 2643  Q 2906 2688 2611 2688  z M 1389 64  L 2118 2688  Q 1760 2688 1427 2365  Q 1094 2042 902 1568  Q 710 1094 710 646  Q 710 237 1018 115  Q 1152 64 1389 64  z " transform="scale(0.015625)"></path>
     <path id="eq-26-STIXGeneral-Regular-74" d="M 1702 493  L 1786 422  Q 1478 -64 1011 -64  Q 448 -64 448 749  L 448 2675  L 109 2675  Q 83 2694 83 2720  Q 83 2771 192 2842  Q 435 2982 813 3526  Q 826 3546 874 3606  Q 922 3667 941 3706  Q 986 3706 986 3622  L 986 2880  L 1632 2880  L 1632 2675  L 986 2675  L 986 845  Q 986 538 1062 403  Q 1139 269 1318 269  Q 1510 269 1702 493  z " transform="scale(0.015625)"></path>
     <path id="eq-26-STIXGeneral-Regular-6f" d="M 3008 1478  Q 3008 806 2608 371  Q 2208 -64 1568 -64  Q 979 -64 582 368  Q 186 800 186 1459  Q 186 2125 582 2534  Q 979 2944 1626 2944  Q 2221 2944 2614 2537  Q 3008 2131 3008 1478  z M 2432 1306  Q 2432 2035 2112 2445  Q 1856 2765 1504 2765  Q 1171 2765 966 2493  Q 762 2221 762 1747  Q 762 928 1101 435  Q 1318 115 1677 115  Q 2029 115 2230 432  Q 2432 749 2432 1306  z " transform="scale(0.015625)"></path>
     <path id="eq-26-STIXGeneral-Regular-28" d="M 1946 -1030  L 1869 -1133  Q 1126 -710 716 32  Q 307 774 307 1613  Q 307 3386 1888 4326  L 1946 4224  Q 1293 3667 1075 3126  Q 858 2586 858 1632  Q 858 685 1082 96  Q 1306 -493 1946 -1030  z " transform="scale(0.015625)"></path>
     <path id="eq-26-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
     <path id="eq-26-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-26-STIXGeneral-Italic-79" d="M 1555 1190  L 1690 486  Q 2118 1190 2294 1558  Q 2470 1926 2470 2131  Q 2470 2234 2304 2336  Q 2138 2445 2138 2586  Q 2138 2688 2211 2755  Q 2285 2822 2394 2822  Q 2534 2822 2630 2720  Q 2726 2618 2726 2470  Q 2726 1914 1888 518  Q 1389 -307 918 -812  Q 448 -1318 173 -1318  Q 26 -1318 -64 -1241  Q -154 -1165 -154 -1043  Q -154 -934 -80 -860  Q -6 -787 96 -787  Q 218 -787 314 -876  Q 410 -966 486 -966  Q 602 -966 794 -755  Q 877 -672 1040 -457  Q 1203 -243 1248 -173  Q 1312 -45 1312 51  Q 1312 243 1113 1046  Q 915 1850 787 2176  Q 698 2413 592 2499  Q 486 2586 294 2586  Q 192 2586 96 2560  L 96 2669  Q 237 2694 301 2707  Q 563 2758 986 2822  L 1011 2822  Q 1082 2822 1277 2227  Q 1472 1632 1555 1190  z " transform="scale(0.015625)"></path>
     <path id="eq-26-STIXGeneral-Regular-29" d="M 186 4224  L 262 4326  Q 992 3891 1408 3148  Q 1824 2406 1824 1581  Q 1824 -166 243 -1133  L 186 -1030  Q 845 -486 1059 54  Q 1274 595 1274 1562  Q 1274 2534 1059 3120  Q 845 3706 186 4224  z " transform="scale(0.015625)"></path>
     <path id="eq-26-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-26-STIXGeneral-Regular-50" d="M 102 4237  L 1760 4237  Q 2669 4237 3149 3834  Q 3469 3565 3469 3072  Q 3469 2560 3104 2234  Q 2835 1990 2553 1916  Q 2272 1843 1734 1843  Q 1549 1843 1293 1862  L 1293 717  Q 1293 352 1398 246  Q 1504 141 1894 122  L 1894 0  L 102 0  L 102 122  Q 474 147 557 256  Q 640 365 640 781  L 640 3526  Q 640 3885 547 3987  Q 454 4090 102 4115  L 102 4237  z M 1293 3770  L 1293 2118  Q 1510 2099 1683 2099  Q 2202 2099 2486 2352  Q 2771 2605 2771 3040  Q 2771 3558 2476 3779  Q 2182 4000 1517 4000  Q 1382 4000 1337 3952  Q 1293 3904 1293 3770  z " transform="scale(0.015625)"></path>
     <path id="eq-26-STIXGeneral-Regular-42" d="M 2701 2234  L 2701 2227  Q 3181 2150 3482 1875  Q 3795 1594 3795 1139  Q 3795 608 3379 304  Q 2963 0 2266 0  L 109 0  L 109 122  Q 486 134 604 246  Q 723 358 723 723  L 723 3520  Q 723 3891 614 3990  Q 506 4090 109 4115  L 109 4237  L 1901 4237  Q 2726 4237 3152 3958  Q 3578 3680 3578 3168  Q 3578 2733 3315 2502  Q 3130 2342 2701 2234  z M 1376 2342  L 1965 2342  Q 2925 2342 2925 3136  Q 2925 3546 2640 3773  Q 2355 4000 1792 4000  L 1530 4000  Q 1376 4000 1376 3795  L 1376 2342  z M 1376 2086  L 1376 525  Q 1376 365 1462 301  Q 1549 237 1773 237  Q 2208 237 2413 285  Q 2618 333 2816 512  Q 3059 723 3059 1146  Q 3059 1632 2758 1830  Q 2688 1882 2617 1917  Q 2547 1952 2492 1974  Q 2438 1997 2348 2016  Q 2259 2035 2211 2044  Q 2163 2054 2041 2060  Q 1920 2067 1862 2070  Q 1805 2074 1635 2080  Q 1466 2086 1376 2086  z " transform="scale(0.015625)"></path>
     <path id="eq-26-STIXGeneral-Regular-2b" d="M 4070 1408  L 2400 1408  L 2400 -262  L 1978 -262  L 1978 1408  L 307 1408  L 307 1830  L 1978 1830  L 1978 3501  L 2400 3501  L 2400 1830  L 4070 1830  L 4070 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-26-STIXGeneral-Regular-70" d="M 1018 2931  L 1018 2438  Q 1421 2944 1939 2944  Q 2406 2944 2707 2560  Q 3008 2176 3008 1581  Q 3008 883 2621 409  Q 2234 -64 1664 -64  Q 1466 -64 1328 -6  Q 1190 51 1018 211  L 1018 -794  Q 1018 -1094 1120 -1180  Q 1222 -1267 1581 -1274  L 1581 -1389  L 32 -1389  L 32 -1280  Q 314 -1254 397 -1171  Q 480 -1088 480 -838  L 480 2157  Q 480 2381 429 2451  Q 378 2522 218 2522  Q 115 2522 58 2515  L 58 2618  Q 506 2752 979 2944  L 1018 2931  z M 1018 2138  L 1018 563  Q 1018 422 1238 281  Q 1459 141 1683 141  Q 2029 141 2243 467  Q 2458 794 2458 1325  Q 2458 1888 2243 2224  Q 2029 2560 1670 2560  Q 1446 2560 1232 2419  Q 1018 2278 1018 2138  z " transform="scale(0.015625)"></path>
     <path id="eq-26-STIXGeneral-Regular-72" d="M 1024 2931  L 1024 2342  Q 1267 2688 1430 2816  Q 1594 2944 1792 2944  Q 1958 2944 2051 2854  Q 2144 2765 2144 2605  Q 2144 2470 2077 2393  Q 2010 2317 1894 2317  Q 1773 2317 1638 2445  Q 1536 2541 1472 2541  Q 1338 2541 1181 2355  Q 1024 2170 1024 2016  L 1024 576  Q 1024 301 1133 205  Q 1242 109 1568 96  L 1568 0  L 32 0  L 32 96  Q 339 154 412 224  Q 486 294 486 538  L 486 2138  Q 486 2349 438 2435  Q 390 2522 269 2522  Q 166 2522 45 2496  L 45 2598  Q 448 2726 992 2944  L 1024 2931  z " transform="scale(0.015625)"></path>
     <path id="eq-26-STIXGeneral-Regular-2248" d="M 3866 3040  L 4077 3040  Q 4045 2566 3769 2150  Q 3494 1734 3066 1734  Q 2803 1734 2460 1939  Q 2118 2144 1804 2349  Q 1491 2554 1306 2554  Q 992 2554 800 2304  Q 608 2054 518 1670  L 307 1670  Q 333 2189 617 2582  Q 902 2976 1350 2976  Q 1613 2976 1955 2771  Q 2298 2566 2611 2361  Q 2925 2157 3117 2157  Q 3680 2157 3866 3040  z M 3866 1530  L 4077 1530  Q 4045 1056 3769 640  Q 3494 224 3066 224  Q 2803 224 2460 429  Q 2118 634 1804 838  Q 1491 1043 1306 1043  Q 992 1043 800 793  Q 608 544 518 160  L 307 160  Q 333 678 617 1072  Q 902 1466 1350 1466  Q 1613 1466 1955 1261  Q 2298 1056 2611 851  Q 2925 646 3117 646  Q 3680 646 3866 1530  z " transform="scale(0.015625)"></path>
     <path id="eq-26-STIXGeneral-Italic-43" d="M 4410 4250  L 4173 2970  L 4058 2989  Q 3942 4032 3104 4032  Q 2406 4032 1830 3411  Q 1491 3053 1315 2541  Q 1139 2029 1139 1485  Q 1139 173 2259 173  Q 2656 173 2985 339  Q 3315 506 3725 934  L 3840 838  Q 3411 333 2998 109  Q 2586 -115 2093 -115  Q 1344 -115 883 329  Q 422 774 422 1555  Q 422 2214 748 2812  Q 1075 3411 1619 3795  Q 2272 4262 3021 4262  Q 3462 4262 3770 4154  Q 3898 4109 4032 4109  Q 4205 4109 4275 4250  L 4410 4250  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-26-STIXGeneral-Italic-3d5" transform="translate(0 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-74" transform="translate(62.699997 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-6f" transform="translate(82.159988 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-74" transform="translate(117.159978 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-28" transform="translate(141.029344 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Italic-78" transform="translate(174.329332 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-2c" transform="translate(218.729326 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Italic-79" transform="translate(258.169307 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-29" transform="translate(302.569301 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-3d" transform="translate(350.309285 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Italic-3d5" transform="translate(433.249266 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-50" transform="translate(495.949263 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-42" transform="translate(534.939261 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-28" transform="translate(586.038634 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Italic-78" transform="translate(619.338622 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-2c" transform="translate(663.738615 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Italic-79" transform="translate(703.178596 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-29" transform="translate(747.57859 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-2b" transform="translate(795.318575 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Italic-3d5" transform="translate(878.258556 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-70" transform="translate(940.958553 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-72" transform="translate(975.958542 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-6f" transform="translate(999.268533 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-70" transform="translate(1034.268523 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-28" transform="translate(1073.677887 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Italic-78" transform="translate(1106.977875 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-2c" transform="translate(1151.377869 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Italic-79" transform="translate(1190.81785 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-29" transform="translate(1235.217844 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-2c" transform="translate(1268.517831 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Italic-3d5" transform="translate(1452.357776 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-70" transform="translate(1515.057773 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-72" transform="translate(1550.057762 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-6f" transform="translate(1573.367754 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-70" transform="translate(1608.367743 -12.525) scale(0.7)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Regular-2248" transform="translate(1662.217104 0.703125)"></use>
    <use xlink:href="#eq-26-STIXGeneral-Italic-43" transform="translate(1745.157085 0.703125)"></use>
   </g>
  </g>
 </g>
</svg></div>
  <p><strong>我们的分析。</strong>这条路线把自由度分工得很清楚：<strong>轮廓方向规定需要的相位，线宽补偿实现它时多出来的相位。</strong>几何积分和局部数据库减少了反复求解整个大器件的需求，但仍需检查局部近似、制造尺寸和实际电磁响应；“不依赖大量整器件迭代”不等于完全不需要仿真。</p>
</section>
<section id="applications" class="article-section">
  <p class="section-kicker"><span class="chapter-num">10</span>从原理到应用证据</p><h2>从成像到光场读出：同一套相位关系怎样变成应用</h2>
  <p>第 4 节的应用可以沿着一条主线读：<strong>把光携带的方向或相位信息，转换为探测器容易测量的位置。</strong>成像把不同方向映射到不同像点，傅里叶测量把横向波矢映射到位置，反向使用则能控制出射方向；角动量检测把相位的角向变化映射到焦斑方位。下面的数据均为这篇综述及其所引研究的历史结果。<a class="cite no-styling" href="#ref-review">[R1 §4, p11–14]</a></p>
  <h3>成像：视场数字必须和波段、光阑及效率口径一起读</h3>
  <figure class="paper-figure" id="figure-8">
    <button type="button" class="zoom-button" data-title="图 8 · 宽视场成像应用" aria-label="放大查看图 8 · 宽视场成像应用"><img src="/assets/wide-angle-metalens-reading/figure-8.jpg" loading="lazy" width="1652" height="964" alt="图 8 · 宽视场成像应用" decoding="async" data-figure-key="8">
    <span class="zoom-hint" aria-hidden="true">点击放大 ↗</span></button><figcaption>图 8：双超表面相机、热成像、指纹检测以及近红外室外和室内成像。图 C 包含概念展示图，不能仅凭图面判断实验精度。来源：<a class="no-styling" href="#ref-review">[R1 p11, Fig8]</a>。</figcaption>
  </figure>
  <div class="table-wrap" tabindex="0" role="region" aria-label="对照表，可横向滚动查看"><table>
    <thead><tr><th>示例</th><th>波段与视场</th><th>读数必须附带的条件</th><th>原文定位</th></tr></thead>
    <tbody>
      <tr><td>双超表面相机</td><td><strong>850 nm；60°×60°</strong></td><td>有效 NA <strong>0.49</strong>；综述报告聚焦效率约 <strong>70%</strong>；成像使用 <strong>850±5 nm</strong> 滤光。</td><td><a class="no-styling" href="#ref-review">[R1 §4.1, p11, Fig8A]</a> <a class="no-styling" href="#ref-93">[93]</a></td></tr>
      <tr><td>长波红外热成像</td><td><strong>10.6 μm；大于140°×140°</strong></td><td>二次相位透镜直径 <strong>25.4 mm</strong>；报告约 <strong>90% 衍射效率</strong>，使用红外窄带滤光和非制冷探测器。</td><td><a class="no-styling" href="#ref-review">[R1 §4.1, p12, Fig8B]</a> <a class="no-styling" href="#ref-82">[82]</a></td></tr>
      <tr><td>近距离指纹检测</td><td><strong>740 nm；约100°×100°</strong></td><td>激光照明下记录 <strong>5 mm×5 mm</strong> 指纹；约 <strong>14%</strong> 是文中所述的<strong>仿真聚焦效率</strong>。</td><td><a class="no-styling" href="#ref-review">[R1 §4.1, p12, Fig8C]</a> <a class="no-styling" href="#ref-83">[83]</a></td></tr>
      <tr><td>空气间隔的室外相机</td><td><strong>800 nm</strong>；设计视场 <strong>40°×40°</strong></td><td>自然光成像文字描述为 <strong>±15°</strong>，使用 <strong>800±5 nm</strong> 滤光；最大衍射效率约 <strong>20%</strong>。</td><td><a class="no-styling" href="#ref-review">[R1 §4.1, p11–12, Fig8D]</a> <a class="no-styling" href="#ref-88">[88]</a></td></tr>
      <tr><td>介质间隔的近红外相机</td><td><strong>940 nm；178°×178°</strong></td><td>报告衍射极限视场；使用 <strong>5 mm</strong> 二氧化硅间隔；日间被动成像配有 <strong>940±5 nm</strong> 滤光。</td><td><a class="no-styling" href="#ref-review">[R1 §4.1, p12, Fig8E]</a> <a class="no-styling" href="#ref-82">[82]</a></td></tr>
    </tbody>
  </table>
  </div><p><strong>读表分析。</strong>这些效率不能直接排成性能榜：衍射效率、聚焦效率、仿真值和实验条件并不统一。综述还介绍了工作于 <strong>470–660 nm</strong> 的可见光双透镜，但明确指出焦距仍随波长变化。<strong>多个波长都能工作，并不等于这些波长在同一个像面清晰成像。</strong><a class="cite no-styling" href="#ref-review">[R1 §4.1, p12]</a> <a class="cite no-styling" href="#ref-92">[原文文献92]</a></p>
  <h3>傅里叶测量与波束扫描：把正弦映射正着、反着用</h3>
  <figure class="paper-figure" id="figure-9">
    <button type="button" class="zoom-button" data-title="图 9 · 傅里叶测量与波束扫描" aria-label="放大查看图 9 · 傅里叶测量与波束扫描"><img src="/assets/wide-angle-metalens-reading/figure-9.png" loading="lazy" width="1722" height="1123" alt="图 9 · 傅里叶测量与波束扫描" decoding="async" data-figure-key="9">
    <span class="zoom-hint" aria-hidden="true">点击放大 ↗</span></button><figcaption>图 9A/B 展示空间频率测量；C 是光学波束扫描仿真，D 是微波扫描的实测方向图。来源：<a class="no-styling" href="#ref-review">[R1 p13, Fig9]</a>。</figcaption>
  </figure>
  <p><strong>补充推导。</strong>沿用前文二次相位一节的入射相位 <em>−k<sub>0</sub>x sinθ</em>，横向波矢由相位对 x 的导数给出，因此 <strong>k<sub>x</sub>=−k<sub>0</sub>sinθ</strong>。把它代入焦点位移关系，就得到坐标与空间频率的线性对应；若换用另一套角度正方向，应同时改写入射项与位移式：</p>
  <div class="math" data-tex="s=-f\sin\theta=\frac{f}{k_0}k_x" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="106pt" height="25pt" viewBox="0 0 106 25" version="1.1" role="img" aria-label="s = −f sinθ = (f/k₀)kx。" focusable="false">
 <title>s = −f sinθ = (f/k₀)kx。</title><defs>
 </defs>
 <g id="eq-27-figure_1">
  <g id="eq-27-patch_1">
   <path d="M 0 25  L 106 25  L 106 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-27-text_1">
   <!-- $s=-f\sin\theta=\frac{f}{k_0}k_x$ -->
   <g style="fill: #17313d" transform="translate(0 16) scale(0.16 -0.16)">
    <defs>
     <path id="eq-27-STIXGeneral-Italic-73" d="M 2342 2829  L 2214 1933  L 2112 1933  Q 2022 2675 1542 2675  Q 1370 2675 1267 2579  Q 1165 2483 1165 2310  Q 1165 2067 1510 1658  Q 1946 1152 1946 787  Q 1946 397 1686 163  Q 1427 -70 1024 -70  Q 838 -70 672 -6  Q 538 51 390 51  Q 262 51 205 -83  L 102 -83  L 230 934  L 333 934  Q 461 64 973 64  Q 1203 64 1331 192  Q 1459 320 1459 557  Q 1459 845 1101 1293  Q 698 1798 698 2131  Q 698 2451 909 2636  Q 1120 2822 1472 2822  Q 1600 2822 1830 2758  Q 1971 2714 2061 2714  Q 2189 2714 2253 2829  L 2342 2829  z " transform="scale(0.015625)"></path>
     <path id="eq-27-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-27-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-27-STIXGeneral-Italic-66" d="M 262 2739  L 858 2739  Q 1107 3546 1318 3846  Q 1664 4339 2163 4339  Q 2400 4339 2557 4227  Q 2714 4115 2714 3942  Q 2714 3834 2634 3750  Q 2554 3667 2445 3667  Q 2355 3667 2281 3737  Q 2208 3808 2208 3917  Q 2208 3981 2240 4038  Q 2272 4096 2272 4115  Q 2272 4198 2131 4198  Q 1862 4198 1676 3849  Q 1491 3501 1350 2739  L 2035 2739  L 1997 2534  L 1306 2534  L 845 486  Q 435 -1325 -435 -1325  Q -653 -1325 -797 -1213  Q -941 -1101 -941 -934  Q -941 -826 -870 -746  Q -800 -666 -698 -666  Q -589 -666 -521 -733  Q -454 -800 -454 -902  Q -454 -947 -483 -1001  Q -512 -1056 -512 -1088  Q -512 -1190 -384 -1190  Q 13 -1190 237 -154  L 800 2534  L 218 2534  L 262 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-27-STIXGeneral-Regular-73" d="M 998 1926  L 1664 1523  Q 1984 1331 2105 1164  Q 2227 998 2227 736  Q 2227 416 1961 176  Q 1696 -64 1331 -64  Q 1030 -64 864 -6  Q 691 51 570 51  Q 461 51 416 -26  L 333 -26  L 333 979  L 435 979  Q 538 512 730 294  Q 922 77 1248 77  Q 1485 77 1632 211  Q 1779 346 1779 550  Q 1779 845 1440 1030  L 1094 1222  Q 326 1651 326 2150  Q 326 2522 566 2730  Q 806 2938 1210 2938  Q 1491 2938 1638 2867  Q 1754 2816 1818 2816  Q 1862 2816 1920 2880  L 1990 2880  L 2022 2010  L 1926 2010  Q 1818 2445 1654 2621  Q 1491 2797 1203 2797  Q 986 2797 854 2688  Q 723 2579 723 2362  Q 723 2253 796 2128  Q 870 2003 998 1926  z " transform="scale(0.015625)"></path>
     <path id="eq-27-STIXGeneral-Regular-69" d="M 1152 4045  Q 1152 3904 1056 3811  Q 960 3718 819 3718  Q 685 3718 592 3811  Q 499 3904 499 4045  Q 499 4179 595 4275  Q 691 4371 826 4371  Q 966 4371 1059 4275  Q 1152 4179 1152 4045  z M 1619 0  L 102 0  L 102 96  Q 435 115 521 211  Q 608 307 608 666  L 608 2118  Q 608 2342 563 2432  Q 518 2522 397 2522  Q 243 2522 128 2490  L 128 2592  L 1120 2944  L 1146 2918  L 1146 672  Q 1146 314 1226 218  Q 1306 122 1619 96  L 1619 0  z " transform="scale(0.015625)"></path>
     <path id="eq-27-STIXGeneral-Regular-6e" d="M 3104 0  L 1773 0  L 1779 96  Q 2016 115 2096 233  Q 2176 352 2176 672  L 2176 1946  Q 2176 2592 1709 2592  Q 1549 2592 1408 2515  Q 1267 2438 1050 2227  L 1050 461  Q 1050 269 1136 192  Q 1222 115 1466 96  L 1466 0  L 115 0  L 115 96  Q 358 115 435 214  Q 512 314 512 602  L 512 2157  Q 512 2394 467 2483  Q 422 2573 288 2573  Q 160 2573 102 2547  L 102 2656  Q 550 2784 979 2944  L 1030 2925  L 1030 2426  L 1037 2426  Q 1491 2944 1958 2944  Q 2323 2944 2518 2688  Q 2714 2432 2714 1958  L 2714 544  Q 2714 288 2790 205  Q 2867 122 3104 96  L 3104 0  z " transform="scale(0.015625)"></path>
     <path id="eq-27-STIXGeneral-Italic-3b8" d="M 3162 3270  Q 3162 2534 2925 1862  Q 2688 1190 2304 678  Q 1741 -70 992 -70  Q 608 -70 390 224  Q 173 518 173 1030  Q 173 1997 592 2813  Q 1011 3629 1594 4070  Q 1952 4339 2374 4339  Q 2733 4339 2947 4076  Q 3162 3814 3162 3270  z M 941 2221  L 2432 2221  Q 2624 2874 2624 3533  Q 2624 4205 2285 4205  Q 2029 4205 1728 3814  Q 1427 3424 1232 2992  Q 1037 2560 941 2221  z M 2387 2016  L 896 2016  Q 710 1530 710 960  Q 710 64 1069 64  Q 1286 64 1510 275  Q 1734 486 1904 806  Q 2074 1126 2198 1440  Q 2323 1754 2387 2016  z " transform="scale(0.015625)"></path>
     <path id="eq-27-STIXGeneral-Italic-6b" d="M 2950 2739  L 2950 2637  Q 2720 2624 2464 2448  Q 2208 2272 1510 1651  L 1747 1088  Q 2099 262 2266 262  Q 2400 262 2554 531  Q 2586 582 2650 698  L 2746 627  Q 2522 224 2374 77  Q 2227 -70 2035 -70  Q 1894 -70 1782 42  Q 1670 154 1517 454  Q 1325 826 1133 1357  L 877 1152  L 570 0  L 90 0  L 992 3379  Q 1082 3699 1107 3942  Q 1088 4096 781 4096  L 666 4096  L 666 4198  Q 1146 4256 1670 4371  L 1709 4333  L 941 1414  L 1216 1626  Q 2131 2330 2131 2522  Q 2131 2637 1894 2637  L 1805 2637  L 1805 2739  L 2950 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-27-STIXGeneral-Regular-30" d="M 3046 2112  Q 3046 1683 2963 1302  Q 2880 922 2717 602  Q 2554 282 2266 96  Q 1978 -90 1600 -90  Q 1210 -90 915 108  Q 621 307 461 640  Q 301 973 227 1350  Q 154 1728 154 2150  Q 154 2746 301 3222  Q 448 3699 790 4012  Q 1133 4326 1626 4326  Q 2253 4326 2649 3712  Q 3046 3098 3046 2112  z M 2432 2080  Q 2432 3091 2217 3625  Q 2003 4160 1587 4160  Q 1190 4160 979 3622  Q 768 3085 768 2106  Q 768 1120 979 598  Q 1190 77 1600 77  Q 2003 77 2217 598  Q 2432 1120 2432 2080  z " transform="scale(0.015625)"></path>
     <path id="eq-27-STIXGeneral-Italic-78" d="M 1555 2272  L 1632 1907  Q 1971 2426 2179 2624  Q 2387 2822 2598 2822  Q 2714 2822 2787 2755  Q 2861 2688 2861 2585  Q 2861 2483 2800 2419  Q 2739 2355 2643 2355  Q 2586 2355 2490 2409  Q 2394 2464 2310 2464  Q 2125 2464 1683 1690  Q 1683 1606 1734 1402  L 1939 544  Q 2003 282 2131 282  Q 2234 282 2432 538  Q 2451 563 2476 598  Q 2502 634 2521 662  Q 2541 691 2566 717  L 2662 659  Q 2387 230 2227 80  Q 2067 -70 1882 -70  Q 1728 -70 1645 26  Q 1562 122 1504 365  L 1318 1126  L 755 365  Q 557 96 432 13  Q 307 -70 147 -70  Q 0 -70 -86 0  Q -173 70 -173 198  Q -173 294 -112 361  Q -51 429 45 429  Q 122 429 250 358  Q 346 301 416 301  Q 525 301 742 614  L 1267 1357  L 1088 2150  Q 1024 2432 969 2509  Q 915 2586 794 2586  Q 717 2586 544 2541  L 429 2509  L 410 2611  L 480 2637  Q 992 2822 1229 2822  Q 1350 2822 1420 2707  Q 1491 2592 1555 2272  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-27-STIXGeneral-Italic-73" transform="translate(0 0.253125)"></use>
    <use xlink:href="#eq-27-STIXGeneral-Regular-3d" transform="translate(53.33999 0.253125)"></use>
    <use xlink:href="#eq-27-STIXGeneral-Regular-2212" transform="translate(136.279971 0.253125)"></use>
    <use xlink:href="#eq-27-STIXGeneral-Italic-66" transform="translate(204.779956 0.253125)"></use>
    <use xlink:href="#eq-27-STIXGeneral-Regular-73" transform="translate(232.579944 0.253125)"></use>
    <use xlink:href="#eq-27-STIXGeneral-Regular-69" transform="translate(271.479938 0.253125)"></use>
    <use xlink:href="#eq-27-STIXGeneral-Regular-6e" transform="translate(299.279926 0.253125)"></use>
    <use xlink:href="#eq-27-STIXGeneral-Italic-3b8" transform="translate(361.313481 0.253125)"></use>
    <use xlink:href="#eq-27-STIXGeneral-Regular-3d" transform="translate(423.753462 0.253125)"></use>
    <use xlink:href="#eq-27-STIXGeneral-Italic-66" transform="translate(526.693443 52.542188) scale(0.7)"></use>
    <use xlink:href="#eq-27-STIXGeneral-Italic-6b" transform="translate(506.693443 -41.007812) scale(0.7)"></use>
    <use xlink:href="#eq-27-STIXGeneral-Regular-30" transform="translate(537.773439 -50.2675) scale(0.49)"></use>
    <use xlink:href="#eq-27-STIXGeneral-Italic-6b" transform="translate(577.859994 0.253125)"></use>
    <use xlink:href="#eq-27-STIXGeneral-Italic-78" transform="translate(622.259988 -12.975) scale(0.7)"></use>
    <path d="M 506.693443 13.05  L 506.693443 19.3  L 565.359994 19.3  L 565.359994 13.05  L 506.693443 13.05  z "></path>
   </g>
  </g>
 </g>
</svg></div>
  <p>综述报道了<strong>120°</strong> 视场的一维傅里叶测量，以及在<strong>9.3–10.6 μm</strong> 波段实现的<strong>178°×178°</strong> 二维傅里叶测量。后者用焦平面图样读取贝塞尔超透镜和超全息图的空间频率分布。探测器直接记录的是强度，不能只凭这张图就宣称恢复了完整复数角谱。<a class="cite no-styling" href="#ref-review">[R1 §4.2, p12–13, Fig9A/B]</a> <a class="cite no-styling" href="#ref-89">[89]</a> <a class="cite no-styling" href="#ref-82">[82]</a></p>
  <p>利用<strong>互易性</strong>，把光源放在相应焦平面位置，便可反向产生指定方向的光束。在理想映射及本文符号下：</p>
  <div class="math" data-tex="\theta=-\arcsin\!\left(\frac{s}{f}\right),\qquad |s|\leq f" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="157pt" height="21pt" viewBox="0 0 157 21" version="1.1" role="img" aria-label="θ = −arcsin(s/f)，数学定义域为 |s|≤f。" focusable="false">
 <title>θ = −arcsin(s/f)，数学定义域为 |s|≤f。</title><defs>
 </defs>
 <g id="eq-28-figure_1">
  <g id="eq-28-patch_1">
   <path d="M 0 21  L 157 21  L 157 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-28-text_1">
   <!-- $\theta=-\arcsin\!\left(\frac{s}{f}\right),\qquad |s|\leq f$ -->
   <g style="fill: #17313d" transform="translate(0 12) scale(0.16 -0.16)">
    <defs>
     <path id="eq-28-STIXGeneral-Italic-3b8" d="M 3162 3270  Q 3162 2534 2925 1862  Q 2688 1190 2304 678  Q 1741 -70 992 -70  Q 608 -70 390 224  Q 173 518 173 1030  Q 173 1997 592 2813  Q 1011 3629 1594 4070  Q 1952 4339 2374 4339  Q 2733 4339 2947 4076  Q 3162 3814 3162 3270  z M 941 2221  L 2432 2221  Q 2624 2874 2624 3533  Q 2624 4205 2285 4205  Q 2029 4205 1728 3814  Q 1427 3424 1232 2992  Q 1037 2560 941 2221  z M 2387 2016  L 896 2016  Q 710 1530 710 960  Q 710 64 1069 64  Q 1286 64 1510 275  Q 1734 486 1904 806  Q 2074 1126 2198 1440  Q 2323 1754 2387 2016  z " transform="scale(0.015625)"></path>
     <path id="eq-28-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-28-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-28-STIXGeneral-Regular-61" d="M 2829 422  L 2829 243  Q 2586 -64 2253 -64  Q 1888 -64 1843 403  L 1837 403  Q 1427 -64 909 -64  Q 608 -64 422 112  Q 237 288 237 602  Q 237 1050 685 1350  Q 992 1555 1837 1869  L 1837 2214  Q 1837 2502 1699 2646  Q 1562 2790 1338 2790  Q 1146 2790 1018 2697  Q 890 2605 890 2477  Q 890 2419 909 2348  Q 928 2278 928 2208  Q 928 2112 841 2029  Q 755 1946 634 1946  Q 525 1946 441 2029  Q 358 2112 358 2240  Q 358 2547 685 2752  Q 986 2944 1421 2944  Q 1939 2944 2176 2656  Q 2291 2522 2323 2384  Q 2355 2246 2355 1946  L 2355 723  Q 2355 301 2554 301  Q 2682 301 2829 422  z M 1837 813  L 1837 1715  Q 1248 1510 1018 1293  Q 800 1094 800 800  Q 800 557 921 432  Q 1043 307 1242 307  Q 1453 307 1613 410  Q 1747 506 1792 589  Q 1837 672 1837 813  z " transform="scale(0.015625)"></path>
     <path id="eq-28-STIXGeneral-Regular-72" d="M 1024 2931  L 1024 2342  Q 1267 2688 1430 2816  Q 1594 2944 1792 2944  Q 1958 2944 2051 2854  Q 2144 2765 2144 2605  Q 2144 2470 2077 2393  Q 2010 2317 1894 2317  Q 1773 2317 1638 2445  Q 1536 2541 1472 2541  Q 1338 2541 1181 2355  Q 1024 2170 1024 2016  L 1024 576  Q 1024 301 1133 205  Q 1242 109 1568 96  L 1568 0  L 32 0  L 32 96  Q 339 154 412 224  Q 486 294 486 538  L 486 2138  Q 486 2349 438 2435  Q 390 2522 269 2522  Q 166 2522 45 2496  L 45 2598  Q 448 2726 992 2944  L 1024 2931  z " transform="scale(0.015625)"></path>
     <path id="eq-28-STIXGeneral-Regular-63" d="M 2547 998  L 2637 941  Q 2362 403 2112 205  Q 1786 -64 1376 -64  Q 845 -64 502 336  Q 160 736 160 1357  Q 160 2170 698 2618  Q 1094 2944 1562 2944  Q 1965 2944 2256 2749  Q 2547 2554 2547 2285  Q 2547 2176 2457 2096  Q 2368 2016 2246 2016  Q 2022 2016 1939 2310  L 1901 2451  Q 1850 2630 1773 2694  Q 1696 2758 1523 2758  Q 1133 2758 893 2451  Q 653 2144 653 1645  Q 653 1094 928 745  Q 1203 397 1645 397  Q 1920 397 2118 528  Q 2317 659 2547 998  z " transform="scale(0.015625)"></path>
     <path id="eq-28-STIXGeneral-Regular-73" d="M 998 1926  L 1664 1523  Q 1984 1331 2105 1164  Q 2227 998 2227 736  Q 2227 416 1961 176  Q 1696 -64 1331 -64  Q 1030 -64 864 -6  Q 691 51 570 51  Q 461 51 416 -26  L 333 -26  L 333 979  L 435 979  Q 538 512 730 294  Q 922 77 1248 77  Q 1485 77 1632 211  Q 1779 346 1779 550  Q 1779 845 1440 1030  L 1094 1222  Q 326 1651 326 2150  Q 326 2522 566 2730  Q 806 2938 1210 2938  Q 1491 2938 1638 2867  Q 1754 2816 1818 2816  Q 1862 2816 1920 2880  L 1990 2880  L 2022 2010  L 1926 2010  Q 1818 2445 1654 2621  Q 1491 2797 1203 2797  Q 986 2797 854 2688  Q 723 2579 723 2362  Q 723 2253 796 2128  Q 870 2003 998 1926  z " transform="scale(0.015625)"></path>
     <path id="eq-28-STIXGeneral-Regular-69" d="M 1152 4045  Q 1152 3904 1056 3811  Q 960 3718 819 3718  Q 685 3718 592 3811  Q 499 3904 499 4045  Q 499 4179 595 4275  Q 691 4371 826 4371  Q 966 4371 1059 4275  Q 1152 4179 1152 4045  z M 1619 0  L 102 0  L 102 96  Q 435 115 521 211  Q 608 307 608 666  L 608 2118  Q 608 2342 563 2432  Q 518 2522 397 2522  Q 243 2522 128 2490  L 128 2592  L 1120 2944  L 1146 2918  L 1146 672  Q 1146 314 1226 218  Q 1306 122 1619 96  L 1619 0  z " transform="scale(0.015625)"></path>
     <path id="eq-28-STIXGeneral-Regular-6e" d="M 3104 0  L 1773 0  L 1779 96  Q 2016 115 2096 233  Q 2176 352 2176 672  L 2176 1946  Q 2176 2592 1709 2592  Q 1549 2592 1408 2515  Q 1267 2438 1050 2227  L 1050 461  Q 1050 269 1136 192  Q 1222 115 1466 96  L 1466 0  L 115 0  L 115 96  Q 358 115 435 214  Q 512 314 512 602  L 512 2157  Q 512 2394 467 2483  Q 422 2573 288 2573  Q 160 2573 102 2547  L 102 2656  Q 550 2784 979 2944  L 1030 2925  L 1030 2426  L 1037 2426  Q 1491 2944 1958 2944  Q 2323 2944 2518 2688  Q 2714 2432 2714 1958  L 2714 544  Q 2714 288 2790 205  Q 2867 122 3104 96  L 3104 0  z " transform="scale(0.015625)"></path>
     <path id="eq-28-STIXSizeOneSym-Regular-28" d="M 2445 -858  L 2445 -1050  Q 1728 -371 1309 630  Q 890 1632 890 2886  Q 890 4122 1309 5136  Q 1728 6150 2445 6822  L 2445 6630  Q 1408 5363 1408 2886  Q 1408 410 2445 -858  z " transform="scale(0.015625)"></path>
     <path id="eq-28-STIXGeneral-Italic-73" d="M 2342 2829  L 2214 1933  L 2112 1933  Q 2022 2675 1542 2675  Q 1370 2675 1267 2579  Q 1165 2483 1165 2310  Q 1165 2067 1510 1658  Q 1946 1152 1946 787  Q 1946 397 1686 163  Q 1427 -70 1024 -70  Q 838 -70 672 -6  Q 538 51 390 51  Q 262 51 205 -83  L 102 -83  L 230 934  L 333 934  Q 461 64 973 64  Q 1203 64 1331 192  Q 1459 320 1459 557  Q 1459 845 1101 1293  Q 698 1798 698 2131  Q 698 2451 909 2636  Q 1120 2822 1472 2822  Q 1600 2822 1830 2758  Q 1971 2714 2061 2714  Q 2189 2714 2253 2829  L 2342 2829  z " transform="scale(0.015625)"></path>
     <path id="eq-28-STIXGeneral-Italic-66" d="M 262 2739  L 858 2739  Q 1107 3546 1318 3846  Q 1664 4339 2163 4339  Q 2400 4339 2557 4227  Q 2714 4115 2714 3942  Q 2714 3834 2634 3750  Q 2554 3667 2445 3667  Q 2355 3667 2281 3737  Q 2208 3808 2208 3917  Q 2208 3981 2240 4038  Q 2272 4096 2272 4115  Q 2272 4198 2131 4198  Q 1862 4198 1676 3849  Q 1491 3501 1350 2739  L 2035 2739  L 1997 2534  L 1306 2534  L 845 486  Q 435 -1325 -435 -1325  Q -653 -1325 -797 -1213  Q -941 -1101 -941 -934  Q -941 -826 -870 -746  Q -800 -666 -698 -666  Q -589 -666 -521 -733  Q -454 -800 -454 -902  Q -454 -947 -483 -1001  Q -512 -1056 -512 -1088  Q -512 -1190 -384 -1190  Q 13 -1190 237 -154  L 800 2534  L 218 2534  L 262 2739  z " transform="scale(0.015625)"></path>
     <path id="eq-28-STIXSizeOneSym-Regular-29" d="M 550 6630  L 550 6822  Q 1267 6144 1686 5142  Q 2106 4141 2106 2886  Q 2106 1651 1686 636  Q 1267 -378 550 -1050  L 550 -858  Q 1587 410 1587 2886  Q 1587 5363 550 6630  z " transform="scale(0.015625)"></path>
     <path id="eq-28-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
     <path id="eq-28-STIXGeneral-Regular-7c" d="M 851 -90  L 429 -90  L 429 4326  L 851 4326  L 851 -90  z " transform="scale(0.015625)"></path>
     <path id="eq-28-STIXGeneral-Regular-2264" d="M 4026 326  L 410 2074  L 410 2138  L 4026 3898  L 4026 3482  L 1261 2106  L 4026 730  L 4026 326  z M 4026 -659  L 410 -659  L 410 -237  L 4026 -237  L 4026 -659  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-28-STIXGeneral-Italic-3b8" transform="translate(0 0.934375)"></use>
    <use xlink:href="#eq-28-STIXGeneral-Regular-3d" transform="translate(62.439981 0.934375)"></use>
    <use xlink:href="#eq-28-STIXGeneral-Regular-2212" transform="translate(145.379962 0.934375)"></use>
    <use xlink:href="#eq-28-STIXGeneral-Regular-61" transform="translate(213.879947 0.934375)"></use>
    <use xlink:href="#eq-28-STIXGeneral-Regular-72" transform="translate(258.279941 0.934375)"></use>
    <use xlink:href="#eq-28-STIXGeneral-Regular-63" transform="translate(291.579929 0.934375)"></use>
    <use xlink:href="#eq-28-STIXGeneral-Regular-73" transform="translate(335.979922 0.934375)"></use>
    <use xlink:href="#eq-28-STIXGeneral-Regular-69" transform="translate(374.879916 0.934375)"></use>
    <use xlink:href="#eq-28-STIXGeneral-Regular-6e" transform="translate(402.679904 0.934375)"></use>
    <use xlink:href="#eq-28-STIXSizeOneSym-Regular-28" transform="translate(452.679889 -37.734375) scale(1.016667)"></use>
    <use xlink:href="#eq-28-STIXGeneral-Italic-73" transform="translate(500.240375 39.639062) scale(0.7)"></use>
    <use xlink:href="#eq-28-STIXGeneral-Italic-66" transform="translate(504.240375 -39.976563) scale(0.7)"></use>
    <use xlink:href="#eq-28-STIXSizeOneSym-Regular-29" transform="translate(539.97037 -37.734375) scale(1.016667)"></use>
    <use xlink:href="#eq-28-STIXGeneral-Regular-2c" transform="translate(587.530856 0.934375)"></use>
    <use xlink:href="#eq-28-STIXGeneral-Regular-7c" transform="translate(771.370801 0.934375)"></use>
    <use xlink:href="#eq-28-STIXGeneral-Italic-73" transform="translate(791.370786 0.934375)"></use>
    <use xlink:href="#eq-28-STIXGeneral-Regular-7c" transform="translate(830.270779 0.934375)"></use>
    <use xlink:href="#eq-28-STIXGeneral-Regular-2264" transform="translate(864.71076 0.934375)"></use>
    <use xlink:href="#eq-28-STIXGeneral-Italic-66" transform="translate(947.650742 0.934375)"></use>
    <path d="M 500.240375 13.73125  L 500.240375 19.98125  L 527.47037 19.98125  L 527.47037 13.73125  L 500.240375 13.73125  z "></path>
   </g>
  </g>
 </g>
</svg></div>
  <aside class="reading-note" data-kind="derivation"><p><strong>原文校读：</strong>第 13 页扫描段落印为 −arcsin(f/s)，与前述位移式及 s=0 的情形不一致。这里采用直接反解所得的 s/f，并未将其称为作者确认的勘误。此处 s 是焦平面光源的位置，不是光阑后传播到透镜的落点。<a class="no-styling" href="#ref-review">[R1 §2.2, Eq2；§4.2, p13]</a></p></aside>
  <p>图 9D 的<strong>19 GHz</strong> 微波实验展示了横向移动馈源进行扫描；综述还报告了红外波段大于<strong>170°×170°</strong> 的激光扫描。把它进一步组合为完整固态激光雷达，是作者提出的系统方向，不能与已经验证的扫描器件混为同一完成度。<a class="cite no-styling" href="#ref-review">[R1 §4.2, p13–14, Fig9D]</a> <a class="cite no-styling" href="#ref-91">[91]</a> <a class="cite no-styling" href="#ref-82">[82]</a></p>
  <h3>角动量检测：再遇一次“二次项加线性项”</h3>
  <p><strong>轨道角动量（OAM）</strong>涡旋光具有角向相位 <em>ℓϕ</em>，其中 ℓ 是拓扑荷。若器件加上<strong>方位角二次相位</strong>，配方后就把拓扑荷变成角向焦点位移。这里 ϕ 是完整方位角，应按 atan2 的象限约定理解。<a class="cite no-styling" href="#ref-review">[R1 §4.3, p14, Eq7]</a></p>
  <div class="math" data-tex="\frac{\ell_0}{2}\varphi^2+\ell\varphi=\frac{\ell_0}{2}\left(\varphi+\frac{\ell}{\ell_0}\right)^2-\frac{\ell^2}{2\ell_0}" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="187pt" height="25pt" viewBox="0 0 187 25" version="1.1" role="img" aria-label="ℓ₀ϕ²/2 + ℓϕ = (ℓ₀/2)(ϕ+ℓ/ℓ₀)² − ℓ²/(2ℓ₀)。" focusable="false">
 <title>ℓ₀ϕ²/2 + ℓϕ = (ℓ₀/2)(ϕ+ℓ/ℓ₀)² − ℓ²/(2ℓ₀)。</title><defs>
 </defs>
 <g id="eq-29-figure_1">
  <g id="eq-29-patch_1">
   <path d="M 0 25  L 187 25  L 187 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-29-text_1">
   <!-- $\frac{\ell_0}{2}\varphi^2+\ell\varphi=\frac{\ell_0}{2}\left(\varphi+\frac{\ell}{\ell_0}\right)^2-\frac{\ell^2}{2\ell_0}$ -->
   <g style="fill: #17313d" transform="translate(0 16) scale(0.16 -0.16)">
    <defs>
     <path id="eq-29-STIXGeneral-Italic-2113" d="M 493 2490  L 582 2656  Q 813 2496 1184 2496  Q 1728 3296 2301 3846  Q 2874 4397 3245 4397  Q 3654 4397 3654 3968  Q 3654 3450 3036 2938  Q 2419 2426 1594 2304  Q 678 826 678 397  Q 678 122 909 122  Q 1120 122 1398 365  Q 1677 608 2182 1190  L 2317 1082  Q 1773 448 1462 189  Q 1152 -70 864 -70  Q 627 -70 467 74  Q 307 218 307 486  Q 307 1024 800 1882  Q 877 2022 1056 2304  Q 742 2317 493 2490  z M 1715 2534  L 1722 2528  Q 2470 2694 2966 3113  Q 3462 3533 3462 3994  Q 3462 4192 3238 4192  Q 3002 4192 2714 3891  Q 2342 3514 1715 2534  z " transform="scale(0.015625)"></path>
     <path id="eq-29-STIXGeneral-Regular-30" d="M 3046 2112  Q 3046 1683 2963 1302  Q 2880 922 2717 602  Q 2554 282 2266 96  Q 1978 -90 1600 -90  Q 1210 -90 915 108  Q 621 307 461 640  Q 301 973 227 1350  Q 154 1728 154 2150  Q 154 2746 301 3222  Q 448 3699 790 4012  Q 1133 4326 1626 4326  Q 2253 4326 2649 3712  Q 3046 3098 3046 2112  z M 2432 2080  Q 2432 3091 2217 3625  Q 2003 4160 1587 4160  Q 1190 4160 979 3622  Q 768 3085 768 2106  Q 768 1120 979 598  Q 1190 77 1600 77  Q 2003 77 2217 598  Q 2432 1120 2432 2080  z " transform="scale(0.015625)"></path>
     <path id="eq-29-STIXGeneral-Regular-32" d="M 3034 877  L 2688 0  L 186 0  L 186 77  L 1325 1286  Q 1773 1754 1965 2144  Q 2157 2534 2157 2950  Q 2157 3379 1920 3616  Q 1683 3853 1267 3853  Q 922 3853 720 3673  Q 518 3494 326 3021  L 192 3053  Q 301 3648 630 3987  Q 960 4326 1523 4326  Q 2054 4326 2380 4006  Q 2707 3686 2707 3200  Q 2707 2477 1888 1613  L 832 486  L 2330 486  Q 2541 486 2665 569  Q 2790 653 2944 915  L 3034 877  z " transform="scale(0.015625)"></path>
     <path id="eq-29-STIXGeneral-Italic-3c6" d="M 1402 64  L 1702 1133  Q 1792 1459 1894 1712  Q 1997 1965 2147 2221  Q 2298 2477 2509 2617  Q 2720 2758 2970 2758  Q 3776 2758 3776 1946  Q 3776 1606 3625 1225  Q 3475 845 3148 496  Q 2822 147 2394 6  Q 2144 -70 1850 -70  L 1510 -1312  L 1018 -1312  L 1363 -70  Q 832 -70 646 0  Q 173 186 173 813  Q 173 1306 489 1827  Q 806 2349 1274 2618  Q 1638 2822 1907 2822  L 1907 2720  Q 1581 2637 1299 2281  Q 1018 1926 864 1481  Q 710 1037 710 640  Q 710 320 889 192  Q 1069 64 1402 64  z M 2298 1594  L 1888 64  Q 2150 64 2330 160  Q 2688 352 2963 969  Q 3238 1587 3238 2099  Q 3238 2330 3193 2451  Q 3149 2573 3097 2598  Q 3046 2624 2963 2624  Q 2752 2624 2595 2365  Q 2438 2106 2298 1594  z " transform="scale(0.015625)"></path>
     <path id="eq-29-STIXGeneral-Regular-2b" d="M 4070 1408  L 2400 1408  L 2400 -262  L 1978 -262  L 1978 1408  L 307 1408  L 307 1830  L 1978 1830  L 1978 3501  L 2400 3501  L 2400 1830  L 4070 1830  L 4070 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-29-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-29-STIXSizeTwoSym-Regular-28" d="M 3219 -1555  L 3219 -1786  Q 2144 -774 1517 730  Q 890 2234 890 4115  Q 890 6003 1533 7593  Q 2176 9184 3219 10022  L 3219 9811  Q 2490 9062 1994 7606  Q 1498 6150 1498 4115  Q 1498 563 3219 -1555  z " transform="scale(0.015625)"></path>
     <path id="eq-29-STIXSizeTwoSym-Regular-29" d="M 730 9792  L 730 10022  Q 1805 9011 2432 7507  Q 3059 6003 3059 4115  Q 3059 2234 2416 643  Q 1773 -947 730 -1786  L 730 -1574  Q 1459 -826 1955 633  Q 2451 2093 2451 4115  Q 2451 7674 730 9792  z " transform="scale(0.015625)"></path>
     <path id="eq-29-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-29-STIXGeneral-Italic-2113" transform="translate(0 48.369688) scale(0.7)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Regular-30" transform="translate(40.529996 39.11) scale(0.49)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Regular-32" transform="translate(17 -40.144687) scale(0.7)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Italic-3c6" transform="translate(80.616551 0.624063)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Regular-32" transform="translate(148.989673 35.899063) scale(0.7)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Regular-2b" transform="translate(202.839033 0.624063)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Italic-2113" transform="translate(285.779014 0.624063)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Italic-3c6" transform="translate(343.679008 0.624063)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Regular-3d" transform="translate(420.319002 0.624063)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Italic-2113" transform="translate(503.258983 48.369688) scale(0.7)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Regular-30" transform="translate(543.788978 39.11) scale(0.49)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Regular-32" transform="translate(520.258983 -40.144687) scale(0.7)"></use>
    <use xlink:href="#eq-29-STIXSizeTwoSym-Regular-28" transform="translate(583.875533 -29.948125) scale(0.748774)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Italic-3c6" transform="translate(627.976898 0.624063)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Regular-2b" transform="translate(704.616891 0.624063)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Italic-2113" transform="translate(801.556872 39.186563) scale(0.7)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Italic-2113" transform="translate(787.556872 -40.92125) scale(0.7)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Regular-30" transform="translate(828.086868 -50.180937) scale(0.49)"></use>
    <use xlink:href="#eq-29-STIXSizeTwoSym-Regular-29" transform="translate(868.173423 -29.948125) scale(0.748774)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Regular-32" transform="translate(915.240691 35.899063) scale(0.7)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Regular-2212" transform="translate(969.090051 0.624063)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Italic-2113" transform="translate(1066.030033 39.186563) scale(0.7)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Regular-32" transform="translate(1114.498794 63.879063) scale(0.49)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Regular-32" transform="translate(1052.030033 -40.92125) scale(0.7)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Italic-2113" transform="translate(1087.030022 -40.92125) scale(0.7)"></use>
    <use xlink:href="#eq-29-STIXGeneral-Regular-30" transform="translate(1127.560018 -50.180937) scale(0.49)"></use>
    <path d="M 0 13.420938  L 0 19.670938  L 68.116551 19.670938  L 68.116551 13.420938  L 0 13.420938  z "></path>
    <path d="M 503.258983 13.420938  L 503.258983 19.670938  L 571.375533 19.670938  L 571.375533 13.420938  L 503.258983 13.420938  z "></path>
    <path d="M 787.556872 13.420938  L 787.556872 19.670938  L 855.673423 19.670938  L 855.673423 13.420938  L 787.556872 13.420938  z "></path>
    <path d="M 1052.030033 13.420938  L 1052.030033 19.670938  L 1155.146573 19.670938  L 1155.146573 13.420938  L 1052.030033 13.420938  z "></path>
   </g>
  </g>
 </g>
</svg></div>
  <p>最后一项对方位角 ϕ 是常数，不改变相对相位；其余部分就是原来的二次相位沿角坐标平移。因此：</p>
  <div class="math" data-tex="\varphi_\ell=-\frac{\ell}{\ell_0},\qquad \ell=-\ell_0\varphi_\ell" tabindex="0" aria-label="公式，可横向滚动查看"><svg stroke-linejoin="round" stroke-linecap="butt" data-pagefind-ignore xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="155pt" height="23pt" viewBox="0 0 155 23" version="1.1" role="img" aria-label="焦斑方位 ϕℓ = −ℓ/ℓ₀，反过来由方位读出拓扑荷 ℓ。" focusable="false">
 <title>焦斑方位 ϕℓ = −ℓ/ℓ₀，反过来由方位读出拓扑荷 ℓ。</title><defs>
 </defs>
 <g id="eq-30-figure_1">
  <g id="eq-30-patch_1">
   <path d="M 0 23  L 155 23  L 155 0  L 0 0  z " style="fill: none"></path>
  </g>
  <g id="eq-30-text_1">
   <!-- $\varphi_\ell=-\frac{\ell}{\ell_0},\qquad \ell=-\ell_0\varphi_\ell$ -->
   <g style="fill: #17313d" transform="translate(0 14) scale(0.16 -0.16)">
    <defs>
     <path id="eq-30-STIXGeneral-Italic-3c6" d="M 1402 64  L 1702 1133  Q 1792 1459 1894 1712  Q 1997 1965 2147 2221  Q 2298 2477 2509 2617  Q 2720 2758 2970 2758  Q 3776 2758 3776 1946  Q 3776 1606 3625 1225  Q 3475 845 3148 496  Q 2822 147 2394 6  Q 2144 -70 1850 -70  L 1510 -1312  L 1018 -1312  L 1363 -70  Q 832 -70 646 0  Q 173 186 173 813  Q 173 1306 489 1827  Q 806 2349 1274 2618  Q 1638 2822 1907 2822  L 1907 2720  Q 1581 2637 1299 2281  Q 1018 1926 864 1481  Q 710 1037 710 640  Q 710 320 889 192  Q 1069 64 1402 64  z M 2298 1594  L 1888 64  Q 2150 64 2330 160  Q 2688 352 2963 969  Q 3238 1587 3238 2099  Q 3238 2330 3193 2451  Q 3149 2573 3097 2598  Q 3046 2624 2963 2624  Q 2752 2624 2595 2365  Q 2438 2106 2298 1594  z " transform="scale(0.015625)"></path>
     <path id="eq-30-STIXGeneral-Italic-2113" d="M 493 2490  L 582 2656  Q 813 2496 1184 2496  Q 1728 3296 2301 3846  Q 2874 4397 3245 4397  Q 3654 4397 3654 3968  Q 3654 3450 3036 2938  Q 2419 2426 1594 2304  Q 678 826 678 397  Q 678 122 909 122  Q 1120 122 1398 365  Q 1677 608 2182 1190  L 2317 1082  Q 1773 448 1462 189  Q 1152 -70 864 -70  Q 627 -70 467 74  Q 307 218 307 486  Q 307 1024 800 1882  Q 877 2022 1056 2304  Q 742 2317 493 2490  z M 1715 2534  L 1722 2528  Q 2470 2694 2966 3113  Q 3462 3533 3462 3994  Q 3462 4192 3238 4192  Q 3002 4192 2714 3891  Q 2342 3514 1715 2534  z " transform="scale(0.015625)"></path>
     <path id="eq-30-STIXGeneral-Regular-3d" d="M 4077 2048  L 307 2048  L 307 2470  L 4077 2470  L 4077 2048  z M 4077 768  L 307 768  L 307 1190  L 4077 1190  L 4077 768  z " transform="scale(0.015625)"></path>
     <path id="eq-30-STIXGeneral-Regular-2212" d="M 3974 1408  L 410 1408  L 410 1830  L 3974 1830  L 3974 1408  z " transform="scale(0.015625)"></path>
     <path id="eq-30-STIXGeneral-Regular-30" d="M 3046 2112  Q 3046 1683 2963 1302  Q 2880 922 2717 602  Q 2554 282 2266 96  Q 1978 -90 1600 -90  Q 1210 -90 915 108  Q 621 307 461 640  Q 301 973 227 1350  Q 154 1728 154 2150  Q 154 2746 301 3222  Q 448 3699 790 4012  Q 1133 4326 1626 4326  Q 2253 4326 2649 3712  Q 3046 3098 3046 2112  z M 2432 2080  Q 2432 3091 2217 3625  Q 2003 4160 1587 4160  Q 1190 4160 979 3622  Q 768 3085 768 2106  Q 768 1120 979 598  Q 1190 77 1600 77  Q 2003 77 2217 598  Q 2432 1120 2432 2080  z " transform="scale(0.015625)"></path>
     <path id="eq-30-STIXGeneral-Regular-2c" d="M 531 -902  L 467 -781  Q 998 -422 998 -96  Q 998 -13 909 -13  Q 883 -13 822 -25  Q 762 -38 723 -38  Q 352 -38 352 288  Q 352 454 457 553  Q 563 653 736 653  Q 954 653 1101 496  Q 1248 339 1248 96  Q 1248 -198 1053 -473  Q 858 -749 531 -902  z " transform="scale(0.015625)"></path>
    </defs>
    <use xlink:href="#eq-30-STIXGeneral-Italic-3c6" transform="translate(0 0.345313)"></use>
    <use xlink:href="#eq-30-STIXGeneral-Italic-2113" transform="translate(62.199997 -12.882812) scale(0.7)"></use>
    <use xlink:href="#eq-30-STIXGeneral-Regular-3d" transform="translate(121.579364 0.345313)"></use>
    <use xlink:href="#eq-30-STIXGeneral-Regular-2212" transform="translate(204.519345 0.345313)"></use>
    <use xlink:href="#eq-30-STIXGeneral-Italic-2113" transform="translate(287.01933 38.907813) scale(0.7)"></use>
    <use xlink:href="#eq-30-STIXGeneral-Italic-2113" transform="translate(273.01933 -41.2) scale(0.7)"></use>
    <use xlink:href="#eq-30-STIXGeneral-Regular-30" transform="translate(313.549326 -50.459687) scale(0.49)"></use>
    <use xlink:href="#eq-30-STIXGeneral-Regular-2c" transform="translate(353.635881 0.345313)"></use>
    <use xlink:href="#eq-30-STIXGeneral-Italic-2113" transform="translate(537.475825 0.345313)"></use>
    <use xlink:href="#eq-30-STIXGeneral-Regular-3d" transform="translate(609.815815 0.345313)"></use>
    <use xlink:href="#eq-30-STIXGeneral-Regular-2212" transform="translate(692.755796 0.345313)"></use>
    <use xlink:href="#eq-30-STIXGeneral-Italic-2113" transform="translate(761.255781 0.345313)"></use>
    <use xlink:href="#eq-30-STIXGeneral-Regular-30" transform="translate(819.155775 -12.882812) scale(0.7)"></use>
    <use xlink:href="#eq-30-STIXGeneral-Italic-3c6" transform="translate(858.565139 0.345313)"></use>
    <use xlink:href="#eq-30-STIXGeneral-Italic-2113" transform="translate(920.765136 -12.882812) scale(0.7)"></use>
    <path d="M 273.01933 13.142188  L 273.01933 19.392188  L 341.135881 19.392188  L 341.135881 13.142188  L 273.01933 13.142188  z "></path>
   </g>
  </g>
 </g>
</svg></div>
  <figure class="paper-figure" id="figure-10">
    <button type="button" class="zoom-button" data-title="图 10 · 自旋与轨道角动量检测" aria-label="放大查看图 10 · 自旋与轨道角动量检测"><img src="/assets/wide-angle-metalens-reading/figure-10.png" loading="lazy" width="799" height="991" alt="图 10 · 自旋与轨道角动量检测" decoding="async" data-figure-key="10">
    <span class="zoom-hint" aria-hidden="true">点击放大 ↗</span></button><figcaption>图 10：OAM 映射为焦斑方位；结合自旋解耦设计后，不同手性的光落在不同半屏。来源：<a class="no-styling" href="#ref-review">[R1 p14, Fig10]</a>，转引<a class="no-styling" href="#ref-140">[原文文献140]</a>。</figcaption>
  </figure>
  <p>进一步结合几何相位和传播相位，<strong>自旋角动量（SAM）</strong>对应的两种圆偏振手性可分到不同半屏，方位角则读出 OAM；文中给出<strong>532 nm</strong> 的概念验证。我们的理解是：它延续了前面的坐标变换思路，但有限焦斑宽度、串扰和角度周期性仍会限制可分辨通道，配方本身不代表无限分辨能力。<a class="cite no-styling" href="#ref-review">[R1 §4.3, p14]</a> <a class="cite no-styling" href="#ref-140">[140]</a></p>
</section>
<section id="outlook" class="article-section">
  <p class="section-kicker"><span class="chapter-num">11</span>2021 年的展望与本次研读分析</p><h2>读完之后：哪些问题解决了，哪些仍是设计取舍</h2>
  <p><strong>时间边界。</strong>下面先整理作者在<strong>2021 年</strong>形成的展望，再给出本次研读的设计分析；其中的“纪录”“尚未解决”和计算能力判断都属于论文当时的语境。它们不构成对当前研究进度的更新。作者在结尾集中提出了带宽、有效 NA 与视场、以及超过 180° 的接收范围这几类问题。<a class="cite no-styling" href="#ref-review">[R1 §5, p15–16]</a></p>
  <h3>作者提出的第一条边界：宽带工作与宽带消色差</h3>
  <p><strong>原文观点。</strong>几何相位器件可以在较宽波段保持可用转换，却仍可能存在色差；光源带宽增加时，离轴成像尤其容易退化。作者讨论了色散工程、离散多波长设计，以及结合折射与衍射元件不同色散的混合系统。<a class="cite no-styling" href="#ref-review">[R1 §5, p15]</a></p>
  <p><strong>我们的分析。</strong>评估这类结果，需要分别检查“有光通过”“能在某处聚焦”和“整个波段都在同一像面保持像质”。几个离散波长共焦，约束数量与连续宽带共焦不同；使用窄带滤光获得的漂亮图像也不能直接证明宽带性能。前面应用中反复出现的滤光片，正是在告诉读者实验解决的是哪一组条件。</p>
  <h3>第二条边界：视场与有效 NA 的联合设计</h3>
  <p><strong>原文观点。</strong>作者认为，许多方案采用近似角度无关的相位响应，因此扩大视场时仍须牺牲有效 NA；主动设计结构的角度色散，并结合光线追迹和电磁仿真，是可能增加自由度的方向。离散视场角上的好结果，仍需要扩展到连续角度范围。<a class="cite no-styling" href="#ref-review">[R1 §5, p15]</a></p>
  <p><strong>我们的分析。</strong>“角度鲁棒”应理解为目标功能在角度变化时保持可用，不必一律理解成单元相位完全不变。二次相位近似方案希望保持特定波前规律；直接逼近理想广角相位的方案，则可能需要受控的角度依赖。两者最终都必须用跨视场的点扩散函数或调制传递函数检验，不能只检查几个角度的焦点位置。</p>
  <h3>第三条边界：超过 180° 需要重新考虑系统几何</h3>
  <p><strong>原文设想。</strong>作者讨论了分别控制透射场与反射场的可能性，并提出可借助曲面光学元件，把来自后侧的光引导到超透镜前方，再联合优化材料、曲率、相对位置和相位分布。这是系统架构上的进一步探索，不是仅把当前相位图再扩大一些。<a class="cite no-styling" href="#ref-review">[R1 §5, p15–16]</a></p>
  <p><strong>我们的分析。</strong>超过 180° 时，首先要说清接收哪个方向范围、使用单侧还是双侧光路、像落在哪里。讨论完这些几何条件，再谈超表面的相位与偏振自由度，才不会把一个视场数值误读为完整相机能力。</p>
  <h3>把这篇综述转化成自己的设计记录</h3>
  <p>下面是本次研读提出的记录方式，<strong>不是原文给出的统一性能标准</strong>。它把论文分散出现的限制条件并列起来，便于核对一项设计到底优化了什么。</p>
  <div class="table-wrap" tabindex="0" role="region" aria-label="对照表，可横向滚动查看"><table>
    <thead><tr><th>记录项</th><th>需要明确的内容</th><th>对应的设计判断</th></tr></thead>
    <tbody>
      <tr><td><strong>视场与像质</strong></td><td>全角还是半角、单轴还是二维；像质判据及视场采样。</td><td>能形成焦点与满足成像分辨率要求分开评价。</td></tr>
      <tr><td><strong>孔径与结构</strong></td><td>整片尺寸、光阑、有效 NA、间隔厚度及表面数。</td><td>单片或平面元件的尺寸，不能代表整机体积。</td></tr>
      <tr><td><strong>光谱与偏振</strong></td><td>工作波段、滤光条件、焦距随波长变化及输入偏振。</td><td>宽带转换、宽带聚焦和消色差分别验证。</td></tr>
      <tr><td><strong>效率与实现</strong></td><td>分母是入射功率还是透射功率；仿真或实测；局部模型与整器件结果。</td><td>比较之前统一口径，并检查制造后的性能。</td></tr>
    </tbody>
  </table>
  </div><p><strong>本文最有价值的设计启发，是把相位公式、照明孔径、角度响应和结构实现连起来看。</strong>理想公式确定需要的波前，系统几何决定实际采样区域，微结构决定波前能否以足够效率实现；最后仍要回到目标应用的像质、带宽和探测条件。把这几层写在同一张设计记录里，比单独追求一个最大的视场数字更有解释力。</p>
</section>
<section id="reading-notes" class="article-section">
  <p class="section-kicker"><span class="chapter-num">12</span>回查与校读</p>
  <h2>符号、原图与几处需要停下来核对的地方</h2>
  <h3>一张符号表，避免在不同段落中串用变量</h3>
  <div class="table-wrap" tabindex="0" role="region" aria-label="对照表，可横向滚动查看"><table><thead><tr><th>符号</th><th>含义</th><th>容易混淆的对象</th></tr></thead><tbody>
    <tr><td><strong>φₘ</strong></td><td>给定入射角下，理想透镜本身应提供的相位</td><td>不是入射波与器件相加后的出射总相位 Φout</td></tr>
    <tr><td><strong>s</strong></td><td>焦平面上的目标像点，或反向扫描中的光源位置</td><td>不是光阑后在透镜平面上的受照中心 xc；图 7 原图中 s 又表示条长</td></tr>
    <tr><td><strong>θᵢ、θt、ξ</strong></td><td>外部入射角、介质内折射角、结构面内主轴方向角</td><td>ξ 是轮廓切线的面内方位角，不是入射角</td></tr>
    <tr><td><strong>p、Λloc、N</strong></td><td>单元间距、局部相位周期、整数相位级数</td><td>Λloc/p 是采样密度估计；它不必为整数，也不等于可直接代入量化效率式的 N</td></tr>
    <tr><td><strong>φ、ϕ</strong></td><td>本文用 φ 表示相位，用 ϕ 表示 OAM 一节中的方位角</td><td>方位角上的二次相位是 φ(ϕ)，二者并非同一个量</td></tr>
  </tbody></table></div>
  <h3>校读记录：说明推导依据，不替作者发布勘误</h3>
  <p>下面是本次研读中发现的<strong>内部一致性问题</strong>。本文没有查到或采用作者确认的勘误，因此将“原文印刷形式”与“本文采用的处理”分开记录。</p>
  <ol class="notes-list">
    <li><strong>式（1）与式（2）的线性入射相位符号。</strong>两式分别出现 +k₀x sinθᵢ 与 −k₀x sinθᵢ。本文在理想相位热图和二次相位两个模块中分别说明局部约定；后续光阑、傅里叶映射和扫描段落均跟随式（2）的约定。这是坐标使用说明，不直接判定为原文错误。<a class="cite no-styling" href="#ref-review">[R1 §2.1–2.2]</a></li>
    <li><strong>式（3）的根号与展开符号。</strong>原式根号内印为 R²+r²；对式中 R、Δn 为正的情况，左侧所列表达式的近轴展开，与右侧负二次项的符号不一致。本文采用明确假设下的对称双凸薄透镜推导，见前文可展开部分，不推测作者原本拟采用哪一处修订。<a class="cite no-styling" href="#ref-review">[R1 p.6，式（3）]</a></li>
    <li><strong>扫描反解。</strong>第 13 页正文写为 −arcsin(f/s)。按此前 s=−f sinθ 的关系直接反解，应为 −arcsin(s/f)，且 |s|≤f。正文使用后者，并明确它是代数反解；s=0 的轴上情形也提供了简单的一致性检查。<a class="cite no-styling" href="#ref-review">[R1 §4.2，p.13]</a></li>
    <li><strong>图 3 图注的构型索引。</strong>图注指向图 2C 和 2E，但介质间隔示意及正文对应的是图 2D。本文按实际结构与正文解读为图 2C、2D；原图保持原样。<a class="cite no-styling" href="#ref-review">[R1 图 2–3及 §2.2]</a></li>
  </ol>
  <h3>原图索引</h3>
  <p class="source-note">图像直接摘自所研读的 PDF，图 7D 另提供局部裁切。点击图像可以放大，再点击可切换到原始像素尺寸。图内的曲线与照片属于原研究；互动模块是本文依据公式另行编写的教学内容。</p>
  <nav class="fig-index" aria-label="原论文图索引">
    <a class="no-styling" href="#figure-1">图 1 · 理想相位</a><a class="no-styling" href="#figure-2">图 2 · 构型</a><a class="no-styling" href="#figure-3">图 3 · 角谱与落点</a><a class="no-styling" href="#figure-4">图 4 · 角度响应</a><a class="no-styling" href="#figure-5">图 5 · 模式与耦合</a><a class="no-styling" href="#figure-6">图 6 · 数值优化</a><a class="no-styling" href="#figure-7">图 7 · 悬链线</a><a class="no-styling" href="#figure-7d">图 7D · 流线</a><a class="no-styling" href="#figure-8">图 8 · 成像</a><a class="no-styling" href="#figure-9">图 9 · 傅里叶与扫描</a><a class="no-styling" href="#figure-10">图 10 · 角动量</a>
  </nav>
</section>
    <section id="references" class="article-section">
      <p class="section-kicker">文献与来源</p>
      <h2>参考文献</h2>
      <p class="reference-intro">本文以所附综述作为<strong>R1</strong>。正文中的<strong>p1–p20 均指综述的期刊印刷页码</strong>；“原文82”等编号保留综述末尾参考文献的原始编号。该综述于<strong>2021年12月2日在线发表</strong>，正式编入<strong>2022年《Nanophotonics》第11卷第1期</strong>，两种年份分别对应在线发表时间与正式卷期。以下列出本研读文章重点使用的文献，题名及DOI依据原论文或出版商页面核对。</p>
<ol class="reference-list">
  <li id="ref-review">
    <strong>[R1｜所读综述]</strong>
    X. Luo, F. Zhang, M. Pu, et al.
    <cite>Recent advances of wide-angle metalenses: principle, design, and applications</cite>.
    <em>Nanophotonics</em>, <strong>2022</strong>, 11(1), 1–20.
    <a class="no-styling" href="https://doi.org/10.1515/nanoph-2021-0583" target="_blank" rel="noopener noreferrer">DOI: 10.1515/nanoph-2021-0583</a>.
  </li>
  <li id="ref-82">
    <strong>[原文82]</strong>
    F. Zhang, M. Pu, X. Li, et al.
    <cite>Extreme-Angle Silicon Infrared Optics Enabled by Streamlined Surfaces</cite>.
    <em>Advanced Materials</em>, <strong>2021</strong>, 33, 2008157.
    <a class="no-styling" href="https://doi.org/10.1002/adma.202008157" target="_blank" rel="noopener noreferrer">DOI: 10.1002/adma.202008157</a>.
  </li>
  <li id="ref-83">
    <strong>[原文83]</strong>
    E. Lassalle, T. W. W. Mass, D. Eschimese, et al.
    <cite>Imaging Properties of Large Field-of-View Quadratic Metalenses and Their Applications to Fingerprint Detection</cite>.
    <em>ACS Photonics</em>, <strong>2021</strong>, 8(5), 1457–1468.
    <a class="no-styling" href="https://doi.org/10.1021/acsphotonics.1c00237" target="_blank" rel="noopener noreferrer">DOI: 10.1021/acsphotonics.1c00237</a>.
  </li>
  <li id="ref-85">
    <strong>[原文85]</strong>
    A. Martins, K. Li, J. Li, et al.
    <cite>On Metalenses with Arbitrarily Wide Field of View</cite>.
    <em>ACS Photonics</em>, <strong>2020</strong>, 7(8), 2073–2079.
    <a class="no-styling" href="https://doi.org/10.1021/acsphotonics.0c00479" target="_blank" rel="noopener noreferrer">DOI: 10.1021/acsphotonics.0c00479</a>.
  </li>
  <li id="ref-88">
    <strong>[原文88]</strong>
    J. Engelberg, C. Zhou, N. Mazurski, et al.
    <cite>Near-IR wide-field-of-view Huygens metalens for outdoor imaging applications</cite>.
    <em>Nanophotonics</em>, <strong>2020</strong>, 9(2), 361–370.
    <a class="no-styling" href="https://doi.org/10.1515/nanoph-2019-0177" target="_blank" rel="noopener noreferrer">DOI: 10.1515/nanoph-2019-0177</a>.
  </li>
  <li id="ref-89">
    <strong>[原文89]</strong>
    W. Liu, Z. Li, H. Cheng, et al.
    <cite>Metasurface Enabled Wide-Angle Fourier Lens</cite>.
    <em>Advanced Materials</em>, <strong>2018</strong>, 30, 1706368.
    <a class="no-styling" href="https://doi.org/10.1002/adma.201706368" target="_blank" rel="noopener noreferrer">DOI: 10.1002/adma.201706368</a>.
  </li>
  <li id="ref-91">
    <strong>[原文91]</strong>
    Y. Guo, X. Ma, M. Pu, et al.
    <cite>High-Efficiency and Wide-Angle Beam Steering Based on Catenary Optical Fields in Ultrathin Metalens</cite>.
    <em>Advanced Optical Materials</em>, <strong>2018</strong>, 6, 1800592.
    <a class="no-styling" href="https://doi.org/10.1002/adom.201800592" target="_blank" rel="noopener noreferrer">DOI: 10.1002/adom.201800592</a>.
  </li>
  <li id="ref-92">
    <strong>[原文92]</strong>
    B. Groever, W. T. Chen, F. Capasso.
    <cite>Meta-Lens Doublet in the Visible Region</cite>.
    <em>Nano Letters</em>, <strong>2017</strong>, 17(8), 4902–4907.
    <a class="no-styling" href="https://doi.org/10.1021/acs.nanolett.7b01888" target="_blank" rel="noopener noreferrer">DOI: 10.1021/acs.nanolett.7b01888</a>.
  </li>
  <li id="ref-93">
    <strong>[原文93]</strong>
    A. Arbabi, E. Arbabi, S. M. Kamali, et al.
    <cite>Miniature optical planar camera based on a wide-angle metasurface doublet corrected for monochromatic aberrations</cite>.
    <em>Nature Communications</em>, <strong>2016</strong>, 7, 13682.
    <a class="no-styling" href="https://doi.org/10.1038/ncomms13682" target="_blank" rel="noopener noreferrer">DOI: 10.1038/ncomms13682</a>.
  </li>
  <li id="ref-111">
    <strong>[原文111]</strong>
    C. M. Lalau-Keraly, S. Bhargava, O. D. Miller, E. Yablonovitch.
    <cite>Adjoint shape optimization applied to electromagnetic design</cite>.
    <em>Optics Express</em>, <strong>2013</strong>, 21(18), 21693–21701.
    <a class="no-styling" href="https://doi.org/10.1364/OE.21.021693" target="_blank" rel="noopener noreferrer">DOI: 10.1364/OE.21.021693</a>.
  </li>
  <li id="ref-114">
    <strong>[原文114]</strong>
    M. Zhou, D. Liu, S. W. Belling, et al.
    <cite>Inverse Design of Metasurfaces Based on Coupled-Mode Theory and Adjoint Optimization</cite>.
    <em>ACS Photonics</em>, <strong>2021</strong>, 8(8), 2265–2273.
    <a class="no-styling" href="https://doi.org/10.1021/acsphotonics.1c00100" target="_blank" rel="noopener noreferrer">DOI: 10.1021/acsphotonics.1c00100</a>.
  </li>
  <li id="ref-126">
    <strong>[原文126]</strong>
    M. Pu, X. Li, X. Ma, et al.
    <cite>Catenary optics for achromatic generation of perfect optical angular momentum</cite>.
    <em>Science Advances</em>, <strong>2015</strong>, 1(9), e1500396.
    <a class="no-styling" href="https://doi.org/10.1126/sciadv.1500396" target="_blank" rel="noopener noreferrer">DOI: 10.1126/sciadv.1500396</a>.
  </li>
  <li id="ref-140">
    <strong>[原文140]</strong>
    Y. Guo, S. Zhang, M. Pu, et al.
    <cite>Spin-decoupled metasurface for simultaneous detection of spin and orbital angular momenta via momentum transformation</cite>.
    <em>Light: Science &amp; Applications</em>, <strong>2021</strong>, 10, 63.
    <a class="no-styling" href="https://doi.org/10.1038/s41377-021-00497-7" target="_blank" rel="noopener noreferrer">DOI: 10.1038/s41377-021-00497-7</a>.
  </li>
</ol>
    </section>
    <footer class="footer">
      <p>图源：所研读论文的图 1–10，图 7D 另作局部裁切。原图中的曲线、照片与版权标注均保留。本文的公式重排、交互图及阅读分析用于解释原研究，不代表新增实验或全波仿真。</p>
      <p>页面的「打印 / PDF」会展开补充推导，并保留当前交互状态的图示。导出的 PDF 为静态阅读版。</p>
      <nav class="footer-nav"><a class="no-styling" href="#metalens-top">回到开头 ↑</a><a class="no-styling" href="#reading-notes">回查符号与原图</a><a class="no-styling" href="#references">查看参考文献</a></nav>
    </footer>
  </div>
<dialog class="figure-dialog" id="figure-dialog" aria-labelledby="dialog-title">
  <div class="dialog-bar"><p id="dialog-title">论文原图</p><button id="close-figure" type="button">关闭 · Esc</button></div>
  <div class="dialog-image-wrap" id="dialog-image-wrap"><button type="button" class="dialog-image-toggle" aria-label="切换图片显示尺寸" aria-pressed="false"><img id="dialog-image" alt="放大的论文原图"></button></div>
</dialog>
</metalens-reader>

<script type="module" src="/assets/wide-angle-metalens-reading/reader.js"></script>

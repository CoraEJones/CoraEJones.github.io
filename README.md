# 丢丢的博客

光学与具身智能的个人学习记录。基于 [Fuwari](https://github.com/saicaca/fuwari) / Astro。

网站：https://coraejones.github.io/

## 写文章

在 src/content/posts/ 新建 Markdown 文件，使用以下头部：

```yaml
---
title: 我的学习笔记
published: 2026-11-03
description: 一句话简介
category: 光学
tags: [学习笔记]
draft: false
---
```

category 使用「光学」或「具身智能」，文章会自动出现在对应专题。正文支持 Markdown、LaTeX 数学公式与代码块。设 draft: true 可隐藏草稿。

## 本地预览

Node.js 22、pnpm 9.14.4。依次运行 pnpm install、pnpm dev。生产构建运行 pnpm build（包含搜索索引），然后 pnpm preview。

## 发布

推送到 master 后，GitHub Actions 自动检查、构建并部署到 GitHub Pages。Pages 的 Source 选择 GitHub Actions。

## 修改个人信息

src/config.ts 管理标题、头像、横幅、导航与配色。src/content/spec/about.md 是关于页面。

## 迁移说明

原 PRML 文章与配图保留，旧文章地址会跳转至 /posts/prml-notes/。原站历史保留在 Git 提交中。照片由站点所有者提供，不属于模板的 MIT 许可；其他内容权利归原作者所有。

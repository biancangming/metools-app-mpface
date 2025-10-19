# metools-app-mpface

微信封面生成器 - 专为 metools 工具（迷途工具箱）设计的插件开发脚手架。

## 简介

本项目是专为 metools 工具（迷途工具箱）设计的微信封面生成器插件。通过此脚手架，开发者可以快速创建、调试和打包适用于 metools 平台的 Vue3 插件。

## 功能特性

- 🎨 **多种风格模板**：简约渐变、左侧强调色块、图片背景+暗色蒙版、白色圆角卡片
- 🌈 **丰富预设背景**：内置100+精美渐变背景，一键应用
- 🎯 **智能文字布局**：自动换行、垂直居中、多行文字支持
- 🎨 **个性化设置**：自定义字体大小、颜色、背景等
- 📱 **高清输出**：自动适配设备像素比，输出高质量图片
- 🖼️ **实时预览**：所见即所得，实时预览效果
- 📤 **一键导出**：支持PNG格式导出，自动删除辅助线

## 作者简介

本项目由"一个橙子"开发，是一位专注于软件开发、软件制作和软件运维的互联网开发者。"一个橙子"致力于为用户提供高质量的软件解决方案，涵盖前端组件开发、云函数服务以及各种实用工具的开发。

"一个橙子"维护着个人技术网站 [yigechengzi.com](https://yigechengzi.com/)，分享软件开发经验和技术文章，提供 HOWUSE 前端组件库和橙汁云函数等实用工具。

如果您觉得该项目还不错，可以扫一下二维码捐赠。
<div style="display: flex; justify-content: space-around; align-items: center; margin: 20px 0;">
    <div style="text-align: center;">
        <img src="捐赠.png" alt="捐赠二维码" style="width: 200px; height: 200px;">
        <p>扫码捐赠支持</p>
    </div>
    <div style="text-align: center;">
        <img src="%E5%85%AC%E4%BC%97%E5%8F%B7.jpg" alt="公众号二维码" style="width: 200px; height: 200px;">
        <p>扫码关注公众号</p>
    </div>
</div>

## 技术选型

1. **打包工具**：采用 tsdown: https://tsdown.dev/zh-CN/guide/getting-started
2. **预览工具**：使用 vite 预览 playground: https://vitejs.dev/guide/
3. **开发框架**：支持 typescript + vue3
4. **组件输出**：项目可以打包并返回一个 vue3 组件
5. **命名规范**：插件名称必须是 metools-app- 开头
6. **导出格式**：index.ts 导出必须是以下格式

```typescript
export const info = {
    version: "1.0.0", // 版本号，引入package.json的version
    name: "微信封面生成器", // 中文必须修改
    enName: "WeChatCoverGenerator", // 英文名必须修改
    description: "微信封面生成器", // 描述，不小于10个字符。打包时引入package.json的description
    author: "公众号：一个橙子pro", // 作者，引入package.json的author
    icon: icon, // 应用图标，必须存在
}

export default 【vue3组件】
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 使用说明

### 基本操作

1. **选择风格模板**：从下拉菜单中选择喜欢的风格模板
2. **设置文案内容**：输入主标题、副标题、署名等信息
3. **调整样式**：设置字体大小、颜色等样式参数
4. **选择背景**：使用预设背景或自定义背景颜色
5. **预览效果**：实时查看封面生成效果
6. **导出图片**：点击导出按钮保存为PNG格式

### 风格模板说明

- **简约渐变（推荐）**：经典的渐变背景，适合大多数场景
- **左侧强调色块**：左侧有强调色块的设计，突出重点
- **图片背景+暗色蒙版**：支持自定义图片背景，带暗色蒙版效果
- **白色圆角卡片**：白色圆角卡片设计，文字显示在卡片内

### 预设背景

内置100+精美渐变背景，包括：
- 自然风景：夕阳、海滩、天空等
- 情感色彩：温柔、活力、神秘等
- 城市主题：科技、现代、简约等
- 季节主题：春夏秋冬不同季节的色彩

## GitHub部署与模板项目设置

本项目支持部署到GitHub并设置为模板仓库，方便其他开发者快速创建基于此脚手架的新项目。

详细部署指南请参考 [GITHUB_DEPLOYMENT.md](GITHUB_DEPLOYMENT.md) 文件。

您也可以通过以下命令获取部署指导：
```bash
npm run deploy:github
```

## 插件命名规范

当创建新的插件时，请确保：

1. 插件文件名必须以 `metools-app-` 开头
2. 在 `src/index.ts` 中正确导出插件信息
3. 插件信息包含完整的元数据（版本、名称、描述、作者、图标）

例如，如果创建一个名为 "天气预报" 的插件，文件名应为 `metools-app-weather.vue`。

## 注意事项

1. 打包时必须校验插件名称是否是 metools-app- 开头，否则将无法在 metools 平台中使用。
2. 打包时必须校验 export 信息是否完整。
3. 插件需要遵循 metools 平台的设计规范和交互要求。
4. 微信封面生成器支持多种风格模板和预设背景，确保用户体验的一致性。

## 更新日志

### v1.0.0
- 初始版本发布
- 支持多种风格模板
- 内置100+预设背景
- 支持自定义文字和样式
- 高清图片导出功能
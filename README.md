# Open TG Bot

这是一个 Telegram Bot 使用 grammY 开发框架的演示代码。

## 本地环境执行

'pnpm run run_dev' 运行本地热加载环境。

本地运行需要安装 nodemon ，同时 nodemon 依赖 ts-node。

```bash
npm install -g nodemon
npm install -g ts-node
```

## Command

配置到 bot 中，用于生成命令菜单。

> 备注：bot 代码中可以定义任意的命令而不注册到菜单中。

```bash
start - Start
pay - Pay with Stars
status - Status of Stars Payment
refund - Refund of Stars Payment
link - Generate a Invoice Link
```

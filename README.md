# dsh-design-flow

个人 UI 设计工作流的 DeepSeek Harness 原生插件（fork 自 [oil-oil/dsh-oil-ui](https://github.com/oil-oil/dsh-oil-ui)，MIT）。

## 组成

- **design-flow 技能**（主流程）：个人 ui-design-flow v3.0 全流程——grill-me 方案拷问 → 参考工程 → 设计系统落盘 → 实现 → 截图验收闭环；分册：灵感源矩阵 / 参考工程规范 / 模板 A·B·C / 评审手册
- **捆绑技能**：grill-me（方案拷问）、react-best-practices（Vercel React/Next.js 性能规则）
- **素材库**：84 份品牌设计系统 DESIGN.md 离线库（[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)，MIT），入口 references/design-md/INDEX.md
- **插件工具**（继承 oil-ui）：oil_ui_explorer（三方向同屏对比页）、oil_ui_shoot（真实截图/多端/多状态/录屏抽帧/程序化巡检）、oil_ui_media、oil_ui_image
- **子代理评审注入**：主 Agent 委派子代理复查时自动注入评审手册（oil-ui 手册 + design-flow 验收口径），子代理只出意见不改文件
- **快捷命令**：/design-flow-status · /design-flow-explore · /design-flow-review

## 与上游的差异

- 去联网化：不再核对 ui.oiloil.org 版本、无一次性 Pro 推销
- win32 修复：scopedPath 接受反斜杠路径（上游禁  导致 Windows 绝对路径全被拒）
- 命令与技能改名为 design-flow 前缀；主系统提示改为 design-flow 优先路由
- 上游 oil-ui 技能原样保留作为工具层（32 文件 manifest 校验不变）

## 安装

```bash
dsh plugin --profile desktop add <本仓库路径或 tgz>
```

构建：`pnpm install && pnpm pack:plugin`（产物在 .work/）。测试基线：45/58 通过，13 项失败均为 Windows 环境类（symlink 权限 / POSIX mode 位 / 路径分隔符断言），见 tests。

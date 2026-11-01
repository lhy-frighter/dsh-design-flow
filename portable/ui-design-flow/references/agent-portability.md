# Agent 能力适配与交接

本流程不要求特定模型、操作系统、CLI 或付费服务。SKILL.md 与 references 是指令；实际工具由宿主提供。遵守宿主权限与用户已有授权，技能文字不增加权限。

## 能力映射

| 工作 | DSH 中可能可用 | 其他环境 | 缺少时 |
|---|---|---|---|
| 读取技能与项目 | skill / read_file | 宿主文件工具、shell | 读得到的文件照常分析；不可访问项说明 |
| 提问 | AskUserQuestion 类工具 | request_user_input 或等价工具 | 普通对话；仍等待必须的真实回答 |
| 页面运行与操作 | oil_ui_shoot | 浏览器工具、Playwright、Puppeteer、项目测试 | 静态实现与检查继续，列未运行项 |
| 看图 | read_image | view_image 或宿主图片输入 | DOM/几何检查；不伪称已看图 |
| 风格对比 | oil_ui_explorer | 简单 HTML、草图、截图并列 | 文本/ASCII 比较结构，标未做视觉比较 |
| 素材 | oil_ui_media / oil_ui_image | 现有资产、获准的搜索/生图工具 | 合适占位并标注；不虚构来源 |
| 评审 | 获准的 subagent | 宿主允许的委派 | 同一 agent 依手册分两遍复核 |
| 像素变化 | compare 模式/项目基线 | 现有截图测试或人工对照 | 无基线时不报回归百分比 |

只有工具实际存在才调用；按当前 schema 使用，不复制别的 agent 的参数格式。不要自动安装浏览器、额外 skills 或改全局配置来补可选能力。需要新依赖时遵循项目规范与任务授权。

## 文件定位

链接相对当前 SKILL.md 或引用文件解析，不相对项目 cwd。插件版包含同级 design-flow、grill-me、react-best-practices 与 oil-ui。grill-me 可独立使用；设计流程在非 DSH 环境推荐用自包含的 portable/ui-design-flow，或复制 design-flow 与 grill-me 两个完整目录。

不要只复制一个 SKILL.md：题库和参考分册也属于技能。参考 skill 缺失时用内置流程，不假装已经调用 impeccable 或 ui-ux-pro-max。

便携版由 scripts/export-portable.mjs 从当前源文件生成，包含访谈协议、题库、审美与评审资料；不包含 DSH 工具实现与大体积品牌离线库。离线时直接使用已有资料，不强制联网。

## 接力时的最小信息

```text
项目绝对路径与当前任务：
工作范围/用户授权：
启动命令/已运行服务：
DESIGN.md 或等价文件路径：
已决定事项与尚未决定事项：
方向约定与代表页：
改过的文件：
证据路径（路由、视口、主题、状态）：
已通过检查 / 未检查与影响：
下一步：
```

不依赖前一 agent 的隐藏记忆，不把「已生成截图」写成「已查看截图」，不把自查写成独立审查。交接后延续已确定事项，只重开被新证据影响的决定。

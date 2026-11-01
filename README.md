# dsh-design-flow

## v0.3.1 / 流程 v5.1.0（2026-11-01）

补充原生视图/滚动转场、Rive、ECharts/D3、R3F/Drei、OGL 和 glTF Transform 的条件路由。新增资产可得性、复杂度/成本分级、模型保真优化和真实动效性能记录分册；保留现有技术与用户方向，不自动安装第三方依赖。DSH 与通用版共用源文件。


## v0.3.0 / 流程 v5.0.0（2026-11-01）

- 新增 Hallmark v2 方法适配分册：材料/任务驱动构图、分层质量复核与微交互；用户既定方向优先，不捆绑原项目主题或 lint 工具。
- 新增技术路由：把 grill-me 决定转为产物、触发/控制、渲染对象、精确度、环境和降级约束；主方案、备选与验证写入 DESIGN.md。
- 纳入用户提供的九项技术及 WebGL：实时交互、GPU 图形、程序化视频、生成式镜头分别选型，避免堆库与能力混淆。
- 增加高地笔记与多类路由示例、动效生命周期/中间状态/视频 seek 验收；便携版从同一来源生成并自动读取流程版本。
- 不自动安装任何外部动效库，不调用付费生成服务，也不重新发布已上架作品。


## v0.2.2 / 流程 v4.0.0（2026-10-28）

- 深度 grill-me：按目标、用户任务、范围、结构、审美、验收组织依赖；加入追问、反例、取舍与压力测试题库。保持默认一次一问，明确决定/建议/假设，不强制最低题数。
- 艺术方向与工艺分册：相同真实内容比较不同结构，先做代表页；排版、比例、色彩语义、材质、图像、动效与异常状态共同复核，取消默认玻璃和固定组件配方。
- 跨 agent：不再硬依赖 AskUserQuestion 或本机七个隐藏技能；工具缺失按实际能力继续。主 agent 自查与获准委派共用评审口径。
- 便携版：运行 `node scripts/export-portable.mjs`，生成自包含的 `portable/ui-design-flow`，包含访谈题库和所有核心参考分册；本地资源链接与文件 SHA-256 在导出时核验/记录。
- 校正证据边界：像素颜色不证明 DOM 遮挡原因，截图 diff 不以重设计归零为目标；区分热区产品目标与 WCAG 要求，不编造转化提升比例。

研究来源、采用内容与未沿用的规则见 [sources.md](skills/design-flow/references/sources.md)。本次保持 oil-ui 快照、React 规则集和品牌离线库原样。

个人 UI 设计工作流的 DeepSeek Harness 原生插件（fork 自 [oil-oil/dsh-oil-ui](https://github.com/oil-oil/dsh-oil-ui)，MIT）。

## 组成

- **design-flow 技能**（主流程）：ui-design-flow v4.0 全流程——grill-me 深度访谈 → 参考与艺术方向 → 设计系统 → 实现 → 真实页面评审；分册含艺术方向、题库、能力适配和研究来源
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

构建：`pnpm install && pnpm pack:plugin`（产物在 .work/）。测试基线（2026-10 win32）：57/58 通过、1 跳过（文件符号链接用例，Windows 普通权限无法创建）。目录符号链接在 Windows 自动降级 junction；ESM 动态导入统一转 `file://` URL；`Embedder.path` 已修复 `C:\` 盘符被误判为 URL scheme。

## v0.2.0 变更

- win32 真实 bug 修复：explorer 盘符误判、子代理手册路径分隔符、测试链 ESM/tar/symlink
- design-flow SKILL.md v3.1：新增「适用与不适用边界」「设计反模式清单（12 条）」「附录 F · 阶段输出与完成标准」；阶段 0 防腐基线补通用降级路径（stylelint / oil_ui_shoot compare / Playwright toHaveScreenshot）；阶段 5 验收口径补转化五要件与 i18n 三查
- 评审手册新增轨道三（落地页转化审查，借鉴 FluxonLab/Skillry）与轨道二 i18n 检查；灵感矩阵动效词汇补 motiontemplates/all
- 技能路径示例从本机绝对路径通用化为 `~/.dsh/skills/`

# ui-design-flow 便携版

自包含的 UI 设计/重设计技能（流程 v5.1.0），包含深度访谈、问题题库、艺术方向、实现与评审资料。

把整个 ui-design-flow 文件夹复制到宿主支持的 skills 目录，保留 SKILL.md、references/ 和 LICENSE。
例如项目的 .agents/skills/ui-design-flow/；具体发现路径以该 agent 的配置为准。
支持显式技能调用的宿主可输入 $ui-design-flow，或明确要求读取此目录的 SKILL.md。

示例：「用 ui-design-flow 改进这个应用。先深入澄清核心任务和我说的高级感，再做两个真实内容的方向对比，最后实现并验证。」

不需要 DSH、特定模型或额外设计技能。oil_ui_* 只是 DSH 可选能力示例，其他 agent 按能力映射继续；无浏览器/看图工具时明确未完成的验证。
不包含 DSH 工具实现、React 规则集或品牌离线库。完整目录可离线读取；外部链接是可选参考。

维护方式：在源仓库修改 skills/design-flow 与 skills/grill-me，运行 node scripts/export-portable.mjs；避免手改生成的副本。
manifest.json 记录生成文件的 SHA-256，用于核验跨目录/压缩包传输是否完整。

License: MIT。研究来源与采用边界见 references/sources.md。

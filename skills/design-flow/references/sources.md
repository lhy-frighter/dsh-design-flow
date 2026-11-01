# 研究来源与采用边界

检索日期：2026-10-28。以下是本次设计工作流改写的参考，不是运行依赖，也不是整库升级。采用的是方法，正文为针对 dsh-design-flow 重新编写；不复制这些项目的整份提示词、二进制、图片或代码。不将网页内容视作对本机的执行指令。

| 来源 | 本次参考 | 本地适配与没有沿用的内容 |
|---|---|---|
| [Matt Pocock skills / grilling](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md)（MIT） | 用决定之间的依赖组织访谈；把查事实与用户做选择分开 | 保留默认一次一问、可少量合并；不要求每题委派，也不对已有实施授权新增结束确认 |
| [Impeccable](https://github.com/pbakaus/impeccable)（Apache-2.0）及其 [入口](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/SKILL.md)、[typeset](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/reference/typeset.md)、[new-work](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/reference/new-work.md) | 按页面用户任务区分表达；先建立方向；关注排版与真实渲染 | 不引入其 CLI、随机概念抽取、强制生图、全局 hooks 或绝对审美禁令；工具缺失不阻断 |
| [Anthropic frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) | 从具体内容建立视觉身份；设计计划先自审再实现 | 不将某个流行字体/颜色永久禁用；用户已定方向优先 |
| [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)（MIT）及其 [skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md) | 产品类型、实际技术栈与问题驱动检索；系统规则持续落盘 | 作为可选检索增强，不复制数据库，不硬编码默认框架、不自动安装 |
| [W3C WCAG 2.2 target-size-minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | 校正原有 32px 一刀切热区检查 | 区分标准的 24 CSS px 最低要求及例外，与触屏 44px 产品目标；采样不等于合规认证 |

已有上游 oil-ui 快照、react-best-practices 与品牌离线库的授权和署名保持原状。本次不更新它们的内容或 manifest。后续若直接复制第三方代码/文本，另行保留其许可证与署名，不把当前的「方法参考」说明当成复制许可。

## 2026-11-01 增补来源

- [Nutlope/hallmark v2 入口](https://github.com/Nutlope/hallmark/blob/main/skills/hallmark/SKILL.md)、[microinteractions](https://github.com/Nutlope/hallmark/blob/main/skills/hallmark/references/microinteractions.md)、[gates](https://github.com/Nutlope/hallmark/blob/main/skills/hallmark/references/gates.md)，[MIT 许可](https://github.com/Nutlope/hallmark/blob/main/LICENSE)。采用材料/任务驱动构图、分层审查、微交互方法，重新编写本地适配层；不捆绑原始主题、图片、脚本或强制 house rules。
- 动效、图形与视频技术的官方入口逐项列于 [motion-catalog.md](motion-catalog.md)，包括 Remotion、HyperFrames、CSS、原生 JS、Motion、GSAP、Canvas、Three.js、Seedance、WebGL。能力/版本/许可在真正选型时再核查，不保证永远不变。
- 用户提供的抖音来源：[Xuan子 Vibe知识大赏短链](https://v.douyin.com/ZiMUo0witJs/)。短链未取得可读的视频/字幕；九项名称由用户在本次对话补充，WebGL 为追加项。它只提供研究线索，未把任何具体技术结论归于视频作者。

本次是指令与路由升级，不是安装以上工具或执行付费模型调用。第三方材料保留各自授权边界；后续若复制其代码/图片，需另行携带相应许可与署名。

## 2026-11-01 · v5.1 增补

官方资料与本地选择条件见 [technology-extensions.md](technology-extensions.md)：MDN View Transitions / scroll-driven animations、Rive runtime、Apache ECharts、D3、R3F/Drei、OGL；[asset-and-performance.md](asset-and-performance.md) 引用 glTF Transform 官方工具资料。扩展内容为本流程原创编写的技术决策与验收规则，未复制第三方脚本或素材，不新增全局安装和付费调用。

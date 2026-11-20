# 参考选择与 GitHub 挖掘

阶段 2 按当前问题选少量资料。方向开放、缺少视觉依据或用户明确要找参考时，使用下面的检索流程。已有明确方向时，用已确认参考验证待定细节。七维参考卡见 [reference-engineering.md](reference-engineering.md)。

## 灵感来源层

优先选与当前问题相符、Agent 可以匿名打开具体案例的来源。以下入口使用宿主已有的搜索、浏览器或文件能力。

| 需要解决 | 公开入口与检索方式 | 观察什么 |
|---|---|---|
| 用户任务和状态 | 项目现有路径、真实同类产品及公开演示。桌面工作台可先看 [shadcn Dashboard 演示](https://ui.shadcn.com/view/new-york-v4/dashboard-01)，移动端可查产品官方商店页的公开截图 | 入口、分组、反馈、恢复，不能只看首屏 |
| 构图和排版 | [Lapa Ninja](https://www.lapa.ninja/) 按行业、风格或页面区块筛选。[Siteinspire](https://www.siteinspire.com/) 按布局、排版和风格找案例，必要时打开原站 | 比例、主轴、层级、节奏和内容关系 |
| 组件实现 | [shadcn/ui Blocks](https://ui.shadcn.com/blocks) 看预览及源码。[Radix Primitives](https://github.com/radix-ui/primitives) 和项目已有组件用于核对交互实现 | 语义、键盘、状态、可维护性，不为外观重复引库 |
| 界面细节与动效 | [Animation Handbook](https://matinmonshizadeh.github.io/animation-handbook/) 按组件或动作查演示和参数。[Codrops GitHub](https://github.com/codrops) 查公开源码及对应演示 | 针对组件、触发和状态查找 |
| 过渡和连续性 | [Motion](https://github.com/motiondivision/motion)、[Vaul](https://github.com/emilkowalski/vaul)、项目现有动效 | 触发、打断、退出、性能和 reduced-motion |
| 设计系统 | 已有 DESIGN.md、内置 design-md/INDEX.md（插件版） | 少量匹配资料的规则；是分析参考，不是品牌使用授权 |
| 方向与审美方法 | sources.md 中的官方项目文件 | 适用条件和取舍，不复制所有规则到上下文 |

补充来源包括 [优设美地](https://allan.xin/)的公开预览和 [UI Notes](https://uinotes.com/pin) 的公开内容。遇到登录、会员、加载失败或摘要缺图时，按同一查询意图切换公开来源，或转到案例原站。官方商店图只作为页面视觉参考，任务流程要通过实操或录屏核实。

## 补充来源与用途

| 来源 | 适合解决的问题 | Agent 可用证据 |
|---|---|---|
| [OJO Design Skills](https://github.com/touchine-ojo/OJO-Design-Skills) | 按页面任务决定继承交互惯例或探索品牌表达 | 公开方法文档 |
| [Framer Gallery](https://www.framer.com/community/gallery/) · [Awwwards](https://www.awwwards.com/collections/) | 整页叙事、构图或实验性交互 | 公开案例图、原站可操作状态 |
| [Recent](https://recent.design/) | 品牌、排版和跨行业材质表达 | 公开作品及对应案例区域 |
| [Figma Community](https://www.figma.com/community/) · [Figma MCP](https://developers.figma.com/docs/figma-mcp-server/) | 组件、变体、原型与已确认稿 | 公开预览、有权限的设计节点或用户导出图 |
| [React Bits](https://reactbits.dev/) | 文本动效、交互反馈、背景处理 | 演示和对应源码 |
| [Thrine](https://thrine.app/) | 三维镜头、材质、灯光 | 公开模板。采用时另核实交付格式、访问条件和离线退路 |

## 从 brief 到候选案例

待定问题多时先用短表列 `页面/组件 | 需要决定什么 | 查询与来源 | 所需证据`。优先处理决定主任务、视觉主次或技术可行性的问题。

1. 从访谈提取「页面或组件、核心任务、气质、关键状态、排除项」，保留用户原话和已锁定的决定。先搜关键缺口，例如 `任务工作台 紧凑列表`（任务布局）、`editorial dashboard quiet typography`（构图排版）、`sidebar collapse content reflow`（交互状态）。质感词换成可见现象，例如「克制」对应细分隔线、低对比导航、内容主轴清晰。每条查询围绕一个问题，中英文按来源调整。
2. 按表选择一两个来源。有搜索工具时用站点限定配合具体关键词，例如 `site:siteinspire.com typographic portfolio`。只有浏览器时直接用分类、站内搜索或 GitHub 仓库列表。GitHub 演示失效时可读公开源码，将证据记为源码观察。离线时按 [agent-portability.md](agent-portability.md) 走附件或本地资料。`oil_ui_media` 用于真实照片、纹理和氛围素材，页面结构与交互参考走案例检索。
3. 看候选的实际页面、作品图或录屏。图库页面优先看作品预览本身。按问题相关性、证据完整度和启发差异挑少量案例，去掉重复引用同一原作的结果。搜索摘要只用于筛选。参考卡记录具体案例、演示或源码链接，以及已打开的页面状态。
4. 对开放的创意问题，可用一个同类案例解决任务布局，再用一处跨行业参考解决材质、叙事或构图。把各自的用途写进参考卡，再用本产品的真实内容做局部小样。关键问题已有可用观察时结束检索。

## GitHub 项目阅读顺序

1. 写明要解决的问题和机制关键词，例如「可打断的抽屉过渡」「密集列表键盘导航」，再搜索官方仓库。星数只用于发现，不能代替源码与质量判断。
2. 检查许可证、近期维护情况、目标平台、依赖体积和运行要求；时间敏感信息当次核查，不把本文件当最新版本表。
3. 阅读实际组件/样式/测试和可运行示例，确认截图效果由什么实现；README 宣传不构成复用证据。
4. 对比沿用现有组件、提取薄层技法、引新库的成本，优先满足当前项目。未授权不复制商用资产、不运行未知安装脚本。
5. 形成参考卡：问题、来源、实际看到了什么、借用机制、放弃什么、成本和验证方式。不能访问时标未核验，用已有材料继续。

浏览器兼容、授权、API 和性能不能从项目名称推断。特别是玻璃、SVG 滤镜、WebGL 等效果，目标浏览器和真实硬件都可能需要降级。

# 灵感源矩阵与参考挖掘法

> 主流程阶段 2 的配套分册。参考卡入库与七维拆解纪律见 [reference-engineering.md](reference-engineering.md)。

## 1. 灵感源矩阵（按用途选用）

- **画廊/灵感**（找布局节奏与模式，不抄视觉）：Mobbin（真实产品全流程截图，最有价值：看完整用户路径而非单帧）· Landdding（落地页每日精选+社区投票）· Dribbble/Behance（单帧视觉，多为不可实现 concept）· Lapa.ninja/Landingfolio（落地页分类集）· Muzli（趋势速览）
- **组件/模板**（直接借结构）：shadcn/ui（基础件事实标准）· ThreeUI Community（103 个 Three.js 程序化组件，注意 GPU 争用）· Webflow Templates / Modulify（整页模板与区块拼装思路）· ui-ux-pro-max 内置检索
- **动效**：Motion（motion.dev，原 Framer Motion，React 动效原语）· emilkowalski 动效教程与 Vaul（抽屉手感基准）。准则：动效只解释状态变化，reduced-motion 必须降级
- **AI 生成**（快速出方向，不直接抄产物）：Modulify（prompt→Webflow 站）· v0.dev（prompt→React 组件）· VEKTR（自然语言概念设计）
- **品牌设计系统（本插件离线库）**：[INDEX.md](design-md/INDEX.md)——84 份知名品牌 DESIGN.md（Apple/Airbnb/Notion/Linear/Stripe 等，色板/字体/间距 tokens 结构化抽出）。用法：按产品气质挑 1–3 个品牌 → 读对应 DESIGN.md → 走七维拆解标注继承/改造/舍弃。**tokens 是分析不是授权复制**，红线同下
- **待确认**：EPOCH / Verona 未定位到确切站点，让用户补 URL/截图后再纳入

## 2. GitHub 项目挖掘法

按"技法"而非"组件"挖：看到好效果 → 找实现机制 → 判断自研成本 → 决定引库或提取技法。路径：GitHub topic 搜索（如 `topic:liquid-glass`）→ star 排序 → **读 src 而非 README** → 检查许可证与平台兼容（Electron Chromium 对 backdrop-filter/SVG 滤镜完整支持；Safari/Firefox 需降级）。案例：liquid-glass-react = SVG feDisplacementMap + backdrop-filter + 高光边 + 弹性跟随，可提取为纯 CSS/薄层自研；ThreeUI = 程序化组件的目录组织与变体控制。

## 3. 灵感源速查（一行版）

Mobbin · Landdding · Dribbble/Behance · Lapa.ninja/Landingfolio · Muzli · shadcn/ui · ThreeUI · Webflow Templates · Modulify · v0.dev · VEKTR · Motion（motion.dev）· **design-md 离线库（[INDEX.md](design-md/INDEX.md)）** · EPOCH/Verona（待确认 URL）· **用户抖音/小红书收藏夹**（走 [reference-engineering.md](reference-engineering.md) §短视频入库）

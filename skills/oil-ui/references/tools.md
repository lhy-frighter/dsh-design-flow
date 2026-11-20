# 工具

所有路径相对于当前工作目录解析。查看图片用 `read_image`，派发独立视觉评审用 `subagent`。
## 截图和录屏

### 什么时候截，截多少

截图分两种用途，不要混在一起：

- **看一眼**：改完一批，想看效果。只截当前这一屏，一次 `oil_ui_shoot` 调用。把一批改动攒在一起改完再截，不是每改一处截一次；页面没有变，就不重复截。
- **取证**：送评审或交付前保留标准视口图。跨设备响应式任务用 `--size desktop,mobile`（1440×900、390×844）；明确只做手机或桌面时只取那一端。按需带一两个代表交互态，用 `--steps` 走真实操作；页面本来就读查询参数时才用 `--states`，不为截图给页面加 `?state=` 路由。长页才加 `--full`（`fullPage: true`）；页面不适合截整页时工具会提示，照提示改截视口。比较状态加 `--sheet`，遮字加 `--mask`；方向预览每个只截首屏。

动效默认用 `--frames` 生成带时间的序列图，或让评审者打开页面直接操作。只有确实要判断正常速度下的手感、且评审能播放视频时才用 `--record`，不为交付而录屏。确实需要整套证据时用 `--evidence --frames <帧数>`；满足上述录屏条件才加 `--record`。

每一轮评审只重新取这一轮改动影响到的证据。没有动过的状态和动效，沿用上一轮的文件，交接时注明哪些是沿用的；拿不准有没有被影响到，例如改了共享样式，就重取那一项。评审者只提出扩大覆盖、却说不清哪条判断缺少依据时，不补图也不加一轮。

### 常用调用方式（`oil_ui_shoot`）

`oil_ui_shoot` 对工作目录内的本地 HTML 文件（包括子目录如 `explore/a.html`）会自动通过工作区根目录的本地 HTTP 服务打开，`assets/...`、`../assets/...` 与 `?state=...` 地址参数都能直接解析，无需自己起静态服务器。

| 要什么 | `oil_ui_shoot` 参数 |
| --- | --- |
| 看一眼桌面效果 | `{ "target": "index.html", "size": "desktop", "out": "shots/desktop.png" }`（不传 `size` 默认 `1440x900`；支持 `desktop`、`mobile`、`1440x900,390x844`；只看整体版式可加 `"thumb": true`） |
| 一次截完多个候选并出并排图 | `{ "target": "explore", "size": "desktop", "thumb": true, "out": "shots/explore" }`（也可传 `["explore/a.html", "explore/b.html", "explore/c.html"]`，同一次浏览器会话截完并自动出 `sheet.png`） |
| 只看改过的局部组件或区域 | `{ "target": "index.html", "size": "desktop", "selector": ".card", "out": "shots/card.png" }`（自动滚入视口并只截该元素区域） |
| 操作几步再截 | `{ "target": "index.html", "size": "desktop", "steps": "click .open; wait 300", "out": "shots/open.png" }` |
| 按地址参数切多状态连拍 | `{ "target": "index.html", "size": "desktop", "states": ["idle", "done"], "out": "shots" }`（状态参数名默认 `state`，可用 `param` 修改；额外查询串用 `query: "a=1&b=2"`） |
| 送评审或交付前取证 | `{ "target": "index.html", "size": "desktop", "evidence": true, "states": ["idle", "done"], "steps": ["send: click .send"], "out": "evidence" }` |
| 2 倍高清截图（@2x） | `{ "target": "index.html", "size": "desktop", "zoom": 2, "out": "shots/desktop-2x.png" }`（或 `zoom: "1,2"`） |
| 落地页录一段从头滚到底 | `{ "target": "index.html", "size": "desktop", "record": true, "steps": "scroll 600; scroll 600; scroll 600", "out": "evidence" }` |
| 截图还原：和参考图比对 | `{ "target": "index.html", "size": "1440x900", "compare": "refs/target.png", "out": "shots/compare.png" }` |
| 给元素画框、标编号 | `{ "target": "index.html", "size": "desktop", "mark": "1=.page-head .btn; 2=.toggle-row", "fullPage": true, "out": "shots/marked.png" }` |
| 看清一段过渡序列帧 | `{ "target": "index.html", "size": "desktop", "record": true, "frames": 8, "steps": "click .open", "out": "evidence" }` |
| 把几张图拼成一张对比图 | `{ "stitch": [{ "path": "shots/a.png", "label": "修改前" }, { "path": "shots/b.png", "label": "修改后" }], "out": "shots/stitch.png" }` |

状态靠地址参数进入，所以页面要能用 `?state=<名字>` 直接打开每个状态。`steps` 动作写法（分号分隔）：`click <选择器>`、`hover <选择器>`、`dblclick <选择器>`、`waitfor <选择器>`、`drag <选择器> <dx> <dy>`、`type <选择器> <文字>`、`fill <选择器> <文字>`、`select <选择器> <值>`、`key <按键>`、`scroll <dy>`、`wait <毫秒>`。

### 检索和下载真实素材（`oil_ui_media`）

需要真实材质贴图、设计器物、历史摄影、工程测绘图、古地图、科学版画或 NASA 视频时，调用 `oil_ui_media`：

- **一步检索并下载（默认）**：
  `oil_ui_media({ "query": "oak planks | belgian oak", "kind": "photo", "limit": 6, "use": "page", "dir": "assets/media", "sheet": true })`
- **分步检索 / 预览 / 按编号拉取**：
  1. 搜索并生成候选联系表：`oil_ui_media({ "action": "search", "query": "wood", "kind": "texture", "limit": 6, "sheet": true, "dir": "candidates" })`
  2. 用 `read_image` 查看返回的联系表 PNG，挑选编号后拉取：`oil_ui_media({ "action": "fetch", "refs": ["C1", "T2"], "dir": "assets", "sheet": true })`
  3. 拉取完整 PBR 贴图（Diffuse / Roughness / Normal）：`oil_ui_media({ "action": "fetch", "refs": ["T2"], "maps": "all", "resolution": "1k", "dir": "assets" })`

`kind` 支持 `all|texture|design|photo|blueprint|map|plate|science|video`。每项 `use` 说明用途：`page` 可放进页面（CC BY/BY-SA 要署名），`reference` 只可下载到不上线的目录作为生图参考。单个 URL 下载可用 `oil_ui_media({ "action": "fetch", "refs": "https://example.org/image.jpg", "out": "assets/image.jpg" })`；单文件下载不传 `dir`，输出路径不可覆盖已有文件。所有成功下载自动记入 `SOURCES.md`。

### 生图与改图（`oil_ui_image`）

当 `oil_ui_skill_status` 显示 `imageGenAvailable: true` 时，调用 `oil_ui_image` 生成或编辑图片：

- **文生图（`mode: "generate"`）**：`oil_ui_image({ "prompt": "...", "out": "assets/hero.png", "size": "1536x1024", "quality": "high" })`
- **透明底抠图（`background: "transparent"`）**：`oil_ui_image({ "prompt": "...", "background": "transparent", "out": "assets/cutout.png" })`
- **基于参考图的图生图 / 同模多材质变体（`mode: "edit"`）**：传入 1–16 张本地参考图（如先生成原色器物，再派生烟熏、绿锈等表面，保持角度与光影一致）：`oil_ui_image({ "mode": "edit", "images": ["assets/raw.png"], "prompt": "...", "out": "assets/variant.png" })`

### 组装风格对比页（`oil_ui_explorer`）

写好三个候选首屏（如 `explore/a.html`、`explore/b.html`、`explore/c.html`）后，调用 `oil_ui_explorer({ "manifest": "explore/manifest.json", "out": "style-explorer.html" })` 即可生成内嵌全部本地资源的独立对比页。
### 看结果

交给评审前先自己看一眼：默认状态是不是已经加载完，遮字版有没有把图形也一起盖掉。证据有错先重截，再交给评审。汇总里提示录屏或序列图和截图不一致时，静止的终态以截图为准，再单独查看那一段操作或补序列图核对过渡。序列图能判断状态与变化，不能据此宣称正常速度下的手感已验证。画面是空的 WebGL 截图不能当证据。

截图和取证优先用这里的截图工具。确实要自己写浏览器脚本（例如 Puppeteer 或 Playwright）时，启动参数加 `--use-mock-keychain --password-store=basic`，并用临时的用户数据目录；否则在 macOS 上会反复弹出钥匙串授权窗口，打断用户。

标准截图写入 `report.json.lint` 的提示（`--thumb` 跳过），逐条改掉：

- **文字对比度不达标**：14px 以下的小字和输入框占位文字 <4.5:1，其他文字和有值的文本控件 <3:1，大字 <2.5:1。真实底色含伪元素底板；图片/视频/canvas/背景图/渐变不明则跳过。
- **文字小于 11px**：可见文字 ≥2 字符及启用态文本控件；sup/sub、SVG、transform 缩略容器除外。字号 ≤0px 或普通文字无面积，跳过小字/对比度；隐藏/禁用/非文本输入控件不查。
- **多行正文行高过紧**：正文含中文 ≥30 字，否则 ≥60 字符，且高 ≥1.8 行；行高中文 <1.4 倍字号、英文 <1.3 倍时提示。
- **首屏有内容停在透明状态**：出场动画可能未触发。
- **手机上输入框字号小于 16px**：视口宽不超过 480px 时，启用态文本控件字号 <16px，聚焦时 iOS 会自动放大页面。
- **用边框分组过多**：首屏有 4 块以上各自加框的卡片，或一块加框的卡片里又有 2 个以上加框的小块（不算输入框、表格、图片和浮层）。先用留白、对齐、字号和底色分组，框只留给可点的整块卡片、输入框和需要浮起的面板。
- **弹窗的操作按钮不在视口内**：打开着的弹窗里有表单或输入控件，而它的提交按钮或最后一个按钮在视口外、或被弹窗内部的滚动区裁掉，要滚动才够得着。带 `--steps` 把弹窗打开再截才查得到。

根宽 >视口+2px 且 html/body 均非 `overflow-x:hidden/clip` 时，`issues` 单报“横向溢出：页面宽 Xpx，视口 Ypx”及最多 3 个可见越界元素/超出 px；裁切出血、未撑宽根文档的局部轮播除外。

清零后仍看截图；401/404 等非画面问题记入交付，不改业务代码。

## 写可操作的小样

方向探索阶段的首屏不做交互，用不到这一节；选定方向后做完整页面时再用。存量项目优先沿用已安装的组件库、图标库、样式体系与技术栈。新建项目按用户约束、技术栈和主要交互选择组件基础，原生控件、轻量基础组件或完整组件库均可，不强制引入完整库；已有工程或交付约定优先于下面的独立 HTML 小样做法。

独立小样不额外引入构建链，用原生脚本或轻量库实现真实的筛选、切换与详情交互。正式入口 HTML 的本地依赖放到同目录的 `vendor/` 再引用，过程小样及其依赖才放任务目录。

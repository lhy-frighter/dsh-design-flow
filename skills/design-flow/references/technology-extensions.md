# 原生转场、状态机、数据与三维扩展

按 [technology-routing.md](technology-routing.md) 的需求分支选读，不一次引入所有库。下述技术为视频名单以外的补充；它们不自动替换现有框架、品牌或可行实现。官方入口核查于 2026-11-01，实际 API、兼容与许可在项目引入时重新确认。

## 1. 原生跨视图与滚动

### View Transitions API

用于视图更新时的连续性、列表到详情、共享元素过渡。先区分同文档 DOM 更新与跨文档导航，两者启用方式和支持范围不同；检测项目需要的具体能力，而非只检测一个名称。

- 保持业务状态和 DOM 更新流程为真相，动画只是增强。API 不可用、过渡被跳过或失败时，状态更新仍应正确执行且只执行一次。
- 共享元素名称需要正确配对和唯一性；不能为动画复制出两个可操作按钮，也不能让覆盖快照挡住焦点或交互。
- 异步数据应明确过渡何时开始；不要为了等待图片把整个页面锁住。避免与 GSAP/Motion 同时驱动同一区域的位移。
- 复核连续点击、后退、路由错误、尺寸变化、reduced-motion 以及动画结束后的焦点。

官方：[View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)。

### CSS 滚动驱动动画

适用于进度、简单视差和元素随滚动区间变化。选择正确滚动容器与 scroll/view timeline，核查 animation-timeline、range 等实际用到的能力。复杂多段时间轴、跨对象联动或现有 GSAP 项目可继续使用已有方案。

- 渐进增强：不支持时保留静态内容和正常滚动。不要初始隐藏正文后依赖不受支持的动画显示。
- 以原生滚动为基础，键盘、锚点、页面查找和触摸仍能使用；不为动画拦截所有滚轮。
- 验证短页面、动态内容高度、嵌套滚动和缩放。简单效果不必同时加滚动 JS 监听器。

官方：[CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)。

## 2. Rive 状态机动画

适合角色、交互插画和多状态图形，需要已有或能够制作的 .riv 资产。它不是让 agent 仅靠一段 JS 自动得到任意复杂角色的承诺。

先过 [asset-and-performance.md](asset-and-performance.md) 的资产检查：文件可得、状态机/输入或数据绑定契约可核实、runtime/renderer 支持所需功能、WASM/字体/图片等外部资源有加载策略。没有资产或制作条件时，优先给 DOM/SVG/CSS 状态方案。

- 记录业务状态到动画状态的映射，业务成功不由动画是否播放决定；失败可回退，快速触发能中断。
- 画布中的可点击对象提供可访问的 DOM 控件或等价操作；说明当前状态，不能把键盘路径藏在画布中。
- 检查容器 resize、DPR、暂停恢复、卸载 cleanup 与资产加载失败；减少动效时保留状态信息。
- Lottie 用于适合的现有导出动画播放，Rive 用于适合的状态响应。按资产和控制要求选，不强制两者共存。

官方：[Rive Web runtime](https://rive.app/docs/runtimes/web/web-js)。具体状态机/数据绑定 API 以所装版本文档为准。

## 3. 数据可视化：ECharts / D3

先确认用户要回答的问题、字段/单位/缺失值与比较关系，再选图。信息不需要比较时，用文字/表格即可，不能为视觉丰富制造无意义图表。

| 选择 | 适用 | 代价 |
|---|---|---|
| 现有图表组件 | 项目已有且满足任务 | 保持语义色、交互和数据格式一致 |
| ECharts | 标准图表、常规仪表板、筛选联动 | 按需加载，确认 renderer、尺寸与主题；不用默认配置冒充完成设计 |
| D3 | 特殊数据编码、关系/地理/布局、定制数据叙事 | 自行承担坐标、交互、可访问性和更新逻辑；不默认所有图都用它 |

- 交付数据契约：来源、真实/演示属性、单位、时间范围、排序与异常值规则。不能用动画掩盖数值变化或误导比例。
- 空数据、加载失败、长标签、负值/极值、过滤与高密度都按任务验证。
- 为颜色/hover 提供其他识别方式；必要时给可阅读摘要、数据表或键盘等价。tooltip 不能是获取重要数据的唯一路径。
- React 等框架与 D3 不应同时拥有同一 DOM 子树；选择一个负责更新。ECharts 的 resize/dispose 和事件清理按实际生命周期完成。

官方：[ECharts](https://echarts.apache.org/handbook/en/get-started/) · [D3](https://d3js.org/what-is-d3)。

## 4. 三维项目的条件扩展

### React Three Fiber + Drei

仅在项目使用 React 且需要组件化三维时评估。R3F 是 Three.js 的 React renderer，Drei 提供相关辅助组件；检查 React、R3F、Three.js 与 Drei 兼容组合，不硬编码版本对应表。纯 HTML/Vue 项目不为它迁移到 React。

逐帧变化用适合的渲染循环/引用更新，不每帧触发整页 React state；对 controls、材质、模型缓存和共享资源确认所有权。不能假设挂载组件后所有外部纹理/监听器自动释放。

官方：[R3F](https://r3f.docs.pmnd.rs/getting-started/introduction) · [Drei](https://github.com/pmndrs/drei)。

### OGL 与更底层渲染

OGL 可作为轻量 WebGL 抽象用于特定 shader/单一效果。在项目已有 Three.js 且能满足目标时不为追求轻量再引第二个引擎。手写 WebGL/OGL 的 shader、尺寸、输入、纹理与上下文恢复需要明确维护者。

WebGPU、物理引擎、复杂后期处理保留为具体需求触发的专项，不按默认列表安装。引入前确认目标设备、确实需要的能力、性能小样与降级成本。

官方：[OGL](https://github.com/oframe/ogl)。

## 5. 场景走查

| 场景 | 路由与成功条件 |
|---|---|
| 咖啡豆到档案 | 先评估现有 DOM 转场或原生 View Transitions；连续点击与返回不重复更新状态 |
| 页面滚动展示处理步骤 | 简单进度用原生滚动增强，复杂相机编排按现有方案；静态/键盘仍能看全工序 |
| 咖啡讲解角色 | 有可用 Rive 资产才接状态；没资产时给简化交互，不承诺即时生成角色 |
| 四支豆的风味比较 | 先明确比较尺度与演示属性，再选表格/常规图表/特殊表达；不因已有雷达图就默认采用 |
| 处理站进入 React 应用 | 按框架兼容决定 R3F/Drei；不改变已明确的三维体验和信息结构 |
| 单个背景液体 shader | 有需求才比较 OGL/已有引擎；保留静态背景与 DOM 内容，不成为业务前置依赖 |

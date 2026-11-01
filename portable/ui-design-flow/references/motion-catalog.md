# 动效技术目录与约束

2026-11-01。九项名称由用户根据抖音分享补充：Remotion、HyperFrames、CSS、原生 JS、Motion、GSAP、Canvas、Three.js、Seedance；用户另补 WebGL。未取得视频或字幕，本表基于各自官方资料编写，不代表已观看视频，也不还原作者的排序或结论。

| 方案 / 官方资料 | 首选场景 | 成本与边界 | 退路/验证 |
|---|---|---|---|
| [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations) | hover/focus/展开、简单转场、有限装饰循环 | 最少运行依赖；transition 指定属性；布局属性并非一概禁止，但先确认重排成本；原生新能力需查目标支持 | 无动画最终态仍可用；reduced-motion；不能隐藏真实溢出 |
| [原生 JS / WAAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) | 控制播放/取消/反向、事件与状态、requestAnimationFrame 绘制、少量编排 | JS 是通用编程手段，不是独立动画库；读取/写入布局分批、时间用 delta 而非帧计数，移除监听/观察器 | 取消后状态一致；隐藏页/销毁后不泄漏；无 JS 时保留必要内容 |
| [Motion](https://motion.dev/docs) | 框架组件进出、布局变换、拖拽与弹簧；也有 JS/Vue 等入口 | 按项目框架和已有版本选 API，不默认为 React、不混用旧 framer-motion 示例 | 重复进出、卸载与初次渲染、手势和键盘等价 |
| [GSAP](https://gsap.com/docs/v3/) | 多元素时间轴、滚动叙事、SVG 编排、对象数值与相机控制 | 只在复杂编排有收益时引入；ScrollTrigger/Flip 等按需；版本和使用许可当次核查 | 清理 timeline/trigger，断点重建与取消；不劫持必要滚动路径 |
| [Canvas 2D](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) | 程序化树、二维绘图、少中量粒子和纹理 | Canvas 是绘图载体，2D 与 WebGL context 区分；大量对象/高 DPR 会增加 CPU/显存成本；文字无自动 DOM 语义 | 提供 DOM 操作/说明，限制 DPR，重绘策略和尺寸变化实测 |
| [Three.js](https://threejs.org/docs/) | 三维建筑/商品、相机、光照、旋转和 raycast | 引擎/资产/GPU 成本；附加 controls 与引擎版本匹配；WebGL 等后端按实际版本核对 | 最小设备/触控小样、相机限制、资源 dispose、无 GPU 静态场景+DOM 列表 |
| [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) | 大量 GPU 粒子、定制 shader、特殊渲染管线 | 底层 API，通常通过引擎使用；shader/纹理/缓冲/context 生命周期维护高；不是高级视觉的默认选择 | 能力检测、context 恢复或降级、显存与帧时间；不能把 WebGPU 支持当成 WebGL 支持 |
| [Remotion](https://www.remotion.dev/docs/) | React 驱动、数据模板化和可重复渲染的视频/动态图文 | 需可渲染工具链与媒体；Player 可以交互预览，但成片不具备任意网页业务状态；核查适用许可 | 时间由 frame/fps 推导；关键帧、seek 和导出成片检查 |
| [HyperFrames](https://github.com/heygen-com/hyperframes) | HTML/CSS/媒体/可定位时间轴制作产品介绍、字幕与演示成片 | 与网页共用技术不意味着网页直接可当视频；需渲染环境/媒体工具，按实际 CLI 版本执行 | 有专用 skill 时按需读取；构图先定最终态，lint/inspect/预览/导出；无环境不伪报已渲染 |
| [Seedance](https://seed.bytedance.com/en/seedance) | 文/图等输入生成氛围、场景与叙事镜头素材 | 生成式视频模型；不保证逐像素 UI/文字/动作可控；需可用服务与授权，不虚构 API、免费额度或版本上限 | 小样与一致性检查、后期加准确字幕/数值；素材不可用时用已有授权视频/静态海报 |

可选扩展只在已有输入需要时采用：[Lottie](https://github.com/airbnb/lottie-web) 适合已有动画资产的播放；[Rive](https://rive.app/docs/runtimes/web/web-js) 适合已有/可制作状态机动画资产；[Spline](https://docs.spline.design/) 适合可获得编辑/导出资产的可视化三维制作。它们不替代先确认资产、工具、许可和交互要求，也不是本次视频名单中的已确认项目。

叠加原则：网页语义 DOM 为业务层，Canvas/Three.js 为图形层，GSAP/Motion 为可选驱动层，Remotion/HyperFrames 为视频制作层，Seedance 为素材生成层。同一属性只由一个系统控制，既有方案能完成就不追加同类库。

## v5.1 条件扩展入口

按 [technology-extensions.md](technology-extensions.md) 的具体分支执行：

| 补充能力 | 进入条件 | 必查边界 |
|---|---|---|
| View Transitions API | 视图切换或共享元素连续性 | 具体能力检测、跳过/失败时单次更新、焦点与连续操作 |
| CSS scroll-driven animations | 简单滚动进度/视差 | 不支持时内容可见；真实滚动、嵌套容器与动态高度 |
| Rive | 可取得/可制作状态机动画资产 | .riv、输入/数据绑定、runtime/WASM、DOM 等价和清理 |
| ECharts / D3 | 有明确数据比较/探索任务 | 数据契约、异常数据、语义/操作、DOM 所有权 |
| R3F / Drei | React 项目的组件化三维 | 版本组合、逐帧更新与资源所有权，不为库迁移框架 |
| OGL | 确有独立轻量 shader/WebGL 需求 | 与已有引擎比较、context/纹理生命周期和降级 |
| glTF Transform | 已有 glTF/GLB 模型需要优化 | 原始副本、解码器支持、节点/材质/拾取保真与实测 |

资产生产、成本和运行证据按 [asset-and-performance.md](asset-and-performance.md) 处理；只加载实际选中的分支。完整官方链接在扩展分册中维护。

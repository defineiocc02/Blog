# 项目与资料导航

研究项目按规格和验证层级组织。指标必须与配置和原始证据一起阅读，仓库体积与测试通过不能替代科学验证。

## 研究与工程

| 项目 | 内容 | 证据状态 |
|---|---|---|
| [20 位 SAR 行为与数字实现](https://github.com/defineiocc02/20bit_SAR_ADC_Behaviour_Verification) | 两级残差架构、来源分级、定点与 RTL | 行为/数字证据；芯片参数仍含假设 |
| [12 位失配校准模型](https://github.com/defineiocc02/Behavioral-modeling-of-12bit-calibrated-sar-adc) | 失配、前景校准、Python 与 RTL | 通过率受模型和阈值限定；正常转换零噪声 |
| [16 位数字后端审计](https://github.com/defineiocc02/SAR16_Digital_Backend_Signoff) | 网表、版图、时序与交付证据 | LVS、hold、DRC 仍有未闭合项 |
| [SAR 数字处理与验证](https://github.com/defineiocc02/Digital_process.srcs) | 校准控制、重构、历史 RTL 归档 | 频谱口径已修复；历史报告需重算 |
| [MATLAB 残差算法比较](https://github.com/defineiocc02/SAR_ADC_Verification) | MLE、BE 等算法与频谱分析 | 数值检查已通过；完整实验待重跑 |

## 上游工具的个人 fork

| 工具 | 上游 |
|---|---|
| [ADCToolbox](https://github.com/defineiocc02/ADCToolbox) | [Arcadia-1/ADCToolbox](https://github.com/Arcadia-1/ADCToolbox) |
| [virtuoso-bridge-lite](https://github.com/defineiocc02/virtuoso-bridge-lite) | [Arcadia-1/virtuoso-bridge-lite](https://github.com/Arcadia-1/virtuoso-bridge-lite) |

工具著作权与许可保留上游信息，个人增量见各仓库提交记录。

<details>
<summary>学习资料与书籍代码</summary>

- [d2l-zh](https://github.com/defineiocc02/d2l-zh) — fork 自 [d2l-ai/d2l-zh](https://github.com/d2l-ai/d2l-zh)。
- [Deep_Learning_Foundation_and_Concepts-Springer](https://github.com/defineiocc02/Deep_Learning_Foundation_and_Concepts-Springer) — fork 自 [BreCaspian/Deep_Learning_Foundation_and_Concepts-Springer](https://github.com/BreCaspian/Deep_Learning_Foundation_and_Concepts-Springer)。
- [goossens-book-ip-projects](https://github.com/defineiocc02/goossens-book-ip-projects) — fork 自 [goossens-springer/goossens-book-ip-projects](https://github.com/goossens-springer/goossens-book-ip-projects)。
- [Hands-On-Large-Language-Models](https://github.com/defineiocc02/Hands-On-Large-Language-Models) — fork 自 [HandsOnLLM/Hands-On-Large-Language-Models](https://github.com/HandsOnLLM/Hands-On-Large-Language-Models)。

</details>

## 阅读与复现

- [统一仓库规范](https://github.com/defineiocc02/defineiocc02/blob/main/REPOSITORY_GUIDE.md)
- [本轮审查与改进路线](https://github.com/defineiocc02/defineiocc02/blob/main/REVIEW_20261002.md)

各项目 README 给出当前证据、依赖、复现入口和未闭合项。许可按文件及上游实际声明判断，不用一个通用标签概括全部材料。

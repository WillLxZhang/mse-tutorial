---
hide:
  - toc
---

# 具身智能 { .section-page-title }

> [专业方向](../../majors-and-directions.md)

<div class="article-box" markdown="1">

具身智能是这几年最火的方向之一，身在机械大家也或多或少会从机器人瞥见这个领域的一二。

阅读此篇前推荐先阅读 [AI 与 Vibe Coding](../research/vibe-coding.md) 篇，建立对人工智能的基础认知。

网上关于具身智能学习路线的教程已经有很多，均由高水平从业者开发。本文仅仅帮助大家建立粗略认知，具体技能学习大家可参考：

- [具身智能技术指南 Embodied-AI-Guide](https://github.com/TianxingChen/Embodied-AI-Guide)
- [面向小白的具身智能入门指南](https://github.com/jiangranlv/embodied-ai-start)
- [EsCommune 文档](https://escommune.readthedocs.io/en/latest/)
- ...

(PS：入门前请先把 linux 基本概念、基本用法，机器人学基本概念，还有 git 等代码管理技能搞清楚，加上 Vibe Coding，相信你能做成你想做的任何事)


</div>

## 一、什么是具身智能？

<div class="article-box" markdown="1">

上一篇里，我们可以通过 Vibe Coding 让 AI 通过代码操作电脑。那它的这双手是否能伸到现实世界中呢？试想一台机器人，我让它干什么它就能干什么，比如让它帮我把桌上的杯子拿过来？

可以先回想自己拿杯子的过程：看见杯子，伸手靠近，握住，再拿起来。杯子有点滑，你会握紧一些；杯子被别人挪走了，你会跟着调整手的位置。

这个过程中，你的眼睛在获取信息，大脑在决定怎么做，身体在执行动作。动作又改变了你看到、摸到的东西，接着影响下一步怎么做。

**由此，我们可以先把具身智能理解为：智能体借助身体与环境交互，在感知和行动的循环中完成任务。**

机械臂、轮式机器人、人形机器人...太多的载体都可以承载这套过程，我们也可以在仿真环境中研究这些能力。这是一个百花齐放的领域。

</div>

<div class="article-box" markdown="1">

继续深入，**上一篇里“把模型理解为函数”的说法在这里同样适用**

设想一个末端装有摄像头的夹爪机械臂，我们先看看下面这个式子：

$$
a_t=\pi_\theta(o_t,g)
$$

$o_t$ 是机器人在时刻 $t$ 获得的观测，即相机画面；$g$ 是人告诉它的目标，比如“拿起杯子”；$a_t$ 是这一步要执行的动作。$\pi_\theta$ 叫作**策略（Policy）**，可以理解为“根据当前情况决定下一步怎么做”的规则或模型。

机器人执行动作之后，会获得新的观测，再决定下一个动作：

$$
o_t\xrightarrow[\text{目标 }g]{\text{策略}}a_t
\xrightarrow{\text{机器人执行}}o_{t+1}
\xrightarrow{\text{再次决策}}a_{t+1}
$$

**按照一个一个时间点去组织，感知、行动、再感知，是一个不断循环的过程。**


</div>

## 二、具身智能的技术栈

<div class="article-box" markdown="1">

这个领域可以大致细分如下：

```text
Embodied Intelligence（具身智能）
├── Perception & Spatial Representation（感知与空间表征）
│   ├── Visual & 3D Perception（视觉与三维感知）
│   ├── Tactile & Proprioceptive Sensing（触觉与本体感知）
│   ├── Multimodal Fusion（多模态融合）
│   └── Localization, Mapping & Scene Understanding（定位、建图与场景理解）
│
├── Embodied Reasoning & Planning（具身推理与任务规划）
│   ├── VLMs & Affordance Reasoning（视觉语言模型与可供性推理）
│   ├── Long-Horizon Planning & Memory（长程任务规划与记忆）
│   └── Human-Robot & Multi-Robot Collaboration（人机与多机器人协作）
│
├── Action Models & Policies（动作模型与策略）
│   ├── Vision-Language-Action Models, VLA（视觉—语言—动作模型）
│   ├── Diffusion & Flow-Matching Policies（扩散与流匹配策略）
│   ├── Action Chunking & Hierarchical Policies（动作分块与分层策略）
│   └── Cross-Embodiment Generalization（跨本体泛化）
│
├── Motion & Contact Control（运动与接触控制）
│   ├── Motion Planning & Inverse Kinematics（运动规划与逆运动学）
│   ├── Locomotion & Whole-Body Control（移动与全身控制）
│   ├── Mobile Manipulation（移动操作）
│   ├── Dexterous & Bimanual Manipulation（灵巧操作与双臂协作）
│   └── Force & Compliance Control（力控制与柔顺控制）
│
├── Data & Robot Learning（数据与机器人学习）
│   ├── Teleoperation & Human Demonstrations（遥操作与人类演示）
│   ├── Imitation Learning & Large-Scale Pretraining（模仿学习与大规模预训练）
│   ├── Learning from Human Videos（从人类视频中学习）
│   ├── Self-Supervised Representation Learning（自监督表征学习）
│   ├── RL Post-Training & Online RL（强化学习后训练与在线强化学习）
│   └── Data Curation & Task Adaptation（数据筛选与任务适配）
│
├── World Models & Simulation（世界模型与仿真）
│   ├── Action-Conditioned Prediction（以动作为条件预测环境变化）
│   ├── Model-Based Planning & Synthetic Data（基于模型的规划与合成数据）
│   └── Physics Simulation & Sim-to-Real（物理仿真与仿真到现实迁移）
│
└── Hardware, Deployment & Evaluation（硬件、部署与评测）
    ├── Robot Bodies, Sensors & Actuators（机器人结构、传感器与执行器）
    ├── Real-Time Systems & On-Device Inference（实时系统与端侧推理）
    ├── Human Intervention & Safety（人工接管与安全约束）
    └── Benchmarks & Real-World Evaluation（基准测试与真实场景评测）
```



</div>






<div class="article-box" markdown="1">

这么多内容，任何人来看都是一头雾水，我们可以重点关注以下方向：

- **感知：** 感知是机器人获取自身与环境信息的过程。相机提供视觉信息，指尖的触觉传感器帮助判断是否接触、是否打滑。机械臂上电机关节的编码器会提供关节位置等本体信息。把这些信息结合起来，就是多模态感知与传感器融合。

- **具身与硬件：** 还是拿杯子这个任务，我们用来夹住杯子的东西叫做夹爪，这类东西统称“末端执行器”。机械臂由连杆和关节构成，电机通过传动机构驱动关节。传感器反馈位置和受力等信息，控制器根据指令与反馈调节运动，电源为整套系统供能。

- **动作模型：** 具身智能终究要走到现实中，为人类服务。大家或许听过 VLA 模型（Vision-Language-Action），它把视觉、语言和动作连接起来。我们可以沿用前文写成 $a_t=\pi_\theta(o_t,s_t,g)$：$o_t$ 是相机画面，$s_t$ 是关节位置等本体状态，$g$ 是“拿起杯子”这样的语言指令，$a_t$ 则是接下来要执行的动作。模型需要结合“杯子在哪里”和“手现在在哪里”，决定夹爪往哪移动、何时夹紧。拿起杯子之后，还要让它保持稳定；如果换成插接零件，就要处理接触力和位置误差......大家平时在机类课程内会学到运动学、动力学和控制等内容，都能在这些环节找到对应的问题。

- **数据采集：** LLM 有互联网作为它的训练数据来源，那动作模型该怎么知道什么情况下应该做什么动作呢？我们可以先由人演示。比如用手柄遥操作机械臂抓杯子，同时记录相机画面、本体状态和操作动作。把同一时刻的观测与动作对应起来，就有了训练样本。大家感兴趣可以去关注数据采集领域的遥操作、UMI、Ego 等概念。

- **训练：** 有了数据，经过标注就可以训练模型。标注就是为数据补上任务说明、动作等训练信息，明确输入与学习目标的对应关系，比如给一个猫标注“cat”。以模仿学习为例，模型读入一条样本的观测和指令，预测动作，再根据它与示范动作的差距更新参数。

- **泛化能力：** 如果换一个场景，模型还能完成同样的任务吗？泛化能力关注模型在训练中没见过的条件下能否继续完成任务。如果换一台机械臂，或者把两指夹爪换成灵巧手，原来学到的经验还能用多少？这就是跨本体泛化关心的问题。“本体”指机器人的身体形态与动作接口，研究者希望从不同机器人身上积累共同经验，再通过适配帮助新机器人完成任务。

- **模型与认知：** 如果你告诉机器人“把桌子收拾好”，这涵盖了很多具体步骤：物体在哪、怎么规划动作、等等等等；如果盒子在杯子后面，那么这个“杯子后面的盒子”应该如何结合语义与空间关系来理解也是一个问题。世界模型就是希望解决这样的问题：VLA 是“我看到图片，思考怎么动，但我并不知道这么动会带来什么样的后果”；世界模型则建模整个环境，尝试预测动作之后环境会怎样变化——推一下杯子，它可能移到哪里。

- **全身控制与系统部署：** 全身控制负责协调各部位的运动，让机器人在执行动作时保持平衡与稳定，我们常看到的人形机器人就主要是这方面的研究。

- **仿真与合成数据：** 仿真在电脑里建立机器人及环境的模型，用物理引擎计算运动与接触，让策略在虚拟环境中训练和测试。训练时可以改变物理参数，让策略接触更多条件。这类用于训练的数据称为合成数据，通过仿真或生成模型补充训练样本，再经过筛选和标注用于训练。把仿真中学到的能力迁移到真实机器人上，就是 Sim-to-Real。

</div>


接下来我们挑一个动作模型，具体看看它和 LLM 的区别。

## 三、具体的例子

### 1. 大语言模型（LLM）

<div class="article-box" markdown="1">

假设你问一个做文字对话的 LLM：“怎样把杯子拿起来？”

它会先把输入拆成 token（模型处理信息的小单元，一个 token 可能对应一个字，也可能对应词的一部分）。模型根据输入和已经生成的内容，逐个预测后续 token，最后还原成文字：

$$
\text{问题}
\xrightarrow{\text{分词}}x_{1:n}
\xrightarrow{\mathrm{LLM}}y_{1:m}
\xrightarrow{\text{解码}}\text{文字回答}
$$

它回答：“先把手移到杯子旁边，握住杯子，再向上抬起。” 可以看到，模型输出的是一段拿杯子的描述，但没有能力真正做到这个动作。

</div>

### 2. 动作模型（OpenVLA）

<div class="article-box" markdown="1">

[**OpenVLA**](https://openvla.github.io/) 是一个开源的**视觉—语言—动作模型（Vision-Language-Action Model，VLA）**，也就是我们前面说的原理：输入当前相机画面和文字指令，预测一步机器人动作。

我们仍用“拿起杯子”作为教学情景。指令记为 $\ell$，相机拍到的 RGB 图片记为 $I_t\in\mathbb{R}^{H\times W\times3}$。$H$、$W$ 表示图片的高和宽，$3$ 表示三个颜色通道。

数据先分成两路：图片经过视觉编码器和投影层，变成模型能处理的视觉特征；文字指令变成文字 token 的表示。两路信息一起交给模型：

$$
\begin{aligned}
I_t&\xrightarrow{\text{视觉编码、投影}}v_{1:N},\\
\ell&\xrightarrow{\text{分词、嵌入}}e_{1:M},\\
(v_{1:N},e_{1:M})
&\xrightarrow{\text{模型预测}}z_{t,1:7}
\xrightarrow{\text{动作解码}}\mathbf a_t.
\end{aligned}
$$

原版 OpenVLA 沿用类似语言模型了逐个预测 token 的方式，用机器人演示训练模型预测动作 token （这些 token 可能对应不同的含义，动作、语言、像素等，但在模型内部本质是一样的）。式子里的 $z_{t,1:7}$ 是表示动作的七个 token，解码后得到七维动作向量：

$$
\mathbf a_t=
\begin{bmatrix}
\Delta x&\Delta y&\Delta z&
\Delta\phi&\Delta\theta&\Delta\psi&g_t
\end{bmatrix}^{\mathsf T}.
$$

前三项表示机械臂末端的位置变化，中间三项表示姿态变化，最后一项 $g_t$ 表示夹爪动作。


假设这个动作是 $x$ 方向移动约 1cm，机器人控制程序接收这组动作，结合当前关节状态，把末端运动要求转换成机器人能够执行的控制指令。相机拍到新画面后，模型进入下一个循环。

这就是动作策略大致的原理

</div>

> by [WILL Z](../../../baoyan/WILL%20Z-shangjiao-phd-zigan.md)

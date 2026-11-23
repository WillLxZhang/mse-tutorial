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

(PS：入门前请先把 linux 基本概念、基本用法，还有 git 等代码管理技能搞清楚，加上 Vibe Coding，相信你能做成你想做的任何事)

</div>

## 一、什么是具身智能？

<div class="article-box" markdown="1">

上一篇里，我们可以通过 Vibe Coding 让 AI 通过代码操作电脑。那它的这双手是否能伸到现实世界中呢？试想一台机器人，我让它干什么它就能干什么，比如让它帮我把桌上的杯子拿过来？

可以先回想自己拿杯子的过程：看见杯子，伸手靠近，握住，再拿起来。杯子有点滑，你会握紧一些；杯子被别人挪走了，你会跟着调整手的位置。

这个过程中，你的眼睛在获取信息，大脑在决定怎么做，身体在执行动作。动作又改变了你看到、摸到的东西，接着影响下一步怎么做。

**由此推演，我们可以先把具身智能理解为：智能体借助身体与环境交互，在感知和行动的循环中完成任务。**

机械臂、轮式机器人、人形机器人...太多的载体都可以承载这套过程。我们也可以在仿真环境中研究这些能力。

</div>

<div class="article-box" markdown="1">

**上一篇里“把模型理解为函数”的说法在这里同样适用**，在机器人上，我们先用下面这个式子理解它每一步在做什么：

$$
a_t=\pi_\theta(o_t,g)
$$

这里的 $o_t$ 是机器人在时刻 $t$ 获得的观测，比如相机画面；$g$ 是目标，比如“拿起杯子”；$a_t$ 是这一步要执行的动作。$\pi_\theta$ 叫作**策略（Policy）**，可以先理解为“根据当前情况决定下一步怎么做”的规则或模型。

机器人执行动作之后，会获得新的观测，再决定下一个动作：

$$
o_t\xrightarrow[\text{目标 }g]{\text{策略}}a_t
\xrightarrow{\text{机器人执行}}o_{t+1}
\xrightarrow{\text{再次决策}}a_{t+1}
$$

**感知、行动、再感知，这个不断循环的过程就是闭环。** 杯子移动了、夹爪没夹稳，机器人都要从新的观测里获得反馈。

那这套系统里，具体有哪些东西值得研究呢？

</div>

## 二、具身智能的技术栈

<div class="article-box" markdown="1">

先看下面这张技术栈图，认识具身智能的几个主要研究方向：

```text
Embodied Intelligence
├── Perception（感知）
│   ├── Visual Perception（视觉感知）
│   ├── Tactile Perception（触觉感知）
│   ├── Auditory Perception（听觉感知）
│   ├── Proprioception（本体感知）
│   ├── Multimodal Perception（多模态感知）
│   │   ├── Visual-Tactile Perception（视觉-触觉融合）
│   │   │   └── Vision-Based Tactile Sensing（VBTS）
│   │   ├── Audio-Visual Perception（音频-视觉融合）
│   │   ├── Visual-Proprioceptive Perception（视觉-本体融合）
│   │   └── Cross-Modal Learning（跨模态学习）
│   └── Sensor Fusion & Representation Learning（传感器融合与表征学习）
│
├── Cognition（认知）
│   ├── World Modeling（世界建模）
│   ├── Semantic Understanding（语义理解）
│   ├── Spatial Reasoning（空间推理）
│   ├── Predictive Modeling（预测建模）
│   └── Task Understanding & Planning（任务理解与规划）
│
├── Control（控制）
│   ├── Motion Planning（运动规划）
│   ├── Manipulation Control（操作控制）
│   ├── Locomotion Control（移动控制）
│   ├── Force Control（力控制）
│   ├── Grasping & Dexterous Manipulation（抓取与灵巧操作）
│   └── Adaptive Control & Learning（自适应控制与学习）
│
├── Learning（学习）
│   ├── Reinforcement Learning（强化学习）
│   ├── Imitation Learning（模仿学习）
│   ├── Self-Supervised Learning（自监督学习）
│   ├── Few-shot / Meta Learning（小样本与元学习）
│   └── Multi-Agent Learning（多智能体学习）
│
├── Interaction（交互）
│   ├── Human-Robot Interaction（人机交互）
│   ├── Physical Interaction（物理交互）
│   ├── Social Interaction（社会交互）
│   └── Shared Autonomy（共享自主）
│
└── Embodiment & Hardware（具身与硬件）
    ├── Robot Morphology（机器人形态设计）
    ├── Actuators（执行器）
    ├── Sensors（传感器）
    │   ├── Vision Sensors（视觉传感器）
    │   ├── Tactile Sensors（触觉传感器）
    │   │   └── Vision-Based Tactile Sensors（VBTS）
    │   ├── Force/Torque Sensors（力/力矩传感器）
    │   └── Inertial Measurement Units（IMU）
    ├── Energy Systems（能源系统）
    └── Soft Robotics（软体机器人）
```

</div>

### **感知（Perception）：机器人怎么知道周围发生了什么？**

<div class="article-box" markdown="1">

相机帮助它找到杯子，触觉传感器帮助它判断是否接触、是否打滑。关节编码器提供关节位置等本体信息。把这些信息结合起来，就是多模态感知与传感器融合。[视觉触觉传感器（VBTS）](https://people.csail.mit.edu/kimo/gelsight/)则通过拍摄接触材料的形变来获取触觉信息。

</div>

### **认知（Cognition）：机器人怎么理解任务、判断接下来会发生什么？**

<div class="article-box" markdown="1">

“把桌子收拾好”需要拆成具体步骤；“杯子后面的盒子”需要结合语义与空间关系来理解。世界模型尝试预测动作之后环境会怎样变化，比如推一下杯子，它可能移到哪里。

</div>

### **动作策略与控制（Policy & Control）：机器人下一步怎么动、怎样把动作执行出来？**

<div class="article-box" markdown="1">

动作策略可以给出夹爪下一步的位置变化，运动规划可以计算到达目标的路径，控制器负责让机器人跟踪指令。走路涉及平衡与移动控制，拿杯子涉及抓取，插接零件还会涉及力控制。学习方法也可以用于改进控制。

</div>

### **学习（Learning）：这些能力怎么获得？**

<div class="article-box" markdown="1">

模仿学习让机器人从演示中学习，比如观察人遥操作机械臂抓杯子的记录。强化学习通过任务奖励来改进策略，比如抓取成功得分、掉落扣分。自监督学习从数据本身构造学习目标；小样本与元学习研究如何用较少的新数据适应任务。多个机器人共同学习、协作时，还会涉及多智能体学习。

</div>

### **交互（Interaction）：机器人如何和人、物体一起做事？**

<div class="article-box" markdown="1">

理解人的指令属于人机交互，抓住杯子涉及物理交互。递东西时选择合适的时机，也涉及人的意图和社交行为。共享自主则让人和机器人共同参与控制，比如人选目标，机器人辅助完成接近与抓取。

</div>

### **具身与硬件（Embodiment & Hardware）：用什么身体完成任务？**

<div class="article-box" markdown="1">

夹爪开口决定能否包住杯子，执行器决定能提供多大的力，电池影响工作时间。硬件研究也包括机器人形态设计和软体机器人。同一个任务，换一种身体，动作的实现方式也会跟着变化。

这些方向会交叉。做灵巧手抓取，可能同时研究触觉、策略学习和手指结构；做机器人导航，可能同时研究视觉感知、空间建图和运动规划。

</div>

### **还需要把什么接起来？**

<div class="article-box" markdown="1">

做项目时，还会遇到数据、仿真与部署这三个环节：

| 环节 | 具体在做什么 | 可以认识的工具或项目 |
| --- | --- | --- |
| 数据与训练 | 记录观测和动作，把演示整理成训练数据，再训练策略 | [Open X-Embodiment](https://robotics-transformer-x.github.io/) 汇集机器人数据；[PyTorch](https://docs.pytorch.org/tutorials/beginner/basics/intro.html) 用于搭建和训练模型 |
| 仿真与评测 | 在虚拟环境中运行机器人，检查任务是否完成 | [MuJoCo](https://mujoco.readthedocs.io/en/stable/overview.html) 模拟机器人的运动与接触；Sim-to-Real 研究如何把仿真中获得的能力迁移到真实机器人 |
| 系统与部署 | 让相机、模型和控制程序交换数据，按时执行动作 | [ROS 2](https://github.com/ros2/ros2_documentation/blob/rolling/source/ROS-Framework/About-Nodes.rst) 提供机器人软件通信等基础设施；部署时还要处理坐标变换与运行频率 |

对机械相关的同学来说，运动学、动力学和控制课程，都能在这里找到对应的位置。比如模型输出“夹爪向前移动一点”，后面仍要解决各个关节怎样配合运动的问题。

接下来我们挑一个动作模型，看看数据究竟是怎么流过去的。

</div>

## 三、从“回复一句话”到“输出一个动作”

### **1. 先看 LLM：输入文字，生成文字**

<div class="article-box" markdown="1">

假设你问一个做文字对话的 LLM：“怎样把杯子拿起来？”

它会先把输入拆成 token。可以先把 token 理解为模型处理信息的小单元，一个 token 可能对应一个字，也可能对应词的一部分。模型根据输入和已经生成的内容，逐个预测后续 token，最后还原成文字：

$$
\text{文字问题}
\xrightarrow{\text{分词}}x_{1:n}
\xrightarrow{\mathrm{LLM}}y_{1:m}
\xrightarrow{\text{解码}}\text{文字回答}
$$

比如，它可能回答：“先把手移到杯子旁边，握住杯子，再向上抬起。”

这个例子中，模型输出的是一段拿杯子的描述。那怎样得到机械臂接下来要执行的具体动作呢？

</div>

### **2. 向你介绍 OpenVLA：图片和指令输入，动作输出**

<div class="article-box" markdown="1">

[OpenVLA](https://openvla.github.io/) 是一个开源的**视觉—语言—动作模型（Vision-Language-Action Model，VLA）**。这里看它在 2024 年论文中介绍的原版：输入当前相机画面和文字指令，预测一步机器人动作。[模型说明](https://huggingface.co/openvla/openvla-7b)给出了具体的输入输出格式。

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

原版 OpenVLA 的视觉部分结合了 DINOv2 与 SigLIP，语言骨干使用 Llama 2。它沿用了逐个预测 token 的方式，并用机器人演示训练模型预测动作 token。动作的各个维度经过离散化后，可以用 token 表示。[论文第 3 节](https://arxiv.org/html/2406.09246v3#S3)介绍了这个过程。

所以，式子里的 $z_{t,1:7}$ 是表示动作的七个 token，解码后得到七维动作向量：

$$
\mathbf a_t=
\begin{bmatrix}
\Delta x&\Delta y&\Delta z&
\Delta\phi&\Delta\theta&\Delta\psi&g_t
\end{bmatrix}^{\mathsf T}.
$$

前三项表示机械臂末端的位置变化，中间三项表示姿态变化，最后一项 $g_t$ 表示夹爪动作。这里说的“末端”，可以先理解为机械臂最前面的夹爪。

**输入里的“杯子”要结合当前图片来理解；输出里的七个数，要按照机器人的动作接口来解释。** 它们分别告诉机器人向哪里移动、怎样转动，以及怎样操作夹爪。

</div>

### **3. 七个 token，怎样让夹爪动起来？**

<div class="article-box" markdown="1">

动作 token 首先被查表解码为归一化的动作数值，再根据所选机器人数据集的统计量恢复尺度。以一个需要恢复尺度的平移分量为例，[官方推理代码](https://github.com/openvla/openvla/blob/main/prismatic/extern/hf/modeling_prismatic.py)中的换算可以写成：

$$
\Delta x=\frac{\widetilde a_x+1}{2}(h_x-l_x)+l_x.
$$

$\widetilde a_x$ 是解码得到的归一化数值；$l_x$、$h_x$ 是对应数据集中该动作分量的低、高分位数。

我们取一组便于心算的教学数值：假设 $l_x=-0.05\,\mathrm m$、$h_x=0.05\,\mathrm m$，模型给出的 $\widetilde a_x\approx0.2$，则有：

$$
\Delta x\approx\frac{0.2+1}{2}\times0.1-0.05
=0.01\,\mathrm m.
$$

也就是沿动作接口约定的 $x$ 方向移动约 $1\,\mathrm{cm}$。其余分量按各自的定义解码，夹爪分量按对应数据集和机器人接口的约定处理。

接着，机器人控制程序接收这组动作，结合当前关节状态，把末端运动要求转换成机器人能够执行的控制指令。相机拍到新画面后，模型再预测下一步：

$$
(I_t,\ell)\longrightarrow\mathbf a_t
\xrightarrow{\text{控制器、机器人}}I_{t+1},\qquad
(I_{t+1},\ell)\longrightarrow\mathbf a_{t+1}.
$$

杯子抓取的全过程，就由这样一次次观测、预测和执行连接起来。

| 看数据流 | 文字对话 LLM 示例 | 原版 OpenVLA 示例 |
| --- | --- | --- |
| 输入 | 关于拿杯子的文字问题 | 当前图片和任务指令 |
| 模型生成的内容 | 表示回答内容的文字 token | 表示动作各分量的动作 token |
| 解码后的输出 | “伸手、握住、抬起”的文字描述 | 一步七维末端动作 |
| 输出交给谁 | 阅读回答的人或后续程序 | 机器人控制程序 |

再回头看技术栈图，OpenVLA 把视觉理解、语言理解和动作预测放到一个模型里，后面接上控制器与机器人硬件。大家以后读到新的机器人模型，也可以沿着这条数据流看：**它看到了什么，输出了什么，这个输出又由谁执行？**

</div>

> by [WILL Z](../../../baoyan/WILL%20Z-shangjiao-phd-zigan.md)

/**
 * 网站内容配置
 * --------------------------------------------------------------------------
 * 日常更新主页时，通常只需要修改这个文件。
 * 所有文本请保留在引号内；每个对象之间需要使用英文逗号分隔。
 * 图片、简历等静态文件统一放在 assets/ 目录。
 */
window.SITE_CONFIG = {
  meta: {
    title: "Lejun Zhang · Academic Homepage",
    // description: "一位博士生的个人学术主页，展示研究方向、论文、动态与经历。",
    // 部署后替换为主页完整地址，例如 https://username.github.io/
    url: "https://zhanglejun02.github.io/",
  },

  profile: {
    name: "Lejun Zhang",
    shortName: "NAME",
    intro:
      "我是一名来自 Shanghai Jiao Tong University 的博士研究生，关注 [RESEARCH AREA 01] 与 [RESEARCH AREA 02]。希望用有趣的研究，解决真实世界里有意义的问题。",
    about:
      "我的研究兴趣位于 [AREA A]、[AREA B] 和 [AREA C] 的交叉地带。我喜欢把复杂问题拆解成清晰、可验证，也对人真正有帮助的研究。",
    email: "lejunzhang@sjtu.edu.cn",
    location: "[Shanghai, China]",
    // 替换照片后填写相对路径，例如 "./assets/profile.jpg"；留空则显示占位图。
    photo: "./assets/profile.png",
    // 上传简历后填写路径，例如 "./assets/cv.pdf"；留空则隐藏下载按钮。
    cv: "",
  },

  socialLinks: [
    { label: "Google Scholar", url: "https://scholar.google.com/" },
    { label: "GitHub", url: "https://github.com/" },
    // qrCode 为二维码图片路径，点击后弹窗展示二维码。
    { label: "WeChat", qrCode: "./assets/wechat-qr.png" },
  ],

  researchInterests: [
    {
      title: "[RESEARCH INTEREST 01]",
      description: "用一两句话介绍你的第一个核心研究方向，以及你最关心的问题。",
    },
    {
      title: "[RESEARCH INTEREST 02]",
      description: "用一两句话介绍你的第二个核心研究方向，以及它的现实价值。",
    },
  ],

  hobbies: ["[HOBBY 01]", "[HOBBY 02]", "blue-sky thinking"],

  /**
   * 新增动态：复制一个 {...} 对象并修改内容。
   * featured 为 true 时会显示红色标签。
   */
  news: [
    {
      date: "2026.08",
      datetime: "2026-08",
      tag: "NEW",
      text: "我们的新工作 [PAPER TITLE] 被 [CONFERENCE] 接收。",
      url: "#",
      featured: true,
    },
    {
      date: "2026.06",
      datetime: "2026-06",
      tag: "TALK",
      text: "受邀在 [INSTITUTE / EVENT] 分享关于 [TOPIC] 的最新研究。",
      url: "#",
      featured: false,
    },
    {
      date: "2026.03",
      datetime: "2026-03",
      tag: "MILESTONE",
      text: "开始在 [LAB / UNIVERSITY] 的访问研究，很期待新的合作。",
      url: "#",
      featured: false,
    },
    {
      date: "2025.12",
      datetime: "2025-12",
      tag: "AWARD",
      text: "获得 [AWARD NAME]，感谢所有合作者与导师。",
      url: "#",
      featured: false,
    },
  ],

  /**
   * 新增论文：复制一个 {...} 对象并修改。
   * theme 可选值：blue、yellow、red。
   * decoration 可选值：portal、bell、door。
   * image 留空时显示主题装饰；填写图片路径时显示项目图。
   */
  publications: [
    {
      title: "[A Clear and Memorable Title for Your Most Important Research Project]",
      venue: "[TOP CONFERENCE 2026]",
      badge: "ORAL",
      authors: ["Your Name", "Collaborator A", "Collaborator B", "Advisor Name"],
      selfAuthorIndex: 0,
      description: "用两句话快速介绍论文解决了什么问题、采用了什么方法，以及最重要的发现。",
      image: "",
      theme: "blue",
      decoration: "portal",
      links: [
        { label: "Paper", url: "#" },
        { label: "Code", url: "#" },
        { label: "Project", url: "#" },
      ],
    },
    {
      title: "[Another Research Project Title Goes Here as a Placeholder]",
      venue: "[CONFERENCE 2025]",
      badge: "SPOTLIGHT",
      authors: ["Collaborator A", "Your Name", "Collaborator B", "Advisor Name"],
      selfAuthorIndex: 1,
      description: "用两句话快速介绍论文解决了什么问题、采用了什么方法，以及最重要的发现。",
      image: "",
      theme: "yellow",
      decoration: "bell",
      links: [
        { label: "Paper", url: "#" },
        { label: "Code", url: "#" },
        { label: "Project", url: "#" },
      ],
    },
    {
      title: "[A Third Selected Publication with an Informative Project Title]",
      venue: "[JOURNAL 2025]",
      badge: "",
      authors: ["Collaborator A", "Collaborator B", "Your Name", "Advisor Name"],
      selfAuthorIndex: 2,
      description: "用两句话快速介绍论文解决了什么问题、采用了什么方法，以及最重要的发现。",
      image: "",
      theme: "red",
      decoration: "door",
      links: [
        { label: "Paper", url: "#" },
        { label: "Code", url: "#" },
        { label: "Project", url: "#" },
      ],
    },
  ],

  journey: [
    {
      period: "2026 — NOW",
      title: "PhD in Computer Science",
      organization: "Shanghai Jiao Tong University · [LAB NAME]",
    },
    {
      period: "2024 — 2026",
      title: "Master in Computer Engineering",
      organization: "New York University · Tandon School of Engineering",
    },
    {
      period: "20XX — 20XX",
      title: "B.Eng. / B.Sc. in [MAJOR]",
      organization: "[UNIVERSITY NAME] · [HONORS]",
    },
  ],
};

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
    description:
      "Academic homepage of Lejun Zhang, a PhD student sharing research, publications, news, and experience.",
    // 部署后替换为主页完整地址，例如 https://username.github.io/
    url: "https://zhanglejun02.github.io/",
  },

  profile: {
    name: "Lejun Zhang",
    shortName: "NAME",
    intro:
      "I’m a PhD student at Shanghai Jiao Tong University, working on [RESEARCH AREA 01] and [RESEARCH AREA 02]. I hope to solve meaningful real-world problems through fun and rigorous research.",
    about:
      "My research lies at the intersection of [AREA A], [AREA B], and [AREA C]. I enjoy breaking complex problems down into research that is clear, verifiable, and genuinely helpful to people.",
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
      description: "One or two sentences about your first core research direction and the questions you care about most.",
    },
    {
      title: "[RESEARCH INTEREST 02]",
      description: "One or two sentences about your second core research direction and its real-world impact.",
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
      text: "Our new paper [PAPER TITLE] has been accepted to [CONFERENCE].",
      url: "#",
      featured: true,
    },
    {
      date: "2026.06",
      datetime: "2026-06",
      tag: "TALK",
      text: "Invited talk on [TOPIC] at [INSTITUTE / EVENT].",
      url: "#",
      featured: false,
    },
    {
      date: "2026.03",
      datetime: "2026-03",
      tag: "MILESTONE",
      text: "Started a visiting research position at [LAB / UNIVERSITY]. Excited for new collaborations!",
      url: "#",
      featured: false,
    },
    {
      date: "2025.12",
      datetime: "2025-12",
      tag: "AWARD",
      text: "Received the [AWARD NAME]. Thanks to all my collaborators and advisors.",
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
      description: "Two sentences on the problem this paper tackles, the approach it takes, and its key findings.",
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
      description: "Two sentences on the problem this paper tackles, the approach it takes, and its key findings.",
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
      description: "Two sentences on the problem this paper tackles, the approach it takes, and its key findings.",
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

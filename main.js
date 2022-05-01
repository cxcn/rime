window.$docsify = {
  basePath: "/posts/",
  // 加载 _sidebar.md
  loadSidebar: true,
  // 生成目录的最大层级
  subMaxLevel: 2,
  // 启用封面页
  // coverpage: true,
  // 只在访问主页时加载封面
  // onlyCover: true,
  // 导航栏
  // loadNavbar: true,
  // 切换页面后是否自动跳转到页面顶部
  auto2top: true,
  // logo: 'https://rime.noif.cc/icon.png',
  name: "Rime 文档",
  repo: "cxcn/rime/tree/main/posts",
  themeable: {
    readyTransition: true, // default
    responsiveTables: true, // default
  },
  // plugins
  search: {
    depth: 3,
    noData: "No results!",
    placeholder: "Search...",
  },
  count: {
    countable: true,
    fontsize: "0.9em",
    color: "rgb(90,90,90)",
    language: "chinese",
  },
  waline: {
    serverURL: 'https://tcb2-rime-1gwp83yjf2d30088-1300362698.ap-shanghai.app.tcloudbase.com/waline',
    requiredMeta: ["nick", "mail"],
    login: "disable",
    preview: true,
  },
};

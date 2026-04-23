import { useState } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import avatarDavid from "../assets/avatar-david.png";

const contentEN = {
  title: "Woodo.ai Hosts Inaugural AI Summit at Columbia University, Featuring Leaders from Google, Microsoft, Morgan Stanley, and More",
  subtitle: "New York, April 2026",
  intro: [
    "On April 26, Woodo.ai will convene its inaugural AI Summit at Columbia University, bringing together senior practitioners from some of the world's most influential technology and financial institutions for a half-day program exploring how artificial intelligence is reshaping energy, finance, blockchain infrastructure, and public governance.",
    "The Summit, organized in partnership with CUB — Columbia AI Club, will feature four moderated panel sessions followed by a networking reception. Confirmed speakers represent Amazon Web Services, Google, Microsoft, Meta, Circle, LayerZero Labs, Wood Mackenzie, and McMillanAI, among others. The program is designed to move beyond surface-level AI discourse and into the operational realities of deploying AI systems across regulated, high-stakes industries.",
  ],
  programTitle: "Program Overview",
  programSubtitle: "The Summit is structured around four thematic panels, each addressing a distinct dimension of AI's integration into industry.",
  panels: [
    {
      title: "AI x Energy｜1:00 – 1:50 PM",
      intro: "The energy sector sits at the intersection of two of the decade's defining transitions: decarbonization and digitization. This panel examines how AI is being applied to infrastructure planning, resource optimization, and strategic decision-making across the energy value chain.",
      speakers: [
        { name: "Deb Castro", bio: "Principal Consultant at Wood Mackenzie, brings deep expertise in energy strategy and advisory. Wood Mackenzie is one of the world's foremost research and consultancy firms in energy, chemicals, and natural resources, serving as a critical analytical partner to major energy companies, governments, and institutional investors globally." },
        { name: "Ben-Hur Souza", bio: "Head of Solutions Architecture at Amazon Web Services, oversees the design of cloud and AI infrastructure solutions at AWS — the backbone of a significant share of global AI workloads. His perspective bridges the gap between frontier AI capabilities and their practical deployment in industrial settings." },
      ],
    },
    {
      title: "AI x Finance｜1:50 – 2:40 PM",
      intro: "Financial services has been among the earliest and most aggressive adopters of AI, from quantitative research and trading to compliance and client engagement. This panel offers a rare window into how AI strategy is conceived and executed at the highest levels of Wall Street.",
      speakers: [
        { name: "Jeff McMillan", bio: "Founder of McMillanAI and former Head of Firmwide AI at Morgan Stanley, is one of the most prominent figures in financial AI. At Morgan Stanley, Jeff led the firm-wide AI strategy and was instrumental in deploying large-scale AI systems across the organization's business lines — an effort that placed Morgan Stanley among the first major banks to integrate generative AI into advisory workflows. Since founding McMillanAI, he has continued to work at the frontier of AI adoption in financial services. His participation represents one of the Summit's marquee sessions." },
      ],
    },
    {
      title: "AI x Blockchain｜2:40 – 3:30 PM",
      intro: "The convergence of AI and decentralized systems is giving rise to new models for digital finance, identity, and coordination. This panel brings together perspectives from across the blockchain ecosystem — from stablecoin infrastructure to cross-chain interoperability to platform-level policy.",
      speakers: [
        { name: "Christina Cheung", bio: "Deputy Chief of Staff to the CEO and Counsel to the President at Circle, operates at the strategic and legal nexus of one of the most consequential companies in digital assets. Circle is the issuer of USDC, the world's second-largest stablecoin by market capitalization, and a foundational player in the infrastructure layer of crypto finance." },
        { name: "Jordan Miller", bio: "Monetization Policy Manager at Meta, brings a distinctive vantage point shaped by Meta's earlier foray into blockchain through the Libra/Diem initiative. His work at the intersection of platform economics and emerging technology policy offers a perspective rarely heard in public forums." },
        { name: "Jack Charlesworth", bio: "Solutions Lead for Financial Institutions at LayerZero Labs, focuses on bridging decentralized infrastructure with traditional finance. LayerZero is a leading cross-chain interoperability protocol, and Jack's work centers on making blockchain infrastructure accessible and useful to institutional participants." },
      ],
    },
    {
      title: "AI x Governance｜3:30 – 4:20 PM",
      intro: "As AI systems grow more capable and pervasive, the question of governance has moved from academic debate to urgent institutional priority. This panel brings together practitioners who are shaping AI safety and ethics frameworks at three of the organizations most directly engaged with the challenge.",
      speakers: [
        { name: "Alexander Reese", bio: "Senior AI Ethicist in Trust & Safety Solutions at Google, works on the front lines of operationalizing AI ethics within one of the world's largest AI research and deployment organizations. His perspective reflects the practical tensions between innovation velocity and responsible deployment." },
        { name: "Rachel Azafrani", bio: "Principal Technical Program Manager for Responsible AI at Microsoft, leads program management within Microsoft's Responsible AI division. As the largest investor in OpenAI and a company embedding AI across its entire product ecosystem, Microsoft's approach to responsible AI carries outsized influence on industry norms." },
        { name: "Bryant Linton", bio: "(Moderator) An independent AI safety consultant and former member of Anthropic's team, specializes in AI policy and ethical AI frameworks. Bryant will moderate the session, drawing on his experience at Anthropic — the developer of Claude — to guide a substantive discussion on the governance challenges that lie ahead." },
      ],
    },
  ],
  whyTitle: "Why This Summit",
  whyContent: [
    "Woodo.ai is an AI-native education technology company. Our work is grounded in a simple observation: AI is not merely creating new tools — it is restructuring how industries operate, how organizations compete, and what capabilities the next generation of professionals will need to succeed.",
    "We organized this Summit because we believe that understanding AI's real-world impact requires hearing directly from the people building and deploying these systems, not just reading about them. The speakers on this stage are not commentators; they are operators — the people writing AI strategy at Morgan Stanley, building safety frameworks at Google and Microsoft, and designing the financial infrastructure of Web3 at Circle and LayerZero.",
    "For students and early-career professionals, events like this one serve a function that coursework alone cannot: they make the landscape legible. We hope this Summit offers participants not only insight into where AI is heading across industries, but also clarity on where they might want to build their own careers.",
  ],
  detailsTitle: "Event Details",
  date: "Sunday, April 26, 2026",
  time: "12:30 – 5:00 PM (panels begin at 1:00 PM)",
  venue: "International Affairs Building, Room 1501, Columbia University, 420 W 118th St, New York, NY",
  dress: "Business casual",
  regTitle: "Registration:",
  regSipa: "Columbia SIPA students",
  regExternal: "External attendees",
  regExternalNote: "(valid identification required; subject to organizer approval for campus access)",
  capacity: "Capacity is limited. Early registration is encouraged.",
};

const contentCN = {
  title: "Woodo.ai 于哥伦比亚大学举办首届AI Summit，汇聚Google、Microsoft、Morgan Stanley等机构行业领袖",
  subtitle: "纽约，2026年4月",
  intro: [
    "4月26日，Woodo.ai 将于哥伦比亚大学举办首届AI Summit。本次峰会联合哥伦比亚大学AI社团（CUB — Columbia AI Club）共同呈现，邀请来自全球顶尖科技与金融机构的资深从业者，围绕AI在能源、金融、区块链基础设施与公共治理四大领域的深层变革展开半日制深度对话。",
    "峰会设置四场主题Panel及闭幕社交环节。已确认出席的嘉宾分别来自Amazon Web Services、Google、Microsoft、Meta、Circle、LayerZero Labs、Wood Mackenzie及McMillanAI等机构。议程设计旨在超越泛泛的AI叙事，深入AI系统在高度监管、高风险行业中的真实部署经验与运营逻辑。",
  ],
  programTitle: "议程概览",
  programSubtitle: "峰会围绕四个主题Panel展开，每场聚焦AI与产业融合的一个关键维度。",
  panels: [
    {
      title: "AI x Energy｜13:00 – 13:50",
      intro: "能源行业正处于两大时代性转型的交汇点：脱碳与数字化。本场Panel探讨AI如何应用于基础设施规划、资源优化及能源价值链上的战略决策。",
      speakers: [
        { name: "Deb Castro", bio: "Wood Mackenzie首席顾问。Wood Mackenzie是全球能源、化工与自然资源领域最具影响力的研究咨询机构之一，长期为大型能源企业、各国政府及全球机构投资者提供战略分析支持。Deb在能源战略咨询领域深耕多年，将从产业顾问的视角分享AI驱动下的能源转型前景。" },
        { name: "Ben-Hur Souza", bio: "Amazon Web Services解决方案架构负责人。AWS承载了全球相当比例的AI计算负载，是AI基础设施领域的核心参与者。Ben-Hur负责云计算与AI基础设施解决方案的整体架构设计，他的视角将连接前沿AI能力与工业场景中的实际落地需求。" },
      ],
    },
    {
      title: "AI x Finance｜13:50 – 14:40",
      intro: "金融服务业是AI最早、最激进的采纳者之一，应用场景横跨量化研究、交易执行、合规审查及客户服务全链条。本场Panel提供了一个难得的窗口，让观众得以了解AI战略在华尔街最高层级是如何被构思和执行的。",
      speakers: [
        { name: "Jeff McMillan", bio: "McMillanAI创始人，前Morgan Stanley全球AI负责人（Former Head of Firmwide AI）。Jeff是金融AI领域最具影响力的人物之一。在摩根士丹利任职期间，他主导了全公司范围的AI战略，推动大规模AI系统在各业务条线的落地部署，使摩根士丹利成为最早将生成式AI整合进投顾工作流的头部投行。离开大摩后创办McMillanAI，持续深耕金融AI的前沿实践。Jeff的参与是本次峰会最具行业分量的环节之一。" },
      ],
    },
    {
      title: "AI x Blockchain｜14:40 – 15:30",
      intro: "AI与去中心化系统的交汇正在催生数字金融、身份验证与协作机制的全新范式。本场Panel汇聚来自区块链生态不同层级的三位从业者，覆盖稳定币基础设施、跨链互操作协议及平台级政策制定。",
      speakers: [
        { name: "Christina Cheung", bio: "Circle副首席幕僚长兼总裁法律顾问（Deputy Chief of Staff to the CEO & Counsel to the President）。Christina身处Circle战略与法律事务的核心交汇点。Circle是USDC的发行方，USDC按市值计算是全球第二大稳定币，Circle本身也是加密金融基础设施领域最具系统重要性的公司之一。" },
        { name: "Jordan Miller", bio: "Meta货币化政策经理（Monetization Policy Manager）。Jordan的独特视角源于Meta此前通过Libra/Diem项目对区块链领域的深度探索。他在平台经济与新兴技术政策交叉地带的工作经验，提供了一种在公开场合鲜少听到的视角。" },
        { name: "Jack Charlesworth", bio: "LayerZero Labs金融机构解决方案负责人（Solutions Lead, Financial Institutions）。LayerZero是跨链互操作协议领域的领军项目，Jack专注于将去中心化基础设施引入传统金融机构，他的工作正处于DeFi与TradFi融合的最前沿。" },
      ],
    },
    {
      title: "AI x Governance｜15:30 – 16:20",
      intro: "随着AI系统的能力与渗透率持续提升，治理问题已从学术讨论升级为迫切的制度性议题。本场Panel汇集了三位正在塑造AI安全与伦理框架的实践者，他们分别来自当前最直接面对这一挑战的三家机构。",
      speakers: [
        { name: "Alexander Reese", bio: "Google高级AI伦理专家（Senior AI Ethicist, Trust & Safety Solutions）。Alexander在全球最大的AI研发与部署机构之一的第一线推动AI伦理的落地实践，他的视角折射出创新速度与负责任部署之间的真实张力。" },
        { name: "Rachel Azafrani", bio: "Microsoft首席技术项目经理（Principal Technical Program Manager, Responsible AI）。Rachel在Microsoft负责任AI部门负责项目管理工作。作为OpenAI最大的投资方、同时也是将AI嵌入其整个产品生态的科技巨头，Microsoft在负责任AI领域的实践对行业规范有着超比例的影响力。" },
        { name: "Bryant Linton", bio: "（主持人）独立AI安全顾问，前Anthropic团队成员，专注于AI政策与伦理框架研究。Bryant将主持本场讨论，凭借他在Anthropic（Claude的开发公司）的工作经验，引导三位嘉宾围绕AI治理的核心议题展开深入对话。" },
      ],
    },
  ],
  whyTitle: "为什么举办这场峰会",
  whyContent: [
    "Woodo.ai是一家AI原生的教育科技公司。我们的工作建立在一个基本判断之上：AI不仅仅在创造新工具，它正在重构行业运行的底层逻辑、组织竞争的方式，以及下一代从业者所需要的核心能力。",
    "我们举办这场峰会，是因为我们相信，理解AI的真实产业影响，需要直接听到构建和部署这些系统的人的声音，而不仅仅是阅读关于他们的报道。这个舞台上的嘉宾不是评论者，他们是操盘手：在Morgan Stanley制定AI战略的人、在Google和Microsoft构建安全框架的人、在Circle和LayerZero设计Web3金融基础设施的人。",
    "对于学生和早期职业阶段的从业者而言，这类活动提供了课堂无法替代的功能：它让行业版图变得可读。我们希望这场峰会不仅能帮助参与者看清AI在各行业的走向，也能为他们自身的职业选择提供更清晰的方向感。",
  ],
  detailsTitle: "活动信息",
  date: "2026年4月26日（周日）",
  time: "12:30 – 17:00（Panel于13:00开始）",
  venue: "哥伦比亚大学 International Affairs Building, Room 1501, 420 W 118th St, New York, NY",
  dress: "Business Casual",
  regTitle: "报名通道：",
  regSipa: "哥大SIPA在校生",
  regExternal: "校外参会者",
  regExternalNote: "（须准确填写个人信息，经主办方审核后方可获得校园通行许可）",
  capacity: "席位有限，建议尽早报名。",
};

const AiSummitArticle = () => {
  const [lang, setLang] = useState<"en" | "cn">("en");
  const c = lang === "en" ? contentEN : contentCN;

  return (
    <div className="page-enter pt-20">
      {/* Hero placeholder for future cover image */}
      <section className="w-full max-w-4xl mx-auto px-6 pt-8 pb-2">
        <ScrollReveal>
          <div className="rounded-2xl overflow-hidden bg-muted flex items-center justify-center" style={{ minHeight: "280px" }}>
            <p className="text-muted-foreground text-sm italic">Cover image coming soon</p>
          </div>
        </ScrollReveal>
      </section>

      {/* Author sidebar + Article body */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 pt-8">
          {/* Author sidebar */}
          <ScrollReveal className="md:w-48 flex-shrink-0" delay={100}>
            <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 md:sticky md:top-28">
              <img src={avatarDavid} alt="David Dong" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-foreground uppercase tracking-wide">BY DAVID DONG</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">Co-founder, Woodo.ai</p>
              </div>
              {/* Language toggle */}
              <button
                onClick={() => setLang(lang === "en" ? "cn" : "en")}
                className="mt-2 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-background hover:bg-muted transition-colors flex items-center gap-1.5"
              >
                <span className="text-base leading-none">{lang === "en" ? "🇨🇳" : "🇺🇸"}</span>
                {lang === "en" ? "中文版" : "English"}
              </button>
            </div>
          </ScrollReveal>

          {/* Article body */}
          <ScrollReveal className="flex-1 min-w-0" delay={200}>
            <h1
              className="font-serif text-3xl md:text-[42px] leading-[1.15] font-medium text-foreground tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {c.title}
            </h1>
            <p className="text-sm text-muted-foreground mb-8 font-medium">{c.subtitle}</p>

            <div className="prose-article">
              {c.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              <hr />

              <h2 className="text-2xl font-semibold text-foreground mt-10 mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {c.programTitle}
              </h2>
              <p className="mb-6">{c.programSubtitle}</p>

              {c.panels.map((panel, pi) => (
                <div key={pi} className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{panel.title}</h3>
                  <p className="mb-4">{panel.intro}</p>
                  {panel.speakers.map((s, si) => (
                    <p key={si}>
                      <strong>{s.name}</strong>
                      {s.bio.startsWith("(") || s.bio.startsWith("（") ? " " : ", "}
                      {s.bio}
                    </p>
                  ))}
                </div>
              ))}

              <hr />

              <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {c.whyTitle}
              </h2>
              {c.whyContent.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              <hr />

              <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {c.detailsTitle}
              </h2>
              <p><strong>{lang === "en" ? "Date:" : "日期："}</strong> {c.date}</p>
              <p><strong>{lang === "en" ? "Time:" : "时间："}</strong> {c.time}</p>
              <p><strong>{lang === "en" ? "Venue:" : "地点："}</strong> {c.venue}</p>
              <p><strong>{lang === "en" ? "Dress Code:" : "着装要求："}</strong> {c.dress}</p>
              <p className="mt-4"><strong>{c.regTitle}</strong></p>
              <ul>
                <li>
                  {c.regSipa}：
                  <a href="https://cglink.me/2e9/r1929790" target="_blank" rel="noopener noreferrer" className="text-primary-dark hover:underline break-all">
                    https://cglink.me/2e9/r1929790
                  </a>
                </li>
                <li>
                  {c.regExternal}：
                  <a href="https://forms.gle/PVxc6sa3iqhbAAJN8" target="_blank" rel="noopener noreferrer" className="text-primary-dark hover:underline break-all">
                    https://forms.gle/PVxc6sa3iqhbAAJN8
                  </a>
                  {" "}{c.regExternalNote}
                </li>
              </ul>
              <p className="mt-4 font-medium">{c.capacity}</p>

              <p className="text-right mt-8" style={{ color: "#64748B", fontStyle: "italic" }}>
                — Woodo.ai Team
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default AiSummitArticle;

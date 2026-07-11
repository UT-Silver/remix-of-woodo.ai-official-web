import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ScrollReveal from "../components/ScrollReveal";
import avatarSilver from "../assets/avatar-silver.webp";

import nvidiaMd from "../content/think/semis-primer-nvidia.md?raw";
import backendMd from "../content/think/semis-backend-test.md?raw";
import intensityMd from "../content/think/semis-test-intensity.md?raw";

type Meta = {
  content: string;
  title: string;
  author: string;
  authorRole: string;
  avatar: string;
  date: string;
  read: string;
};

export const MARKDOWN_ARTICLES: Record<string, Meta> = {
  "semis-primer-nvidia": {
    content: nvidiaMd,
    title: "以NVIDIA为锚：半导体行业入门",
    author: "Silver Yin",
    authorRole: "Co-founder, Woodo.ai",
    avatar: avatarSilver,
    date: "Jul 2026",
    read: "45 min read",
  },
  "semis-backend-test": {
    content: backendMd,
    title: "后道：封装与测试",
    author: "Silver Yin",
    authorRole: "Co-founder, Woodo.ai",
    avatar: avatarSilver,
    date: "Jul 2026",
    read: "35 min read",
  },
  "semis-test-intensity": {
    content: intensityMd,
    title: "测试强度：ATE 投资人的量化建模与跟踪框架",
    author: "Silver Yin",
    authorRole: "Co-founder, Woodo.ai",
    avatar: avatarSilver,
    date: "Jul 2026",
    read: "25 min read",
  },
};

// Strip the top-level H1 from the source so we render the title ourselves.
function stripLeadingH1(md: string): string {
  return md.replace(/^\s*#\s+.*\n+/, "");
}

const MarkdownArticle = ({ slug }: { slug: string }) => {
  const meta = MARKDOWN_ARTICLES[slug];
  if (!meta) return null;
  const body = stripLeadingH1(meta.content);

  return (
    <div className="page-enter pt-20">
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 pt-8">
          <ScrollReveal className="md:w-48 flex-shrink-0" delay={100}>
            <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 md:sticky md:top-28">
              <img src={meta.avatar} alt={meta.author} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-foreground uppercase tracking-wide">BY {meta.author.toUpperCase()}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{meta.authorRole}</p>
                <p className="text-xs text-muted-foreground mt-2">{meta.date} · {meta.read}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="flex-1 min-w-0" delay={200}>
            <h1
              className="font-serif text-3xl md:text-[42px] leading-[1.15] font-medium text-foreground tracking-tight mb-8"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {meta.title}
            </h1>

            <article className="markdown-article">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  table: ({ children }) => (
                    <div className="markdown-table-wrap">
                      <table>{children}</table>
                    </div>
                  ),
                }}
              >
                {body}
              </ReactMarkdown>
            </article>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default MarkdownArticle;

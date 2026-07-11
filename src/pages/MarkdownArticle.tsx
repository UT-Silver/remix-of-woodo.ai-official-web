import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
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

// CommonMark's emphasis flanking rules don't treat CJK characters as word boundaries,
// so patterns like `**学习曲线。**制造良率` render as literal asterisks.
// Convert all **...** / __...__ / *...* / _..._ into explicit <strong>/<em> tags,
// skipping fenced code blocks and inline code spans.
function normalizeCjkEmphasis(md: string): string {
  const parts = md.split(/(```[\s\S]*?```|`[^`\n]*`)/g);
  return parts
    .map((chunk, i) => {
      if (i % 2 === 1) return chunk; // preserve code as-is
      return chunk
        .replace(/\*\*([^\s*][^*\n]*?[^\s*]|[^\s*])\*\*/g, "<strong>$1</strong>")
        .replace(/__([^\s_][^_\n]*?[^\s_]|[^\s_])__/g, "<strong>$1</strong>")
        .replace(/(^|[^\*])\*([^\s*][^*\n]*?[^\s*]|[^\s*])\*(?!\*)/g, "$1<em>$2</em>");
    })
    .join("");
}

const MarkdownArticle = ({ slug }: { slug: string }) => {
  const meta = MARKDOWN_ARTICLES[slug];
  if (!meta) return null;
  const body = normalizeCjkEmphasis(stripLeadingH1(meta.content));

  return (
    <div className="page-enter pt-20">
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 pt-8">
          <aside className="md:w-48 flex-shrink-0">
            <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 md:sticky md:top-28">
              <img src={meta.avatar} alt={meta.author} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-foreground uppercase tracking-wide">BY {meta.author.toUpperCase()}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{meta.authorRole}</p>
                <p className="text-xs text-muted-foreground mt-2">{meta.date} · {meta.read}</p>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="relative bg-[#F4F4F2] rounded-2xl px-6 py-10 md:px-12 md:py-14 shadow-sm">
              <h1
                className="font-serif text-3xl md:text-[42px] leading-[1.15] font-medium text-foreground tracking-tight mb-8"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {meta.title}
              </h1>

              <article className="markdown-article">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default MarkdownArticle;

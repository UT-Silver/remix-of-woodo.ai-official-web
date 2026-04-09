import { useState } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import ImagePlaceholder from "../components/ImagePlaceholder";
import avatarSilver from "../assets/avatar-silver.png";
import avatarDavid from "../assets/avatar-david.png";
import avatarKeer from "../assets/avatar-keer.jpg";
import articleHeroWoodo from "../assets/article-hero-woodo.png";

const authorAvatars: Record<string, string> = {
  "Silver Yin": avatarSilver,
  "David Dong": avatarDavid,
  "Keer Wang": avatarKeer,
};

const articles = [
  { category: "Founding", color: "bg-primary-dark/10 text-primary-dark", title: "Why We Started Woodo", author: "David Dong", date: "Mar 2026", excerpt: "The story behind building an education venture that refuses to look like one.", read: "12 min read", slug: "why-we-started-woodo", tags: ["Manifesto"], cover: articleHeroWoodo },
  { category: "Education", color: "bg-primary-dark/10 text-primary-dark", title: "The Judgment Gap", author: "Silver Yin", date: "Mar 2026", excerpt: "Why knowing how to build is no longer enough — and what we should teach instead.", read: "4 min read", slug: "the-judgment-gap", tags: [], cover: null },
  { category: "Education", color: "bg-secondary-dark/10 text-secondary-dark", title: "AI Literacy Is Not Enough", author: "Keer Wang", date: "Feb 2026", excerpt: "Literacy is baseline. We need fluency, taste, and the courage to create.", read: "6 min read", slug: "ai-literacy-is-not-enough", tags: [], cover: null },
  { category: "Building", color: "bg-accent-dark/10 text-accent-dark", title: "What New Oriental Taught Us", author: "David Dong", date: "Feb 2026", excerpt: "Lessons from China's biggest education company — and why we chose a different path.", read: "7 min read", slug: "what-new-oriental-taught-us", tags: [], cover: null },
  { category: "Education", color: "bg-primary-dark/10 text-primary-dark", title: "On Radical Honesty in Education", author: "Silver Yin", date: "Jan 2026", excerpt: "Why we tell students the truth even when it's uncomfortable.", read: "4 min read", slug: "on-radical-honesty", tags: [], cover: null },
  { category: "AI", color: "bg-secondary-dark/10 text-secondary-dark", title: "Building vs. Optimizing: Two Mindsets", author: "Silver Yin", date: "Jan 2026", excerpt: "The difference between making things better and making things that matter.", read: "5 min read", slug: "building-vs-optimizing", tags: [], cover: null },
];

const filters = ["All", "Education", "AI", "Building", "Founding"];

const Think = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? articles : articles.filter(a => a.category === activeFilter);

  return (
    <div className="page-enter pt-20">
      {/* Featured Hero — dark with gradient overlay */}
      <section className="relative min-h-[70vh] flex items-end px-6 pb-16">
        <div className="absolute inset-0">
          <img src={articleHeroWoodo} alt="Featured article hero" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 30%, rgba(30,41,59,0.85) 100%)" }} />
        <ScrollReveal className="relative z-10 max-w-3xl mx-auto w-full">
          <div className="flex gap-2 mb-4">
            <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold bg-primary/20 text-primary-light">Founding</span>
            <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold" style={{ background: "rgba(251,191,36,0.2)", color: "#FDE68A" }}>Manifesto</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-medium text-white">
            Why We Started <strong className="font-bold">Woodo</strong>
          </h1>
          <p className="mt-3" style={{ color: "rgba(255,255,255,0.5)" }}>David Dong · Mar 2026 · 12 min read</p>
          <Link to="/think/why-we-started-woodo" className="inline-block mt-4 text-sm font-semibold text-primary-light hover:text-primary transition-colors cursor-pointer group">
            Read article <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </ScrollReveal>
      </section>

      {/* Filter bar */}
      <section className="py-8 px-6 border-b border-border sticky top-16 md:top-20 bg-background/90 backdrop-blur-xl z-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              How we <strong className="text-primary-dark">think</strong>
            </h2>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  activeFilter === f
                    ? "bg-primary-dark text-white"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-16 px-6 bg-cool-gray dot-grid-bg">
        <div className="max-w-4xl mx-auto relative z-10">
          {filtered.length > 0 && (
            <ScrollReveal className="mb-8">
              <Link to={`/think/${filtered[0].slug}`} className="block border border-border rounded-2xl overflow-hidden bg-background card-hover cursor-pointer flex flex-col md:flex-row group">
                <div className="w-full md:w-1/2 overflow-hidden">
                  <div className="transition-transform duration-500 group-hover:scale-[1.06]">
                    {filtered[0].cover ? <img src={filtered[0].cover} alt="Article Cover" className="w-full h-56 md:h-full min-h-[240px] object-cover" /> : <ImagePlaceholder variant="green" className="w-full h-56 md:h-full min-h-[240px]" label="Article Cover" aspectRatio="16/9" />}
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center flex-1">
                  <div className="flex gap-2 mb-3">
                    <span className={`inline-block w-fit px-3 py-1 rounded-lg text-xs font-semibold ${filtered[0].color}`}>{filtered[0].category}</span>
                    {filtered[0].tags?.includes("Manifesto") && (
                      <span className="inline-block w-fit px-3 py-1 rounded-lg text-xs font-semibold" style={{ background: "rgba(251,191,36,0.15)", color: "#92400E" }}>Manifesto</span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground tracking-tight">{filtered[0].title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{filtered[0].excerpt}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <img src={authorAvatars[filtered[0].author]} alt={filtered[0].author} className="w-6 h-6 rounded-full object-cover" />
                    <p className="text-xs text-muted-foreground">{filtered[0].read} · {filtered[0].date} · {filtered[0].author}</p>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.slice(1).map((a, i) => (
              <ScrollReveal key={a.title} delay={i * 100}>
                <Link to={`/think/${a.slug}`} className="block border border-border rounded-2xl overflow-hidden bg-background card-hover cursor-pointer group">
                  <div className="overflow-hidden">
                    <div className="transition-transform duration-500 group-hover:scale-[1.06]">
                      {a.cover ? <img src={a.cover} alt="Article Cover" className="w-full h-44 object-cover" /> : <ImagePlaceholder variant={i % 2 === 0 ? "blue" : "neutral"} className="w-full h-44" label="Article Cover" aspectRatio="16/9" />}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${a.color}`}>{a.category}</span>
                      {a.tags?.includes("Manifesto") && (
                        <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold" style={{ background: "rgba(251,191,36,0.15)", color: "#92400E" }}>Manifesto</span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground tracking-tight">{a.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{a.excerpt}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <img src={authorAvatars[a.author]} alt={a.author} className="w-5 h-5 rounded-full object-cover" />
                      <p className="text-xs text-muted-foreground">{a.read} · {a.date} · {a.author}</p>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Think;

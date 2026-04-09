import { Link } from "react-router-dom";
import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import ImagePlaceholder from "../components/ImagePlaceholder";
import report1 from "../assets/report-1.png";
import report2 from "../assets/report-2.png";
import report3 from "../assets/report-3.png";
import report4 from "../assets/report-4.png";
import report5 from "../assets/report-5.png";
import report6 from "../assets/report-6.png";
import report7 from "../assets/report-7.png";

const reportImages = [
  { src: report1, alt: "Investment report cover page" },
  { src: report2, alt: "Financial analysis charts" },
  { src: report7, alt: "Cloud AI revenue monetization analysis" },
  { src: report3, alt: "Market data visualization" },
  { src: report6, alt: "NVIDIA catalyst review chart" },
  { src: report4, alt: "Company valuation summary" },
  { src: report5, alt: "Equity curve and trade log analysis" },
];

const Portfolio = () => {
  const [marqueePaused, setMarqueePaused] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <div className="page-enter pt-20">
      {/* Header — warm white + dot grid */}
      <section className="py-20 md:py-28 px-6 text-center bg-warm-white dot-grid-bg">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[3px] text-muted-foreground mb-4 relative z-10">Build</p>
          <h1 className="text-3xl md:text-4xl font-medium text-foreground relative z-10">
            What our builders <strong className="text-primary-dark font-bold">create</strong>.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground relative z-10">The proof is in the projects.</p>
        </ScrollReveal>
      </section>

      {/* Logo Centerpiece — white */}
      <section className="py-16 px-6 bg-background">
        <ScrollReveal className="flex flex-col items-center relative">
          <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] flex items-center justify-center">
            <div className="ripple-ring absolute rounded-full border-2 border-primary-lightest" style={{ width: "100%", height: "100%" }} />
            <div className="ripple-ring absolute rounded-full border border-primary-lightest" style={{ width: "85%", height: "85%" }} />
            <div className="ripple-ring absolute rounded-full border border-primary-lightest" style={{ width: "70%", height: "70%" }} />
            <div className="absolute inset-0 rounded-full bg-primary opacity-[0.04]" style={{ filter: "blur(40px)" }} />
            <div className="logo-pulse relative z-10">
              <ImagePlaceholder variant="green" className="w-56 h-56 md:w-72 md:h-72 rounded-2xl" label="Woodo Logo — 300px" />
            </div>
          </div>

          <div className="relative mt-8 text-center">
            <span className="absolute -top-16 left-1/2 -translate-x-1/2 text-[120px] font-bold select-none pointer-events-none leading-none" style={{ color: "#F8FAFC" }}>2026</span>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight relative z-10">Building in progress.</h3>
            <p className="text-muted-foreground mt-2 relative z-10">First projects launching 2026.</p>
          </div>
        </ScrollReveal>
      </section>

      {/* Curriculum Modules — bento grid */}
      <section className="py-20 md:py-28 px-6 bg-background">
        <ScrollReveal className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[3px] text-muted-foreground mb-4 text-center relative z-10">Curriculum</p>
          <h2 className="text-2xl md:text-3xl font-medium text-foreground text-center relative z-10 mb-14">
            Four modules. One <strong className="text-primary-dark font-bold">complete system</strong>.
          </h2>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Card 1 — large, accent bg */}
          <ScrollReveal className="md:row-span-1">
            <div className="rounded-3xl p-8 md:p-10 h-full flex flex-col justify-end min-h-[320px]" style={{ backgroundColor: "#F5E6D3" }}>
              <div className="h-40 md:h-48 mb-6 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.06)" }}>
                <span className="text-muted-foreground text-sm">Illustration coming soon</span>
              </div>
              <p className="text-xs uppercase tracking-[2px] mb-2" style={{ color: "rgba(0,0,0,0.4)" }}>Cognition · Module 01</p>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Think Clearly</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                Before you build with AI, you have to understand what AI actually is. We start by giving students a real mental model of how large language models work, where their capabilities come from, and where they break. Not tool tutorials — a framework you can reason with.
              </p>
            </div>
          </ScrollReveal>

          {/* Card 2 — neutral light bg */}
          <ScrollReveal delay={100}>
            <div className="rounded-3xl p-8 md:p-10 h-full flex flex-col justify-end min-h-[320px]" style={{ backgroundColor: "#E8E4DF" }}>
              <div className="h-40 md:h-48 mb-6 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.06)" }}>
                <span className="text-muted-foreground text-sm">Illustration coming soon</span>
              </div>
              <p className="text-xs uppercase tracking-[2px] mb-2" style={{ color: "rgba(0,0,0,0.4)" }}>Construction · Module 02</p>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Build Systems</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                This is where students stop being AI users and start being AI builders. Through Claude Code, n8n, MCP, and multi-agent architectures, they learn to design workflows, compose tools, and ship working systems — moving from a single prompt to a real product.
              </p>
            </div>
          </ScrollReveal>

          {/* Card 3 — dark bg */}
          <ScrollReveal delay={200}>
            <div className="rounded-3xl p-8 md:p-10 h-full flex flex-col justify-end min-h-[320px]" style={{ backgroundColor: "#1E293B" }}>
              <div className="h-40 md:h-48 mb-6 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>Illustration coming soon</span>
              </div>
              <p className="text-xs uppercase tracking-[2px] mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>Application · Module 03</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Ship Real Things</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                We put AI capability into the real world. Students build replicas of existing startups, solve actual problems for real users, and develop their own 0→1 projects — every output ends up in a personal AI portfolio that hiring managers and admissions officers can actually open and click through.
              </p>
            </div>
          </ScrollReveal>

          {/* Card 4 — accent warm bg */}
          <ScrollReveal delay={300}>
            <div className="rounded-3xl p-8 md:p-10 h-full flex flex-col justify-end min-h-[320px]" style={{ backgroundColor: "#E87B5A" }}>
              <div className="h-40 md:h-48 mb-6 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Illustration coming soon</span>
              </div>
              <p className="text-xs uppercase tracking-[2px] mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>Entrepreneurship · Module 04</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Think Like a Founder</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                Knowing how to build is not the same as knowing what's worth building. This module gives students the full stack of founder thinking — opportunity recognition, design thinking, business model canvas, lean iteration, and how to pitch a project so that someone else wants to back it.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* AI Value Chain Interactive */}
      <section className="py-20 md:py-28 px-6 bg-warm-white dot-grid-bg">
        <ScrollReveal className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[3px] text-muted-foreground mb-4 text-center relative z-10">Explore</p>
          <h2 className="text-2xl md:text-3xl font-medium text-foreground text-center relative z-10">
            From Flat Reports to <strong className="text-primary-dark font-bold">Dynamic Web Pages</strong>.
          </h2>
          <p className="mt-3 text-muted-foreground text-center relative z-10 mb-10">Showcase: AI Value Chain Primer</p>
          <div className="rounded-2xl border border-border overflow-hidden shadow-lg relative z-10" style={{ height: "80vh" }}>
            <iframe
              src="/ai_value_chain.html"
              title="AI Value Chain Interactive Visualization"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Investment Reports Showcase — dark bento grid */}
      <section className="py-20 md:py-28 overflow-hidden" style={{ backgroundColor: "#1a1a1a" }}>
        <ScrollReveal className="px-6">
          <p className="text-xs uppercase tracking-[3px] mb-4 text-center" style={{ color: "rgba(255,255,255,0.45)" }}>Showcase</p>
          <h2 className="text-2xl md:text-3xl font-medium text-center" style={{ color: "#fff" }}>
            Crafting Wall Street Standard <strong className="text-primary-light font-bold">Investment Reports</strong>.
          </h2>
          <p className="mt-3 text-center mb-12" style={{ color: "rgba(255,255,255,0.45)" }}>
            Institutional-grade research, beautifully presented.
          </p>
        </ScrollReveal>

        {/* Infinite marquee */}
        <div
          className="relative w-full"
          onMouseEnter={() => setMarqueePaused(true)}
          onMouseLeave={() => setMarqueePaused(false)}
        >
          <div
            className="flex gap-6 marquee-track"
            style={{ animationPlayState: marqueePaused ? "paused" : "running" }}
          >
            {/* Duplicate the set 3x for seamless loop */}
            {[...reportImages, ...reportImages, ...reportImages].map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 rounded-2xl overflow-hidden transition-transform duration-500 ease-out hover:scale-110 hover:z-10 relative cursor-pointer"
                style={{ width: "400px", height: "280px", backgroundColor: "#252525" }}
                onDoubleClick={() => setLightboxSrc(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover object-top pointer-events-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 md:py-28 px-6 bg-cool-gray dot-grid-bg">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-background border-2 border-dashed border-border rounded-2xl overflow-hidden card-hover group">
                <div className="overflow-hidden">
                  <div className="transition-transform duration-500 group-hover:scale-[1.06]">
                    <ImagePlaceholder variant={i % 3 === 0 ? "green" : i % 3 === 1 ? "blue" : "neutral"} className="w-full h-36" label="Project" aspectRatio="16/10" />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <span className="text-sm text-muted-foreground">Coming soon</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Demo Day — dark with amber glow */}
      <section className="dark-section-glow py-20 md:py-28 px-6 text-center glow-amber">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold text-white relative z-10">
            Demo Day — <strong className="text-primary-light">Shanghai, 2026</strong>
          </h2>
          <p className="mt-4 relative z-10" style={{ color: "rgba(255,255,255,0.5)" }}>Where builders present what they've built to the people who matter.</p>
          <Link
            to="/apply"
            className="inline-block mt-8 bg-accent text-accent-foreground font-semibold px-8 py-3 rounded-full hover:bg-accent-dark hover:text-white hover:shadow-lg hover:shadow-accent/25 transition-all active:scale-[0.97] cta-glow relative z-10"
          >
            Apply
          </Link>
        </ScrollReveal>
      </section>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out animate-fade-in"
          onClick={() => setLightboxSrc(null)}
        >
          <img
            src={lightboxSrc}
            alt="Report full view"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Portfolio;

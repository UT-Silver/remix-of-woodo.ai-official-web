import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ScrollReveal from "../components/ScrollReveal";
import HeroParticleReveal from "../components/HeroParticleReveal";
import ComingSoonParticle from "../components/ComingSoonParticle";
import heroBuild from "../assets/hero-build.webp";
import jellyfishImg from "../assets/jellyfish.png";
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
  const [isDark, setIsDark] = useState(false);
  const darkSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = darkSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsDark(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-enter pt-20" style={{ backgroundColor: isDark ? '#1a1a1a' : 'transparent', transition: 'background-color 0.8s ease' }}>
      <section className="dark-section-glow particle-reveal-zone relative w-full overflow-hidden" style={{ height: "70vh", minHeight: "480px" }}>
        <img
          src={heroBuild}
          alt="Human hand reaching toward robotic hand"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 1 }}
        />
        <div className="absolute inset-0" style={{ zIndex: 2, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.05) 100%)" }} />
        <HeroParticleReveal />
        <ScrollReveal className="absolute bottom-12 left-8 md:left-16 z-10 max-w-2xl" direction="up">
          <p className="text-xs uppercase tracking-[3px] mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>Build</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-white">
            What our builders<br /><strong className="font-bold">create</strong>.
          </h1>
          <p className="mt-4 text-lg" style={{ color: "rgba(255,255,255,0.6)" }}>The proof is in the projects.</p>
        </ScrollReveal>
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
      <section ref={darkSectionRef} className="py-20 md:py-28 overflow-hidden">
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

      {/* AI Hedge Fund Agent Team */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: "#111" }}>
        <ScrollReveal className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[3px] mb-4 text-center" style={{ color: "rgba(255,255,255,0.45)" }}>Showcase</p>
          <h2 className="text-2xl md:text-3xl font-medium text-center text-white">
            Solving Complexities with an Elite <strong className="text-primary-light font-bold">Agent Team</strong>.
          </h2>
          <p className="mt-3 text-center mb-10" style={{ color: "rgba(255,255,255,0.45)" }}>
            Meet your newest intern: Warren Buffett.
            <Link to="/ai-hedge-fund" className="ml-3 text-primary-light underline underline-offset-4 hover:text-white transition-colors text-xs">
              全屏模式 →
            </Link>
          </p>
        </ScrollReveal>
        <div
          className="max-w-7xl mx-auto rounded-2xl overflow-hidden border border-border shadow-2xl"
          style={{ height: "80vh", minHeight: "500px" }}
        >
          <iframe
            src="https://dist-eight-puce.vercel.app"
            title="AI Hedge Fund Agent Team"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </section>


      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: "#111" }}>
        <ScrollReveal className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 text-center">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] text-white">
                More project samples<br />are <strong className="font-bold">coming soon</strong>.
              </h2>
            </div>
            <div className="relative flex-shrink-0 w-full md:w-[420px] h-[300px] md:h-[320px] rounded-2xl overflow-hidden">
              <img
                src={jellyfishImg}
                alt="Jellyfish in shallow water"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <ComingSoonParticle />
            </div>
          </div>
        </ScrollReveal>
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

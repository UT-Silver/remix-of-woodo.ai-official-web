import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import ImagePlaceholder from "../components/ImagePlaceholder";
import report1 from "../assets/report-1.png";
import report2 from "../assets/report-2.png";
import report3 from "../assets/report-3.png";
import report4 from "../assets/report-4.png";

const Portfolio = () => {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.documentElement.classList.add("portfolio-dark");
        } else {
          document.documentElement.classList.remove("portfolio-dark");
        }
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("portfolio-dark");
    };
  }, []);

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

      {/* Dark mode trigger */}
      <div ref={triggerRef} className="h-0 w-full" />

      {/* Investment Reports Showcase — dark bento grid */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: "#1a1a1a" }}>
        <ScrollReveal className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[3px] mb-4 text-center" style={{ color: "rgba(255,255,255,0.45)" }}>Showcase</p>
          <h2 className="text-2xl md:text-3xl font-medium text-center" style={{ color: "#fff" }}>
            Crafting Wall Street Standard <strong className="text-primary-light font-bold">Investment Reports</strong>.
          </h2>
          <p className="mt-3 text-center mb-12" style={{ color: "rgba(255,255,255,0.45)" }}>
            Institutional-grade research, beautifully presented.
          </p>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px] md:auto-rows-[260px]">
          <ScrollReveal className="md:col-span-2 md:row-span-2" delay={0}>
            <div className="rounded-2xl overflow-hidden h-full" style={{ backgroundColor: "#252525" }}>
              <img src={report1} alt="Investment report cover page" className="w-full h-full object-cover object-top" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="rounded-2xl overflow-hidden h-full" style={{ backgroundColor: "#252525" }}>
              <img src={report2} alt="Financial analysis charts" className="w-full h-full object-cover object-top" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="rounded-2xl overflow-hidden h-full" style={{ backgroundColor: "#252525" }}>
              <img src={report3} alt="Market data visualization" className="w-full h-full object-cover object-top" />
            </div>
          </ScrollReveal>
          <ScrollReveal className="md:col-span-2" delay={300}>
            <div className="rounded-2xl overflow-hidden h-full" style={{ backgroundColor: "#252525" }}>
              <img src={report4} alt="Company valuation summary" className="w-full h-full object-cover object-center" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <div className="rounded-2xl overflow-hidden h-full flex items-center justify-center" style={{ backgroundColor: "#252525", border: "2px dashed rgba(255,255,255,0.12)" }}>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>More coming soon</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Future project grid — transparent so dark html bg shows through */}
      <section className="py-20 md:py-28 px-6" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="border-2 border-dashed rounded-2xl overflow-hidden card-hover group" style={{ backgroundColor: "#252525", borderColor: "rgba(255,255,255,0.12)" }}>
                <div className="overflow-hidden">
                  <div className="transition-transform duration-500 group-hover:scale-[1.06]">
                    <ImagePlaceholder variant={i % 3 === 0 ? "green" : i % 3 === 1 ? "blue" : "neutral"} className="w-full h-36" label="Project" aspectRatio="16/10" />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Coming soon</span>
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
    </div>
  );
};

export default Portfolio;

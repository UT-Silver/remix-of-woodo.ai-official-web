import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import ScrollReveal from "../components/ScrollReveal";
import MagneticButton from "../components/MagneticButton";
import HeroParticleReveal from "../components/HeroParticleReveal";
import LightParticleReveal from "../components/LightParticleReveal";
import { ChevronDown } from "lucide-react";
import avatarSilver from "../assets/avatar-silver.png";
import avatarDavid from "../assets/avatar-david.png";
import avatarKeer from "../assets/avatar-keer.jpg";
import moment1 from "../assets/moment-1.jpg";
import moment2 from "../assets/moment-2.jpg";
import moment3 from "../assets/moment-3.png";
import moment4 from "../assets/moment-4.jpg";
import articleHeroWoodo from "../assets/article-hero-woodo.png";
import logoBytedance from "../assets/logo-bytedance.png";
import logoAmazon from "../assets/logo-amazon.png";
import logoBilibili from "../assets/logo-bilibili.png";
import logoMeta from "../assets/logo-meta.png";
import logoTencent from "../assets/logo-tencent.png";
import logoOpenai from "../assets/logo-openai.png";
import logoBcg from "../assets/logo-bcg.png";
import logoCicc from "../assets/logo-cicc.png";
import logoJpmorgan from "../assets/logo-jpmorgan.png";
import logoAlibaba from "../assets/logo-alibaba.png";
import logoDeutschebank from "../assets/logo-deutschebank.png";

const networkLogos = [
  { src: logoBytedance, alt: "ByteDance" },
  { src: logoAmazon, alt: "Amazon" },
  { src: logoBilibili, alt: "Bilibili" },
  { src: logoMeta, alt: "Meta" },
  { src: logoTencent, alt: "Tencent" },
  { src: logoOpenai, alt: "OpenAI" },
  { src: logoBcg, alt: "BCG" },
  { src: logoCicc, alt: "CICC" },
  { src: logoJpmorgan, alt: "J.P.Morgan" },
  { src: logoAlibaba, alt: "Alibaba" },
  { src: logoDeutschebank, alt: "Deutsche Bank" },
];

const pillars = [
  {
    char: "悟",
    color: "text-primary-dark",
    glowColor: "#22C55E",
    label: "Awaken",
    desc: "We believe the deepest learning happens when students discover their own questions — not memorize someone else's answers.",
  },
  {
    char: "动",
    color: "text-secondary-dark",
    glowColor: "#38BDF8",
    label: "Build",
    desc: "Ideas without execution are decoration. Every week ends with something built, tested, and shipped.",
  },
  {
    char: "爱",
    color: "text-accent-dark",
    glowColor: "#FBBF24",
    label: "Love",
    desc: "Education without genuine care is just information transfer. We invest in the whole person.",
  },
];

const articles = [
  { category: "Founding", color: "bg-primary/10 text-primary-dark", title: "Why We Started Woodo", date: "Mar 2026" },
  { category: "Education", color: "bg-secondary/10 text-secondary-dark", title: "The Judgment Gap", date: "Mar 2026" },
  { category: "AI", color: "bg-accent/10 text-accent-dark", title: "AI Literacy Is Not Enough", date: "Feb 2026" },
];

const momentImages = [
  { src: moment1, alt: "Meeting with industry leaders" },
  { src: moment2, alt: "Team gathering" },
  { src: moment3, alt: "Community workshop" },
  { src: moment4, alt: "Research poster presentation" },
];
const teamMembers = [
  { name: "Silver Yin", school: "Columbia University", quote: "Building what education should have been all along.", avatar: avatarSilver },
  { name: "David Dong", school: "Peking University", quote: "Execution is the only honest form of conviction.", avatar: avatarDavid },
  { name: "Keer Wang", school: "Columbia University", quote: "The best learning happens in relationship, not isolation.", avatar: avatarKeer },
];

const Index = () => {
  const heroText = "The world's best young minds don't need another course. They need a";

  const [marqueePaused, setMarqueePaused] = useState(false);

  // Pillar hover state for image reveal
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  // Scroll-triggered light background
  const [isLight, setIsLight] = useState(false);
  const lightSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = lightSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsLight(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-enter" style={{ backgroundColor: isLight ? '#FAF9F6' : '#111714', transition: 'background-color 0.8s ease' }}>
      {/* ===== 1. HERO — dark immersive, particles as visual ===== */}
      <section
        className="hero-section dark-section-glow particle-reveal-zone min-h-screen flex items-center relative overflow-hidden"
        style={{
          background: "#0F1F0F",
          position: "relative",
          zIndex: 10,
          padding: "0 8%",
        }}
      >

        <HeroParticleReveal />

        <div className="relative z-10 max-w-[680px]">
          <p
            className="text-xs uppercase mb-5"
            style={{ color: "#86EFAC", letterSpacing: "4px" }}
          >
            Wisdom in Motion
          </p>
          <h1
            className="hero-title"
            style={{ color: "#FFFFFF" }}
          >
            {heroText}{" "}
            <span style={{ color: "#86EFAC", fontWeight: 700 }}>launchpad.</span>
          </h1>
          <p
            className="mt-6 max-w-[540px]"
            style={{ color: "#94A3B8", fontSize: "18px", lineHeight: 1.7 }}
          >
            Woodo.ai is where ambition meets AI. We select, train, and launch the next generation of builders.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-5 mt-10">
            <MagneticButton
              to="/apply"
              className="inline-block font-semibold rounded-full transition-all active:scale-[0.97] cta-glow"
              style={{
                background: "#FBBF24",
                color: "#1E293B",
                fontSize: "16px",
                fontWeight: 600,
                padding: "16px 36px",
                border: "none",
                letterSpacing: "0.5px",
              }}
            >
              Enter the arena
            </MagneticButton>
            <Link
              to="/vision"
              className="text-[15px] font-semibold transition-colors group mt-2 sm:mt-4"
              style={{ color: "#86EFAC" }}
            >
              Our vision <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <ChevronDown className="w-5 h-5" style={{ color: "rgba(255,255,255,0.3)" }} />
        </div>
      </section>


      {/* ===== 2. BRAND STORY — warm off-white ===== */}
      <section
        ref={lightSectionRef}
        className="px-6"
        style={{ position: "relative", zIndex: 10, padding: "140px 24px" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <ScrollReveal className="flex-1" direction="fadeOnly" duration={800}>
            <div className="relative pl-8 md:pl-10" style={{ borderLeft: "4px solid #22C55E" }}>
              <span
                className="absolute -top-10 left-4 text-[100px] leading-none select-none pointer-events-none"
                style={{ color: "#DCFCE7", fontFamily: "'Playfair Display', serif" }}
              >
                "
              </span>
              <blockquote
                className="text-2xl md:text-[28px] leading-relaxed relative z-10"
                style={{ color: "#16A34A", fontFamily: "'Playfair Display', serif", fontStyle: "italic", lineHeight: 1.4 }}
              >
                AI lowers the barrier to building. We raise the bar for what gets{" "}
                <strong style={{ fontWeight: 700 }}>built</strong>.
              </blockquote>
              <p className="mt-4 text-xs uppercase tracking-[3px]" style={{ color: "#94A3B8" }}>
                — Woodo Thesis
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="flex-1" direction="up">
            <div>
              <h2
                className="text-2xl md:text-[34px] font-semibold leading-snug text-balance"
                style={{ color: "#1E293B", lineHeight: 1.25 }}
              >
                The scarce resource is no longer technical skill — it's knowing what{" "}
                <strong>deserves</strong> to be built.
              </h2>
              <p className="mt-8 max-w-xl" style={{ color: "#4B5563", fontSize: "17px", lineHeight: 1.8 }}>
                The world is flooded with tools. What's missing are people with the taste to know what matters, the judgment to cut through noise, and the courage to build something original.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 3. 悟动爱 PILLARS — warm gray, zigzag, hover images ===== */}
      <section
        className="px-6 relative dot-grid-bg"
        style={{ background: "#F3F1ED", position: "relative", zIndex: 10, padding: "160px 24px" }}
      >
        <div className="max-w-4xl mx-auto relative z-10 space-y-20 md:space-y-24">
          {pillars.map((p, i) => {
            const isLeft = i % 2 === 0;
            return (
              <ScrollReveal key={p.char} direction={isLeft ? "left" : "right"}>
                <div
                  className={`relative max-w-[65%] ${isLeft ? "mr-auto" : "ml-auto"}`}
                  onMouseEnter={() => setHoveredPillar(i)}
                  onMouseLeave={() => setHoveredPillar(null)}
                >
                  <div
                    className="absolute -top-6 font-bold leading-none pointer-events-none select-none"
                    style={{
                      fontSize: "200px",
                      opacity: 0.10,
                      color: p.glowColor,
                      [isLeft ? "left" : "right"]: 0,
                    }}
                  >
                    {p.char}
                  </div>

                  {/* Hover-reveal image placeholder */}
                  <div
                    className="hidden md:block absolute top-1/2 rounded-2xl transition-all duration-400"
                    style={{
                      [isLeft ? "right" : "left"]: "-320px",
                      transform: `translateY(-50%) translateX(${hoveredPillar === i ? "0" : isLeft ? "20px" : "-20px"})`,
                      width: "280px",
                      height: "200px",
                      background: "linear-gradient(135deg, rgba(220,252,231,0.7), rgba(224,242,254,0.7), rgba(254,249,195,0.4))",
                      opacity: hoveredPillar === i ? 1 : 0,
                      borderRadius: "16px",
                    }}
                  />

                  <div className="relative z-10 pt-16 md:pt-24">
                    <h3
                      className="text-2xl md:text-[36px] font-semibold tracking-wide"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      <span className={p.color}>{p.label}</span>
                    </h3>
                    <p className="mt-4 max-w-md" style={{ color: "#4B5563", fontSize: "17px", lineHeight: 1.8 }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ===== LOGO MARQUEE ===== */}
      <section
        className="overflow-hidden"
        style={{ background: "#111714", position: "relative", zIndex: 10, padding: "40px 0" }}
      >
        <div className="overflow-hidden">
          <div className="flex gap-8 items-center w-max animate-marquee" style={{ animationDuration: '30s' }}>
            {[...Array(2)].flatMap((_, dupeIdx) =>
              networkLogos.map((logo, i) => (
                <div
                  key={`${dupeIdx}-${i}`}
                  className="flex-shrink-0 h-16 px-6 rounded-xl border border-white/10 bg-black flex items-center justify-center"
                >
                  <img src={logo.src} alt={logo.alt} className="h-10 w-auto object-contain opacity-80" />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ===== 4. TEAM — near-black, rectangular photos ===== */}
      <section style={{ background: "#111714", position: "relative", zIndex: 10, padding: "70px 24px 140px" }}>
        <ScrollReveal className="max-w-5xl mx-auto text-center relative z-10" direction="fadeOnly">
          <h2 className="text-[32px] md:text-[36px] font-semibold tracking-wide" style={{ color: "#FFFFFF" }}>
            Built by <strong style={{ color: "#86EFAC" }}>builders</strong>
          </h2>
          <div className="mt-14 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
            {teamMembers.map((f) => (
              <Link
                key={f.name}
                to="/team"
                className="flex flex-col items-center gap-5 p-6 rounded-2xl transition-all duration-300 hover:bg-white/[0.08] hover:-translate-y-2 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "0.5px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="w-[180px] h-[220px] rounded-2xl overflow-hidden">
                  <img src={f.avatar} alt={f.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>{f.name}</div>
                  <p
                    className="text-sm mt-1 max-w-[200px]"
                    style={{ color: "#CBD5E1", fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                  >
                    "{f.quote}"
                  </p>
                  <div className="text-xs mt-2 uppercase tracking-[2px]" style={{ color: "#64748B" }}>
                    Co-founder · {f.school}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/team" className="inline-block mt-12 text-sm font-semibold transition-colors group" style={{ color: "#86EFAC" }}>
            Meet the team <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </ScrollReveal>
      </section>

      {/* ===== 5. MOMENTS — warm off-white, infinite marquee ===== */}
      <section style={{ background: "#FAF9F6", position: "relative", zIndex: 10, padding: "140px 24px" }} className="overflow-hidden">
        <LightParticleReveal />
        <div className="relative" style={{ zIndex: 10 }}>
          <ScrollReveal direction="up" className="max-w-5xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: "#1E293B" }}>Moments</h2>
          </ScrollReveal>
          <div
            className="relative w-full"
            onMouseEnter={() => setMarqueePaused(true)}
            onMouseLeave={() => setMarqueePaused(false)}
          >
            <div
              className="flex gap-6 marquee-track"
              style={{ animationPlayState: marqueePaused ? "paused" : "running" }}
            >
              {[...momentImages, ...momentImages, ...momentImages].map((img, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 rounded-2xl overflow-hidden transition-transform duration-500 ease-out hover:scale-105 hover:z-10 relative"
                  style={{ width: "400px", height: "280px", backgroundColor: "#E8E5E0" }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. INSIGHTS — warm gray ===== */}
      <section className="px-6 dot-grid-bg" style={{ background: "#F3F1ED", position: "relative", zIndex: 10, padding: "140px 24px" }}>
        <ScrollReveal className="container mx-auto max-w-4xl relative z-10" direction="scaleIn">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="text-[32px] md:text-[36px] font-semibold" style={{ color: "#1E293B" }}>
              How we <strong className="text-primary-dark">think</strong>
            </h2>
            <Link to="/think" className="text-sm font-semibold text-primary-dark hover:text-primary-darkest transition-colors group">
              All articles <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Featured article */}
          <ScrollReveal className="mb-8">
            <Link
              to="/think/why-we-started-woodo"
              className="block rounded-2xl overflow-hidden card-hover group"
              style={{ background: "#FAF9F6", border: "0.5px solid #E8E5E0" }}
            >
              <div className="flex flex-col md:flex-row" style={{ minHeight: "280px" }}>
                <div className="w-full md:w-1/2 overflow-hidden" style={{ minHeight: "200px" }}>
                  <img src={articleHeroWoodo} alt="Why We Started Woodo" className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col justify-center flex-1">
                  <div className="flex gap-2 mb-4">
                    <span className="inline-block w-fit px-3 py-1 rounded-lg text-xs font-semibold bg-primary/10 text-primary-dark">Founding</span>
                    <span className="inline-block w-fit px-3 py-1 rounded-lg text-xs font-semibold" style={{ background: "rgba(251,191,36,0.15)", color: "#92400E" }}>Manifesto</span>
                  </div>
                  <h3 className="text-[22px] font-semibold" style={{ color: "#1E293B" }}>Why We Started Woodo</h3>
                  <p className="text-sm mt-3 max-w-sm" style={{ color: "#4B5563" }}>
                    The origin story of a conviction: that the world's most talented young people deserve more than another course catalog.
                  </p>
                  <p className="text-xs mt-4" style={{ color: "#94A3B8" }}>5 min read · Mar 2026</p>
                </div>
              </div>
            </Link>
          </ScrollReveal>

        </ScrollReveal>
      </section>

      {/* ===== 7. CTA STRIP — deep forest green ===== */}
      <section
        className="text-center relative overflow-hidden"
        style={{ background: "#0D3320", position: "relative", zIndex: 10, padding: "100px 24px" }}
      >
        <ScrollReveal direction="fadeOnly">
          <h2 className="text-[32px] md:text-[36px] font-semibold tracking-wide relative z-10" style={{ color: "#FFFFFF" }}>
            Ready to build something that <strong style={{ color: "#FBBF24" }}>matters</strong>?
          </h2>
          <MagneticButton
            to="/apply"
            className="inline-block mt-10 font-semibold rounded-full transition-all active:scale-[0.97] relative z-10 cta-glow"
            style={{
              background: "#FBBF24",
              color: "#1E293B",
              fontSize: "16px",
              fontWeight: 600,
              padding: "16px 36px",
              border: "none",
            }}
          >
            Enter the arena
          </MagneticButton>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Index;

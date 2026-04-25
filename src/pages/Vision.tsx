import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";

import visionHero1 from "../assets/vision-hero-1.webp";
import visionHero2 from "../assets/vision-hero-2.webp";
import visionHero3 from "../assets/vision-hero-3.webp";
import visionHero4 from "../assets/vision-hero-4.webp";
import convictionImg1 from "../assets/vision-conviction-1.png";
import convictionImg2 from "../assets/vision-conviction-2.png";
import visionLaborMarket from "../assets/vision-labor-market.png";

const convictions = [
  { num: "01", border: "border-primary-dark", title: "Democratize invention.", desc: "For most of history, turning an idea into a real product belonged to a narrow elite — those with years of technical training and institutional access. AI has dismantled that wall. We exist to make sure the next generation actually walks through the opening — so that building, not just learning, becomes the default for every ambitious young person.", img: convictionImg1 },
  { num: "02", border: "border-secondary-dark", title: "Train agency, not tool fluency.", desc: "Using AI is not the same as creating with it. We don't teach students to operate chatbots; we teach them to identify real problems, design solutions, ship working prototypes, and iterate under real feedback. The goal is a new generation that can collaborate with AI, think independently, and make sound judgments in complex situations — the form of competitiveness that doesn't expire when the tools change.", img: convictionImg2 },
  { num: "03", border: "border-accent-dark", title: "Make every project count.", desc: "At Woodo.ai, education is not a course completed or a skill acquired. It is a full build loop — from problem to demo to real users to published work — that leaves behind something tangible: a product a hiring manager can open, a project an admissions officer will remember, a portfolio that compounds into a real advantage in a world where credentials alone no longer signal capability." },
];

const Vision = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(false);
  const darkSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = darkSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDark(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="page-enter pt-20"
      style={{
        backgroundColor: isDark ? '#111714' : 'transparent',
        transition: 'background-color 0.8s ease',
      }}
    >
      {/* Opening — white + blue glow */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 md:left-[38%] md:translate-x-0 z-0">
          <img src={visionHero1} alt="" loading="eager" decoding="async" fetchPriority="high" className="w-28 md:w-40 lg:w-48 rounded-lg shadow-lg vision-fade" style={{ animationDelay: "200ms" }} />
        </div>
        <div className="absolute top-[20%] left-[2%] md:left-[5%] z-0">
          <img src={visionHero2} alt="" loading="eager" decoding="async" fetchPriority="high" className="w-32 md:w-48 lg:w-56 rounded-lg shadow-lg vision-fade" style={{ animationDelay: "400ms" }} />
        </div>
        <div className="absolute top-[30%] right-[2%] md:right-[5%] z-0">
          <img src={visionHero3} alt="" loading="eager" decoding="async" fetchPriority="high" className="w-28 md:w-40 lg:w-48 rounded-lg shadow-lg vision-fade" style={{ animationDelay: "600ms" }} />
        </div>
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/4 z-0">
          <img src={visionHero4} alt="" loading="eager" decoding="async" fetchPriority="high" className="w-36 md:w-48 lg:w-56 rounded-lg shadow-lg vision-fade" style={{ animationDelay: "800ms" }} />
        </div>

        <div className="relative z-10 text-center">
          <ScrollReveal direction="up">
            <h1 className="hero-title text-foreground">
              <strong className="text-primary-dark font-bold">Invention</strong> should not
              <br />
              belong to the few.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">We exist to make sure it doesn't.</p>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* What We Believe — scroll-triggered dark background */}
      <section ref={darkSectionRef} className="py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <ScrollReveal className="w-full md:w-1/2" direction="left">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src={visionLaborMarket} alt="Labor market signals — AI skills in demand" className="w-full h-auto object-cover" />
            </div>
          </ScrollReveal>
          <div className="w-full md:w-1/2 space-y-6 text-lg">
            <ScrollReveal>
              <p className={`transition-colors duration-700 ${isDark ? 'text-gray-300' : 'text-muted-foreground'}`}>
                <span className={`float-left text-7xl font-bold mr-3 leading-[0.8] mt-1 transition-colors duration-700 ${isDark ? 'text-primary-light' : 'text-primary-dark'}`}>AI</span> has democratized capability. Anyone can build. The question is: what should be built?
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <p className={`transition-colors duration-700 ${isDark ? 'text-gray-300' : 'text-muted-foreground'}`}>Education systems are still training people to optimize for known answers. The future belongs to those who can turn ideas into real things.</p>
            </ScrollReveal>
            <ScrollReveal>
              <p className={`transition-colors duration-700 ${isDark ? 'text-gray-300' : 'text-muted-foreground'}`}>The labor market is already repricing for this in real time. The world's most sophisticated employers — top hedge funds, frontier startups, research labs — have stopped hiring for what candidates know, and started hiring for what they've built. Only those who cross from using AI to building with it will belong in what comes next.</p>
            </ScrollReveal>
            <ScrollReveal>
              <p className={`transition-colors duration-700 ${isDark ? 'text-gray-300' : 'text-muted-foreground'}`}>We call that capability <strong className={`transition-colors duration-700 ${isDark ? 'text-white' : 'text-foreground'}`}>agency</strong>. Woodo.ai exists to train it.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Convictions — accordion hover */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-12">Our Vision</h2>
          </ScrollReveal>
          <div className="space-y-2">
            {convictions.map((c, i) => {
              const isExpanded = hoveredIndex === i;
              return (
                <div
                  key={c.title}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`rounded-2xl transition-all duration-500 ease-out cursor-pointer ${isExpanded ? 'bg-warm-white p-8 shadow-sm' : 'p-4'}`}
                >
                  <div className={`flex items-center gap-4 ${i % 2 === 1 ? 'justify-end' : ''}`}>
                    <span className={`text-2xl font-bold transition-colors duration-300 ${isExpanded ? 'text-primary-dark' : 'text-muted-foreground/40'}`}>{c.num}</span>
                    <div className={`w-px h-6 transition-colors duration-300 ${isExpanded ? c.border.replace('border-', 'bg-') : 'bg-muted-foreground/20'}`} />
                    <h3 className={`text-xl md:text-2xl font-semibold tracking-tight transition-colors duration-300 ${isExpanded ? 'text-foreground' : 'text-muted-foreground'}`}>{c.title}</h3>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-out ${isExpanded ? 'max-h-[600px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}
                  >
                    <div className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 items-center`}>
                      <div className="flex-1">
                        <div className={`border-l-4 ${c.border} pl-8 py-2`}>
                          <p className="text-muted-foreground">{c.desc}</p>
                        </div>
                      </div>
                      {c.img && (
                        <div className="flex-1 max-w-sm">
                          <img src={c.img} alt={c.title} className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-lg" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="py-20 md:py-28 px-6 text-center dark-section-glow">
        <ScrollReveal>
          <p className="text-xl md:text-2xl font-semibold text-white tracking-tight relative z-10">If this resonates, we'd like to <strong className="text-primary-light">meet you</strong>.</p>
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

export default Vision;

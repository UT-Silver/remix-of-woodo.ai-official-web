import { useState } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import ImagePlaceholder from "../components/ImagePlaceholder";
import CountUp from "../components/CountUp";
import visionHero1 from "../assets/vision-hero-1.png";
import visionHero2 from "../assets/vision-hero-2.png";
import visionHero3 from "../assets/vision-hero-3.png";
import visionHero4 from "../assets/vision-hero-4.png";
import convictionImg1 from "../assets/vision-conviction-1.png";
import convictionImg2 from "../assets/vision-conviction-2.png";

const convictions = [
  { num: "01", border: "border-primary-dark", title: "Democratize invention.", desc: "For most of history, turning an idea into a real product belonged to a narrow elite — those with years of technical training and institutional access. AI has dismantled that wall. We exist to make sure the next generation actually walks through the opening — so that building, not just learning, becomes the default for every ambitious young person.", imgVariant: "green" as const, img: convictionImg1 },
  { num: "02", border: "border-secondary-dark", title: "Train agency, not tool fluency.", desc: "Using AI is not the same as creating with it. We don't teach students to operate chatbots; we teach them to identify real problems, design solutions, ship working prototypes, and iterate under real feedback. The goal is a new generation that can collaborate with AI, think independently, and make sound judgments in complex situations — the form of competitiveness that doesn't expire when the tools change.", imgVariant: "blue" as const, img: convictionImg2 },
  { num: "03", border: "border-accent-dark", title: "Make every project count.", desc: "At Woodo.ai, education is not a course completed or a skill acquired. It is a full build loop — from problem to demo to real users to published work — that leaves behind something tangible: a product a hiring manager can open, a project an admissions officer will remember, a portfolio that compounds into a real advantage in a world where credentials alone no longer signal capability.", imgVariant: "neutral" as const },
];

const Vision = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className="page-enter pt-20">
      {/* Opening — white + blue glow */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden">
        {/* Photo top-center */}
        <ScrollReveal direction="fadeOnly" delay={200} className="absolute top-[5%] left-1/2 -translate-x-1/2 md:left-[38%] md:translate-x-0 z-0">
          <img src={visionHero1} alt="" className="w-28 md:w-40 lg:w-48 rounded-lg shadow-lg" />
        </ScrollReveal>
        {/* Photo left */}
        <ScrollReveal direction="fadeOnly" delay={400} className="absolute top-[20%] left-[2%] md:left-[5%] z-0">
          <img src={visionHero2} alt="" className="w-32 md:w-48 lg:w-56 rounded-lg shadow-lg" />
        </ScrollReveal>
        {/* Photo right */}
        <ScrollReveal direction="fadeOnly" delay={600} className="absolute top-[30%] right-[2%] md:right-[5%] z-0">
          <img src={visionHero3} alt="" className="w-28 md:w-40 lg:w-48 rounded-lg shadow-lg" />
        </ScrollReveal>
        {/* Photo bottom-center */}
        <ScrollReveal direction="fadeOnly" delay={800} className="absolute bottom-[5%] left-1/2 -translate-x-1/4 z-0">
          <img src={visionHero4} alt="" className="w-36 md:w-48 lg:w-56 rounded-lg shadow-lg" />
        </ScrollReveal>

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

      {/* What We Believe — warm off-white */}
      <section className="py-20 md:py-28 px-6 bg-warm-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start">
          <ScrollReveal className="flex-1 md:sticky md:top-32" direction="left">
            <ImagePlaceholder variant="blue" className="w-full h-64 md:h-80" label="Editorial Image" />
          </ScrollReveal>
          <ScrollReveal className="flex-1 space-y-6 text-lg text-muted-foreground">
            <p>
              <span className="float-left text-7xl font-bold text-primary-dark mr-3 leading-[0.8] mt-1">A</span>I has democratized capability. Anyone can build. The question is: what should be built?
            </p>
            <p>Education systems are still training people to optimize for known answers. The future belongs to those who can turn ideas into real things.</p>
            <p>The labor market is already repricing for this in real time. The world's most sophisticated employers — top hedge funds, frontier startups, research labs — have stopped hiring for what candidates know, and started hiring for what they've built. Only those who cross from using AI to building with it will belong in what comes next.</p>
            <p>We call that capability <strong className="text-foreground">agency</strong>. Woodo.ai exists to train it.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Strip — cool gray + dot grid */}
      <section className="py-16 px-6 bg-cool-gray dot-grid-bg">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center relative z-10">
          {[
            { value: 3, label: "Co-founders" },
            { value: 3, label: "Cities" },
            { value: 1, label: "Mission" },
          ].map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 150}>
              <div className="py-8">
                <div className="text-4xl md:text-5xl font-bold text-primary-dark">
                  <CountUp end={stat.value} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Convictions — alternating white / warm-white */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-16">Our Vision</h2>
          </ScrollReveal>
          <div className="space-y-24">
          {convictions.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 150} direction={i % 2 === 0 ? "left" : "right"}>
              <div className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-10 items-center p-8 rounded-2xl ${i % 2 === 0 ? "bg-background" : "bg-warm-white"}`}>
                <div className="flex-1">
                  <div className="relative">
                    <span className="absolute -top-6 -left-2 text-7xl font-bold text-primary-lightest select-none">{c.num}</span>
                    <div className={`border-l-4 ${c.border} pl-8 py-2 relative z-10`}>
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">{c.title}</h3>
                      <p className="mt-3 text-muted-foreground">{c.desc}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 max-w-sm">
                  {c.img ? (
                    <img src={c.img} alt={c.title} className="w-full h-56 md:h-64 object-cover rounded-2xl shadow-lg" />
                  ) : (
                    <ImagePlaceholder variant={c.imgVariant} className="w-full h-56 md:h-64" label="Visual" aspectRatio="16/9" />
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
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

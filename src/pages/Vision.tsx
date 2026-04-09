import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import ImagePlaceholder from "../components/ImagePlaceholder";
import CountUp from "../components/CountUp";
import HeroParticleReveal from "../components/HeroParticleReveal";
import visionHero1 from "../assets/vision-hero-1.png";
import visionHero2 from "../assets/vision-hero-2.png";
import visionHero3 from "../assets/vision-hero-3.png";
import visionHero4 from "../assets/vision-hero-4.png";

const convictions = [
  { num: "01", border: "border-primary-dark", title: "Output over preparation.", desc: "We measure progress in things shipped, not knowledge absorbed.", imgVariant: "green" as const },
  { num: "02", border: "border-secondary-dark", title: "AI as scaffold, not crutch.", desc: "We use AI to lower the floor and raise the ceiling — never to replace the thinking.", imgVariant: "blue" as const },
  { num: "03", border: "border-accent-dark", title: "Accompaniment over instruction.", desc: "Great builders aren't mass-produced. They're grown through sustained, genuine investment in the person.", imgVariant: "neutral" as const },
];

const Vision = () => {
  return (
    <div className="page-enter pt-20">
      {/* Opening — Build-style hero with black particles */}
      <section className="particle-reveal-zone relative w-full overflow-hidden bg-white" style={{ height: "70vh", minHeight: "480px" }}>
        <HeroParticleReveal color="black" />
        {/* Scattered photos */}
        <ScrollReveal direction="fadeOnly" delay={200} className="absolute top-[10%] left-[8%] md:left-[12%]" style={{ zIndex: 1 }}>
          <img src={visionHero1} alt="" className="w-32 md:w-48 lg:w-56 rounded-sm shadow-lg" />
        </ScrollReveal>
        <ScrollReveal direction="fadeOnly" delay={400} className="absolute top-[6%] right-[20%] md:right-[25%]" style={{ zIndex: 1 }}>
          <img src={visionHero2} alt="" className="w-28 md:w-40 lg:w-48 rounded-sm shadow-lg" />
        </ScrollReveal>
        <ScrollReveal direction="fadeOnly" delay={600} className="absolute bottom-[10%] right-[6%] md:right-[10%]" style={{ zIndex: 1 }}>
          <img src={visionHero3} alt="" className="w-32 md:w-44 lg:w-52 rounded-sm shadow-lg" />
        </ScrollReveal>
        <ScrollReveal direction="fadeOnly" delay={800} className="absolute bottom-[8%] left-[25%] md:left-[30%]" style={{ zIndex: 1 }}>
          <img src={visionHero4} alt="" className="w-36 md:w-48 lg:w-56 rounded-sm shadow-lg" />
        </ScrollReveal>

        <ScrollReveal className="absolute bottom-12 left-8 md:left-16 z-10 max-w-2xl" direction="up">
          <p className="text-xs uppercase tracking-[3px] mb-4 text-muted-foreground">Our Vision</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-foreground">
            <strong className="text-primary-dark font-bold">Invention</strong> should not belong to the few.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">We exist to make sure it doesn't.</p>
        </ScrollReveal>
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
        <div className="max-w-5xl mx-auto space-y-24">
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
                  <ImagePlaceholder variant={c.imgVariant} className="w-full h-56 md:h-64" label="Visual" aspectRatio="16/9" />
                </div>
              </div>
            </ScrollReveal>
          ))}
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

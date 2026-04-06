import ScrollReveal from "../components/ScrollReveal";
import ImagePlaceholder from "../components/ImagePlaceholder";

const founders = [
  {
    name: "Silver Yin", title: "Co-founder", school: "Columbia University",
    bio: "Silver left a conventional path to build what she believes is the most important educational intervention of the AI era — not teaching tools, but training the judgment to know what's worth building.",
  },
  {
    name: "David Dong", title: "Co-founder", school: "Peking University, Guanghua School of Management",
    bio: "David brings operational precision and deep knowledge of the Chinese education landscape. He believes execution discipline is what separates ideas from impact.",
  },
  {
    name: "Keer Wang", title: "Co-founder", school: "Columbia University, SIPA",
    bio: "Keer leads community and mentorship — the human infrastructure that makes transformation possible. She believes education without genuine relationship is just content delivery.",
  },
];

const Team = () => {
  return (
    <div className="page-enter pt-20">
      {/* Header — white + green glow */}
      <section className="py-20 md:py-28 px-6 text-center glow-green-tr dot-grid-bg">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[3px] text-muted-foreground mb-4 relative z-10">The Team</p>
          <h1 className="text-3xl md:text-4xl font-medium text-foreground relative z-10">
            <strong className="text-primary-dark font-bold">Builders</strong> who decided to build builders.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground relative z-10">Three co-founders, one conviction.</p>
        </ScrollReveal>
      </section>

      {/* Founders — zigzag, alternating bg */}
      <section className="pb-20 md:pb-28 px-6">
        <div className="max-w-5xl mx-auto">
          {founders.map((f, i) => (
            <div key={f.name}>
              <ScrollReveal delay={i * 150} direction={i % 2 === 0 ? "left" : "right"}>
                <div className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-10 items-center py-16 px-6 md:px-10 rounded-2xl ${i % 2 === 0 ? "bg-background" : "bg-cool-gray"}`}>
                  <div className="flex-shrink-0">
                    <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden group border-2 border-transparent hover:border-primary transition-colors duration-300">
                      <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                        <ImagePlaceholder
                          variant={i === 0 ? "green" : i === 1 ? "blue" : "neutral"}
                          className="w-full h-full"
                          label="Photo"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                    <h3 className="text-2xl md:text-3xl font-semibold text-foreground">{f.name}</h3>
                    <p className="text-xs text-muted-foreground mt-2 uppercase tracking-[2px]">{f.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{f.school}</p>
                    <p className="mt-5 text-muted-foreground">{f.bio}</p>
                  </div>
                </div>
              </ScrollReveal>
              {i < founders.length - 1 && <div className="section-divider my-2" />}
            </div>
          ))}
        </div>
      </section>

      {/* Network — warm off-white + dot grid */}
      <section className="py-20 md:py-28 px-6 bg-warm-white dot-grid-bg">
        <ScrollReveal className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-2xl font-semibold text-foreground">Our <strong className="text-primary-dark">network</strong></h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            We work with practitioners from leading AI labs, technology companies, research institutions, and startups.
          </p>
          <div className="mt-12 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-48 flex flex-col items-center gap-3 p-6 bg-background rounded-2xl border border-border card-hover">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <ImagePlaceholder variant="neutral" circle className="w-full h-full" label="TBA" />
                </div>
                <span className="text-xs text-muted-foreground text-center">Announced soon</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            We also partner with leading AI researchers, startup founders, and industry practitioners.
          </p>
        </ScrollReveal>
      </section>

      {/* Join — dark */}
      <section className="py-16 px-6 text-center dark-section-glow">
        <ScrollReveal>
          <p className="text-lg text-white font-semibold tracking-tight relative z-10">We're always looking for extraordinary people.</p>
          <a href="mailto:hello@woodo.ai" className="text-primary-light hover:text-primary transition-colors mt-2 inline-block relative z-10">
            hello@woodo.ai
          </a>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Team;

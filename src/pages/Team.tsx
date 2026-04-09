import { useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import ImagePlaceholder from "../components/ImagePlaceholder";
import avatarSilver from "../assets/avatar-silver.png";
import avatarDavid from "../assets/avatar-david.png";
import avatarKeer from "../assets/keer-gallery-4.png";
import davidGallery1 from "../assets/david-gallery-1.jpg";
import davidGallery2 from "../assets/david-gallery-2.jpg";
import davidGallery3 from "../assets/david-gallery-3.jpg";
import davidGallery4 from "../assets/david-gallery-4.jpg";
import davidGallery5 from "../assets/david-gallery-5.jpg";
import davidGallery6 from "../assets/david-gallery-6.jpg";
import keerGallery1 from "../assets/keer-gallery-1.png";
import keerGallery2 from "../assets/keer-gallery-2.jpg";
import keerGallery3 from "../assets/keer-gallery-3.jpg";

const founders = [
  {
    name: "Silver Yin", title: "Co-founder", school: "Columbia University",
    bio: "Silver left a conventional path to build what he believes is the most important educational intervention of the AI era — not teaching tools, but training the AI literacy to know what's worth building.",
    avatar: avatarSilver,
    gallery: [] as string[],
  },
  {
    name: "David Dong", title: "Co-founder", school: "Peking University, Guanghua School of Management",
    bio: "David brings operational precision and deep knowledge of the Chinese education landscape. He believes execution discipline is what separates ideas from impact.",
    avatar: avatarDavid,
    gallery: [davidGallery1, davidGallery2, davidGallery3, davidGallery4, davidGallery5, davidGallery6],
  },
  {
    name: "Keer Wang", title: "Co-founder", school: "Columbia University, SIPA",
    bio: "Keer leads community and mentorship — the human infrastructure that makes transformation possible. She believes education without genuine relationship is just content delivery.",
    avatar: avatarKeer,
    gallery: [keerGallery1, keerGallery2, keerGallery3, avatarKeer],
  },
];

const Team = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
                <div className={`rounded-2xl ${i % 2 === 0 ? "bg-background" : "bg-cool-gray"}`}>
                  <div className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-10 items-center py-16 px-6 md:px-10`}>
                    <div
                      className="flex-shrink-0"
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden group border-2 border-transparent hover:border-primary transition-colors duration-300 cursor-pointer">
                        <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                          <img
                            src={f.avatar}
                            alt={f.name}
                            className="w-full h-full object-cover"
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

                  {/* Expandable photo gallery */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                      maxHeight: hoveredIndex === i ? "280px" : "0px",
                      opacity: hoveredIndex === i ? 1 : 0,
                    }}
                  >
                    <div className="px-6 md:px-10 pb-8">
                      <p className="text-xs uppercase tracking-[2px] text-muted-foreground mb-4">Gallery</p>
                      <div className="overflow-hidden">
                        <div className="flex gap-4 items-center w-max animate-marquee" style={{ animationDuration: '18s' }}>
                          {[...Array(2)].flatMap((_, dupeIdx) => {
                            const items = f.gallery.length > 0
                              ? f.gallery
                              : Array.from({ length: 4 }, (_, j) => j);
                            return items.map((item, j) => (
                              <div
                                key={`${dupeIdx}-${j}`}
                                className="flex-shrink-0 h-48 rounded-xl overflow-hidden border border-border"
                              >
                                {typeof item === "string" ? (
                                  <img src={item} alt={`${f.name} #${j + 1}`} className="h-full w-auto object-contain" />
                                ) : (
                                  <div className="w-48 h-full">
                                    <ImagePlaceholder
                                      variant="neutral"
                                      className="w-full h-full"
                                      label={`${f.name.split(" ")[0]} #${j + 1}`}
                                    />
                                  </div>
                                )}
                              </div>
                            ));
                          })}
                        </div>
                      </div>
                    </div>
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

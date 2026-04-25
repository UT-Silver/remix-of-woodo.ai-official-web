import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import ImagePlaceholder from "../components/ImagePlaceholder";
import logoBytedance from "../assets/logo-bytedance.webp";
import logoAmazon from "../assets/logo-amazon.webp";
import logoBilibili from "../assets/logo-bilibili.webp";
import logoMeta from "../assets/logo-meta.webp";
import logoTencent from "../assets/logo-tencent.webp";
import logoOpenai from "../assets/logo-openai.webp";
import logoBcg from "../assets/logo-bcg.webp";
import logoCicc from "../assets/logo-cicc.webp";
import logoJpmorgan from "../assets/logo-jpmorgan.webp";
import logoAlibaba from "../assets/logo-alibaba.webp";
import logoDeutschebank from "../assets/logo-deutschebank.webp";

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
import avatarSilver from "../assets/avatar-silver.webp";
import avatarDavid from "../assets/avatar-david.webp";
import avatarKeer from "../assets/avatar-keer.webp";
import davidGallery1 from "../assets/david-gallery-1.webp";
import davidGallery2 from "../assets/david-gallery-2.webp";
import davidGallery3 from "../assets/david-gallery-3.webp";
import davidGallery4 from "../assets/david-gallery-4.webp";
import davidGallery5 from "../assets/david-gallery-5.webp";
import davidGallery6 from "../assets/david-gallery-6.webp";
import keerGallery1 from "../assets/keer-gallery-1.webp";
import keerGallery2 from "../assets/keer-gallery-2.webp";
import keerGallery3 from "../assets/keer-gallery-3.webp";
import keerGallery4 from "../assets/keer-gallery-4.webp";
import keerGallery5 from "../assets/keer-gallery-5.webp";
import silverGallery1 from "../assets/silver-gallery-1.webp";
import silverGallery2 from "../assets/silver-gallery-2.webp";
import silverGallery3 from "../assets/silver-gallery-3.webp";
import silverGallery4 from "../assets/silver-gallery-4.webp";
import silverGallery5 from "../assets/silver-gallery-5.webp";

const founders = [
  {
    name: "Silver Yin", title: "Co-founder", school: "Columbia University",
    bio: "Silver left a conventional path to build what he believes is the most important educational intervention of the AI era — not teaching tools, but training the AI literacy to know what's worth building.",
    avatar: avatarSilver,
    gallery: [silverGallery1, silverGallery2, silverGallery3, silverGallery4, silverGallery5],
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
    gallery: [keerGallery1, keerGallery2, keerGallery3, keerGallery4, keerGallery5],
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
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-foreground relative z-10">
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

      {/* Network — dark bg with particle effect */}
      <section className="py-20 md:py-28 px-6 bg-slate-dark dot-grid-bg-dark relative overflow-hidden">
        <ScrollReveal className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-2xl font-semibold text-white">Our <strong className="text-primary">network</strong></h2>
          <p className="mt-4 text-neutral-400 max-w-2xl">
            We work with practitioners from leading AI labs, technology companies, investment institutions, and startups.
          </p>
          <div className="mt-12 overflow-hidden">
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

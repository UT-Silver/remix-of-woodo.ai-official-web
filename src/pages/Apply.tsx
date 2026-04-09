import { useState } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import HeroParticleReveal from "../components/HeroParticleReveal";
import LightParticleReveal from "../components/LightParticleReveal";
import applyHeroBg from "../assets/apply-hero.png";
import wechatQr from "../assets/wechat-qr.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "What is Woodo.ai?", a: "Details coming soon. Reach out to hello@woodo.ai for a conversation." },
  { q: "Who is this for?", a: "Details coming soon. Reach out to hello@woodo.ai for a conversation." },
  { q: "Do I need coding experience?", a: "Details coming soon. Reach out to hello@woodo.ai for a conversation." },
  { q: "What's the time commitment?", a: "Details coming soon. Reach out to hello@woodo.ai for a conversation." },
  { q: "What will I walk away with?", a: "Details coming soon. Reach out to hello@woodo.ai for a conversation." },
  { q: "Can my parents learn more?", a: "Details coming soon. Reach out to hello@woodo.ai for a conversation." },
];

const qualifications = [
  "You're a top student, but you suspect that's not enough.",
  "You're curious about AI — not as a productivity hack, but as a creative medium.",
  "You're ready to build something real, with a team, under real constraints.",
];

const Apply = () => {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", wechat: "", stage: "", idea: "",
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.stage) newErrors.stage = "Please select one";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const isFieldActive = (field: string) => focused[field] || formData[field as keyof typeof formData];

  return (
    <div className="page-enter pt-20">
      {/* Header — white + green glow */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={applyHeroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <HeroParticleReveal />
        <div className="max-w-5xl mx-auto relative z-10">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[3px] text-white/60 mb-4">Apply</p>
            <h1 className="text-3xl md:text-4xl font-medium text-white">
              Build with <strong className="text-primary-light font-bold">us</strong>
            </h1>
            <p className="mt-4 text-lg text-white/70 max-w-xl">
              We're looking for the kind of people who'd rather build something imperfect than study something perfect.
            </p>
            <div className="mt-10 space-y-5">
              {qualifications.map((q) => (
                <div key={q} className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-primary-light mt-2.5 flex-shrink-0" />
                  <p className="text-white/70">{q}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Form — cool gray + dot grid texture */}
      <section className="py-16 px-6 bg-cool-gray dot-grid-bg-green relative overflow-hidden">
        <LightParticleReveal />
        <ScrollReveal className="max-w-lg mx-auto bg-background/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border relative z-10">
          {submitted ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🌿</span>
              </div>
              <svg width="48" height="48" viewBox="0 0 48 48" className="mx-auto mb-4">
                <circle cx="24" cy="24" r="22" fill="none" stroke="hsl(var(--primary-dark))" strokeWidth="2" opacity="0.2" />
                <path d="M14 24L22 32L34 16" fill="none" stroke="hsl(var(--primary-dark))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="checkmark-draw" />
              </svg>
              <h3 className="text-2xl font-semibold text-foreground tracking-tight">Thank you. We'll be in touch.</h3>
              <Link to="/think" className="text-sm font-semibold text-primary-dark mt-6 inline-block hover:text-primary transition-colors group">
                Meanwhile, read our thinking <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              {[
                { label: "Full Name", field: "name", type: "text" },
                { label: "Email", field: "email", type: "email" },
                { label: "Phone", field: "phone", type: "tel" },
                { label: "WeChat ID", field: "wechat", type: "text" },
              ].map(({ label, field, type }) => (
                <div key={field} className="relative">
                  <label className={`absolute left-0 transition-all duration-200 pointer-events-none ${isFieldActive(field) ? "text-[11px] text-primary-dark -top-5" : "text-sm text-muted-foreground top-3"}`}>
                    {label}
                  </label>
                  <input
                    type={type}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => update(field, e.target.value)}
                    onFocus={() => setFocused((p) => ({ ...p, [field]: true }))}
                    onBlur={() => setFocused((p) => ({ ...p, [field]: false }))}
                    className="w-full py-3 bg-transparent border-b border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                    style={{ height: "48px" }}
                  />
                  {errors[field] && <p className="text-xs mt-1 text-destructive">{errors[field]}</p>}
                </div>
              ))}

              <div className="relative">
                <label className={`absolute left-0 transition-all duration-200 pointer-events-none ${isFieldActive("stage") ? "text-[11px] text-primary-dark -top-5" : "text-sm text-muted-foreground top-3"}`}>
                  Which describes you?
                </label>
                <select
                  value={formData.stage}
                  onChange={(e) => update("stage", e.target.value)}
                  onFocus={() => setFocused((p) => ({ ...p, stage: true }))}
                  onBlur={() => setFocused((p) => ({ ...p, stage: false }))}
                  className="w-full py-3 bg-transparent border-b border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none"
                  style={{ height: "48px" }}
                >
                  <option value=""></option>
                  <option>High school senior</option>
                  <option>University freshman</option>
                  <option>Sophomore</option>
                  <option>Other</option>
                </select>
                {errors.stage && <p className="text-xs mt-1 text-destructive">{errors.stage}</p>}
              </div>

              <div className="relative">
                <label className="block text-[11px] text-primary-dark mb-2">If you could build anything, what would it be?</label>
                <textarea
                  value={formData.idea}
                  onChange={(e) => update("idea", e.target.value.slice(0, 200))}
                  maxLength={200}
                  placeholder="One sentence is enough."
                  rows={3}
                  className="w-full py-3 bg-transparent border-b border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">{formData.idea.length}/200</p>
              </div>

              <button type="submit" className="w-full bg-accent text-accent-foreground font-semibold py-3.5 rounded-full hover:bg-accent-dark hover:text-white hover:shadow-lg hover:shadow-accent/25 transition-all active:scale-[0.97] cta-glow">
                Express Interest
              </button>
            </form>
          )}
        </ScrollReveal>
      </section>

      {/* FAQ — warm off-white */}
      <section className="py-20 md:py-28 px-6 bg-warm-white">
        <ScrollReveal className="max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold text-foreground mb-8">Questions</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border">
                <AccordionTrigger className="text-left text-foreground font-semibold py-5 hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </section>

      {/* Contact — dark */}
      <section className="py-16 px-6 text-center dark-section-glow">
        <ScrollReveal>
          <p className="text-white font-semibold relative z-10">Prefer to talk?</p>
          <a href="mailto:hello@woodo.ai" className="text-primary-light hover:text-primary transition-colors inline-block mt-1 relative z-10">
            hello@woodo.ai
          </a>
          <div className="mt-8 max-w-xs mx-auto rounded-2xl p-6 border relative z-10" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
            <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>WeChat</p>
            <div className="w-24 h-24 rounded-lg mx-auto flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>QR Code</span>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Apply;

import { useEffect, useCallback, useRef } from "react";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const introLogoRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    requestAnimationFrame(() => {
      if (introLogoRef.current) introLogoRef.current.style.visibility = "hidden";
      const nav = document.querySelector(".nav-bar") as HTMLElement;
      if (nav) {
        nav.style.opacity = "1";
        nav.style.pointerEvents = "auto";
      }
      requestAnimationFrame(() => {
        introLogoRef.current?.remove();
        subtitleRef.current?.remove();
        if (overlayRef.current) overlayRef.current.style.display = "none";
        onComplete();
      });
    });
  }, [onComplete]);

  useEffect(() => {
    const introLogo = introLogoRef.current;
    const overlay = overlayRef.current;
    const subtitle = subtitleRef.current;
    if (!introLogo || !overlay || !subtitle) return;

    // Phase 1: fade in logo at 300ms
    const t1 = setTimeout(() => {
      introLogo.style.transition = "opacity 0.4s ease";
      introLogo.style.opacity = "1";
    }, 300);

    // Phase 2: fade in subtitle at 700ms
    const t2 = setTimeout(() => {
      subtitle.style.opacity = "1";
    }, 700);

    // Phase 3: transition to nav position at 2300ms
    const t3 = setTimeout(() => {
      subtitle.style.transition = "opacity 0.2s ease";
      subtitle.style.opacity = "0";

      const navBar = document.querySelector(".nav-bar") as HTMLElement;
      const realLogo = document.querySelector(".nav-logo") as HTMLElement;
      if (!realLogo || !navBar) { finish(); return; }

      // Measure real nav logo position precisely
      navBar.style.opacity = "0.001";
      navBar.style.pointerEvents = "none";
      void realLogo.offsetHeight; // force layout recalc

      const targetRect = realLogo.getBoundingClientRect();
      const targetStyles = getComputedStyle(realLogo);
      const targetFontSize = targetStyles.fontSize; // exact string e.g. "20px"

      navBar.style.opacity = "0";

      // Copy ALL text-related styles from the nav logo for perfect match
      introLogo.style.fontFamily = targetStyles.fontFamily;
      introLogo.style.fontWeight = targetStyles.fontWeight;
      introLogo.style.letterSpacing = targetStyles.letterSpacing;
      introLogo.style.lineHeight = targetStyles.lineHeight;

      // Vertical correction: negative = move up, positive = move down
      const verticalCorrection = -2;

      // Animate using top/left/fontSize
      introLogo.style.transition = [
        "top 1.2s cubic-bezier(0.65, 0, 0.35, 1)",
        "left 1.2s cubic-bezier(0.65, 0, 0.35, 1)",
        "transform 1.2s cubic-bezier(0.65, 0, 0.35, 1)",
        "font-size 1.2s cubic-bezier(0.65, 0, 0.35, 1)",
      ].join(", ");

      introLogo.style.top = (targetRect.top + verticalCorrection) + "px";
      introLogo.style.left = targetRect.left + "px";
      introLogo.style.transform = "translate(0, 0)";
      introLogo.style.fontSize = targetFontSize;

      // Transition colors
      const spans = introLogo.querySelectorAll("span");
      spans.forEach((s) => {
        s.style.transition = "color 1.2s ease";
      });
      if (spans[0]) spans[0].style.color = "#22C55E";
      if (spans[1]) spans[1].style.color = "#22C55E";
      if (spans[2]) spans[2].style.color = "#FBBF24";
      if (spans[3]) spans[3].style.color = "#22C55E";

      // Slide green overlay up
      const bg = overlay.querySelector(".splash-bg") as HTMLElement;
      if (bg) {
        bg.style.transition = "transform 1.2s cubic-bezier(0.65, 0, 0.35, 1)";
        bg.style.transform = "translateY(-100%)";
      }

      // Use transitionend for precise swap timing
      const onEnd = () => {
        introLogo.removeEventListener("transitionend", onEnd);
        finish();
      };
      introLogo.addEventListener("transitionend", onEnd, { once: true });
    }, 2300);

    // Fallback timeout in case transitionend doesn't fire
    const t4 = setTimeout(finish, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [finish]);

  // Skip on click
  const skip = useCallback(() => {
    if (doneRef.current) return;
    const introLogo = introLogoRef.current;
    const overlay = overlayRef.current;

    if (introLogo && overlay) {
      const navBar = document.querySelector(".nav-bar") as HTMLElement;
      const realLogo = document.querySelector(".nav-logo") as HTMLElement;
      if (realLogo && navBar) {
        navBar.style.opacity = "0.001";
        void realLogo.offsetHeight;
        const rect = realLogo.getBoundingClientRect();
        const targetStyles = getComputedStyle(realLogo);
        navBar.style.opacity = "0";

        introLogo.style.fontFamily = targetStyles.fontFamily;
        introLogo.style.fontWeight = targetStyles.fontWeight;
        introLogo.style.letterSpacing = targetStyles.letterSpacing;
        introLogo.style.lineHeight = targetStyles.lineHeight;

        const verticalCorrection = -2;
        introLogo.style.transition = "all 0.3s ease";
        introLogo.style.top = (rect.top + verticalCorrection) + "px";
        introLogo.style.left = rect.left + "px";
        introLogo.style.transform = "translate(0, 0)";
        introLogo.style.fontSize = targetStyles.fontSize;

        const bg = overlay.querySelector(".splash-bg") as HTMLElement;
        if (bg) {
          bg.style.transition = "transform 0.4s ease";
          bg.style.transform = "translateY(-100%)";
        }
      }
    }

    setTimeout(finish, 450);
  }, [finish]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] cursor-pointer"
      onClick={skip}
    >
      <div className="splash-bg absolute inset-0" style={{ background: "#16A34A" }} />

      <div
        ref={introLogoRef}
        style={{
          position: "fixed",
          zIndex: 10000,
          fontSize: "48px",
          fontWeight: 700,
          letterSpacing: "-1px",
          whiteSpace: "nowrap",
          lineHeight: 1.2,
          opacity: 0,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <span style={{ color: "#FFFFFF" }}>悟动</span>
        <span style={{ color: "#FFFFFF" }}>{" "}</span>
        <span style={{ color: "#FEF9C3", fontWeight: 700 }}>woodo.</span>
        <span style={{ color: "#FFFFFF", fontWeight: 700 }}>ai</span>
      </div>

      <div
        ref={subtitleRef}
        style={{
          position: "fixed",
          zIndex: 10000,
          top: "calc(50% + 40px)",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "12px",
          letterSpacing: "4px",
          textTransform: "uppercase" as const,
          color: "#86EFAC",
          fontWeight: 500,
          fontFamily: "'Playfair Display', serif",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        wisdom in motion
      </div>
    </div>
  );
};

export default SplashScreen;

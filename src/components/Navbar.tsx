import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Wordmark from "./Wordmark";

const navLinks = [
  { label: "Vision", to: "/vision" },
  { label: "Team", to: "/team" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Insights", to: "/insights" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [onHero, setOnHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // Check if we're still within the hero section (approx 100vh)
      setOnHero(window.scrollY < window.innerHeight - 80);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only show hero-aware styling on homepage
  const isHome = location.pathname === "/";
  const heroMode = isHome && onHero && !scrolled;

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={
          scrolled
            ? {
                background: "rgba(250,249,246,0.85)",
                borderBottom: "0.5px solid rgba(226,232,240,0.5)",
                WebkitBackdropFilter: "blur(16px)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
              }
            : heroMode
            ? { background: "transparent" }
            : { background: "transparent" }
        }
      >
        <div className="container mx-auto flex items-center justify-between h-16 md:h-20" style={{ padding: "0 5%" }}>
          <Wordmark variant={heroMode ? "dark" : "light"} size="sm" />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center" style={{ gap: "40px" }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative transition-colors group"
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  letterSpacing: "0.5px",
                  color: heroMode
                    ? location.pathname === link.to
                      ? "#FFFFFF"
                      : "rgba(255,255,255,0.8)"
                    : location.pathname === link.to
                    ? "#1E293B"
                    : "#4B5563",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = heroMode ? "#FFFFFF" : "#16A34A";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = heroMode
                    ? location.pathname === link.to
                      ? "#FFFFFF"
                      : "rgba(255,255,255,0.8)"
                    : location.pathname === link.to
                    ? "#1E293B"
                    : "#4B5563";
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 right-0 h-[2px] transition-transform duration-300 origin-center"
                  style={{
                    background: heroMode ? "#86EFAC" : "#22C55E",
                    transform: location.pathname === link.to ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </Link>
            ))}
            <Link
              to="/apply"
              className="font-semibold rounded-full transition-all active:scale-[0.97] cta-glow"
              style={{
                background: "#FBBF24",
                color: "#1E293B",
                border: "none",
                padding: "10px 24px",
                fontSize: "14px",
                fontWeight: 600,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#D97706";
                (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#FBBF24";
                (e.currentTarget as HTMLElement).style.color = "#1E293B";
              }}
            >
              Apply
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-0.5 transition-transform"
              style={{ background: heroMode ? "#FFFFFF" : "#1E293B", transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }}
            />
            <span
              className="block w-5 h-0.5 transition-opacity"
              style={{ background: heroMode ? "#FFFFFF" : "#1E293B", opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-0.5 transition-transform"
              style={{ background: heroMode ? "#FFFFFF" : "#1E293B", transform: menuOpen ? "-rotate(45deg) translateY(-8px)" : "none" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8" style={{ background: "#111714" }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-2xl font-semibold transition-colors"
              style={{ color: "#FFFFFF" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/apply"
            className="font-semibold text-lg rounded-full mt-4"
            style={{ background: "#FBBF24", color: "#1E293B", padding: "12px 32px" }}
          >
            Apply
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import Wordmark from "./Wordmark";

const Footer = () => {
  return (
    <footer style={{ background: "#111714", position: "relative", zIndex: 10 }}>
      <div className="container mx-auto" style={{ padding: "80px 5% 40px" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand + Tagline */}
          <div className="col-span-2 md:col-span-1">
            <Wordmark variant="dark" size="md" />
            <p
              className="mt-3"
              style={{
                color: "#475569",
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "16px",
              }}
            >
              Wisdom in Motion
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-xs font-semibold mb-4 uppercase tracking-[3px]" style={{ color: "#64748B" }}>
              Navigate
            </h4>
            <div className="flex flex-col gap-2.5">
              {["Vision", "Team", "Portfolio", "Insights", "Apply"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: "#94A3B8" }}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold mb-4 uppercase tracking-[3px]" style={{ color: "#64748B" }}>
              Connect
            </h4>
            <a href="mailto:hello@woodo.ai" className="text-sm transition-colors hover:text-white" style={{ color: "#94A3B8" }}>
              hello@woodo.ai
            </a>
            <div className="flex gap-4 mt-4">
              <a href="#" className="transition-colors hover:text-white" style={{ color: "#94A3B8" }} aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="transition-colors hover:text-white" style={{ color: "#94A3B8" }} aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="text-xs font-semibold mb-4 uppercase tracking-[3px]" style={{ color: "#64748B" }}>
              Subscribe
            </h4>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-0 py-2 bg-transparent border-b text-sm focus:outline-none transition-colors placeholder:text-[#64748B]"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "#CBD5E1" }}
              />
              <button
                type="submit"
                className="self-start mt-1 text-xs font-semibold uppercase tracking-[2px] transition-colors hover:text-white"
                style={{ color: "#94A3B8" }}
              >
                Subscribe →
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-xs text-center" style={{ color: "#475569" }}>
            New York · Beijing · Shanghai
          </p>
          <p className="text-xs text-center mt-1" style={{ color: "#475569" }}>
            © 2026 Woodo.ai ·{" "}
            <Link to="/privacy" className="hover:text-white transition-colors" style={{ color: "#475569" }}>
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link to="/terms" className="hover:text-white transition-colors" style={{ color: "#475569" }}>
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

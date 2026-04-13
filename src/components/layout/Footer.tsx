import { Link } from "react-router-dom";
import { Zap, Twitter, Linkedin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-auto">
      {/* Glass surface */}
      <div
        style={{
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(12px) saturate(180%)",
          WebkitBackdropFilter: "blur(12px) saturate(180%)",
        }}
        className="dark:bg-card/70"
      >
        <div className="container mx-auto px-4 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-2 space-y-4">
              <Link to="/" className="inline-flex items-center gap-2.5 group">
                <div
                  className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center
                    shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-200"
                >
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span
                  className="font-semibold text-xl"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  <span className="text-primary">Event</span>
                  <span className="text-foreground">Flow</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Transforming the campus event experience. Discover, join, and lead
                with India's most modern student platform.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center
                    text-muted-foreground hover:text-primary hover:border-primary/40
                    hover:bg-primary/5 transition-all duration-200"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center
                    text-muted-foreground hover:text-primary hover:border-primary/40
                    hover:bg-primary/5 transition-all duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Platform */}
            <div className="space-y-4">
              <h4
                className="text-xs font-semibold text-foreground uppercase tracking-widest"
                style={{ letterSpacing: "0.1em" }}
              >
                Platform
              </h4>
              <ul className="space-y-3">
                {[
                  { to: "/events", label: "Browse Events" },
                  { to: "/calendar", label: "Event Calendar" },
                  { to: "/dashboard", label: "Dashboard" },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal & Support */}
            <div className="space-y-4">
              <h4
                className="text-xs font-semibold text-foreground uppercase tracking-widest"
                style={{ letterSpacing: "0.1em" }}
              >
                Legal &amp; Support
              </h4>
              <ul className="space-y-3">
                {[
                  { to: "/privacy", label: "Privacy Policy" },
                  { to: "/terms", label: "Terms of Service" },
                  { to: "/cookies", label: "Cookie Policy" },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="mailto:support@eventflow.edu"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} EventFlow. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              Made with{" "}
              <Heart className="w-3.5 h-3.5 text-destructive fill-destructive" aria-hidden />{" "}
              for students
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

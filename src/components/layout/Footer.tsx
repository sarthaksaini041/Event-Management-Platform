import { Link } from "react-router-dom";
import { Zap, Github, Twitter, Linkedin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-secondary/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center justify-center md:justify-start gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">
                <span className="text-gradient">Event</span>
                <span className="text-foreground">Flow</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto md:mx-0">
              Transforming the campus event experience. Discover, join, and lead with India's most modern student platform.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-background border border-border/50 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300 group shadow-sm">
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-2xl bg-background border border-border/50 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all duration-300 group shadow-sm">
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-6">
            <h4 className="font-display font-bold text-foreground text-sm uppercase tracking-[0.2em]">Platform</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center justify-center md:justify-start gap-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary group-hover:scale-150 transition-all"></div>
                  Browse Events
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center justify-center md:justify-start gap-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary group-hover:scale-150 transition-all"></div>
                  Event Calendar
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center justify-center md:justify-start gap-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary group-hover:scale-150 transition-all"></div>
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="font-display font-bold text-foreground text-sm uppercase tracking-[0.2em]">Legal & Support</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center justify-center md:justify-start gap-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary group-hover:scale-150 transition-all"></div>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center justify-center md:justify-start gap-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary group-hover:scale-150 transition-all"></div>
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@eventflow.edu" className="text-muted-foreground hover:text-primary transition-all duration-300 flex items-center justify-center md:justify-start gap-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary group-hover:scale-150 transition-all"></div>
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
            © 2025 EventFlow. Engineered with precision.
          </p>
          <div className="flex items-center gap-6">
             <p className="text-xs font-medium text-muted-foreground flex items-center gap-2 uppercase tracking-wider">
              Made with <Heart className="w-4 h-4 text-destructive fill-destructive animate-pulse" /> for students
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  QrCode,
  Award,
  Bell,
  Star,
  ArrowRight,
  Users,
  Sparkles,
  CheckCircle2,
  PartyPopper,
  Search,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Centralized Events",
    description: "All campus events in one place. Never miss important announcements again.",
    accent: "text-primary bg-primary/8",
  },
  {
    icon: QrCode,
    title: "QR Attendance",
    description: "Scan to mark attendance. No more fake sign-ups or proxy attendance.",
    accent: "text-primary bg-primary/8",
  },
  {
    icon: Award,
    title: "Auto Certificates",
    description: "Certificates auto-unlock after attendance & feedback verification.",
    accent: "text-primary bg-primary/8",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Get notified before events start. Never miss what matters.",
    accent: "text-primary bg-primary/8",
  },
  {
    icon: Star,
    title: "Feedback System",
    description: "Rate events to help organizers improve future experiences.",
    accent: "text-primary bg-primary/8",
  },
  {
    icon: Users,
    title: "For All Branches",
    description: "From Engineering to Arts, every student finds events they love.",
    accent: "text-primary bg-primary/8",
  },
];

const steps = [
  { step: "01", title: "Discover Events", desc: "Browse verified campus events from all registered clubs", icon: Search },
  { step: "02", title: "Register & Get Reminded", desc: "One-click registration with automated reminders", icon: Clock },
  { step: "03", title: "Scan QR at Venue", desc: "Mark your attendance with a simple QR scan", icon: QrCode },
  { step: "04", title: "Download Certificate", desc: "Get your verified certificate after attending", icon: Award },
];

export default function HomePage() {
  return (
    <Layout>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16">
        {/* Ambient glow — two subtle blobs, no visual clutter */}
        <div
          className="premium-blur w-[600px] h-[600px] bg-primary/20 top-0 left-1/2 -translate-x-1/2 -translate-y-1/3"
          aria-hidden
        />
        <div
          className="premium-blur w-[400px] h-[400px] bg-primary/10 bottom-0 right-0 translate-x-1/4 translate-y-1/4"
          aria-hidden
        />

        {/* Subtle floating shape — decorative only */}
        <div
          className="absolute top-24 right-[12%] w-16 h-16 border border-primary/15 rounded-2xl rotate-12 animate-float opacity-60 hidden md:block"
          aria-hidden
        />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">

            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
              <PartyPopper className="w-3.5 h-3.5 text-primary" aria-hidden />
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                Welcome to Your Campus Hub
              </span>
              <Sparkles className="w-3.5 h-3.5 text-primary" aria-hidden />
            </div>

            {/* H1 — Inter 600, -0.02em letter-spacing */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6 animate-fade-in animation-delay-200"
              style={{ letterSpacing: "-0.02em" }}
            >
              <span className="text-foreground">Your Campus, Your Events,</span>
              <br />
              <span className="text-primary">One Platform.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 animate-fade-in animation-delay-400 leading-relaxed">
              Discover, register, attend, and get certified — all in one place.
              For every student, from every branch.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in animation-delay-600">
              <Button size="lg" className="w-full sm:w-auto px-8 h-12 text-sm font-semibold rounded-xl shadow-md shadow-primary/20 transition-all duration-200 group" asChild>
                <Link to="/events">
                  Explore Events
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 h-12 text-sm font-semibold rounded-xl border-border hover:bg-foreground/5 transition-all duration-200"
                asChild
              >
                <Link to="/login">Get Started Free</Link>
              </Button>
            </div>

            {/* Platform highlights */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-12 animate-fade-in animation-delay-600">
              {[
                { icon: CheckCircle2, label: "QR Attendance", color: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800" },
                { icon: Award, label: "Auto Certificates", color: "text-primary bg-primary/6 border-primary/20" },
                { icon: Bell, label: "Smart Reminders", color: "text-primary bg-primary/6 border-primary/20" },
              ].map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium border ${color}`}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Preview cards */}
          <div className="mt-20 max-w-4xl mx-auto animate-scale-in animation-delay-600">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { title: "React Workshop", category: "Technical", initial: "R" },
                { title: "Digital Art Expo", category: "Arts", initial: "D" },
                { title: "AI Hackathon", category: "Innovation", initial: "A" },
              ].map((event) => (
                <div
                  key={event.title}
                  className="glass-card rounded-2xl p-5 group cursor-default"
                >
                  <div className="w-full h-28 rounded-xl bg-primary/6 mb-4 flex items-center justify-center overflow-hidden relative">
                    <span className="text-4xl font-semibold text-primary/40 group-hover:text-primary/70 transition-colors duration-200">
                      {event.initial}
                    </span>
                  </div>
                  <Badge className="mb-2.5 bg-primary/8 text-primary border-primary/15 text-[10px] uppercase tracking-wider font-semibold">
                    {event.category}
                  </Badge>
                  <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors duration-200" style={{ letterSpacing: "-0.01em" }}>
                    {event.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" aria-hidden /> 50+ Joined
                    </span>
                    <span className="text-primary font-semibold">FREE</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-gentle" aria-hidden>
          <span className="text-xs text-muted-foreground font-medium">Scroll to explore</span>
          <div className="w-6 h-9 rounded-full border-2 border-primary/25 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Problem Statement ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-secondary/30 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="destructive" className="mb-5 rounded-lg text-[10px] font-semibold tracking-widest uppercase">
              The Challenge
            </Badge>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-5 text-foreground"
              style={{ letterSpacing: "-0.02em" }}
            >
              Campus Events Are <span className="text-destructive">Scattered</span>
            </h2>
            <p className="text-base text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
              Students from all departments face the same problems when trying to participate in campus activities.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: "📍", text: "Event details are scattered across WhatsApp groups" },
                { icon: "❌", text: "Attendance tracking is unreliable and easily faked" },
                { icon: "⏰", text: "Certificates are delayed by weeks or months" },
                { icon: "📊", text: "Event quality is never measured or improved" },
              ].map((problem, i) => (
                <Card
                  key={i}
                  className="p-5 text-left border-border/40 bg-card shadow-soft card-hover"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="text-xl shrink-0" aria-hidden>{problem.icon}</span>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">{problem.text}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Solution: Features ────────────────────────────────── */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-background">
        {/* Single subtle blur */}
        <div className="premium-blur w-[500px] h-[500px] bg-primary/8 top-0 right-0 translate-x-1/3" aria-hidden />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <Badge className="mb-5 bg-primary/8 text-primary border-primary/15 rounded-lg text-[10px] font-semibold tracking-widest uppercase">
              The Solution
            </Badge>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-5 text-foreground"
              style={{ letterSpacing: "-0.02em" }}
            >
              One Platform. <span className="text-gradient">Endless Possibilities.</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              EventFlow brings together event discovery, QR-based attendance,
              automated certificates, and verified feedback for students of all branches.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-6 group"
              >
                <div className={`w-11 h-11 rounded-xl ${feature.accent} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200`}>
                  <feature.icon className="w-5 h-5" aria-hidden />
                </div>
                <h3
                  className="text-base font-semibold mb-2 text-foreground"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge className="mb-5 bg-primary/8 text-primary border-primary/15 rounded-lg text-[10px] font-semibold tracking-widest uppercase">
              How It Works
            </Badge>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground"
              style={{ letterSpacing: "-0.02em" }}
            >
              Simple Steps to <span className="text-gradient">Get Started</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-5">
              {steps.map((item, i) => (
                <Card
                  key={i}
                  className="p-6 flex items-start gap-4 group bg-card border-border/40 shadow-soft card-hover"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-200">
                    <item.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-200" aria-hidden />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-primary block mb-1 uppercase tracking-widest">
                      Step {item.step}
                    </span>
                    <h3
                      className="text-base font-semibold mb-1 text-foreground"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-background relative overflow-hidden">
        <div
          className="premium-blur w-[600px] h-[600px] bg-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto glass-card rounded-3xl p-10 md:p-16 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
              <CheckCircle2 className="w-7 h-7 text-primary" aria-hidden />
            </div>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 text-foreground"
              style={{ letterSpacing: "-0.02em" }}
            >
              Ready to Transform Your Campus Experience?
            </h2>
            <p className="text-base text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              Start discovering events, building connections, and earning certificates — all for free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 h-12 font-semibold rounded-xl shadow-md shadow-primary/20 transition-all duration-200"
                asChild
              >
                <Link to="/login">
                  Get Started Free
                  <Sparkles className="w-4 h-4 ml-2" aria-hidden />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 h-12 font-semibold rounded-xl border-border hover:bg-foreground/5 transition-all duration-200"
                asChild
              >
                <Link to="/events">Browse Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

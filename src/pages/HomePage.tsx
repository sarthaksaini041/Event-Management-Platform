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
  Zap,
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
    color: "bg-primary/10 text-primary",
  },
  {
    icon: QrCode,
    title: "QR Attendance",
    description: "Scan to mark attendance. No more fake sign-ups or proxy attendance.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Award,
    title: "Auto Certificates",
    description: "Certificates auto-unlock after attendance & feedback verification.",
    color: "bg-success/10 text-success",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Get notified before events start. Never miss what matters.",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: Star,
    title: "Feedback System",
    description: "Rate events to help organizers improve future experiences.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    title: "For All Branches",
    description: "From Engineering to Arts, every student finds events they love.",
    color: "bg-accent/10 text-accent",
  },
];

const steps = [
  { 
    step: "01", 
    title: "Discover Events", 
    desc: "Browse verified campus events from all registered clubs",
    icon: Search,
  },
  { 
    step: "02", 
    title: "Register & Get Reminded", 
    desc: "One-click registration with automated reminders",
    icon: Clock,
  },
  { 
    step: "03", 
    title: "Scan QR at Venue", 
    desc: "Mark your attendance with a simple QR scan",
    icon: QrCode,
  },
  { 
    step: "04", 
    title: "Download Certificate", 
    desc: "Get your verified certificate after attending",
    icon: Award,
  },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Premium Background Blurs */}
        <div className="premium-blur top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-primary/30" />
        <div className="premium-blur bottom-0 right-0 translate-x-1/2 translate-y-1/2 bg-accent/20" />
        <div className="premium-blur top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/10 h-[800px] w-[800px]" />
        
        {/* Animated Decorative Shapes */}
        <div className="absolute top-20 right-[15%] w-24 h-24 border border-primary/20 rounded-3xl rotate-12 animate-float blur-[1px]" />
        <div className="absolute bottom-32 left-[10%] w-20 h-20 bg-accent/10 rounded-full animate-float animation-delay-400 blur-[2px]" />
        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-primary/40 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-4 h-4 border-2 border-accent/20 rounded-lg animate-spin-slow" />

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-primary/10 mb-10 animate-fade-in shadow-xl shadow-primary/5">
              <PartyPopper className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                Welcome to Your Campus Hub
              </span>
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-8 animate-fade-in animation-delay-200 tracking-tight">
              <span className="text-foreground">Your Campus, Your Events,</span>
              <br />
              <span className="text-primary">One Platform.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-12 animate-fade-in animation-delay-400 leading-relaxed">
              Discover, register, attend, and get certified — all in one place. 
              For every student, from every branch.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animation-delay-600">
              <Button size="lg" className="px-10 h-12 text-sm font-bold group" asChild>
                <Link to="/events">
                  Explore Events
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl px-10 h-12 text-sm font-bold border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 shadow-sm active:scale-95 transition-all" asChild>
                <Link to="/login">
                  Get Started
                </Link>
              </Button>
            </div>

            {/* Platform Highlights */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-16 animate-fade-in animation-delay-600">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">QR Attendance</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Auto Certificates</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <Bell className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Smart Reminders</span>
              </div>
            </div>
          </div>

          {/* Floating Event Cards Preview */}
          <div className="mt-20 relative max-w-5xl mx-auto animate-scale-in animation-delay-600">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "React Workshop 2024", category: "Technical", color: "bg-primary", delay: "0" },
                { title: "Digital Art Exhibition", category: "Arts", color: "bg-accent", delay: "100" },
                { title: "AI Hackathon", category: "Innovation", color: "bg-pink-500", delay: "200" },
              ].map((event, index) => (
                <Card 
                  key={index} 
                  className="glass-card p-5 group cursor-default"
                >
                  <div className={`w-full h-32 rounded-xl ${event.color}/10 mb-4 flex items-center justify-center overflow-hidden relative`}>
                    <div className={`absolute inset-0 ${event.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    <span className={`text-4xl font-display font-bold ${event.color.replace('bg-', 'text-')} group-hover:scale-110 transition-transform duration-500`}>
                      {event.title.charAt(0)}
                    </span>
                  </div>
                  <Badge variant="secondary" className="mb-3 bg-white/5 border-white/10 text-xs uppercase tracking-wider">{event.category}</Badge>
                  <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">{event.title}</h3>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 50+ Joined</span>
                    <span className="text-primary font-bold">FREE</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-gentle">
          <span className="text-xs text-muted-foreground font-medium">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-2.5 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="destructive" className="mb-6 rounded-lg text-[10px] font-bold tracking-widest uppercase">The Challenge</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground tracking-tight">
              Campus Events Are <span className="text-destructive">Scattered</span>
            </h2>
            <p className="text-base text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
              Students from all departments face the same problems when trying to participate in campus activities.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-12">
              {[
                { icon: "📍", text: "Event details are scattered across WhatsApp groups" },
                { icon: "❌", text: "Attendance tracking is unreliable and easily faked" },
                { icon: "⏰", text: "Certificates are delayed by weeks or months" },
                { icon: "📊", text: "Event quality is never measured or improved" },
              ].map((problem, index) => (
                <Card key={index} className="p-6 text-left shadow-soft hover:shadow-medium transition-all duration-300 bg-card border-none">
                  <div className="flex items-start gap-4">
                    <span className="text-xl">{problem.icon}</span>
                    <p className="text-sm font-medium text-muted-foreground leading-relaxed">{problem.text}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 rounded-lg text-[10px] font-bold tracking-widest uppercase">The Solution</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground tracking-tight">
              One Platform. <span className="text-gradient">Endless Possibilities.</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              EventFlow brings together event discovery, QR-based attendance, 
              automated certificates, and verified feedback for students of all branches.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 group hover:shadow-large transition-all duration-300 hover:-translate-y-1 bg-card border-white/5"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2 text-foreground tracking-tight">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20 rounded-lg text-[10px] font-bold tracking-widest uppercase">How It Works</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
              Simple Steps to <span className="text-gradient-warm">Get Started</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((item, index) => (
                <Card key={index} className="p-6 flex items-start gap-4 group hover:shadow-large transition-all duration-300 hover:-translate-y-1 bg-card border-none">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                    <item.icon className="w-5 h-5 text-primary group-hover:text-black" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-primary mb-1 block uppercase tracking-wider">Step {item.step}</span>
                    <h3 className="text-lg font-display font-bold mb-1 text-foreground tracking-tight">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <Card className="max-w-4xl mx-auto p-12 text-center shadow-large bg-card border-primary/10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground">
              Ready to Transform Your Campus Experience?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start discovering events, building connections, and earning certificates — all for free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="accent" className="rounded-full px-8" asChild>
                <Link to="/login">
                  Get Started Free
                  <Sparkles className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                <Link to="/events">
                  Browse Events
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
}

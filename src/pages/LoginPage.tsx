import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Mail, Lock, User, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast.error(error.message || "Failed to sign in");
    } else {
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    }
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signUp(email, password, fullName);
    if (error) {
      toast.error(error.message || "Failed to create account");
    } else {
      toast.success("Account created! Check your email to verify.");
      setActiveTab("login");
    }
    setIsLoading(false);
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 px-4 bg-background relative overflow-hidden">
        {/* Ambient glow */}
        <div
          className="premium-blur w-[500px] h-[500px] bg-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        />

        <div className="w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex flex-col items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-lg shadow-primary/25">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span
                className="font-semibold text-2xl"
                style={{ letterSpacing: "-0.02em" }}
              >
                <span className="text-primary">Event</span>
                <span className="text-foreground">Flow</span>
              </span>
            </Link>
          </div>

          {/* Glass card */}
          <div
            className="rounded-3xl overflow-hidden border border-white/20 shadow-large"
            style={{
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(16px) saturate(180%)",
              WebkitBackdropFilter: "blur(16px) saturate(180%)",
            }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* Tab bar */}
              <TabsList className="w-full rounded-none bg-transparent border-b border-border/40 p-0 h-14 gap-0">
                <TabsTrigger
                  value="login"
                  className="flex-1 rounded-none h-full font-semibold text-sm tracking-wide
                    data-[state=active]:bg-primary/6 data-[state=active]:text-primary data-[state=active]:shadow-none
                    data-[state=inactive]:text-muted-foreground hover:text-foreground transition-all duration-200"
                >
                  Log in
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="flex-1 rounded-none h-full font-semibold text-sm tracking-wide
                    data-[state=active]:bg-primary/6 data-[state=active]:text-primary data-[state=active]:shadow-none
                    data-[state=inactive]:text-muted-foreground hover:text-foreground transition-all duration-200"
                >
                  Sign up
                </TabsTrigger>
              </TabsList>

              {/* Login */}
              <TabsContent value="login" className="mt-0 p-1">
                <form onSubmit={handleLogin}>
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
                      Welcome Back
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Access your events, attendance, and certificates.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-2 px-6 pb-6">
                    <div className="space-y-1.5">
                      <Label htmlFor="login-email" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="you@college.edu"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 pl-10 rounded-xl bg-secondary/40 border-border/50 focus:border-primary text-sm"
                          required
                          autoComplete="email"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="login-password" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-12 pl-10 rounded-xl bg-secondary/40 border-border/50 focus:border-primary text-sm"
                          required
                          autoComplete="current-password"
                        />
                      </div>
                    </div>
                    <Button
                      className="w-full h-12 font-semibold rounded-xl mt-2 shadow-sm shadow-primary/20 transition-all duration-200"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden />}
                      Log in
                      {!isLoading && <ArrowRight className="w-4 h-4 ml-2" aria-hidden />}
                    </Button>
                  </CardContent>
                </form>
              </TabsContent>

              {/* Register */}
              <TabsContent value="register" className="mt-0 p-1">
                <form onSubmit={handleRegister}>
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
                      Create Your Account
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Join your campus event ecosystem.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-2 px-6 pb-6">
                    <div className="space-y-1.5">
                      <Label htmlFor="register-name" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="John Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="h-12 pl-10 rounded-xl bg-secondary/40 border-border/50 focus:border-primary text-sm"
                          required
                          autoComplete="name"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="register-email" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="you@college.edu"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 pl-10 rounded-xl bg-secondary/40 border-border/50 focus:border-primary text-sm"
                          required
                          autoComplete="email"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="register-password" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden />
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-12 pl-10 rounded-xl bg-secondary/40 border-border/50 focus:border-primary text-sm"
                          required
                          minLength={6}
                          autoComplete="new-password"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      By creating an account, you'll start as a student.
                    </p>
                    <Button
                      className="w-full h-12 font-semibold rounded-xl shadow-sm shadow-primary/20 transition-all duration-200"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden />}
                      Create Account
                      {!isLoading && <ArrowRight className="w-4 h-4 ml-2" aria-hidden />}
                    </Button>
                  </CardContent>
                </form>
              </TabsContent>
            </Tabs>
          </div>

          {/* Secure indicator */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5 text-green-500" aria-hidden />
            Secured with end-to-end encryption
          </div>
        </div>
      </div>
    </Layout>
  );
}

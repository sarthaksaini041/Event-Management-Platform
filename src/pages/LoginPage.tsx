import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
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
    if (user) {
      navigate(from, { replace: true });
    }
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
      toast.success("Account created! Please check your email to verify your account.");
      setActiveTab("login");
    }

    setIsLoading(false);
  };

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <Link to="/" className="flex flex-col items-center gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-primary/20">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <span className="font-display font-bold text-3xl tracking-tight">
                  <span className="text-primary">Event</span>
                  <span className="text-foreground">Flow</span>
                </span>
              </Link>
            </div>

            <Card className="overflow-hidden glass border-white/10 shadow-2xl rounded-3xl">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full rounded-none bg-white/5 border-b border-white/5 p-0 h-14">
                  <TabsTrigger
                    value="login"
                    className="flex-1 rounded-none h-full font-bold text-sm tracking-wide data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all"
                  >
                    Log in
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="flex-1 rounded-none h-full font-bold text-sm tracking-wide data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-all"
                  >
                    SIGN UP
                  </TabsTrigger>
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login" className="mt-0 p-2">
                  <form onSubmit={handleLogin}>
                    <CardHeader className="text-center pb-2">
                      <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
                      <CardDescription className="text-sm">
                        Access your events, attendance, and certificates.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@college.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 pl-10 bg-white/5 border-white/10 focus:border-primary rounded-xl"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12 pl-10 bg-white/5 border-white/10 focus:border-primary rounded-xl"
                            required
                          />
                        </div>
                      </div>
                      <Button className="w-full h-12 font-bold mt-4" type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : null}
                        Log in
                        {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                      </Button>
                    </CardContent>
                  </form>
                </TabsContent>

                {/* Register Form */}
                <TabsContent value="register" className="mt-0 p-2">
                  <form onSubmit={handleRegister}>
                    <CardHeader className="text-center pb-2">
                      <CardTitle className="text-2xl font-bold tracking-tight">Create Your Account</CardTitle>
                      <CardDescription className="text-sm">
                        Join your campus event ecosystem.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="h-12 pl-10 bg-white/5 border-white/10 focus:border-primary rounded-xl"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="you@college.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 pl-10 bg-white/5 border-white/10 focus:border-primary rounded-xl"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12 pl-10 bg-white/5 border-white/10 focus:border-primary rounded-xl"
                            required
                            minLength={6}
                          />
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground text-center italic mt-2">
                        By creating an account, you'll start as a student. Contact admin for organizer access.
                      </p>
                      <Button className="w-full h-12 font-bold mt-4" type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : null}
                        Sign up
                        {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                      </Button>
                    </CardContent>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Secured with end-to-end encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, Calendar, LayoutDashboard, LogIn, LogOut, Home, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/calendar", label: "Calendar", icon: Calendar },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut, isAdmin, isClubAdmin } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    setIsOpen(false);
  };

  const dashboardLink = isAdmin || isClubAdmin ? "/admin" : "/dashboard";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 shadow-2xl transition-all duration-500">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group outline-none">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary/20">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">
                <span className="text-primary">Event</span>
                <span className="text-foreground">Flow</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-300 relative group",
                      isActive
                        ? "text-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--primary),0.05)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {user && (
                <Link
                  to={dashboardLink}
                  className={cn(
                    "px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-300 relative group",
                    location.pathname === dashboardLink || location.pathname === "/dashboard" || location.pathname === "/admin"
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  Dashboard
                </Link>
              )}
            </div>

            {/* Auth Buttons & Theme Toggle */}
            <div className="hidden md:flex items-center gap-6">
              <ThemeToggle />
              <div className="h-6 w-[1px] bg-white/10" />
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-xl h-10 px-4 text-sm font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 gap-3 group">
                       <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <span className="max-w-[100px] truncate">{profile?.full_name || "Account"}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 glass border-white/10 p-2 rounded-2xl shadow-2xl">
                    <DropdownMenuItem asChild>
                      <Link to={dashboardLink} className="cursor-pointer rounded-xl py-3 px-4 font-semibold hover:bg-white/5 transition-all">
                        <LayoutDashboard className="w-4 h-4 mr-3 text-primary" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10 my-1" />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer rounded-xl py-3 px-4 font-semibold text-destructive hover:bg-destructive/5 transition-all">
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-4">
                  <Button variant="ghost" className="rounded-xl h-10 px-5 text-sm font-semibold hover:bg-white/10 transition-all text-muted-foreground hover:text-foreground" asChild>
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button className="h-10 px-6 text-sm font-bold" asChild>
                    <Link to="/register">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div 
            className={cn(
              "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
              isOpen ? "max-h-[500px] opacity-100 py-6 border-t border-white/10" : "max-h-0 opacity-0"
            )}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-5 py-4 rounded-2xl font-bold text-base flex items-center gap-4 transition-all duration-300",
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
              {user && (
                <Link
                  to={dashboardLink}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-5 py-4 rounded-2xl font-bold text-base flex items-center gap-4 transition-all duration-300",
                    location.pathname === dashboardLink
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
              )}
              <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
                {user ? (
                  <Button variant="ghost" className="flex-1 h-12 rounded-xl font-semibold bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" className="flex-1 h-12 rounded-xl font-semibold bg-white/5 hover:bg-white/10 transition-all text-muted-foreground hover:text-foreground" asChild>
                      <Link to="/login" onClick={() => setIsOpen(false)}>Log in</Link>
                    </Button>
                    <Button className="flex-1 h-12 font-bold" asChild>
                      <Link to="/register" onClick={() => setIsOpen(false)}>Sign up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
    </nav>
  );
}

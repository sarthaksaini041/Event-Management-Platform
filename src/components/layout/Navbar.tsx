import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, Calendar, LayoutDashboard, LogOut, Home, User } from "lucide-react";
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
    <nav
      style={{
        background: "var(--glass-bg-light)",
        backdropFilter: "var(--glass-blur)",
        WebkitBackdropFilter: "var(--glass-blur)",
        borderBottom: "var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group outline-none">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-md shadow-primary/25">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-xl tracking-tight" style={{ letterSpacing: "-0.02em" }}>
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
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    "min-h-[44px] flex items-center",
                    isActive
                      ? "text-primary bg-primary/8 font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
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
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  "min-h-[44px] flex items-center",
                  location.pathname === dashboardLink || location.pathname === "/dashboard" || location.pathname === "/admin"
                    ? "text-primary bg-primary/8 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                )}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth + Theme — Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <div className="h-5 w-px bg-border" />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-lg h-10 px-3 text-sm font-medium border border-border/50 hover:bg-foreground/5 transition-all duration-200 gap-2.5"
                  >
                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="max-w-[100px] truncate">{profile?.full_name || "Account"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-52 p-1.5 rounded-xl border-border/50"
                  style={{
                    background: "var(--glass-bg-light)",
                    backdropFilter: "var(--glass-blur)",
                    WebkitBackdropFilter: "var(--glass-blur)",
                  }}
                >
                  <DropdownMenuItem asChild>
                    <Link to={dashboardLink} className="cursor-pointer rounded-lg py-2.5 px-3 font-medium text-sm">
                      <LayoutDashboard className="w-4 h-4 mr-2.5 text-primary" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer rounded-lg py-2.5 px-3 font-medium text-sm text-destructive focus:text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2.5" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  className="h-10 px-4 text-sm font-medium rounded-lg hover:bg-foreground/5 transition-all duration-200"
                  asChild
                >
                  <Link to="/login">Log in</Link>
                </Button>
                <Button
                  className="h-10 px-5 text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm shadow-primary/20"
                  asChild
                >
                  <Link to="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile — Theme + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="w-10 h-10 rounded-lg border border-border/50 flex items-center justify-center hover:bg-foreground/5 transition-all duration-200"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-[480px] opacity-100 pb-5 border-t border-border/40 pt-3" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3.5 rounded-xl text-base font-medium flex items-center gap-3 transition-all duration-200 min-h-[52px]",
                    isActive
                      ? "bg-primary text-white font-semibold shadow-sm shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  )}
                >
                  <link.icon className="w-5 h-5 shrink-0" />
                  {link.label}
                </Link>
              );
            })}
            {user && (
              <Link
                to={dashboardLink}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3.5 rounded-xl text-base font-medium flex items-center gap-3 transition-all duration-200 min-h-[52px]",
                  location.pathname === dashboardLink
                    ? "bg-primary text-white font-semibold shadow-sm shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                )}
              >
                <LayoutDashboard className="w-5 h-5 shrink-0" />
                Dashboard
              </Link>
            )}
            <div className="flex gap-2 mt-4 pt-4 border-t border-border/40">
              {user ? (
                <Button
                  variant="ghost"
                  className="flex-1 h-12 rounded-xl font-semibold text-destructive hover:bg-destructive/8 transition-all duration-200"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="flex-1 h-12 rounded-xl font-medium transition-all duration-200"
                    asChild
                  >
                    <Link to="/login" onClick={() => setIsOpen(false)}>Log in</Link>
                  </Button>
                  <Button className="flex-1 h-12 font-semibold rounded-xl shadow-sm transition-all duration-200" asChild>
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

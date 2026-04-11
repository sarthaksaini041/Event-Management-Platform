import { useParams, Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  QrCode,
  MessageSquare,
  Award,
  Bell,
  Instagram,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";
import { useEvent } from "@/hooks/useEvents";
import { useIsRegistered, useRegisterForEvent, useCancelRegistration } from "@/hooks/useRegistrations";
import { useAuth } from "@/contexts/AuthContext";
import { format, parseISO } from "date-fns";
import { toast } from "sonner";

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: event, isLoading, error } = useEvent(id || "");
  const { data: isRegistered, isLoading: isCheckingRegistration } = useIsRegistered(id || "");
  const registerMutation = useRegisterForEvent();
  const cancelMutation = useCancelRegistration();

  const handleRegister = async () => {
    if (!user) {
      toast.error("Please log in to register for events");
      navigate("/login", { state: { from: { pathname: `/events/${id}` } } });
      return;
    }

    try {
      await registerMutation.mutateAsync(id!);
      toast.success("Successfully registered for the event!");
    } catch (error: any) {
      toast.error(error.message || "Failed to register");
    }
  };

  const handleCancelRegistration = async () => {
    try {
      await cancelMutation.mutateAsync(id!);
      toast.success("Registration cancelled");
    } catch (error: any) {
      toast.error(error.message || "Failed to cancel registration");
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (error || !event) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-xl text-muted-foreground">Event not found</p>
          <Button asChild>
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const formattedDate = format(parseISO(event.event_date), "MMMM d, yyyy");
  const formattedTime = format(new Date(`2000-01-01T${event.event_time}`), "h:mm a");
  const fillPercentage = Math.round((event.filled_seats / event.total_seats) * 100);
  const isFull = event.filled_seats >= event.total_seats;

  return (
    <Layout>
      {/* Back Navigation */}
      <section className="py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild>
            <Link to="/events">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
          </Button>
        </div>
      </section>

      {/* Event Header */}
      <section className="py-12 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-20 h-20 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-4xl shrink-0">
                {event.image_emoji || "📅"}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="tech">{event.category}</Badge>
                  <Badge variant={event.status === "open" ? "registered" : "pending"}>
                    {event.status === "open" ? "Registration Open" : event.status === "closed" ? "Closed" : "Cancelled"}
                  </Badge>
                  {isRegistered && (
                    <Badge variant="completed">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Registered
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  {event.title}
                </h1>
                <p className="text-lg text-muted-foreground">
                  Organized by <span className="text-primary">{event.club_name}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {event.description || "No description available for this event."}
                  </p>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "Registration", date: "Register now to secure your spot", completed: isRegistered },
                      { time: "Event Day", date: formattedDate, completed: false },
                      { time: "QR Attendance", date: "Scan QR at the venue", completed: false },
                      { time: "Feedback", date: "Submit feedback after event", completed: false },
                      { time: "Certificate", date: "Unlock after feedback", completed: false },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          item.completed 
                            ? "bg-success/10 text-success" 
                            : "bg-secondary text-muted-foreground"
                        }`}>
                          {item.completed ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-current" />
                          )}
                        </div>
                        <div className="flex-1 pb-4 border-b border-border last:border-0">
                          <p className="font-display font-medium">{item.time}</p>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Note */}
              <Card>
                <CardContent className="pt-6">
                  <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
                    <p className="text-sm text-warning">
                      <strong>Note:</strong> Certificates are issued only after attendance verification and feedback submission.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Details Card */}
              <Card variant="elevated" className="sticky top-24">
                <CardContent className="pt-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>{formattedTime}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Users className="w-5 h-5 text-primary" />
                      <span>{event.filled_seats} / {event.total_seats} registered</span>
                    </div>
                  </div>

                  {/* Seats Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Seats Filled</span>
                      <span className="text-primary font-display">{fillPercentage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden p-[1px] border border-border/50">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(var(--primary),0.3)]"
                        style={{ width: `${Math.min(fillPercentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  {isCheckingRegistration ? (
                    <Button className="w-full h-12 mb-4" disabled>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Checking...
                    </Button>
                  ) : isRegistered ? (
                    <Button
                      variant="outline"
                      className="w-full h-12 mb-4 font-bold border-primary/20 text-primary hover:bg-primary/5"
                      onClick={handleCancelRegistration}
                      disabled={cancelMutation.isPending}
                    >
                      {cancelMutation.isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      )}
                      Cancel Registration
                    </Button>
                  ) : (
                    <Button
                      className="w-full h-12 mb-4 font-bold"
                      onClick={handleRegister}
                      disabled={event.status !== "open" || isFull || registerMutation.isPending}
                    >
                      {registerMutation.isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : isFull ? (
                        "Event Full"
                      ) : event.status !== "open" ? (
                        "Registration Closed"
                      ) : (
                        <>
                          Register Now
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  )}

                  <p className="text-xs text-center text-muted-foreground">
                    {user ? "You'll receive reminders before the event." : "Log in to register for this event."}
                  </p>
                </CardContent>
              </Card>

              {/* What to Expect */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-display font-semibold mb-4">What to Expect</h3>
                  <div className="space-y-3">
                    {[
                      { icon: Bell, text: "Event reminders" },
                      { icon: QrCode, text: "QR attendance scan" },
                      { icon: MessageSquare, text: "Post-event feedback" },
                      { icon: Award, text: "Verified certificate" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <item.icon className="w-4 h-4 text-primary" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact & Social */}
              {(event.club_email || event.club_phone || event.club_instagram) && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-display font-semibold mb-4">Contact & Social</h3>
                    <div className="space-y-3">
                      {event.club_email && (
                        <a 
                          href={`mailto:${event.club_email}`} 
                          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Mail className="w-4 h-4 text-primary" />
                          <span>{event.club_email}</span>
                        </a>
                      )}
                      {event.club_phone && (
                        <a 
                          href={`tel:${event.club_phone}`} 
                          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Phone className="w-4 h-4 text-primary" />
                          <span>{event.club_phone}</span>
                        </a>
                      )}
                      {event.club_instagram && (
                        <a 
                          href={`https://instagram.com/${event.club_instagram.replace('@', '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Instagram className="w-4 h-4 text-primary" />
                          <span>{event.club_instagram}</span>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

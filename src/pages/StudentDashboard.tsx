import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Award,
  MessageSquare,
  Download,
  CheckCircle,
  AlertCircle,
  Lock,
  Settings,
  User,
  Save,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useMyRegistrations } from "@/hooks/useRegistrations";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";

export default function StudentDashboard() {
  const { user, profile, role, isAdmin, isClubAdmin } = useAuth();
  const { data: registrations, isLoading: isLoadingRegistrations } = useMyRegistrations();

  const [profileData, setProfileData] = useState({
    full_name: profile?.full_name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
  });
  const [isSaving, setIsSaving] = useState(false);

  // Redirect admins to admin dashboard
  if (isAdmin || isClubAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const upcomingEvents = registrations?.filter((r: any) => r.status === "registered") ?? [];

  const handleProfileSave = async () => {
    if (!user) return;
    setIsSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profileData.full_name,
        phone: profileData.phone,
      })
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully");
    }
    setIsSaving(false);
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Student Dashboard</Badge>
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
                  Welcome back 👋
                </h1>
                <p className="text-lg text-muted-foreground">
                  Track your events, attendance, and certificates here.
                </p>
              </div>
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xl">
                    👨‍🎓
                  </div>
                  <div>
                    <p className="font-display font-semibold">{profile?.full_name || "Student"}</p>
                    <p className="text-sm text-muted-foreground">{profile?.email}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: registrations?.length ?? 0, label: "Total Events", icon: Calendar },
              { value: 0, label: "Completed", icon: CheckCircle },
              { value: 0, label: "Pending Feedback", icon: MessageSquare },
              { value: 0, label: "Certificates", icon: Award },
            ].map((stat, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="events" className="space-y-8">
              <TabsList className="bg-secondary p-1">
                <TabsTrigger value="events" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  My Events
                </TabsTrigger>
                <TabsTrigger value="attendance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  QR Attendance
                </TabsTrigger>
                <TabsTrigger value="certificates" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Certificates
                </TabsTrigger>
                <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Settings className="w-4 h-4 mr-1" />
                  Profile
                </TabsTrigger>
              </TabsList>

              {/* My Events Tab */}
              <TabsContent value="events" className="space-y-6">
                {isLoadingRegistrations ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : upcomingEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-display font-semibold mb-2">No registered events</h3>
                    <p className="text-muted-foreground mb-4">Browse events and register to get started!</p>
                    <Button asChild>
                      <Link to="/events">Browse Events</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {upcomingEvents.map((registration: any) => {
                      const event = registration.event;
                      if (!event) return null;
                      
                      return (
                        <Card key={registration.id} variant="elevated" className="group">
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-4">
                              <Badge variant="registered">Registered</Badge>
                            </div>
                            <h3 className="text-lg font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                              {event.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              {event.club_name}
                            </p>
                            <div className="space-y-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span>{format(parseISO(event.event_date), "MMM d, yyyy")}</span>
                                <Clock className="w-4 h-4 text-primary ml-2" />
                                <span>{format(new Date(`2000-01-01T${event.event_time}`), "h:mm a")}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>{event.venue}</span>
                              </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                              <Button variant="outline" size="sm" asChild className="flex-1">
                                <Link to={`/events/${event.id}`}>View Details</Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </TabsContent>

              {/* QR Attendance Tab */}
              <TabsContent value="attendance">
                <Card className="max-w-xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <QrCode className="w-6 h-6 text-primary" />
                      QR Attendance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className="w-32 h-32 mx-auto mb-6 rounded-lg bg-secondary border border-border flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-display font-semibold mb-2">
                        Ready to Mark Attendance
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Scan the QR code displayed at the event venue to mark your attendance.
                      </p>
                      <Button variant="default" disabled>
                        <QrCode className="w-4 h-4 mr-2" />
                        QR Scanner (Coming Soon)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Certificates Tab */}
              <TabsContent value="certificates">
                <div className="text-center py-12">
                  <Award className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-display font-semibold mb-2">No certificates yet</h3>
                  <p className="text-muted-foreground">
                    Complete events and submit feedback to unlock certificates.
                  </p>
                </div>
              </TabsContent>

              {/* Profile Settings Tab */}
              <TabsContent value="profile">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Edit Profile */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <User className="w-5 h-5 text-primary" />
                        Edit Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.full_name}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, full_name: e.target.value }))}
                          className="bg-secondary border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          disabled
                          className="bg-secondary border-border opacity-50"
                        />
                        <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                          className="bg-secondary border-border"
                        />
                      </div>
                      <Button onClick={handleProfileSave} className="w-full" disabled={isSaving}>
                        {isSaving ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Account Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Settings className="w-5 h-5 text-primary" />
                        Account Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg bg-secondary">
                        <p className="text-sm text-muted-foreground mb-1">Account Type</p>
                        <p className="font-display font-medium capitalize">{role || "Student"}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-secondary">
                        <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                        <p className="font-display font-medium">
                          {profile?.created_at
                            ? format(parseISO(profile.created_at), "MMMM d, yyyy")
                            : "N/A"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </Layout>
  );
}

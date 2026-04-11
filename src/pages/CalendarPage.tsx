import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Loader2, LayoutDashboard } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameMonth, isToday } from "date-fns";
import { cn } from "@/lib/utils";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: events, isLoading } = useEvents();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get days from previous month to fill the first week
  const startDayOfWeek = getDay(monthStart);
  const prevMonthDays = Array.from({ length: startDayOfWeek }, (_, i) => {
    const day = new Date(monthStart);
    day.setDate(day.getDate() - (startDayOfWeek - i));
    return { date: day, isCurrentMonth: false };
  });

  // Current month days
  const currentMonthDays = daysInMonth.map((day) => ({
    date: day,
    isCurrentMonth: true,
  }));

  // Next month days to fill remaining cells (42 total for 6 weeks)
  const totalDays = 42;
  const remainingDays = totalDays - prevMonthDays.length - currentMonthDays.length;
  const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => {
    const day = new Date(monthEnd);
    day.setDate(day.getDate() + (i + 1));
    return { date: day, isCurrentMonth: false };
  });

  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

  const getEventsForDate = (date: Date) => {
    if (!events) return [];
    const dateStr = format(date, "yyyy-MM-dd");
    return events.filter((event) => event.event_date === dateStr);
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate((prev) =>
      direction > 0 ? addMonths(prev, 1) : subMonths(prev, 1)
    );
  };

  const upcomingEvents = events
    ?.filter((event) => {
      const eventDate = parseISO(event.event_date);
      return isSameMonth(eventDate, currentDate);
    })
    .slice(0, 6) ?? [];

  return (
    <Layout>
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="premium-blur top-0 left-1/2 -translate-x-1/2 bg-primary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 glass border-primary/20 text-primary py-1.5 px-4 rounded-full uppercase tracking-widest text-[10px] font-bold">
              Dynamic Calendar
            </Badge>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight">
              Event <span className="text-gradient">Schedule</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Plan your campus life with precision. Discover workshops, hackathons, and social meets — all perfectly synced.
            </p>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto glass rounded-[2.5rem] border border-white/10 shadow-3xl overflow-hidden transition-all duration-500">
            {/* Calendar Header */}
            <div className="bg-white/5 border-b border-white/10 p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <CalendarIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-display font-bold tracking-tight text-foreground">
                    {format(currentDate, "MMMM yyyy")}
                  </h2>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-11 h-11 rounded-xl hover:bg-white/10 transition-all text-muted-foreground hover:text-primary"
                    onClick={() => navigateMonth(-1)}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-11 h-11 rounded-xl hover:bg-white/10 transition-all text-muted-foreground hover:text-primary"
                    onClick={() => navigateMonth(1)}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-10">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                  <p className="text-muted-foreground font-bold tracking-widest uppercase text-xs">Syncing with Campus Hub...</p>
                </div>
              ) : (
                <>
                  {/* Days of Week */}
                  <div className="grid grid-cols-7 mb-6">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="text-center font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground/60">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-3">
                    {allDays.map((day, index) => {
                      const dayEvents = getEventsForDate(day.date);
                      const isTodayDate = isToday(day.date);

                      return (
                        <div
                          key={index}
                          className={cn(
                            "min-h-[140px] p-3 rounded-2xl border transition-all duration-500 group relative",
                            day.isCurrentMonth
                              ? "glass-card border-white/5 hover:border-primary/30"
                              : "bg-white/2 border-transparent opacity-30",
                            isTodayDate && "border-primary shadow-[0_0_20px_rgba(var(--primary),0.15)] ring-1 ring-primary/20",
                            dayEvents.length > 0 && day.isCurrentMonth && "bg-primary/[0.02]"
                          )}
                        >
                          <div
                            className={cn(
                              "text-sm font-bold mb-3 transition-colors",
                              day.isCurrentMonth ? "text-foreground" : "text-muted-foreground",
                              isTodayDate && "text-primary"
                            )}
                          >
                            <span className={cn(
                              "inline-flex items-center justify-center w-7 h-7 rounded-lg",
                              isTodayDate && "bg-primary text-white shadow-lg shadow-primary/30"
                            )}>
                              {format(day.date, "d")}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {dayEvents.slice(0, 2).map((event) => (
                              <Link
                                key={event.id}
                                to={`/events/${event.id}`}
                                className="block text-[10px] sm:text-xs p-2 rounded-xl bg-primary/10 text-primary font-bold truncate transition-all hover:bg-primary/20 border border-primary/5 active:scale-95"
                                title={event.title}
                              >
                                {event.title}
                              </Link>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-[10px] font-bold text-muted-foreground px-2 pt-1 uppercase tracking-wider">
                                +{dayEvents.length - 2} Event{dayEvents.length > 3 ? 's' : ''}
                              </div>
                            )}
                          </div>
                          
                          {/* Subtle active glow for days with events */}
                          {dayEvents.length > 0 && day.isCurrentMonth && (
                            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Featured Upcoming Section */}
          {upcomingEvents.length > 0 && (
            <div className="max-w-6xl mx-auto mt-20">
              <div className="flex items-center justify-between mb-8 px-4">
                <h2 className="text-3xl font-display font-bold tracking-tight">Key Events <span className="text-primary opacity-50">This Month</span></h2>
                <Button variant="link" className="text-primary font-bold group" asChild>
                  <Link to="/events">
                    View all <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-all" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <Link key={event.id} to={`/events/${event.id}`} className="group h-full">
                    <Card className="glass-card p-6 h-full flex flex-col hover:shadow-2xl hover:shadow-primary/5 active:scale-[0.98] transition-all">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/10 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          {event.image_emoji || "📅"}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display font-bold text-lg mb-1 group-hover:text-primary transition-colors text-foreground">{event.title}</h3>
                          <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest bg-white/5 border-white/10">{event.club_name}</Badge>
                        </div>
                      </div>
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                         <div className="flex items-center gap-2 text-primary font-bold text-sm">
                          <CalendarIcon className="w-4 h-4" />
                          {format(parseISO(event.event_date), "MMM d")}
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{event.category}</p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

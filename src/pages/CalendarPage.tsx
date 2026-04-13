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
      <section className="relative pt-24 pb-16 overflow-hidden bg-background">
        <div className="premium-blur w-[500px] h-[500px] bg-primary/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/3" aria-hidden />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-5 bg-primary/8 text-primary border-primary/15 rounded-lg text-[10px] font-semibold tracking-widest uppercase">
              Dynamic Calendar
            </Badge>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-5"
              style={{ letterSpacing: "-0.02em" }}
            >
              Event <span className="text-gradient">Schedule</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Plan your campus life with precision. Discover workshops, hackathons, and social meets — all perfectly synced.
            </p>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto glass rounded-2xl md:rounded-[2.5rem] border border-white/10 overflow-hidden">
            <div className="border-b border-white/10 px-4 py-4 md:px-8 md:py-6">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center">
                      <CalendarIcon className="w-4 h-4 text-primary" aria-hidden />
                    </div>
                    <h2
                      className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {format(currentDate, "MMMM yyyy")}
                    </h2>
                  </div>
                <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-xl border border-border/40">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-9 h-9 rounded-lg hover:bg-foreground/5 transition-all duration-200 text-muted-foreground hover:text-primary"
                    onClick={() => navigateMonth(-1)}
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-9 h-9 rounded-lg hover:bg-foreground/5 transition-all duration-200 text-muted-foreground hover:text-primary"
                    onClick={() => navigateMonth(1)}
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-2 sm:p-4 md:p-8 lg:p-10">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                  <p className="text-muted-foreground font-bold tracking-widest uppercase text-xs">Syncing with Campus Hub...</p>
                </div>
              ) : (
                <>
                  {/* Days of Week header */}
                  <div className="grid grid-cols-7 mb-3 md:mb-6">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="text-center font-semibold text-[9px] sm:text-xs uppercase tracking-widest text-muted-foreground/60">
                        <span className="sm:hidden">{day.charAt(0)}</span>
                        <span className="hidden sm:inline">{day}</span>
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3">
                    {allDays.map((day, index) => {
                      const dayEvents = getEventsForDate(day.date);
                      const isTodayDate = isToday(day.date);

                      return (
                        <div
                          key={index}
                          className={cn(
                            "min-h-[52px] sm:min-h-[90px] md:min-h-[120px] p-1 sm:p-2 md:p-3 rounded-xl md:rounded-2xl border transition-all duration-200 group relative",
                            day.isCurrentMonth
                              ? "glass-card border-white/5 hover:border-primary/30"
                              : "bg-secondary/20 border-transparent opacity-40",
                            isTodayDate && "border-primary ring-1 ring-primary/20",
                            dayEvents.length > 0 && day.isCurrentMonth && "bg-primary/[0.02]"
                          )}
                        >
                          {/* Day number */}
                          <div
                            className={cn(
                              "text-xs font-semibold mb-1 transition-colors",
                              day.isCurrentMonth ? "text-foreground" : "text-muted-foreground",
                              isTodayDate && "text-primary"
                            )}
                          >
                            <span className={cn(
                              "inline-flex items-center justify-center w-6 h-6 rounded-md text-xs",
                              isTodayDate && "bg-primary text-white shadow-sm shadow-primary/30"
                            )}>
                              {format(day.date, "d")}
                            </span>
                          </div>

                          {/* Events — visible on sm+ only as pills, on mobile just dot */}
                          <div className="hidden sm:block space-y-1">
                            {dayEvents.slice(0, 2).map((event) => (
                              <Link
                                key={event.id}
                                to={`/events/${event.id}`}
                                className="block text-[10px] px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-semibold truncate transition-all hover:bg-primary/20 border border-primary/10"
                                title={event.title}
                              >
                                {event.title}
                              </Link>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-[9px] font-semibold text-muted-foreground px-1 uppercase tracking-wider">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>

                          {/* On mobile: just a dot indicator if there are events */}
                          {dayEvents.length > 0 && day.isCurrentMonth && (
                            <div className="sm:hidden absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                              {Array.from({ length: Math.min(dayEvents.length, 3) }).map((_, i) => (
                                <div key={i} className="w-1 h-1 rounded-full bg-primary" />
                              ))}
                            </div>
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
              <div className="flex items-center justify-between mb-6 px-1">
                <h2
                  className="text-2xl font-semibold text-foreground"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Key Events <span className="text-primary/50">This Month</span>
                </h2>
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
                          <h3
                            className="font-semibold text-base mb-1 group-hover:text-primary transition-colors duration-200 text-foreground"
                            style={{ letterSpacing: "-0.01em" }}
                          >
                            {event.title}
                          </h3>
                          <Badge variant="outline" className="text-[10px] uppercase font-semibold tracking-widest border-border/50">{event.club_name}</Badge>
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

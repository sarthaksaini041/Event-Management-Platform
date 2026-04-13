import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Loader2, CalendarSearch } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { EventCard } from "@/components/features/events/EventCard";

const categories = ["All", "Technical", "Workshop", "Cultural", "Business", "Creative"];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: events, isLoading, error } = useEvents();

  const filteredEvents = events?.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.club_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) ?? [];

  return (
    <Layout>
      {/* ── Page Header ───────────────────────────────────────── */}
      <section className="pt-24 pb-14 relative overflow-hidden bg-background">
        {/* Subtle ambient glow */}
        <div
          className="premium-blur w-[500px] h-[500px] bg-primary/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <Badge className="mb-5 bg-primary/8 text-primary border-primary/15 rounded-lg text-[10px] font-semibold tracking-widest uppercase">
              Events
            </Badge>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              Upcoming <span className="text-gradient">Events</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Discover and register for verified college events across all departments.
            </p>
          </div>
        </div>
      </section>

      {/* ── Filters ───────────────────────────────────────────── */}
      <section className="py-5 border-b border-border/40 bg-background/80 sticky top-16 z-30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search */}
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" aria-hidden />
              <Input
                id="event-search"
                placeholder="Search events or clubs…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 rounded-xl bg-secondary/60 border-border/50 focus:border-primary text-sm"
                aria-label="Search events"
              />
            </div>

            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={
                    selectedCategory === cat
                      ? "h-11 rounded-xl whitespace-nowrap font-semibold text-xs shrink-0 shadow-sm"
                      : "h-11 rounded-xl whitespace-nowrap font-medium text-xs shrink-0 hover:bg-foreground/5"
                  }
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Events Grid ───────────────────────────────────────── */}
      <section className="py-10 bg-secondary/20 min-h-[60vh]">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" aria-label="Loading events" />
              <p className="text-sm text-muted-foreground font-medium">Loading events…</p>
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <p className="text-base text-destructive font-medium">Failed to load events. Please try again.</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <CalendarSearch className="w-12 h-12 text-muted-foreground/40" aria-hidden />
              <p className="text-base text-muted-foreground font-medium">
                {events?.length === 0
                  ? "No events available yet. Check back soon!"
                  : "No events match your search. Try a different filter."}
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground font-medium mb-5 uppercase tracking-wider">
                {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} found
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

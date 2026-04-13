import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BadgeCheck, Calendar, Clock, MapPin, Users, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { EventWithDetails } from "@/types/database";
import { format, parseISO } from "date-fns";

interface EventCardProps {
  event: EventWithDetails;
}

export function EventCard({ event }: EventCardProps) {
  const formattedDate = event.event_date
    ? format(parseISO(event.event_date), "MMM d, yyyy")
    : "TBD";
  const formattedTime = event.event_time
    ? format(new Date(`2000-01-01T${event.event_time}`), "h:mm a")
    : "TBD";
  const fillPercentage = (event.filled_seats / event.total_seats) * 100;
  const isOpen = event.status === "open";
  const almostFull = fillPercentage > 80;

  return (
    <article className="glass-card rounded-2xl overflow-hidden group flex flex-col">
      {/* Header */}
      <div className="p-5 pb-0">
        <div className="flex items-start justify-between mb-4">
          {/* Emoji icon */}
          <div
            className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center text-xl
              group-hover:scale-105 transition-transform duration-200 shrink-0"
            aria-hidden
          >
            {event.image_emoji || "📅"}
          </div>

          {/* Status badge */}
          <Badge
            className={cn(
              "text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg",
              isOpen
                ? "bg-primary/8 text-primary border-primary/20"
                : "bg-muted text-muted-foreground border-transparent"
            )}
          >
            {isOpen ? "Open" : event.status === "closed" ? "Closed" : "Cancelled"}
          </Badge>
        </div>

        {/* Title */}
        <h3
          className="text-base font-semibold mb-1 text-foreground group-hover:text-primary transition-colors duration-200 leading-snug"
          style={{ letterSpacing: "-0.01em" }}
        >
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-5 flex items-center gap-1">
          <span className="opacity-60">By</span>{" "}
          <span className="text-primary font-medium">{event.club_name}</span>
        </p>
      </div>

      {/* Details */}
      <div className="px-5 pb-0 flex-1">
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/40 px-3 py-2.5 rounded-xl border border-border/40">
            <Calendar className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden />
            <span className="truncate font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/40 px-3 py-2.5 rounded-xl border border-border/40">
            <Clock className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden />
            <span className="truncate font-medium">{formattedTime}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/40 px-3 py-2.5 rounded-xl border border-border/40 col-span-2">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden />
            <span className="truncate font-medium">{event.venue}</span>
          </div>
        </div>

        {/* Capacity */}
        <div className="mb-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" aria-hidden /> Attendance
            </span>
            <span className={almostFull ? "text-destructive font-semibold" : "text-foreground"}>
              {event.filled_seats}/{event.total_seats}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary/60 overflow-hidden" role="progressbar" aria-valuenow={fillPercentage} aria-valuemin={0} aria-valuemax={100}>
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700",
                almostFull ? "bg-destructive" : "bg-primary"
              )}
              style={{ width: `${Math.min(fillPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-5 pt-0">
        <Button
          variant={isOpen ? "default" : "secondary"}
          className={cn(
            "w-full h-11 font-semibold rounded-xl text-sm transition-all duration-200",
            !isOpen && "opacity-50 cursor-not-allowed"
          )}
          asChild={isOpen}
          disabled={!isOpen}
        >
          {isOpen ? (
            <Link to={`/events/${event.id}`} className="flex items-center justify-center gap-1.5">
              View Details
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden />
            </Link>
          ) : (
            <span className="flex items-center justify-center gap-1.5">
              <BadgeCheck className="w-4 h-4" aria-hidden />
              {event.status === "closed" ? "Registration Closed" : "Cancelled"}
            </span>
          )}
        </Button>
      </div>
    </article>
  );
}

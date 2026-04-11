import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
import type { EventWithDetails } from "@/types/database";
import { format, parseISO } from "date-fns";

interface EventCardProps {
  event: EventWithDetails;
}

export function EventCard({ event }: EventCardProps) {
  const formattedDate = event.event_date ? format(parseISO(event.event_date), "MMM d, yyyy") : "TBD";
  const formattedTime = event.event_time ? format(new Date(`2000-01-01T${event.event_time}`), "h:mm a") : "TBD";
  const fillPercentage = (event.filled_seats / event.total_seats) * 100;

  return (
    <Card className="glass-card group overflow-hidden border-border/40 hover:shadow-2xl hover:shadow-primary/10">
      {/* Event Header */}
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner">
            {event.image_emoji || "📅"}
          </div>
          <Badge 
            variant={event.status === "open" ? "default" : "secondary"}
            className={`${event.status === "open" ? "bg-primary/10 text-primary border-primary/20" : "bg-muted text-muted-foreground"} font-semibold text-[10px] uppercase tracking-wider px-3 py-1`}
          >
            {event.status === "open" ? "Registration Open" : event.status === "closed" ? "Closed" : "Cancelled"}
          </Badge>
        </div>
        <h3 className="text-xl font-display font-bold mb-1.5 group-hover:text-primary transition-colors leading-tight">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-5 flex items-center gap-1.5">
          <span className="opacity-70">By</span> 
          <span className="text-primary font-semibold hover:underline cursor-pointer">{event.club_name}</span>
        </p>
      </div>

      {/* Event Details */}
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground bg-secondary/30 p-2.5 rounded-xl border border-border/50">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground bg-secondary/30 p-2.5 rounded-xl border border-border/50">
            <Clock className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">{formattedTime}</span>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground bg-secondary/30 p-2.5 rounded-xl border border-border/50 col-span-2">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* Capacity Section */}
        <div className="mb-6 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Attendance</span>
            <span className={fillPercentage > 80 ? "text-destructive" : "text-primary"}>
              {event.filled_seats} / {event.total_seats}
            </span>
          </div>
          <div className="h-2 rounded-full bg-secondary/50 border border-border/50 overflow-hidden p-[1px]">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(var(--primary),0.3)] ${
                fillPercentage > 80 ? "bg-destructive" : "bg-gradient-to-r from-primary to-accent"
              }`}
              style={{ width: `${Math.min(fillPercentage, 100)}%` }}
            />
          </div>
        </div>

        <Button
          variant={event.status === "open" ? "default" : "secondary"}
          className={cn(
            "w-full h-11 font-bold",
            event.status !== "open" && "opacity-50 cursor-not-allowed"
          )}
          asChild
          disabled={event.status !== "open"}
        >
          <Link to={`/events/${event.id}`}>
            View Details
            <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

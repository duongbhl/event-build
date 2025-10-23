interface EventCardProps {
    _id: number;
    title: string;
    date: string;
    location: string;
    expectedAttendees: number;
    attendees:number;
    price:number;
    description: string;
    status:"pending"|"approved"|"reject";
    source: "admin" | "explore" | "myEvents"|"homepage";
}
export type { EventCardProps};
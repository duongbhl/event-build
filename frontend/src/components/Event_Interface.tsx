interface EventCardProps {
    _id: number;
    title: string;
    date: string;
    location: string;
    expectedAttendees: number;
    price:number;
    description: string;
    source: "admin" | "explore" | "myEvents"|"homepage";
}
export type { EventCardProps};
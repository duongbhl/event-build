import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IEvent extends Document {
    title: string;
    date: Date;
    location: string;
    expectedAttendees?: number;
    attendees?:number;
    price:number;
    description: string;
    organizerId: ObjectId;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
    {
        title: { type: String, required: true },
        date: { type: Date, required: true },
        location: { type: String, required: true },
        expectedAttendees: { type: Number, required:true },
        attendees:{type:Number, default:0},
        price:{type:Number, required:true},
        description: { type: String, required: true },
        organizerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    },
    { timestamps: true }
);

export default mongoose.model<IEvent>("Event", eventSchema);
import { Document, model, models, Schema } from "mongoose";

export interface ICounter extends Document {
  _id: string;
  sequence: number;
  date: string;
}

const CounterSchema = new Schema<ICounter>(
  {
    _id: { type: String, required: true }, // Will be like "receipt-20240102"
    sequence: { type: Number, required: true, default: 0 },
    date: { type: String, required: true }, // YYYY-MM-DD format
  },
  {
    timestamps: true,
    _id: false, // We're using custom _id
  }
);

const Counter = models?.Counter || model<ICounter>("Counter", CounterSchema);

export default Counter;

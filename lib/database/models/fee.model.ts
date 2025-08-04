import { Document, model, models, Schema } from "mongoose";

export interface IFee extends Document {
  studentSRNo: string;
  note?: string;
  discount?: string;
  taxRate?: string;
  items: {
    itemDescription: string;
    qty?: number;
    amount?: number;
  }[];
  currency: string;
}

const FeeSchema = new Schema<IFee>(
  {
    studentSRNo: { type: String, ref: "Student", required: true },
    note: { type: String },
    discount: { type: String },
    taxRate: { type: String },
    items: [
      {
        itemDescription: { type: String, required: true },
        qty: { type: Number, default: 1 },
        amount: { type: Number, required: true },
      },
    ],
    currency: { type: String, required: true, default: "INR" },
  },
  { timestamps: true }
);

const Fee = models?.Fee || model<IFee>("Fee", FeeSchema);

export default Fee;

import { Document, model, models, Schema } from "mongoose";

export interface IPayment extends Document {
  studentSRNo: string;
  paymentMode: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  transactionID?: string;
  paymentDate?: Date;
  ifscCode?: string;
  currency: string;
}

const PaymentSchema = new Schema<IPayment>(
  {
    studentSRNo: { type: String, ref: "Student", required: true },
    paymentMode: { type: String, required: true },
    bankName: { type: String },
    accountNumber: { type: String },
    accountName: { type: String },
    transactionID: { type: String },
    paymentDate: { type: Date },
    ifscCode: { type: String },
    currency: { type: String, required: true, default: "INR" },
  },
  { timestamps: true }
);

const Payment = models?.Payment || model<IPayment>("Payment", PaymentSchema);

export default Payment;

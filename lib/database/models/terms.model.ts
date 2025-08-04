import { Document, model, models, Schema } from "mongoose";

export interface ITerms extends Document {
  studentSRNo: string;
  receiptNumber: string;
  issueDate: string;
  academicYear?: string;
}

const TermsSchema = new Schema<ITerms>(
  {
    studentSRNo: { type: String, ref: "Student", required: true },
    receiptNumber: { type: String, required: true, unique: true, index: true }, // Add unique and index
    issueDate: { type: String, required: true },
    academicYear: { type: String, default: "" },
  },
  { timestamps: true }
);

// Add compound index for better query performance
TermsSchema.index({ receiptNumber: 1, issueDate: 1 });

const Terms = models?.Terms || model<ITerms>("Terms", TermsSchema);

export default Terms;

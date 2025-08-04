import { Document, model, models, Schema } from "mongoose";

export interface IStudent extends Document {
  studentName: string;
  studentFatherName: string;
  studentMotherName: string;
  studentSRNo: string;
  studentCourse: string;
  studentYear: string;
  studentAddress: string;
  studentCity: string;
  studentState: string;
  studentCountry: string;
  studentImage?: string;
  studentEmail?: string;
  studentPhone: string;
  studentZip: string;
}

const StudentSchema = new Schema<IStudent>(
  {
    studentName: { type: String, required: true },
    studentFatherName: { type: String, required: true },
    studentMotherName: { type: String, required: true },
    studentSRNo: { type: String, required: true, unique: true },
    studentCourse: { type: String, required: true },
    studentYear: { type: String, required: true },
    studentAddress: { type: String, required: true },
    studentCity: { type: String, required: true },
    studentState: { type: String, required: true },
    studentCountry: { type: String, required: true },
    studentImage: { type: String },
    studentEmail: { type: String, unique: true, sparse: true },
    studentPhone: { type: String, required: true, index: true },
    studentZip: { type: String, required: true },
  },
  { timestamps: true }
);

const Student = models?.Student || model<IStudent>("Student", StudentSchema);

export default Student;

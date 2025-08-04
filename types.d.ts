interface CollegeDetails {
  email?: string | null;
  collegeName?: string | null;
  collegeAddress?: string | null;
  collegeCity?: string | null;
  collegeState?: string | null;
  collegeCountry?: string | null;
  collegeLogo?: string | null;
  collegePhone?: string | null;
  collegeZip?: string | null;
}

interface StudentDetails {
  studentEmail?: string | null;
  studentName?: string | null;
  studentFatherName?: string | null;
  studentMotherName?: string | null;
  studentSRNo?: string | null;
  studentCourse?: string | null;
  studentYear?: string | null;
  studentAddress?: string | null;
  studentCity?: string | null;
  studentState?: string | null;
  studentCountry?: string | null;
  studentImage?: string | null;
  studentPhone?: string | null;
  studentZip?: string | null;
}

interface FeeItemDetails {
  note?: string | null;
  discount?: string | null;
  taxRate?: string | null;
  items: Item[];
  currency?: string;
}

interface Item {
  itemDescription: string;
  qty?: number;
  amount?: number;
}

interface ReceiptTerms {
  receiptNumber?: string | null;
  issueDate?: Date | string | null;
  academicYear?: string | null;
}

interface PaymentDetails {
  paymentMode: string;
  bankName?: string | null;
  accountNumber?: string | null;
  accountName?: string | null;
  transactionID?: string | null;
  paymentDate?: Date | string | null;
  ifscCode?: string | null;
  currency?: string;
}

interface ReceiptData {
  collegeDetails: CollegeDetails;
  studentDetails: StudentDetails;
  paymentDetails: PaymentDetails;
  receiptTerms: ReceiptTerms;
  feeDetails: FeeItemDetails;
}

type ReceiptData = PaymentDetails &
  ReceiptTerms &
  FeeItemDetails &
  StudentDetails &
  CollegeDetails;

// Database Types
interface StudentDetails {
  studentSRNo: string; // Unique identifier
  studentEmail?: string;
  studentName: string;
  studentFatherName: string;
  studentMotherName: string;
  studentCourse: string;
  studentYear: string;
  studentAddress: string;
  studentCity: string;
  studentState: string;
  studentCountry: string;
  studentImage?: string;
  studentPhone: string;
  studentZip: string;
}

interface FeeItemDetails {
  studentSRNo: string; // Relation to student
  note?: string;
  discount?: string;
  taxRate?: string;
  items: Item[];
  currency: string;
}

interface ReceiptTerms {
  studentSRNo: string; // Relation to student
  receiptNumber: string;
  issueDate: Date | string;
  academicYear?: string; // Add this line
}

interface PaymentDetails {
  studentSRNo: string; // Relation to student
  paymentMode: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  transactionID?: string;
  paymentDate?: Date | string;
  ifscCode?: string;
  currency: string;
}

// ====== Create & Update Types for API Calls
type CreateStudentParams = Omit<StudentDetails, "studentSRNo">; // No ID when creating
type UpdateStudentParams = Partial<CreateStudentParams>;

type CreateFeeParams = Omit<FeeItemDetails, "studentSRNo">;
type UpdateFeeParams = Partial<CreateFeeParams>;

type CreatePaymentParams = Omit<PaymentDetails, "studentSRNo">;
type UpdatePaymentParams = Partial<CreatePaymentParams>;

type CreateTermsParams = Omit<ReceiptTerms, "studentSRNo">;
type UpdateTermsParams = Partial<CreateTermsParams>;

// Add MongoDB specific fields to our interfaces
interface BaseMongoFields {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface StudentDetails extends BaseMongoFields {
  studentEmail: string;
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
  studentPhone: string;
  studentZip: string;
}

interface FeeItemDetails extends BaseMongoFields {
  studentSRNo: string;
  note?: string;
  discount?: string;
  taxRate?: string;
  items: Item[];
  currency: string;
}

interface PaymentDetails extends BaseMongoFields {
  studentSRNo: string;
  paymentMode: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  transactionID?: string;
  paymentDate?: Date | string;
  ifscCode?: string;
  currency: string;
}

interface ReceiptTerms extends BaseMongoFields {
  studentSRNo: string;
  receiptNumber: string;
  issueDate: Date | string;
  academicYear?: string;
}

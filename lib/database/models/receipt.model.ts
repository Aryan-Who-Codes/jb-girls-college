import { Document, model, models, Schema } from "mongoose";

export interface IReceipt extends Document {
  receiptNumber: string;
  studentSRNo: string;
  academicYear: string;
  receiptDate: Date;
  dueDate?: Date;
  
  // Financial Details
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  currency: string;
  
  // Status Management
  status: 'active' | 'voided' | 'cancelled' | 'refunded';
  version: number;
  parentReceiptId?: string; // For versioning
  voidReason?: string;
  voidedAt?: Date;
  voidedBy?: string;
  
  // Payment Information
  paymentDetails: {
    paymentMode: string;
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    transactionID?: string;
    paymentDate?: Date;
    ifscCode?: string;
  };
  
  // Fee Items
  feeItems: Array<{
    itemDescription: string;
    qty: number;
    unitAmount: number;
    totalAmount: number;
    taxRate?: number;
    taxAmount?: number;
  }>;
  
  // Discounts and Adjustments
  discounts?: Array<{
    description: string;
    type: 'percentage' | 'fixed';
    value: number;
    amount: number;
  }>;
  
  // Audit Trail
  createdBy: string;
  updatedBy?: string;
  ipAddress?: string;
  userAgent?: string;
  
  // Metadata
  notes?: string;
  tags?: string[];
  attachments?: string[];
}

const ReceiptSchema = new Schema<IReceipt>(
  {
    receiptNumber: { 
      type: String, 
      required: true, 
      unique: true,
      index: true 
    },
    studentSRNo: { 
      type: String, 
      ref: "Student", 
      required: true,
      index: true 
    },
    academicYear: { 
      type: String, 
      required: true,
      index: true 
    },
    receiptDate: { 
      type: Date, 
      required: true,
      index: true 
    },
    dueDate: { type: Date },
    
    // Financial Details
    totalAmount: { type: Number, required: true, min: 0 },
    paidAmount: { type: Number, required: true, min: 0 },
    balanceAmount: { type: Number, required: true },
    currency: { type: String, required: true, default: "INR" },
    
    // Status Management
    status: { 
      type: String, 
      enum: ['active', 'voided', 'cancelled', 'refunded'],
      default: 'active',
      index: true 
    },
    version: { type: Number, default: 1 },
    parentReceiptId: { type: String, ref: "Receipt" },
    voidReason: { type: String },
    voidedAt: { type: Date },
    voidedBy: { type: String },
    
    // Payment Information
    paymentDetails: {
      paymentMode: { type: String, required: true },
      bankName: { type: String },
      accountNumber: { type: String },
      accountName: { type: String },
      transactionID: { type: String },
      paymentDate: { type: Date },
      ifscCode: { type: String },
    },
    
    // Fee Items
    feeItems: [{
      itemDescription: { type: String, required: true },
      qty: { type: Number, required: true, min: 1 },
      unitAmount: { type: Number, required: true, min: 0 },
      totalAmount: { type: Number, required: true, min: 0 },
      taxRate: { type: Number, min: 0, max: 100 },
      taxAmount: { type: Number, min: 0 },
    }],
    
    // Discounts and Adjustments
    discounts: [{
      description: { type: String, required: true },
      type: { type: String, enum: ['percentage', 'fixed'], required: true },
      value: { type: Number, required: true },
      amount: { type: Number, required: true },
    }],
    
    // Audit Trail
    createdBy: { type: String, required: true },
    updatedBy: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String },
    
    // Metadata
    notes: { type: String },
    tags: [{ type: String }],
    attachments: [{ type: String }],
  },
  { 
    timestamps: true,
    // Enable optimistic concurrency control
    optimisticConcurrency: true
  }
);

// Compound indexes for better query performance
ReceiptSchema.index({ studentSRNo: 1, receiptDate: -1 });
ReceiptSchema.index({ academicYear: 1, receiptDate: -1 });
ReceiptSchema.index({ status: 1, receiptDate: -1 });
ReceiptSchema.index({ receiptDate: 1, status: 1 });

const Receipt = models?.Receipt || model<IReceipt>("Receipt", ReceiptSchema);

export default Receipt;
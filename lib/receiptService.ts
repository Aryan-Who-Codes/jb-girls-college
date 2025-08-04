/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectToDatabase } from '@/lib/database/mongoose';
import Student from '@/lib/database/models/student.model';
import Fee from '@/lib/database/models/fee.model';
import Payment from '@/lib/database/models/payment.model';
import Terms from '@/lib/database/models/terms.model';
import { receiptGenerator } from './receiptNumberGenerator';

interface CreateReceiptData {
  studentData: any;
  feeData: any;
  paymentData: any;
  termsData: any;
}

export class ReceiptService {
  static async createReceipt(data: CreateReceiptData) {
    await connectToDatabase();

    const { studentData, feeData, paymentData, termsData } = data;

    try {
      // Check if student exists, if not create
      let student = await Student.findOne({ studentSRNo: studentData.studentSRNo });
      
      if (!student) {
        student = new Student(studentData);
        await student.save();
      } else {
        // Update existing student data
        Object.assign(student, studentData);
        await student.save();
      }

      // Generate receipt number if not provided
      let receiptNumber = termsData.receiptNumber;
      if (!receiptNumber) {
        const issueDate = termsData.issueDate ? new Date(termsData.issueDate) : new Date();
        receiptNumber = await receiptGenerator.generateReceiptNumber(issueDate);
      }

      // Create or update fee record
      let fee = await Fee.findOne({ studentSRNo: studentData.studentSRNo });
      if (!fee) {
        fee = new Fee({
          studentSRNo: studentData.studentSRNo,
          ...feeData,
        });
      } else {
        Object.assign(fee, feeData);
      }
      await fee.save();

      // Create or update payment record
      let payment = await Payment.findOne({ studentSRNo: studentData.studentSRNo });
      if (!payment) {
        payment = new Payment({
          studentSRNo: studentData.studentSRNo,
          ...paymentData,
        });
      } else {
        Object.assign(payment, paymentData);
      }
      await payment.save();

      // Create or update terms record
      let terms = await Terms.findOne({ studentSRNo: studentData.studentSRNo });
      if (!terms) {
        terms = new Terms({
          studentSRNo: studentData.studentSRNo,
          receiptNumber,
          issueDate: termsData.issueDate || new Date().toISOString(),
          academicYear: termsData.academicYear || '', // Include academicYear
        });
      } else {
        terms.receiptNumber = receiptNumber;
        terms.issueDate = termsData.issueDate || terms.issueDate;
        terms.academicYear = termsData.academicYear || terms.academicYear; // Update academicYear
      }
      await terms.save();

      return {
        receiptNumber,
        student: student.toObject(),
        fee: fee.toObject(),
        payment: payment.toObject(),
        terms: terms.toObject(),
      };

    } catch (error) {
      console.error('Error in createReceipt:', error);
      throw error;
    }
  }

  static async getReceiptByNumber(receiptNumber: string) {
    await connectToDatabase();

    const terms = await Terms.findOne({ receiptNumber });
    if (!terms) {
      throw new Error('Receipt not found');
    }

    const [student, fee, payment] = await Promise.all([
      Student.findOne({ studentSRNo: terms.studentSRNo }),
      Fee.findOne({ studentSRNo: terms.studentSRNo }),
      Payment.findOne({ studentSRNo: terms.studentSRNo }),
    ]);

    return {
      receiptNumber,
      student: student?.toObject(),
      fee: fee?.toObject(),
      payment: payment?.toObject(),
      terms: terms.toObject(),
    };
  }

  static async updateReceipt(receiptNumber: string, updateData: any) {
    await connectToDatabase();

    const terms = await Terms.findOne({ receiptNumber });
    if (!terms) {
      throw new Error('Receipt not found');
    }

    const studentSRNo = terms.studentSRNo;

    // Update each collection if data is provided
    if (updateData.studentData) {
      await Student.findOneAndUpdate(
        { studentSRNo },
        updateData.studentData,
        { new: true }
      );
    }

    if (updateData.feeData) {
      await Fee.findOneAndUpdate(
        { studentSRNo },
        updateData.feeData,
        { new: true }
      );
    }

    if (updateData.paymentData) {
      await Payment.findOneAndUpdate(
        { studentSRNo },
        updateData.paymentData,
        { new: true }
      );
    }

    if (updateData.termsData) {
      await Terms.findOneAndUpdate(
        { receiptNumber },
        updateData.termsData,
        { new: true }
      );
    }

    // Return updated receipt
    return this.getReceiptByNumber(receiptNumber);
  }
}

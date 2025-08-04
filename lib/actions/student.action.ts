"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database/mongoose";
import Student from "../database/models/student.model";
import Fee from "../database/models/fee.model";
import Payment from "../database/models/payment.model";
import Terms from "../database/models/terms.model";
import { handleError } from "../utils";

// ======================= STUDENT ACTIONS =======================

// CREATE Student
export async function createStudent(studentData: CreateStudentParams) {
  try {
    await connectToDatabase();

    const newStudent = await Student.create(studentData);

    revalidatePath("/students"); // Refresh student list
    return JSON.parse(JSON.stringify(newStudent));
  } catch (error) {
    handleError(error);
  }
}

// GET Student by ID
export async function getStudentById(studentSRNo: string) {
  try {
    await connectToDatabase();

    const student = await Student.findById(studentSRNo);
    if (!student) throw new Error("Student not found");

    return JSON.parse(JSON.stringify(student));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE Student
export async function updateStudent(studentSRNo: string, updateData: UpdateStudentParams) {
  try {
    await connectToDatabase();

    const updatedStudent = await Student.findByIdAndUpdate(studentSRNo, updateData, { new: true });
    if (!updatedStudent) throw new Error("Student update failed");

    revalidatePath("/students");
    return JSON.parse(JSON.stringify(updatedStudent));
  } catch (error) {
    handleError(error);
  }
}

// DELETE Student
export async function deleteStudent(studentSRNo: string) {
  try {
    await connectToDatabase();

    const deletedStudent = await Student.findByIdAndDelete(studentSRNo);
    if (!deletedStudent) throw new Error("Student not found");

    revalidatePath("/students");
    return JSON.parse(JSON.stringify(deletedStudent));
  } catch (error) {
    handleError(error);
  }
}

// ======================= FEE ACTIONS =======================

// CREATE Fee
export async function createFee(feeData: CreateFeeParams) {
  try {
    await connectToDatabase();

    const newFee = await Fee.create(feeData);
    revalidatePath("/fees");

    return JSON.parse(JSON.stringify(newFee));
  } catch (error) {
    handleError(error);
  }
}

// GET Fee by Student ID
export async function getFeesBystudentSRNo(studentSRNo: string) {
  try {
    await connectToDatabase();

    const fees = await Fee.find({ studentSRNo }).populate("studentSRNo");
    return JSON.parse(JSON.stringify(fees));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE Fee
export async function updateFee(feeId: string, updateData: UpdateFeeParams) {
  try {
    await connectToDatabase();

    const updatedFee = await Fee.findByIdAndUpdate(feeId, updateData, { new: true });
    if (!updatedFee) throw new Error("Fee update failed");

    revalidatePath("/fees");
    return JSON.parse(JSON.stringify(updatedFee));
  } catch (error) {
    handleError(error);
  }
}

// DELETE Fee
export async function deleteFee(feeId: string) {
  try {
    await connectToDatabase();

    const deletedFee = await Fee.findByIdAndDelete(feeId);
    if (!deletedFee) throw new Error("Fee not found");

    revalidatePath("/fees");
    return JSON.parse(JSON.stringify(deletedFee));
  } catch (error) {
    handleError(error);
  }
}

// ======================= PAYMENT ACTIONS =======================

// CREATE Payment
export async function createPayment(paymentData: CreatePaymentParams) {
  try {
    await connectToDatabase();

    const newPayment = await Payment.create(paymentData);
    revalidatePath("/payments");

    return JSON.parse(JSON.stringify(newPayment));
  } catch (error) {
    handleError(error);
  }
}

// GET Payments by Student ID
export async function getPaymentsBystudentSRNo(studentSRNo: string) {
  try {
    await connectToDatabase();

    const payments = await Payment.find({ studentSRNo }).populate("studentSRNo");
    return JSON.parse(JSON.stringify(payments));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE Payment
export async function updatePayment(paymentId: string, updateData: UpdatePaymentParams) {
  try {
    await connectToDatabase();

    const updatedPayment = await Payment.findByIdAndUpdate(paymentId, updateData, { new: true });
    if (!updatedPayment) throw new Error("Payment update failed");

    revalidatePath("/payments");
    return JSON.parse(JSON.stringify(updatedPayment));
  } catch (error) {
    handleError(error);
  }
}

// DELETE Payment
export async function deletePayment(paymentId: string) {
  try {
    await connectToDatabase();

    const deletedPayment = await Payment.findByIdAndDelete(paymentId);
    if (!deletedPayment) throw new Error("Payment not found");

    revalidatePath("/payments");
    return JSON.parse(JSON.stringify(deletedPayment));
  } catch (error) {
    handleError(error);
  }
}

// ======================= TERMS ACTIONS =======================

// CREATE Terms
export async function createTerms(termsData: CreateTermsParams) {
  try {
    await connectToDatabase();

    const newTerms = await Terms.create(termsData);
    revalidatePath("/terms");

    return JSON.parse(JSON.stringify(newTerms));
  } catch (error) {
    handleError(error);
  }
}

// GET Terms by Student ID
export async function getTermsBystudentSRNo(studentSRNo: string) {
  try {
    await connectToDatabase();

    const terms = await Terms.find({ studentSRNo }).populate("studentSRNo");
    return JSON.parse(JSON.stringify(terms));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE Terms
export async function updateTerms(termsId: string, updateData: UpdateTermsParams) {
  try {
    await connectToDatabase();

    const updatedTerms = await Terms.findByIdAndUpdate(termsId, updateData, { new: true });
    if (!updatedTerms) throw new Error("Terms update failed");

    revalidatePath("/terms");
    return JSON.parse(JSON.stringify(updatedTerms));
  } catch (error) {
    handleError(error);
  }
}

// DELETE Terms
export async function deleteTerms(termsId: string) {
  try {
    await connectToDatabase();

    const deletedTerms = await Terms.findByIdAndDelete(termsId);
    if (!deletedTerms) throw new Error("Terms not found");

    revalidatePath("/terms");
    return JSON.parse(JSON.stringify(deletedTerms));
  } catch (error) {
    handleError(error);
  }
}

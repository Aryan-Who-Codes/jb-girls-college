/* eslint-disable @typescript-eslint/no-unused-vars */
import Fee from "@/lib/database/models/fee.model";
import Payment from "@/lib/database/models/payment.model";
import Student from "@/lib/database/models/student.model";
import Terms from "@/lib/database/models/terms.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";

// GET handler for /api/form (no params needed here)
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // Option 1: Return all students
    const students = await Student.find();
    return NextResponse.json({ students });

    // Option 2: Handle query parameters if you need specific data
    // const { searchParams } = new URL(req.url);
    // const studentSRNo = searchParams.get('studentSRNo');
    //
    // if (studentSRNo) {
    //   const student = await Student.findOne({ studentSRNo });
    //   if (!student) {
    //     return NextResponse.json({ error: "Student not found" }, { status: 404 });
    //   }
    //
    //   const fee = await Fee.findOne({ studentSRNo: student.studentSRNo });
    //   const payment = await Payment.findOne({ studentSRNo: student.studentSRNo });
    //   const terms = await Terms.findOne({ studentSRNo: student.studentSRNo });
    //
    //   return NextResponse.json({
    //     student,
    //     fee,
    //     payment,
    //     terms,
    //   });
    // }
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { studentDetails, feeDetails, receiptTerms, paymentDetails } =
      await req.json();

    // Ensure student exists or create a new one
    let student = await Student.findOne({
      studentSRNo: studentDetails.studentSRNo,
    });
    if (!student) {
      student = await Student.create(studentDetails);
    } else {
      student = await Student.findByIdAndUpdate(student._id, studentDetails, {
        new: true,
      });
    }

    // Store fee details
    await Fee.findOneAndUpdate(
      { studentSRNo: student.studentSRNo },
      { ...feeDetails, studentSRNo: student.studentSRNo },
      { upsert: true, new: true }
    );

    // Store payment details
    await Payment.findOneAndUpdate(
      { studentSRNo: student.studentSRNo },
      { ...paymentDetails, studentSRNo: student.studentSRNo },
      { upsert: true, new: true }
    );

    // Store terms & conditions
    await Terms.findOneAndUpdate(
      { studentSRNo: student.studentSRNo },
      {
        receiptNumber: receiptTerms.receiptNumber,
        issueDate: receiptTerms.issueDate,
        studentSRNo: student.studentSRNo,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(
      { message: "Form data saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
}

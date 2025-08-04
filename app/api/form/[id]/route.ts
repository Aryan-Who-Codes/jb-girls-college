import { connectToDatabase } from "@/lib/database/mongoose";
import Student from "@/lib/database/models/student.model";
import Fee from "@/lib/database/models/fee.model";
import Payment from "@/lib/database/models/payment.model";
import Terms from "@/lib/database/models/terms.model";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params object (required in Next.js 15+)
    const { id } = await params;

    await connectToDatabase();

    const student = await Student.findById(id);
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const fee = await Fee.findOne({ studentSRNo: student.studentSRNo });
    const payment = await Payment.findOne({ studentSRNo: student.studentSRNo });
    const terms = await Terms.findOne({ studentSRNo: student.studentSRNo });

    return NextResponse.json({
      student,
      fee,
      payment,
      terms,
    });
  } catch (error) {
    return handleError(error);
  }
}
import { connectToDatabase } from "@/lib/database/mongoose";
import Student from "@/lib/database/models/student.model";
import Fee from "@/lib/database/models/fee.model";
import Payment from "@/lib/database/models/payment.model";
import Terms from "@/lib/database/models/terms.model";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    // Await the params Promise to get the actual parameters
    const { id } = await params;

    // Get student details first
    const student = await Student.findById(id);
    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    // Delete all related records using studentSRNo
    await Promise.all([
      Student.findByIdAndDelete(id),
      Fee.deleteOne({ studentSRNo: student.studentSRNo }),
      Payment.deleteOne({ studentSRNo: student.studentSRNo }),
      Terms.deleteOne({ studentSRNo: student.studentSRNo }),
    ]);

    return NextResponse.json({
      message: "Student and related data deleted successfully",
    });
  } catch (error) {
    return handleError(error);
  }
}
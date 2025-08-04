import { connectToDatabase } from "@/lib/database/mongoose";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";
import Student from "@/lib/database/models/student.model";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Get total students count
    const totalStudents = await Student.countDocuments();
    
    // Calculate total revenue (you can modify this based on your fee structure)
    const totalRevenue = await Student.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$feePaid" }
        }
      }
    ]);

    // Get pending fees count
    const pendingFees = await Student.countDocuments({ feeStatus: "pending" });

    return NextResponse.json({
      totalStudents,
      totalRevenue: totalRevenue[0]?.total || 0,
      pendingFees
    });
    
  } catch (error) {
    return handleError(error);
  }
}

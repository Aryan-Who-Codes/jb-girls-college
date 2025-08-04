// app/api/receiptNumber/route.ts
import Terms from "@/lib/database/models/terms.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";

// Add interface for Terms document
interface ITerms {
  _id: string;
  receiptNumber: string;
  createdAt: Date;
  __v: number;
}

// Establish connection at module level
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dbConnection: Promise<any> | null = null;

/**
 * GET handler to retrieve the latest receipt number
 */
export async function GET() {
  try {
    // Reuse connection if already established
    if (!dbConnection) {
      dbConnection = connectToDatabase();
    }
    await dbConnection;

    // Find the latest receipt number with a non-temporary format (not containing "TEMP")
    const latestTerm = await Terms.findOne({
      receiptNumber: { $regex: /^JBG\/\d{4}\/\d{4}$/ },
    })
      .sort({ createdAt: -1 })
      .lean<ITerms>()
      .exec();

    if (!latestTerm) {
      // If no receipt found, return starting number
      return NextResponse.json({
        latestReceiptNumber: null,
        nextReceiptNumber: "JBG/2025/0001",
      });
    }

    // Extract numeric part
    const currentNumber = parseInt(
      latestTerm.receiptNumber.split("/").pop() || "0"
    );
    const nextNumber = (currentNumber + 1).toString().padStart(4, "0");
    const year = new Date().getFullYear();

    return NextResponse.json({
      latestReceiptNumber: latestTerm.receiptNumber,
      nextReceiptNumber: `JBG/${year}/${nextNumber}`,
    });
  } catch (error) {
    return handleError(error);
  }
}

/**
 * POST handler to reserve a new receipt number
 */
export async function POST(req: Request) {
  try {
    if (!dbConnection) {
      dbConnection = connectToDatabase();
    }
    await dbConnection;

    const { studentSRNo } = await req.json();

    if (!studentSRNo) {
      return NextResponse.json(
        { error: "Student SR number is required" },
        { status: 400 }
      );
    }

    // Get the latest receipt number
    const latestTerm = await Terms.findOne({
      receiptNumber: { $regex: /^JBG\/\d{4}\/\d{4}$/ },
    })
      .sort({ createdAt: -1 })
      .lean<ITerms>()
      .exec();

    // Generate next number
    const currentNumber = latestTerm
      ? parseInt(latestTerm.receiptNumber.split("/").pop() || "0")
      : 0;
    const nextNumber = (currentNumber + 1).toString().padStart(4, "0");
    const year = new Date().getFullYear();
    const newReceiptNumber = `JBG/${year}/${nextNumber}`;

    // Return the reserved number
    return NextResponse.json({
      receiptNumber: newReceiptNumber,
      studentSRNo,
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: Request) {
  try {
    if (!dbConnection) {
      dbConnection = connectToDatabase();
    }
    await dbConnection;

    const { id, ...updateData } = await req.json();
    const updatedTerms = await Terms.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec();

    return NextResponse.json(updatedTerms);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: Request) {
  try {
    if (!dbConnection) {
      dbConnection = connectToDatabase();
    }
    await dbConnection;

    const { id } = await req.json();
    await Terms.findByIdAndDelete(id).exec();

    return NextResponse.json({ message: "Terms record deleted successfully" });
  } catch (error) {
    return handleError(error);
  }
}

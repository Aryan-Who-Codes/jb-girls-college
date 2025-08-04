import Payment from "@/lib/database/models/payment.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { handleError } from "@/lib/utils";
import { NextResponse } from "next/server";

// Establish connection at module level to reuse across requests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let dbConnection: Promise<any> | null = null;

export async function GET() {
  try {
    // Reuse connection if already established
    if (!dbConnection) {
      dbConnection = connectToDatabase();
    }
    await dbConnection;

    // Use lean() for faster queries
    const payments = await Payment.find().lean().exec();

    return NextResponse.json(payments);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    if (!dbConnection) {
      dbConnection = connectToDatabase();
    }
    await dbConnection;

    const body = await req.json();
    const newPayment = await Payment.create(body);
    return NextResponse.json(newPayment, { status: 201 });
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
    const updatedPayment = await Payment.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec();

    return NextResponse.json(updatedPayment);
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
    await Payment.findByIdAndDelete(id).exec();

    return NextResponse.json({
      message: "Payment record deleted successfully",
    });
  } catch (error) {
    return handleError(error);
  }
}

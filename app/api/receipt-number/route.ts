/* eslint-disable @typescript-eslint/no-unused-vars */
import { receiptGenerator } from "@/lib/receiptNumberGenerator";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("GET /api/receipt-number called");

    const receiptNumber = await receiptGenerator.generateReceiptNumber();

    return NextResponse.json({
      success: true,
      receiptNumber,
    });
  } catch (error) {
    console.error("Error generating receipt number:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate receipt number",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("POST /api/receipt-number called");

    const body = await request.json();
    const { date } = body;

    const receiptDate = date ? new Date(date) : new Date();
    const receiptNumber = await receiptGenerator.generateReceiptNumber(
      receiptDate
    );

    return NextResponse.json({
      success: true,
      receiptNumber,
    });
  } catch (error) {
    console.error("Error generating receipt number:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate receipt number",
      },
      { status: 500 }
    );
  }
}

import { ReceiptService } from "@/lib/receiptService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentData, feeData, paymentData, termsData } = body;

    // Validate required fields
    if (!studentData?.studentSRNo) {
      return NextResponse.json(
        { error: "Student SR No is required" },
        { status: 400 }
      );
    }

    if (!feeData?.items?.length) {
      return NextResponse.json(
        { error: "Fee items are required" },
        { status: 400 }
      );
    }

    if (!paymentData?.paymentMode) {
      return NextResponse.json(
        { error: "Payment mode is required" },
        { status: 400 }
      );
    }

    // Create receipt with all data including academicYear
    const receipt = await ReceiptService.createReceipt({
      studentData,
      feeData,
      paymentData,
      termsData: {
        ...termsData,
        academicYear: termsData.academicYear || "", // Include academicYear
      },
    });

    return NextResponse.json({
      success: true,
      data: receipt,
    });
  } catch (error) {
    console.error("Error creating receipt:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { receiptNumber, ...updateData } = body;

    if (!receiptNumber) {
      return NextResponse.json(
        { error: "Receipt number is required" },
        { status: 400 }
      );
    }

    const updatedReceipt = await ReceiptService.updateReceipt(
      receiptNumber,
      updateData
    );

    return NextResponse.json({
      success: true,
      data: updatedReceipt,
    });
  } catch (error) {
    console.error("Error updating receipt:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ADD THIS NEW GET METHOD to your existing file
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const receiptNumber = searchParams.get('receiptNumber');

    if (!receiptNumber) {
      return NextResponse.json(
        { error: "Receipt number is required" },
        { status: 400 }
      );
    }

    const receipt = await ReceiptService.getReceiptByNumber(receiptNumber);

    return NextResponse.json({
      success: true,
      data: receipt,
    });
  } catch (error) {
    console.error("Error fetching receipt:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import Fee from "@/lib/database/models/fee.model";
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
    const fees = await Fee.find().lean().exec();
    
    return NextResponse.json(fees);
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
    const newFee = await Fee.create(body);
    return NextResponse.json(newFee, { status: 201 });
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
    const updatedFee = await Fee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec();
    
    return NextResponse.json(updatedFee);
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
    await Fee.findByIdAndDelete(id).exec();
    
    return NextResponse.json({ message: "Fee record deleted successfully" });
  } catch (error) {
    return handleError(error);
  }
}

// export async function PATCH(req: Request) {
//   try {
//     await connectToDatabase();
//     const { id, ...updateData } = await req.json();
//     const updatedFee = await Fee.findByIdAndUpdate(id, updateData, {
//       new: true,
//     });
//     return NextResponse.json(updatedFee);
//   } catch (error) {
//     return handleError(error);
//   }
// }

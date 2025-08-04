import Student from "@/lib/database/models/student.model";
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

    // Use lean() for faster queries when you don't need Mongoose document methods
    const students = await Student.find().lean().exec();

    return NextResponse.json(students);
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
    const newStudent = await Student.create(body);
    return NextResponse.json(newStudent, { status: 201 });
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
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedStudent);
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
    await Student.findByIdAndDelete(id);
    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error) {
    return handleError(error);
  }
}

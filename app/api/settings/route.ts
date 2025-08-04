import Settings from "@/lib/database/models/settings.model";
import { connectToDatabase } from "@/lib/database/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    // Get settings from database
    const settings = await Settings.findOne({}).lean();

    if (!settings) {
      return NextResponse.json({
        success: true,
        data: {},
      });
    }

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectToDatabase();

    // Update or create settings
    const settings = await Settings.findOneAndUpdate(
      {}, // Empty filter to match any document
      { $set: body },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update settings" },
      { status: 500 }
    );
  }
}

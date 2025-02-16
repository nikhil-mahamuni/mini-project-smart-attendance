import { NextResponse } from "next/server";
import {
  activateSession,
  closeSession,
  getSessionDetails,
  isTeacherIdValid,
} from "../../_services/session";

export async function PATCH(request, { params }) {
 
  const { teacherId } = params; // Get teacherId from URL

  if (!teacherId) {
    return NextResponse.json(
      { error: "Teacher ID is required" },
      { status: 400 }
    );
  }

  try {
    // ✅ Validate teacher ID
    const teacherData = await isTeacherIdValid(teacherId);
    if (!teacherData) {
      return NextResponse.json(
        { success: false, message: "Invalid Teacher ID" },
        { status: 409 }
      );
    }

    // ✅ Check session details
    const sessionDetails = await getSessionDetails(division);
    if (!sessionDetails) {
      return NextResponse.json(
        {
          message: `No session found for division ${division}`,
          success: false,
        },
        { status: 409 }
      );
    }

    if (action === "open") {
      if (sessionDetails.status === true) {
        return NextResponse.json(
          { message: "Session Already Active", success: false },
          { status: 409 }
        );
      }
      await activateSession(division, teacherData.teacherName, subject);
      return NextResponse.json(
        { message: "Session activated successfully", success: true },
        { status: 200 }
      );
    } else if (action === "close") {
      if (sessionDetails.status === false) {
        return NextResponse.json(
          { message: "Session Already Closed", success: false },
          { status: 409 }
        );
      }
      await closeSession(division, subject);
      return NextResponse.json(
        { message: "Session closed successfully", success: true },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Invalid action. Use 'open' or 'close'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { checkTeacherEmail } from "../../_services/teacher";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SignJWT } from "jose";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  try {
    if (!email) {
      return NextResponse.json(
        { message: "Missing email parameter" },
        { status: 400 }
      );
    }

    const teacherData = await checkTeacherEmail(email);

    if (!teacherData) {
      return NextResponse.json(
        { message: "No such email exists" },
        { status: 404 }
      );
    }

    // email is added by admin
    return NextResponse.json(
      {
        message: "Email Found",
        isVerified: teacherData.isVerified,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  const { uid, email } = await request.json();

  try {
    if (!uid || !email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const teacherData = await checkTeacherEmail(email);

    if (!teacherData) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }

    const teacherRef = doc(db, "teachers", teacherData.id);
    await updateDoc(teacherRef, {
      isVerified: true,
      uid: uid,
    });

    return NextResponse.json(
      { message: "Teacher verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  console.log("executed");

  try {
    const { uid } = await request.json();

    if (!uid) {
      return NextResponse.json({ error: "Missing UID" }, { status: 400 });
    }

    // ✅ Generate JWT token
    const token = await new SignJWT({ uid })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const response = NextResponse.json(
      { message: "Login successful!", uid },
      { status: 200 }
    );

    // ✅ Set cookie using Next.js `cookies()` utility
    response.cookies.set("teacherToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "Strict",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Token generation failed: " + error.message },
      { status: 500 }
    );
  }
}

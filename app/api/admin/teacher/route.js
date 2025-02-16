import { db } from "@/lib/firebase";
import { adminAuth, adminDB } from "@/lib/firebaseAdmin";
import { auth } from "firebase-admin";
import { getAuth } from "firebase/auth";

import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import { checkTeacherEmail } from "../../_services/teacher";

// teacher is created by admin
export async function POST(request) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json({
        message: "Missing required fields",
        status: 400,
      });
    }

    const isEmailAvialable = await checkTeacherEmail(email);

    if (isEmailAvialable !== null) {
      return NextResponse.json({
        message: "Teacher with this email already exists",
        status: 400,
      });
    }

    // ✅ Generate a new document reference with a random ID
    const teacherRef = doc(collection(db, "teachers"));

    // Store teacher data in Firestore
    await setDoc(teacherRef, {
      name,
      email,
      createdAt: new Date().toISOString(),
      isVerified: false,
    });

    return NextResponse.json({
      message: "New Teacher Added Successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Server error: " + error.message,
      status: 500,
    });
  }
}

// ✅ Fetch All Teachers
export async function GET(request) {
  try {
    const teachersRef = collection(db, "teachers");
    const querySnapshot = await getDocs(teachersRef);

    const data = querySnapshot.docs.map((doc) => {
      const { name, email, isVerified, uid } = doc.data();
      return {
        id: doc.id,
        name,
        email,
        isVerified,
        loginId: uid,
      };
    });

    return NextResponse.json({
      status: 200,
      message: "Teachers fetched successfully",
      data,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}

// ✅ Delete Teacher
export async function DELETE(request) {
  try {
    const { id, loginId } = await request.json();

    if (!id) {
      return NextResponse.json({
        status: 400,
        message: "Missing teacher ID",
      });
    }

    const teacherRef = doc(db, "teachers", id);

    // ✅ Delete teacher from Firestore
    await deleteDoc(teacherRef);

    // ✅ Delete teacher from Firebase Authentication
    if (loginId) {
      await adminAuth.deleteUser(loginId);
    }

    return NextResponse.json({
      status: 200,
      message: "Teacher deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message || "Failed to delete Teacher",
    });
  }
}

export async function PATCH(request) {
  try {
    const { id, email, name } = await request.json();

    if (!id) {
      return NextResponse.json({
        status: 400,
        message: "Missing teacher ID",
      });
    }

    // Reference to the specific teacher's document in Firestore
    const teacherRef = doc(db, "teachers", id);

    // Construct update object dynamically
    const updatedFields = {
      ...(email && { email }),
      ...(name && { name }),
    };

    // If no fields are provided, return an error
    if (Object.keys(updatedFields).length === 0) {
      return NextResponse.json({
        status: 400,
        message: "No valid fields provided for update",
      });
    }

    // Update document in Firestore
    await updateDoc(teacherRef, updatedFields);

    return NextResponse.json({
      status: 200,
      message: "Teacher updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
}

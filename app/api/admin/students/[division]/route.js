import { db } from "@/lib/firebase";

import { collection, getDoc, getDocs, doc, writeBatch, deleteDoc, increment, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Fetch all Students from a division
export async function GET(request, { params }) {
  try {
    const {division} = await params;

    if (!division) {
      return NextResponse.json(
        { success: false, message: "Division parameter is required." },
        { status: 400 }
      );
    }

    const studentsRef = collection(db, "students", division, "students");
    const querySnapshot = await getDocs(studentsRef);

    const students = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (students.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: `No students found in division ${division}.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ students, status: 200 });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message || "Failed to fetch students.",
    });
  }
}

export async function PATCH(request, { params }) {
    const { division} = await params;
    const { rfidNumber, name, rollNo } = await request.json()

    console.log(rfidNumber, division);
    
  
    if (!rfidNumber || !division) {
      return NextResponse.json({
        status: 400,
        message: "Missing teacher ID",
      });
    }
    try {
  
      const studentRef = doc(db, `students/${division}/students/${rfidNumber}`);
  
      // Check if the student exists
      const studentSnap = await getDoc(studentRef);
      if (!studentSnap.exists()) {
        return NextResponse.json(
          { message: "Student not found", status: 404 },
        );
      }
  
      // Prepare update fields dynamically
      const updatedFields = {
        ...(rollNo && { rollNo }),
        ...(name && { name }),
      };
  
  
      // Ensure at least one field is provided for update
      if (Object.keys(updatedFields).length === 0) {
        return NextResponse.json(
          { message: "No valid fields provided for update", status: 400 },
        );
      }
  
      // Perform update
      await updateDoc(studentRef, updatedFields);
  
      return NextResponse.json(
        { message: "Student updated successfully", status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { message: error.message || "Internal Server Error", status: 500 },
      );
    }
}

// Add New Student To Division
export async function POST(request, {params}) {
  const { division } = await params;
  const {rfidNumber, name, rollNo} = await request.json()

  if (!division || !rfidNumber) {
    return NextResponse.json({
      status: 400,
      message: "Missing division or RFID number",
    });
  }

  try {

    const studentRef = doc(db, `students/${division}/students`, rfidNumber);
    const divisionRef = doc(db, "students", division);


    // Check if student already exists
    const studentSnap = await getDoc(studentRef);
    if (studentSnap.exists()) {
      return NextResponse.json({
        status: 409,
        message: "RFID number already exists!",
      });
    }

    const divisionSnap = await getDoc(divisionRef)
    if(!divisionSnap.exists()){
      return NextResponse.json({
        status: 404,
        message: `Division ${division} not found.`,
      });
    }
 

    const batch = writeBatch(db);

    batch.set(studentRef, {
      division,
      rollNo,
      name,
      rfidNumber,
      attendance: {},
    });

    // Increment total students in division
    batch.set(divisionRef, { totalStudents: increment(1) }, { merge: true });

    // Commit batch operations
    await batch.commit();

    return NextResponse.json({
      status: 200,
      message: "Student added successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Server error: " + error.message,
    });
  }
}

// Delete Student
export async function DELETE(request, { params }) {
  // Extract nested params
  const { division } = await params;
  const { rfidNumber } = await request.json();

  if (!division || !rfidNumber) {
    return NextResponse.json({
      status: 400,
      message: "Missing division or RFID number",
    });
  }

  try {
    // Reference to Firestore document
    const studentRef = doc(db, `students/${division}/students/${rfidNumber}`);
    const studentDoc = await getDoc(studentRef);

    // Delete document
    await deleteDoc(studentRef);

    return NextResponse.json({
      status: 200,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Delete Error:", error);

    return NextResponse.json({
      status: 500,
      message: error.message || "Failed to delete student",
    });
  }
}


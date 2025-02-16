import { db, realtimeDb } from "@/lib/firebase";
import { get, ref, set } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const { division } = await params;
  const { rfid } = await request.json();

  const studentData = await studentExist(rfid, division);

  if (!studentData) {
    return;
  }

  const studentAttendanceRef = ref(
    realtimeDb,
    `session/${division}/presentStudents/${rfid}`
  );

  await set(studentAttendanceRef, {
    rfidNumber: studentData.rfidNumber,
    studentRollNo: studentData.studentRollNo,
    studentName: studentData.studentName,
    verified: true,
  });

  return NextResponse.json(
    { message: "Student added to attendance", success: true },
    { status: 200 }
  );
}

async function studentExist(rfid, division) {
  try {
    const studentRef = doc(db, `students/${division}/students`, rfid);
    const snapshot = await getDoc(studentRef);
    if (snapshot.exists()) {
      return snapshot.data();
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function GET(request) {
  try {
    const sessionRef = ref(realtimeDb, "session");
    const snapShot = await get(sessionRef);

    if (snapShot.exists()) {
      const sessionData = snapShot.val();
      return NextResponse.json({ data: sessionData }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "No session data found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching session data:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

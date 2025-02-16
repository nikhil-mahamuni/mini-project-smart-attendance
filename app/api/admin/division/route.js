import { db } from "@/lib/firebase";
import { adminDB } from "@/lib/firebaseAdmin";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, writeBatch } from "firebase/firestore";
import { NextResponse } from "next/server";
import { realtimeDb } from "@/lib/firebase";
import { ref, remove, set } from "firebase/database";

// Add New Division
export async function POST(request) {
  try {
    const { division, subjects } = await request.json();

    const studentsRef = doc(db, "students", division);

    const docSnapShot = await getDoc(studentsRef);
    if (docSnapShot.exists()) {
      return NextResponse.json(
        { message: "Division already exists!" },
        { status: 400 }
      );
    }

    await setDoc(studentsRef, {totalStudents: 0, subjects})

    // ✅ Corrected: Store session data in Realtime Database
    const sessionRef = ref(realtimeDb, `session/${division}`);
    await set(sessionRef, {
      sessionStartedAt: "",
      sessionEndedAt: "",
      activeSubject: "",
      status: false,
      sessionStartedBy: "",
      division: division
    })

    return NextResponse.json(
      {
        message: `New Division ${division} created successfully!`,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// GET All Divisions general data
export async function GET(request){
  try {
    const divisionRef = collection(db, "students");
    const snapShot = await getDocs(divisionRef)

    if (snapShot.empty) {
      return NextResponse.json({ message: "No divisions found!" }, { status: 404 });
    }

    const divisions = []

    snapShot.forEach((doc) => {
      const {subjects, totalStudents} = doc.data()
      divisions.push({id: doc.id, subjects, totalStudents})
    })

    return NextResponse.json(divisions, {status: 200})

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Delete Divison
export async function DELETE(request){
  try {
    const {division} = await request.json()

    if (!division) {
      return NextResponse.json({ message: "Division is required!" }, { status: 400 });
    }

    // 🔹 Firestore: Delete division document
    const studentsRef = doc(db, "students", division);
    await deleteDoc(studentsRef);

    // 🔹 Realtime Database: Delete session data
    const sessionRef = ref(realtimeDb, `session/${division}`);
    await remove(sessionRef);

    return NextResponse.json({ message: `Division ${division} deleted successfully!` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


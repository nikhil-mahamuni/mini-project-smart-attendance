import { realtimeDb } from "@/lib/firebase";
import { get, push, ref, set } from "firebase/database";
import { NextResponse } from "next/server";

export async function POST(request){
  return NextResponse.json("Hiii")
  // try {
  //   const { division, subject, teacherName, teacherId } = await request.json();
  //   const sessionRef = ref(realtimeDb, `session/${division}`);

  //   //check if session already exist
  //   const snapShot = await get(sessionRef);
  //   if (snapShot.exists()) {
  //     return NextResponse.json(
  //       { message: "Session already exist" },
  //       { status: 400 }
  //     );
  //   }

  //   await set(sessionRef, {
  //     status: true,
  //     subject,
  //     teacherId,
  //     teacherName,
  //     division,
  //     prsentGirls: 0,
  //     presentBoys: 0,
  //     presentStudentsIds: [],
  //     sessionStartedAt: new Date().toISOString(),
  //   });

  //   return NextResponse.json(
  //     { message: "New session created successfully" },
  //     { status: 200 }
  //   );
  // } catch (error) {
  //   return NextResponse.json({ message: error.message }, { status: 500 });
  // }
}
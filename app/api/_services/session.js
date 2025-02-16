import { db, realtimeDb } from "@/lib/firebase";
import { get, ref, update, set, remove } from "firebase/database";
import { doc, getDoc, increment, writeBatch } from "firebase/firestore";


// Validate if teacher ID exists
export async function isTeacherIdValid(teacherId) {
  try {
    const teacherRef = doc(db, "teachers", teacherId);
    const teacherSnap = await getDoc(teacherRef);

    return teacherSnap.exists() ? teacherSnap.data() : null;
  } catch (error) {
    return null;
  }
}

// Fetch session details from the Realtime Database
export async function getSessionDetails(division) {
  try {
    const sessionRef = ref(realtimeDb, `session/${division}`);
    const snapShot = await get(sessionRef);

    return snapShot.exists() ? snapShot.val() : null;
  } catch (error) {
    return null;
  }
}

// Activate session and initialize presentStudents array
export async function activateSession(division, teacherName, subject) {
  try {
    const sessionRef = ref(realtimeDb, `session/${division}`);
    await update(sessionRef, {
      status: true,
      sessionStartedBy: teacherName,
      sessionStartedAt: Date.now(),
      activeSubject: subject,
      sessionEndedAt: "",
    });
  } catch (error) {
    throw new Error("Failed to activate session");
  }
}

// ✅ **Function to Close Session**
export async function closeSession(division, activeSubject) {
  try {
    const sessionRef = ref(realtimeDb, `session/${division}`);
    const prsentStudentsRef = ref(
      realtimeDb,
      `session/${division}/presentStudents`
    );

    const presentSnap = await get(prsentStudentsRef);

    if (presentSnap.exists()) {
      const presentStudentIds = Object.keys(presentSnap.val());
      const batch = writeBatch(db);

      for (const rfidNumber of presentStudentIds) {
        const studentAttendanceRef = doc(
          db,
          `students/${division}/students`,
          rfidNumber
        );
        batch.set(
          studentAttendanceRef,
          { 
            attendance: {
              [activeSubject]: increment(1),
            }
           },
          { merge: true }
        );
      }

      await batch.commit(); 
    }

    // ✅ Instead of setting `presentStudents` as empty array, remove it
    await update(sessionRef, {
      status: false,
      sessionEndedAt: Date.now(),
      activeSubject: "",
      sessionStartedBy: "",
      sessionStartedAt: "",
      presentStudents: []
    });
  } catch (error) {
    throw new Error("Failed to close session");
  }
}
import { db } from "@/lib/firebase"; // Ensure correct Firestore import
import { collection, query, where, getDocs } from "firebase/firestore";

export async function checkTeacherEmail(email) {
  try {
    const teachersCollection = collection(db, "teachers");
    const q = query(teachersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    // 🔹 If a document is found, return its data
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    throw new Error(`Failed to search teacher: ${error.message}`);
  }
}

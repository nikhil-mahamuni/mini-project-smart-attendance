import { ref, onValue, off } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";

export function fetchDivSessionData(division, callback) {
  const sessionRef = ref(realtimeDb, `session/${division}`);

  const listener = onValue(
    sessionRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const sessionData = snapshot.val();
        callback(sessionData); 
      } else {
        callback(null); 
      }
    },
    (error) => {
      console.error("Firebase Error:", error.message);
    }
  );

  return () => off(sessionRef);
}

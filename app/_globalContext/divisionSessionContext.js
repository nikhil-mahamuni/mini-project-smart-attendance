"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { realtimeDb } from "@/lib/firebase";
import { off, onValue, ref } from "firebase/database";

const DivisionSessionContext = createContext();

export default function DivisionSessionContextProvider({ children }) {
  const [divisionSessionData, setDivisionSessionData] = useState([]);

  useEffect(() => {
    const sessionRef = ref(realtimeDb, "session");
  
    const fetchSessionData = () => {
      onValue(
        sessionRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const rawData = snapshot.val();
            const formattedData = Object.entries(rawData).map(([id, data]) => ({
              id,
              ...data,
            }));
  
            setDivisionSessionData(formattedData);
  
            const activeSession = formattedData.find(session => session.status);
            setCurrentSession(activeSession || {});  
          } else {
            setDivisionSessionData([]);
          }
        },
        (error) => {
          console.error("Firebase Error:", error.message);
        }
      );
    };
  
    fetchSessionData();
  
    return () => off(sessionRef);
  }, []);
  

  return (
    <DivisionSessionContext.Provider value={{ sessionData, currentSession, setCurrentSession }}>
      {children}
    </DivisionSessionContext.Provider>
  );
}

// Custom hook for consuming session context
export function useDivisionSessionContext() {
  return useContext(DivisionSessionContext);
}

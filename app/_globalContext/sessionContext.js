"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { realtimeDb } from "@/lib/firebase";
import { off, onValue, ref } from "firebase/database";

const SessionContext = createContext();

export default function SessionContextProvider({ children }) {
  const [sessionData, setSessionData] = useState([]);
  const [currentSession, setCurrentSession] = useState({})

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
  
            setSessionData(formattedData);
  
            const activeSession = formattedData.find(session => session.status);
            setCurrentSession(activeSession || {});  // Set empty object if no active session
          } else {
            setSessionData([]);
            setCurrentSession({});
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
    <SessionContext.Provider value={{ sessionData, currentSession, setCurrentSession }}>
      {children}
    </SessionContext.Provider>
  );
}

// Custom hook for consuming session context
export function useSessionContext() {
  return useContext(SessionContext);
}

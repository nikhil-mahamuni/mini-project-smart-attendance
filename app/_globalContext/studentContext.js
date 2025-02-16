"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchStudentsAPI } from "../_services/admin.students";

// Create context
const StudentContext = createContext();

// Create provider component
export default function StudentListProvider({ children }) {
  const [studentsList, setStudentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const controller = new AbortController(); 
    const signal = controller.signal;

    async function fetchData() {
      try {
        const result = await fetchStudentsAPI();
        if (signal.aborted) return;

        if (!result.success) {
          setError(result.message);
        } else {
          setStudentsList(result?.data || []); 
        }
      } catch (err) {
        if (!signal.aborted) setError("Failed to fetch students. Please try again.");
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, []);


  return (
    <StudentContext.Provider value={{ studentsList, loading, error }}>
      {children}
    </StudentContext.Provider>
  );
}

// Custom hook for consuming student context
export function useStudentContext() {
  return useContext(StudentContext);
}
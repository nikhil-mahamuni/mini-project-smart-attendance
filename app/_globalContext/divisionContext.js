"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchDivisionDataAPI } from "../_services/admin.division";

// Create context
const DivisionContext = createContext();

// Create provider component
export default function DivisionContextProvider({ children }) {
  const [divisionList, setDivisionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch and initialize division data
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchDivisionDataAPI();
        
        if (isMounted) {
          result.success
            ? setDivisionList(result.data || [])
            : setError(result.message);
        }
      } catch (err) {
        if (isMounted) setError("Failed to fetch divisions. Please try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DivisionContext.Provider value={{ divisionList, loading, error }}>
      {children}
    </DivisionContext.Provider>
  );
}

// Custom hook for consuming division context
export function useDivisionContext() {
  return useContext(DivisionContext);
}

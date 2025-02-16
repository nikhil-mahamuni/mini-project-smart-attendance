"use client";

import { createContext, useContext, useState } from "react";
const TemporaryContext = createContext();

export const TemporaryDataProvider = ({ children }) => {
  const [selectedStudent, setSelectedStudent] = useState({});
  const [selectedTeacher, setSelectedTeacher] = useState({});
  const [selectedDivision, setSelectedDivision] = useState({});
  
  return (
    <TemporaryContext.Provider
      value={{
        selectedStudent,
        setSelectedStudent,
        selectedTeacher,
        setSelectedTeacher,
        selectedDivision,
        setSelectedDivision
      }}
    >
      {children}
    </TemporaryContext.Provider>
  );
};

export const useTemporaryData = () => useContext(TemporaryContext);

"use client";

import SessionContextProvider from "@/app/_globalContext/sessionContext";
import StudentListProvider from "@/app/_globalContext/studentContext";
import { TemporaryDataProvider } from "@/app/_globalContext/temporaryData";
import DivisionContextProvider from "../_globalContext/divisionContext";
import Header from "../_components/Header";

export default function DashboardLayout({ children }) {
  return (
    <>
      <DivisionContextProvider>
        <SessionContextProvider>
          <StudentListProvider>
            <TemporaryDataProvider>
              <div className="flex flex-col overflow-hidden w-full h-screen">
                <Header></Header>
                <div className="flex-1 flex-grow overflow-y-auto h-full py-3 px-2 md:px-3">
                  {children}
                </div>
              </div>
            </TemporaryDataProvider>
          </StudentListProvider>
        </SessionContextProvider>
      </DivisionContextProvider>
    </>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Table from "@/app/_components/Table";
import { useParams } from "next/navigation";
import { fetchDivSessionData } from "@/app/_services/sessionDiv";

function Page() {
  const { index, sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const unsubscribe = fetchDivSessionData(sessionId, (data) => {
      setSessionData(data);
    });

    return () => unsubscribe();
  }, [sessionId]);

  console.log(sessionData);

  const tableHead = [
    { id: 1, theadName: "Student RollNo", colName: "studentRollNo" },
    { id: 2, theadName: "Student Name", colName: "studentName" },
    { id: 3, theadName: "Status", colName: "verified" },
  ];

  if (!sessionData) {
    return <p>Loading</p>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-6 p-2">
      {/* Responsive Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Total Students Card */}
        <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl w-full flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg">Present Students</h3>
            <p className="font-bold text-3xl">
              {(sessionData?.presentStudents) ? (Object.keys(sessionData.presentStudents).length) : ('0')}
            </p>
          </div>
          <span className="text-5xl opacity-90">🎓</span>
          {/* Floating Blur Effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 rounded-xl blur-xl"></div>
        </div>
      </div>

      {/* Table Container */}

      {sessionData?.presentStudents && (
        <div className="h-full shadow-md">
          <Table
            tableData={Object.values(sessionData.presentStudents)}
            tableHead={tableHead}
          />
        </div>
      )}

      {/* Buttons Section */}
      <div className="my-2 flex flex-col sm:flex-row items-center justify-end gap-4">
        <Button className="w-full sm:w-40 bg-gray-600 hover:bg-gray-700 text-white">
          Cancel Session
        </Button>
        <Button className="w-full sm:w-40 bg-green-600 hover:bg-green-700 text-white">
          Submit Session
        </Button>
      </div>
    </div>
  );
}

export default Page;

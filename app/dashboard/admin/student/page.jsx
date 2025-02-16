"use client";

import Table from "@/app/_components/Table";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchStudentsAPI } from "@/app/_services/admin.students";

function Page() {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tableHead = useMemo(
    () => [
      { id: 1, theadName: "Roll No", colName: "rollNo" },
      { id: 2, theadName: "Name", colName: "name" },
      { id: 3, theadName: "Rfid No", colName: "id" },
      { id: 4, theadName: "Total Attendance", colName: "attendance" },
    ],
    []
  );

  const fetchStudentsData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchStudentsAPI("TE7");
      if (result.success) {
        setStudentData(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to fetch Students");
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchStudentsData();
  }, [fetchStudentsData]);

  const memoizedStudentsData = useMemo(() => studentData, [studentData]);

  return (
    <div className="flex flex-col overflow-hidden w-full h-full shadow-sm p-2">
      {/* Top Section - Add Student & Division Dropdown */}
      <div className="flex justify-between items-center w-full mb-4 px-2">
        {/* Division Dropdown */}
        <select className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option value="">Select Division</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>

        {/* Add Student Button (Responsive) */}
        <Link href="/dashboard/admin/student/add-student">
          <Button className="hidden sm:flex py-2 px-6 bg-purple-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-purple-700">
            + Add New Student
          </Button>
          <Button className="sm:hidden flex items-center justify-center bg-purple-600 text-white rounded-full w-10 h-10 shadow-md transition duration-300 hover:bg-purple-700">
            <UserPlus size={20} />
          </Button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="w-full h-full">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <Table
            tableData={memoizedStudentsData}
            tableHead={tableHead}
            showStudentEdit={true}
          />
        )}
      </div>
    </div>
  );
}

export default Page;

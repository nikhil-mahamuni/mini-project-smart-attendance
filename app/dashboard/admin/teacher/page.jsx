"use client";

import Table from "@/app/_components/Table";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchTeachersAPI } from "@/app/_services/admin.teachers";

function Page() {
  const [teacherData, setTeacherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoized table headers to prevent re-renders
  const tableHead = useMemo(() => [
    { id: 1, theadName: "Name", colName: "name" },
    { id: 2, theadName: "Registered Email", colName: "email" },
    { id: 3, theadName: "Verified", colName: "isVerified" },
  ], []);

  // Fetch teacher data (memoized function)
  const fetchTeacherData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchTeachersAPI();
      if (result.success) {
        setTeacherData(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to fetch teachers");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    fetchTeacherData();
  }, [fetchTeacherData]);

  // Memoized teacher data to avoid re-renders when unchanged
  const memoizedTeacherData = useMemo(() => teacherData, [teacherData]);

  return (
    <div className="flex flex-col overflow-hidden w-full h-full shadow-sm p-1">
      {/* 🔍 Search & Add Button Section */}
      <div className="flex justify-between items-center w-full mb-4 px-2">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-lg w-1/3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Add Teacher Button */}
        <Link href="/dashboard/admin/teacher/add-teacher">
          <Button className="py-2 px-6 bg-purple-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-purple-700">
            + Add New Teacher
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
          <Table tableData={memoizedTeacherData} tableHead={tableHead} showTeacherEdit={true} />
        )}
      </div>
    </div>
  );
}

export default Page;

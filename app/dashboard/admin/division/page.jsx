"use client";

import Table from "@/app/_components/Table";
import React, { useEffect } from "react";
import { useDivisionContext } from "@/app/_globalContext/divisionContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const tableHead = [
  { id: 1, theadName: "Division", colName: "id" },
  { id: 2, theadName: "Subjects", colName: "subjects" },
  { id: 3, theadName: "Total Students", colName: "totalStudents" },
];

function Page() {
  const { divisionList, loading, error } = useDivisionContext();

  if (loading)
    return <p className="text-center text-purple-700 font-semibold">Loading divisions...</p>;
  if (error)
    return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;
  if (!divisionList || divisionList.length === 0)
    return <p className="text-center text-gray-600">No divisions found.</p>;

  return (
    <div className="flex flex-col overflow-hidden w-full h-full shadow-sm p-2">
      
      {/* Header Section */}
      <div className="flex justify-between items-center w-full mb-4 px-2">
      <h1 className="text-2xl font-bold text-purple-700">Manage Divisions</h1>
        <Link href="/dashboard/admin/division/add-division">
          {/* Add Student Button (Visible on larger screens) */}
          <Button className="hidden sm:flex py-2 px-6 bg-purple-600 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-purple-700">
            + Add New Division
          </Button>
          {/* Small screen button (floating icon) */}
          <Button className="sm:hidden flex items-center justify-center bg-purple-600 text-white rounded-full w-10 h-10 shadow-md transition duration-300 hover:bg-purple-700 ml-auto">
            <UserPlus size={20} />
          </Button>
        </Link>
      </div> 

      {/* Table Section */}
      <div className="overflow-y-auto h-full">
        <Table tableData={divisionList} tableHead={tableHead} showDivisionEdit={true}></Table>
      </div>
    </div>
  );
}

export default Page;




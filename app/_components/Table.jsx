"use client";

import { useTemporaryData } from "../_globalContext/temporaryData";
import Link from "next/link";

function Table({
  tableData,
  tableHead,
  tableButton,
  showStudentEdit,
  showDivisionEdit,
  showTeacherEdit,
}) {
  const { setSelectedStudent, setSelectedTeacher, setSelectedDivision } =
    useTemporaryData();

  return (
    <div className="overflow-auto h-full">
      <table className="w-full table-auto border-collapse">
        {/* ----------------------------------------Table Head------------------------------------------- */}
        <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white sticky top-0 shadow-md">
          <tr>
            {/* Serial Number Column */}
            <th className="p-4 text-sm font-semibold text-center border-x border-b border-white">
              Sr. No.
            </th>

            {tableHead.map(({ id, theadName }) => (
              <th
                key={id}
                className="p-4 text-sm font-semibold text-center border-x border-b border-white"
              >
                {theadName}
              </th>
            ))}

            {/* Additional column for Edit Button if needed */}
            {(showStudentEdit|| showDivisionEdit || showTeacherEdit) && (
              <th className="p-4 text-sm font-semibold text-center border-x border-b border-white">
                Actions
              </th>
            )}
          </tr>
        </thead>

        {/* ---------------------------------------------------Table Body------------------------------------------ */}
        <tbody className="divide-y divide-gray-200 bg-gray-50">
          {tableData.map((item, index) => (
            <tr className="hover:bg-gray-50" key={item.id || index}>
              {/* Serial Number Column */}
              <td className="text-gray-800 text-center p-4 text-sm border-x border-b">
                {index + 1}
              </td>

              {/* Render only columns that match colName */}
              {tableHead.map(({ colName }, colIndex) => (
                <td
                  key={colIndex}
                  className="text-gray-800 text-center p-4 text-sm border-x border-b"
                >
                  {renderCellContent(item[colName])}
                </td>
              ))}

              {/* -----------------------------------Edit Buttons for Students Edit-------------------------------- */}
              {showStudentEdit && (
                <td className="text-gray-800 text-center p-4 text-sm border-x border-b">
                  <Link
                    href={`/dashboard/admin/student/${item.id}`}
                    className="text-green-500 hover:underline mr-5"
                    onClick={() => setSelectedStudent(item)}
                  >
                    Edit Student
                  </Link>
                </td>
              )}

              {showDivisionEdit && (
                <td className="text-gray-800 text-center p-4 text-sm border-x border-b">
                  <Link
                    href={`/dashboard/admin/division/${item.id}`}
                    className="text-green-500 hover:underline mr-5"
                    onClick={() => setSelectedDivision(item)}
                  >
                    Edit Division
                  </Link>
                </td>
              )}

              {showTeacherEdit && (
                <td className="text-gray-800 text-center p-4 text-sm border-x border-b">
                  <Link
                    href={`/dashboard/admin/teacher/${item.id}`}
                    className="text-green-500 hover:underline mr-5"
                    onClick={() => setSelectedTeacher(item)}
                  >
                    Edit 
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

// Render Table Contents
function renderCellContent(value) {
  if (Array.isArray(value)) {
    return (
      <div className="flex items-center gap-3 justify-center text-white">
        {value.map((item, id) => (
          <span key={id} className="bg-purple-500 rounded-lg py-1 px-3">
            {item}
          </span>
        ))}
      </div>
    );
  }

  if (typeof value === "boolean") {
    return value ? (
      <span className="text-green-600 font-semibold">Active</span>
    ) : (
      <span className="text-red-600 font-semibold">Inactive</span>
    );
  }

  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value, null, 2);
  }

  return value ?? "-";
}

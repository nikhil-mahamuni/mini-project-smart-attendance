import React from "react";
import Link from "next/link";
import { Users, GraduationCap, ChalkboardTeacher } from "lucide-react"; // ShadCN icons

function Page() {
  const cardsDetails = [
    {
      id: 1,
      title: "Students Section",
      detail: "View and manage student attendance and records.",
      buttonText: "View Students",
      link: "/dashboard/admin/student",
      // icon: Users, // Direct component reference
    },
    {
      id: 2,
      title: "Divisions Section",
      detail: "Manage and organize student divisions.",
      buttonText: "View Divisions",
      link: "/dashboard/admin/division",
      // icon: GraduationCap, // Direct component reference
    },
    {
      id: 3,
      title: "Teachers Section",
      detail: "View and manage teacher profiles and subjects.",
      buttonText: "View Teachers",
      link: "/dashboard/admin/teacher",
      // icon: ChalkboardTeacher, // Direct component reference
    },
  ];

  return (
    <>
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Admin Actions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          Manage students, teachers, and divisions with ease.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {cardsDetails.map((item) => (
          <AdminCards key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}

export default Page;

function AdminCards({ title, detail, buttonText, link, }) {
  return (
    <div className="relative group bg-white/10 dark:bg-gray-800/40 backdrop-blur-lg shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
      {/* Icon at the Top */}
      <div className="bg-purple-600 text-white p-4 rounded-full shadow-lg mb-4">
        {/* <Icon size={28} className="text-white" /> */}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-300 transition-all duration-300">
        {title}
      </h2>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-700 dark:text-gray-400 opacity-80 px-3">
        {detail}
      </p>

      {/* Button */}
      <Link href={link} className="w-full">
        <button className="mt-5 w-full py-3 px-6 rounded-lg text-lg font-semibold bg-gradient-to-r from-purple-500 to-purple-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105 hover:from-purple-600 hover:to-purple-800 shadow-md">
          {buttonText}
        </button>
      </Link>
    </div>
  );
}

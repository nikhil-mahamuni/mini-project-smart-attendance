"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import ClassWelcomeCard from "@/app/_components/ClassWelcomeCard";
import { fetchDivSessionData } from "@/app/_services/sessionDiv";


function Page() {
  const { division } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");

  const subjects = ["Math", "Science", "English", "History", "Physics"];

  useEffect(() => {
    if (!division) return;

    const unsubscribe = fetchDivSessionData(division, (data) => {
      setSessionData(data);
    });

    return () => unsubscribe();
  }, [division]);

  const { activeSubject, sessionStartedAt, sessionEndedAt, status } = useMemo(() => {
    return {
      activeSubject: sessionData?.activeSubject || "N/A",
      sessionStartedAt: sessionData?.sessionStartedAt || null,
      sessionEndedAt: sessionData?.sessionEndedAt || null,
      status: sessionData?.status || false,
    };
  }, [sessionData]);

  return (
    <div className="space-y-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section */}
        <ClassWelcomeCard />

        {/* Right Section */}
        <div className="flex-grow rounded-lg border border-gray-200 p-6 bg-gradient-to-br from-purple-100 to-white relative shadow-md transition-shadow hover:shadow-xl">
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              Status:{" "}
              <span className={`font-bold ${status ? "text-green-600" : "text-red-600"}`}>
                {status ? "Active" : "No Current Session"}
              </span>
            </p>
            <h1 className="text-3xl font-bold text-purple-700">Division: {division.toUpperCase()}</h1>
            <p className="text-lg text-gray-700">
              Total Strength: <span className="font-bold text-purple-700">50</span>
            </p>
          </div>

          {/* Attendance Button */}
          <div className="sm:absolute sm:top-4 sm:right-4 mt-4 sm:mt-0">
            <Link href={`/dashboard/attendance/${division}`}>
              <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2.5 rounded-md transition-transform transform hover:scale-105 shadow-md">
                Attendance
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Attendance Session Section */}
      <div className="flex w-full flex-col items-center space-y-6 bg-gradient-to-br from-white to-purple-100 p-8 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
        <Image src="/attendanceBegin.png" height={180} width={180} alt="Attendance Logo" className="hover:scale-105 transition-transform" />

        {status ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 text-center">Current Session Details</h1>
            <SessionDetail label="Subject" value={activeSubject} />
            <SessionDetail label="Session Started At" value={sessionStartedAt ? new Date(sessionStartedAt).toLocaleString() : "N/A"} />
            <SessionDetail label="Session Ends At" value={sessionEndedAt ? new Date(sessionEndedAt).toLocaleString() : "N/A"} />

            {/* View Session Button */}
            <Link href={`/dashboard/session/${division}/${division}`} className="mt-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-md">
                View Session
              </Button>
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 text-center">Welcome to the Attendance Session</h1>
            <p className="text-lg text-gray-600 text-center">
              Select a subject and click the button below to begin your session and start tracking attendance.
            </p>

            {/* Subject Dropdown */}
            <div className="w-full max-w-md mt-4">
              <div className="relative">
                <select
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer shadow-sm hover:bg-gray-100 transition"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="" disabled>Select a subject</option>
                  {subjects.map((subject, idx) => (
                    <option key={idx} value={subject}>{subject}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  ▼
                </div>
              </div>
            </div>

            {/* Start Session Button */}
            <Link href={`/dashboard/session/${division}/${division}`} className="mt-6">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-md">
                Start Session
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}


// Reusable component for session details
const SessionDetail = ({ label, value }) => (
  <p className="text-lg text-gray-700">
    {label}: <span className="text-purple-700 font-bold">{value}</span>
  </p>
);

export default Page;

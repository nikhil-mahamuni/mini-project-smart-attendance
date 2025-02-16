"use client";

import { useSessionContext } from "@/app/_globalContext/sessionContext";
import Link from "next/link";
import React from "react";

function Page() {
  const { sessionData } = useSessionContext();

  if (!sessionData || sessionData.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg">Loading sessions...</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {sessionData.map((item, id) => {
        return (
          <SessionCard
            item={item}
            key={item.id || id}
            index={id}
          />
        );
      })}
    </div>
  );
}

export default Page;

function SessionCard({ item, index }) {
  const {
    id,
    subject,
    teacherName,
    division,
    status,
    sessionStartedAt,
    sessionEndedAt,
  } = item;
  return (
    <Link
      href={`/dashboard/session/${id}`}
      className="block transform transition-transform duration-300 hover:scale-105"
    >
      <div className="relative p-4 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 border border-gray-300 rounded-2xl shadow-md hover:shadow-xl transition-all hover:bg-opacity-90 hover:border-purple-400">
        {/* Division Tag at Top-Left */}
        <div className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] font-semibold px-2 py-1 rounded-md shadow-md">
          {division}
        </div>

        {/* Status Indicator */}
        <div className="text-right">
          <span
            className={`text-[11px] font-semibold px-3 py-1 rounded-full shadow-md ${
              status ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {status ? "Active" : "No Session"}
          </span>
        </div>

        {/* Session Details */}
        <div className="text-gray-900 space-y-2 mt-3">
          <p className="text-md font-semibold flex items-center">
            📚 <span className="ml-2">Subject:</span>{" "}
            <span className="ml-2 text-purple-800">{subject || "N/A"}</span>
          </p>
          <p className="text-md font-semibold flex items-center">
            👨‍🏫 <span className="ml-2">Teacher:</span>{" "}
            <span className="ml-2 text-purple-800">
              {teacherName || "Unknown"}
            </span>
          </p>
          <p className="text-sm text-gray-700 font-medium">
            🕒 <span className="font-semibold">Start:</span>{" "}
            {sessionStartedAt
              ? new Date(sessionStartedAt).toLocaleString()
              : "N/A"}
          </p>
          <p className="text-sm text-gray-700 font-medium">
            ⏳ <span className="font-semibold">End:</span>{" "}
            {sessionEndedAt ? new Date(sessionEndedAt).toLocaleString() : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
}

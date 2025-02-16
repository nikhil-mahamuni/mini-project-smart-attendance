"use client";
import HomeUserCard from "@/app/_components/HomeUserCard";
import RadarGraph from "@/app/_components/RadarGraph";
import React from "react";

function StatsSection() {
  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <HomeUserCard />
        <RadarGraph />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {[
          { title: "Total Students", count: "300" },
          { title: "Present Students", count: "200" },
          { title: "Present Boys", count: "110" },
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-md hover:shadow-lg bg-gradient-to-br from-[#D8B4FE] to-[#A78BFA] 
            text-center text-white transform transition-all duration-300 hover:scale-105"
          >
            <div className="text-lg font-medium opacity-90">{item.title}</div>
            <div className="text-4xl font-bold mt-2">{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsSection;

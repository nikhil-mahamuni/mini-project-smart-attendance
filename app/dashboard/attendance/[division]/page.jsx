'use client'

import Table from "@/app/_components/Table";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchDivSessionData } from "@/app/_services/sessionDiv";

function Page() {

  const [divisionSessionData, setDivisionSessionData] = useState([]);
  const {division} = useParams()

  useEffect(() => {
    // Fetch real-time data
    const unsubscribe = fetchDivSessionData(division, (data) => {
      setDivisionSessionData(data);
    });

    // Cleanup function to remove listener when component unmounts
    return () => unsubscribe();
  }, [division]);






  const tableData = [
    {
      rollNo: "101",
      studentName: "John Doe",
      cn: 55,
      pm: 85,
      pdc: 85,
      ajp: 55,
      attendance: 52,
    },
    {
      rollNo: "102",
      studentName: "Jane Smith",
      cn: 55,
      pm: 85,
      pdc: 85,
      ajp: 55,
      attendance: 23,
    },
    {
      rollNo: "103",
      studentName: "Alice Johnson",
      cn: 55,
      pm: 85,
      pdc: 85,
      ajp: 55,
      attendance: 10,
    },
    {
      rollNo: "104",
      studentName: "Bob Brown",
      cn: 55,
      pm: 85,
      pdc: 85,
      ajp: 55,    
      attendance: 15,
    },
    {
      rollNo: "105",
      studentName: "Charlie White",
      cn: 55,
      pm: 85,
      pdc: 85,
      ajp: 55,
      attendance: 20,
    },
    {
      rollNo: "106",
      studentName: "David Black",
      cn: 55,
      pm: 85,
      pdc: 85,
      ajp: 55,
      
      attendance: 35,
    },
    {
      rollNo: "107",
      studentName: "Eve Adams",
      cn: 55,
      pm: 85,
      pdc: 85,
      ajp: 55,
      
      attendance: 40,
    },
    {
      rollNo: "108",
      studentName: "Franklin Green",
      cn: 55,
      pm: 85,
      pdc: 85,
      ajp: 55,
      
      attendance: 45,
    },
    {
      rollNo: "109",
      studentName: "Grace Lee",
      cn: 55,
      pm: 85,
      pdc: 85,
      ajp: 55,
      
      attendance: 50,
    },
    {
      rollNo: "110",
      studentName: "Henry Clark",
      cn: 55,
      pm: 85,
      pdc: 85,
      ajp: 55,
      
      attendance: 75,
    },
    {
      rollNo: "111",
      studentName: "Isla Miller",
      cn: 55,
      pm: 85,
      pdc: 85,
      ajp: 55,
      
      attendance: 20,
    },
    {


      rollNo: "112",
      studentName: "Jack Wilson",
      cn: 55,
      pm: 85,
      pdc: 85,
      ajp: 55,
      
      attendance: 39,
    },
  ];


  

  const tableHead = [
    { id: 1, theadName: "Sr No" },
    { id: 2, theadName: "Roll No" },
    { id: 3, theadName: "Name" },
    { id: 4, theadName: "CN" },
    { id: 5, theadName: "PM" },
    { id: 6, theadName: "PDC" },
    { id: 7, theadName: "AJP" },
    { id: 8, theadName: "Total Attendance" },
  ];

  return (
    <div className="bg-gray-100 h-full">
      <Table tableData={tableData} tableHead={tableHead}></Table>
    </div>
  );
}

export default Page;

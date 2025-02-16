async function handleFormSubmission(e) {
  e.preventDefault();

  try {
    const response = await fetch("/api/add-student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) throw new Error("Failed to add student");

    const data = await response.json();


    setStudentData({
      studentName: "",
      division: "",
      rfidNumber: "",
      studentMobileNo: "",
    });

    setOpenCardType(null); // Close the form
  } catch (error) {
    console.error("Error adding student:", error);
  }
}
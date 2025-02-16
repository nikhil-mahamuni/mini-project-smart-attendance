import axios from "axios";

// Get All Students Data
export async function fetchStudentsAPI(division) {
  try {
    const response = await axios.get(`/api/admin/students/${division}`);

    if (response.status !== 200) {
      return {
        success: false,
        message: response.data?.message || "Unknown error occurred",
      };
    }

    return { success: true, data: response.data.students };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Network error",
    };
  }
}

// Update Student Data API
export async function updateStudentAPI(selectedStudent, division) {
  try {
    const response = await axios.patch(
      `/api/admin/students/${division}`,
      selectedStudent
    );

    if (response.status !== 200) {
      return {
        success: false,
        message: response.data?.message || "Unknown error occurred",
      };
    }

    return { success: true, message: "Updated Sucessfully" };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Network error",
    };
  }
}

export async function deleteStudentAPI(rfidNumber, division) {
  try {
    const response = await axios.delete(`/api/admin/students/${division}`, {
      data: { rfidNumber },
    });

    if (response.status !== 200) {
      return {
        success: false,
        message: response.data?.message || "Unknown error occurred",
      };
    }

    return { success: true, message: "Deleted Sucessfully" };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Network error",
    };
  }
}

// Add New Student
export async function addNewStudentAPI(studentData) {
  try {
    const response = await axios.post(
      `/api/admin/students/${studentData.division}`,
      studentData
    );

    if (response.status !== 200) {
      return {
        success: false,
        message: response.data?.message || "Unknown error occurred",
      };
    }

    return {
      success: true,
      message: response.data.message || "Student added successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Network error",
    };
  }
}

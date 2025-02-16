import axios from "axios";

export async function fetchDivisionDataAPI() {
  try {
    const { data } = await axios.get("/api/admin/division");
    

    return {
      success: true,
      data: data || [],
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An error occurred while fetching divisions.",
    };
  }
}

export async function addNewDivisionAPI(divisionData) {
  
  const { division, subjects } = divisionData;

  
  

  try { 
    //**Validation checks**
    if (!division || division.trim() === "") {
      return {
        success: false,
        message: "Division name is required.",
      };
    }

    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
      return {
        success: false,
        message: "At least one subject must be added.",
      };
    }

    // **Make POST request**
    const { data } = await axios.post("/api/admin/division", {
      division,
      subjects,
    });

    return {
      success: true,
      message: "Division added successfully!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "An error occurred while adding the division.",
    };
  }
}


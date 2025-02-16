import axios from "axios";

export async function activeSessionData(setMessage) {
  try {
    const response = await axios.get("/api/session/attendance");

    return response.data;
  } catch (error) {
    if (error.response) {
      setMessage(
        `Error: ${error.response.status} - ${
          error.response.data?.message || "Failed to fetch session data"
        }`
      );
    } else if (error.request) {
      setMessage("No response from the server. Please check your network.");
    } else {
      setMessage(error.message);
    }
    return null;
  }
}

async function getUserLoginUid() {
  try {
    const { data } = await axios.get("/api/teacher/login", {
      withCredentials: true,
    });

    if (data?.uid) {
      return data.uid;
    } else {
      console.warn("UID not found in response");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user UID:", error);
    return null;
  }
}

export async function startSession(subject, division) {
  try {
    const uid = await getUserLoginUid(); // Get teacher UID from token
    if (!uid) {
      return;
    }

    // ✅ Ensure correct API route
    const { data } = await axios.patch(
      `/api/session/${uid}`, // API route should match backend
      { subject, division, action: "close" },
      { withCredentials: true } // Ensures authentication via cookies
    );

    return data;
  } catch (error) {
    return null;
  }
}

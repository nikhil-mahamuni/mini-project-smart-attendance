import { auth } from "@/lib/firebase";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Login teacher and set global tecaher data
export async function teacherLoginAPI(
  loginFormData,
  setMessage,
  setLoading,
  router
) {
  try {
    const { teacherEmail, teacherPassword } = loginFormData;

    if (!teacherEmail || !teacherPassword) {
      setMessage("All credentials required");
      return;
    }

    setLoading(true);

    const { data } = await axios.post("/api/teacher/login", {
      email: teacherEmail,
      password: teacherPassword,
    });

    setMessage("Login successful. Redirecting...");
    setTimeout(() => router.push("/dashboard/home"), 500);
    return data;
  } catch (error) {
    if (error.response) {
      setMessage(
        error.response.data?.message || "An unexpected error occurred."
      ); // Server responded with a status other than 2xx
    } else if (error.request) {
      setMessage("No response from server. Please try again."); // Request was made but no response received
    } else {
      setMessage(error.message); // Something else went wrong
    }
  } finally {
    setLoading(false);
  }
}

export async function teacherLogOutAPI(setMessage, router) {
  try {
    const response = await axios.delete("/api/teacher/logout");

    setMessage("Logged out successfully!");
    router.push("/login");
  } catch (error) {
    if (error.response) {
      setMessage(
        error.response.data?.message || "Logout failed. Please try again."
      );
    } else {
      setMessage("An error occurred during logout.");
    }
  }
}


export async function teacherAuthAPI(email, password, setMessage, router) {
  if (!email || !password) {
    setMessage("Email and password are required.");
    return;
  }

  try {
    // Step 1: Check if the teacher exists in Firestore
    let teacherData;
    try {
      const { data } = await axios.get(`/api/teacher/auth?email=${email}`);
      teacherData = data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage("No teacher found with this email.");
        return;
      }
      setMessage("Error checking teacher: " + error.message);
      return;
    }

    // Step 2: Extract verification status
    const { isVerified } = teacherData;
    let user;

    if (isVerified === true) {
      // Sign in existing user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user = userCredential.user;
    } else {
      // Create new account if not verified
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      user = userCredentials.user;

      // Update Firestore with UID
      await axios.patch(`/api/teacher/auth`, { uid: user.uid, email });
    }

    // ✅ Step 3: Send UID to server to generate token and set HTTP-only cookie
    await axios.post("/api/teacher/auth", { uid: user.uid });

    setMessage("Login successful! Redirecting...");

    // ✅ Redirect to the home page after a short delay
    setTimeout(() => router.push("/dashboard/home"), 2000);

    return user
  } catch (error) {
    setMessage("Authentication Error: " + error.message);
  }
}

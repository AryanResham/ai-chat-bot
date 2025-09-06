import axios from 'axios'
import {redirect} from "react-router-dom";

async function getAllChatDetails(){
  try{
    const response = await axios.get('/api/chats/all', { withCredentials: true });
    return response.data;

  } catch (error) {
    if(error.response && error.response.status === 401){
      throw redirect("/");
    }
    console.error("Error fetching chat details:", error);
    throw redirect("/");
  }
};


async function login(data) {
  const res =  await axios.post("/api/auth/login", data, { withCredentials: true });
  return res.data;
}

async function signup(data) {
  const res = await axios.post("/api/user/signup", data, { withCredentials: true });
  return res.data;
}
async function checkAuth() {
  console.log("Checking auth...");

  try {
    // Step 1: try normal access token
    const res = await axios.get("/api/auth/me", { withCredentials: true });
    return res.data; // ✅ return user data
  } catch (err) {
    if (err.response?.status === 401) {
      // Step 2: try refresh
      try {
        const refreshRes = await axios.post("/api/auth/refresh", {}, { withCredentials: true });
        return refreshRes.data; // ✅ return user data after refresh
      } catch (refreshErr) {
        return null; // ❌ refresh failed
      }
    }

    console.error("Unexpected error in checkAuth:", err);
    return null;
  }
}
export { getAllChatDetails, login, signup, checkAuth };
import { getTokenUpdate } from "./user";
import { getTutorTokenUpdate } from "./tutor";
import { getAdminTokenUpdate } from "./admin";

export const refreshToken = async () => {
  try {
    const response = await API.getTokenUpdate()
    return response.data;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};
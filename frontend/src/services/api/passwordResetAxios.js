import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

export const createPasswordReset = async (email) => {
  try {
    const r = await axios.post("/auth/forgotPassword", { email });
    toast.success(
      `A link to change your password has been sent to your email if an account exists`,
      { autoClose: 7500 }
    );
    return r.data.token;
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }

  return null;
};

export const resetPassword = async (passwordResetId, password) => {
  try {
    await axios.post(`passwordResets/${passwordResetId}`, {
      password,
    });
  } catch (err) {
    toast.error("Something went wrong!");
    throw new Error("Failed!");
  }
};

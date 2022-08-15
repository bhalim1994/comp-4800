import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

export const createSubmission = async (submission) => {
  submission.forEach((ans) => {
    if (Array.isArray(ans.value)) ans.value = JSON.stringify(ans.value);
  });

  try {
    await axios.post("/submissions", submission);
    toast.success("Your feedback was submitted!");
  } catch (err) {
    toast.error("Something went wrong!");
    throw new Error("Failed!");
  }
};

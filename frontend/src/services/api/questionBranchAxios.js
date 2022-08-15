import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

export const createQuestionBranch = async (choiceId, questionId) => {
  try {
    await axios.post(`/questionBranches`, { choiceId, questionId });
    toast.success(`Question has been linked to this choice successfully!`);
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }
};

export const deleteQuestionBranch = async (choiceId, questionId) => {
  try {
    await axios.delete(
      `/questionBranches?choiceId=${choiceId}&questionId=${questionId}`
    );
    toast.success("Question has been unlinked from this choice successfully!");
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }
};

import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

export const createQuestion = async (question) => {
  try {
    const r = await axios.post(`/questions`, { ...question });
    toast.success("Question created");
    return r.data;
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }

  return null;
};

export const updateQuestion = async (questionId, question) => {
  try {
    const r = await axios.patch(`/questions/${questionId}`, { ...question });
    toast.success("Question saved");
    return r.data;
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }

  return null;
};

export const updateQuestions = async (questions) => {
  try {
    const r = await axios.patch(`/questions`, questions);
    toast.success("Question order saved");
    return r.data;
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }

  return null;
};

export const deleteQuestion = async (questionId) => {
  try {
    const r = await axios.delete(`/questions/${questionId}`);
    toast.success("Question deleted");
    return r.data;
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }
  return null;
};

export const duplicateQuestion = async (questionId) => {
  try {
    const r = await axios.post(`/questions/${questionId}`);
    toast.success("Question duplicated");
    return r.data;
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }
  return null;
};

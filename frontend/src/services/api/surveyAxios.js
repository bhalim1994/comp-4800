import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

export const updateSurvey = async (survey) => {
  try {
    await axios.patch(`/surveys/${survey.surveyId}`, survey);
    toast.success("Survey was updated!");
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }
};

export const createSurvey = async (survey) => {
  try {
    await axios.post(`/surveys`, survey);
    toast.success(`${survey.name} survey created`);
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
    throw new Error("Failed!");
  }
};

export const deleteSurvey = async (surveyId) => {
  try {
    const r = await axios.delete(`/surveys/${surveyId}`);
    toast.success("Survey deleted");
    return r.data;
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }

  return null;
};

export const duplicateSurvey = async (surveyId) => {
  try {
    const r = await axios.post(`/surveys/${surveyId}`);
    toast.success("Survey duplicated");
    return r.data;
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }
  return null;
};

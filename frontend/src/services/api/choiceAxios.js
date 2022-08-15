import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

export const createChoice = async (choice) => {
  try {
    const r = await axios.post(`/choices`, { ...choice });
    toast.success("Choice created");
    return r.data.token;
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }

  return null;
};

export const updateChoice = async (choiceId, choice) => {
  try {
    const r = await axios.patch(`/choices/${choiceId}`, { ...choice });
    toast.success("Choice saved");
    return r.data;
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }

  return null;
};

export const updateChoices = async (choices) => {
  try {
    const r = await axios.patch(`/choices`, choices);
    toast.success("Choice order saved");
    return r.data;
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }

  return null;
};

export const deleteChoice = async (choiceId) => {
  try {
    const r = await axios.delete(`/choices/${choiceId}`);
    toast.success("Choice deleted");
    return r.data;
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }

  return null;
};

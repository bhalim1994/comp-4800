import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

export const login = async (email, password) => {
  try {
    const r = await axios.post(`/auth/login`, { email, password });
    toast.success("Logged in successfully!");
    return r.data.token;
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }

  return null;
};

export const createUser = async (user) => {
  try {
    const r = await axios.post(`/users`, { ...user });
    toast.success(`Created user for ${user.firstName} ${user.lastName}`);
    return r.data.token;
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }

  return null;
};

export const deleteUser = async (userId) => {
  try {
    const r = await axios.delete(`/users/${userId}`);
    toast.success("User deleted");
    return r.data;
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }

  return null;
};

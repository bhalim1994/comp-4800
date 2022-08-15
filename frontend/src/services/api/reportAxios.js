import { DEFAULT_API as axios } from "./AxiosInstance";
import { toast } from "react-toastify";

export const exportFilter = async (
  surveyId,
  startDateFilter,
  endDateFilter
) => {
  try {
    const response = await axios.post(
      `/reports/${surveyId}`,
      {
        startDateFilter,
        endDateFilter,
      },
      { responseType: "blob" }
    );
    return response.data;
  } catch (err) {
    if (err.response.status === 401) toast.error(err.response.data);
    else toast.error("Something went wrong!");
  }
};

import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { DEFAULT_API } from "../services/api/AxiosInstance";

const useAxiosGet = (url, initialFetch = true, api = DEFAULT_API, initialRes = []) => {
  const [response, setResponse] = useState(initialRes);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(
    async (resetIsLoading = true, config = null) => {
      if (resetIsLoading) setIsLoading(true);
      try {
        api
          .get(url, { params: config })
          .then((res) => {
            if (!res.data) throw Object.assign(new Error("No Data!"), { code: 404 });
            setResponse(res.data);
          })
          .catch((err) => setError("Something went wrong!"))
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        if (err.response && err.response.status === 400) {
          setError(err.response.data);
        } else {
          setError("Something went wrong!");
        }
      }
    },
    [url, api]
  );

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (initialFetch) fetchData();

    return () => {
      source.cancel();
    };
  }, [initialFetch, fetchData]);

  return { response, error, isLoading, fetchData, setResponse };
};

export default useAxiosGet;

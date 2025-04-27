import { useCallback } from "react";

const MY_TOKEN = process.env.REACT_APP_USER_TOKEN;

export const useApi = () => {
  const fetchData = useCallback(
    async ({
      url,
      method = "GET",
      headers = {},
      body = null,
      onSuccess = () => {},
      onError = () => {},
      onFinally = () => {},
    }) => {
      try {
        const options = {
          method,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${MY_TOKEN}`,
            ...headers,
          },
        };

        if (body) {
          options.body = JSON.stringify(body);
          options.headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, options);
        const result = await response.json();

        if (result.errcode === 0) {
          onSuccess(result.result);
        } else {
          onError(result.errcode);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        onError(error.message);
      } finally {
        onFinally();
      }
    },
    []
  );

  return { fetchData };
};

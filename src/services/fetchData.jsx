const MY_TOKEN = process.env.REACT_APP_USER_TOKEN;

const fetchData = async ({
  url,
  method,
  headers = {},
  body = null,
  successCallback,
  errorCallback,
  finalCallback,
}) => {
  try {
    const options = {
      method,
      headers: {
        accept: "application/json",
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
      successCallback(result);
    } else {
      errorCallback(result.errcode);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    errorCallback(error.message);
  } finally {
    finalCallback();
  }
};

export default fetchData;

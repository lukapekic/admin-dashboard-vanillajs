const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchGetUsers = async ({ onSuccess, onError, select }) => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const modifiedData = select ? select(data) : data;

    onSuccess?.(modifiedData);

    return {
      data: modifiedData ?? [],
      isError: false,
      error: null,
    };
  } catch (error) {
    console.warn("Error | Users API -> GET USERS", error);

    onError?.(error);

    return {
      data: null,
      isError: true,
      error, // TO-DO: Add parser for Error | Add Global State for Errors
    };
  }
};

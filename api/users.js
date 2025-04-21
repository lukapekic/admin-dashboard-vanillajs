const API_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchGetUsers = async ({ onError, select }) => {
  try {
    const response = await fetch(API_URL);
    const data = response.json();

    const modifiedData = select ? select(data) : data;

    return {
      data: modifiedData ?? [],
      isError: false,
      error: null,
    };
  } catch (error) {
    console.warn("Error | Users API -> GET USERS", error);

    onError(error);

    return {
      data: null,
      isError: true,
      error, // TO-DO: Add parser for Error | Add Global State for Errors
    };
  }
};

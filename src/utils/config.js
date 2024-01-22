const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).token
  : "";

const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage}`,
  },
  Accept: "application/json",
};

export default config;

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  return user;
};

export default getUserFromLocalStorage;

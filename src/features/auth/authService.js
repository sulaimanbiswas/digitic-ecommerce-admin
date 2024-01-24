import axios from "axios";
import { base_url } from "../../utils/base_url";

const login = async (userData) => {
  const response = await axios.post(`${base_url}/user/admin/login`, userData);
  if (response.status === 200) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
    return response.data.data;
  }
};

const authService = {
  login,
};

export default authService;

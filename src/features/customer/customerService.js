import axios from "axios";
import { base_url } from "../../utils/base_url";
import getUserFromLocalStorage from "../../utils/getUserFromLocalStorage";

const getUsers = async () => {
  const url = `${base_url}/user/users`;
  const token = getUserFromLocalStorage().token;

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.data;
};

const customerService = {
  getUsers,
};

export default customerService;

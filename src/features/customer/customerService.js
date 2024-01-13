import axios from "axios";
import { base_url } from "../../utils/base_url";

const getUsers = async () => {
  const response = await axios.get(`${base_url}/user/users`);

  return response.data.data;
};

const customerService = {
  getUsers,
};

export default customerService;

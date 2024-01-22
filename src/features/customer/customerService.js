import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";

const getUsers = async () => {
  const url = `${base_url}/user/users`;

  const response = await axios.get(url, config);

  return response.data.data;
};

const customerService = {
  getUsers,
};

export default customerService;

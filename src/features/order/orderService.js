import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";

const getOrders = async () => {
  const url = `${base_url}/order`;
  const response = await axios.get(url, config);
  return response.data.data;
};
const orderService = {
  getOrders,
};

export default orderService;

import axios from "axios";
import { base_url } from "../../utils/base_url";
import getUserFromLocalStorage from "../../utils/getUserFromLocalStorage";

const getOrders = async () => {
  const url = `${base_url}/order`;
  const token = getUserFromLocalStorage().token;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};
const orderService = {
  getOrders,
};

export default orderService;

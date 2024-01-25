import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";

const getCoupons = async () => {
  const response = await axios.get(`${base_url}/coupon`, config);
  return response.data.data;
};

const createCoupon = async (data) => {
  const response = await axios.post(`${base_url}/coupon`, data, config);
  return response.data.data;
};

const couponService = {
  getCoupons,
  createCoupon,
};

export default couponService;

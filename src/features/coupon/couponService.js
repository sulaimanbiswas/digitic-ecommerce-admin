import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";

const createCoupon = async (data) => {
  const response = await axios.post(`${base_url}/coupon`, data, config);
  return response.data.data;
};

const updateCoupon = async (id, data) => {
  const response = await axios.put(`${base_url}/coupon/${id}`, data, config);
  return response.data.data;
};

const getCoupons = async () => {
  const response = await axios.get(`${base_url}/coupon`, config);
  return response.data.data;
};

const getCoupon = async (id) => {
  const response = await axios.get(`${base_url}/coupon/${id}`, config);
  return response.data.data;
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(`${base_url}/coupon/${id}`, config);
  return response.data.data;
};

const couponService = {
  createCoupon,
  updateCoupon,
  getCoupons,
  getCoupon,
  deleteCoupon,
};

export default couponService;

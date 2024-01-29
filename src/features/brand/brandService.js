import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";

const createBrand = async (brand) => {
  const response = await axios.post(`${base_url}/brand`, brand, config);
  return response.data.data;
};

const updateBrand = async (id, brand) => {
  const response = await axios.put(`${base_url}/brand/${id}`, brand, config);
  return response.data.data;
};

const getBrands = async () => {
  const response = await axios.get(`${base_url}/brand`);
  return response.data.data;
};

const getBrand = async (id) => {
  const response = await axios.get(`${base_url}/brand/${id}`);
  return response.data.data;
};

const brandService = {
  getBrands,
  updateBrand,
  createBrand,
  getBrand,
};

export default brandService;

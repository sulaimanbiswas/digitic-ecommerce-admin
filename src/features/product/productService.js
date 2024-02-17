import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}/product`, product, config);
  return response.data.data;
};

const getProducts = async () => {
  const response = await axios.get(`${base_url}/product`);
  return response.data.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${base_url}/product/${id}`);
  return response.data.data;
};

const productService = {
  getProducts,
  createProduct,
  getProduct,
};

export default productService;

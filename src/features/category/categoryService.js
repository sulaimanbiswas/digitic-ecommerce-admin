import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";

const createCategory = async (category) => {
  const response = await axios.post(`${base_url}/category`, category, config);
  return response.data.data;
};

const updateCategory = async (id, category) => {
  const response = await axios.put(
    `${base_url}/category/${id}`,
    category,
    config
  );
  return response.data.data;
};

const getCategories = async () => {
  const response = await axios.get(`${base_url}/category`);
  return response.data.data;
};

const getCategory = async (id) => {
  const response = await axios.get(`${base_url}/category/${id}`);
  return response.data.data;
};

const deleteCategory = async (id) => {
  const response = await axios.delete(`${base_url}/category/${id}`, config);
  return response.data.data;
};

const categoryService = {
  getCategories,
  updateCategory,
  createCategory,
  getCategory,
  deleteCategory,
};

export default categoryService;

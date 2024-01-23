import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";

const getCategories = async () => {
  const response = await axios.get(`${base_url}/category`);
  return response.data.data;
};

const createCategory = async (category) => {
  const response = await axios.post(`${base_url}/category`, category, config);
  return response.data.data;
};

const categoryService = {
  getCategories,
  createCategory,
};

export default categoryService;

import axios from "axios";
import { base_url } from "../../utils/base_url";

const getCategories = async () => {
  const response = await axios.get(`${base_url}/category`);

  return response.data.data;
};

const categoryService = {
  getCategories,
};

export default categoryService;

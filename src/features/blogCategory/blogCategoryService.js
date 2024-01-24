import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}/blog-category`);
  return response.data.data;
};

const createBlogCategory = async (blogCategory) => {
  const response = await axios.post(
    `${base_url}/blog-category`,
    blogCategory,
    config
  );
  return response.data.data;
};

const blogCategoryService = {
  getBlogCategories,
  createBlogCategory,
};

export default blogCategoryService;

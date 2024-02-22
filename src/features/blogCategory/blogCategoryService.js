import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";

const createBlogCategory = async (blogCategory) => {
  const response = await axios.post(
    `${base_url}/blog-category`,
    blogCategory,
    config
  );
  return response.data.data;
};

const updateBlogCategory = async (id, blogCategory) => {
  const response = await axios.put(
    `${base_url}/blog-category/${id}`,
    blogCategory,
    config
  );
  return response.data.data;
};

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}/blog-category`);
  return response.data.data;
};

const getBlogCategory = async (id) => {
  const response = await axios.get(`${base_url}/blog-category/${id}`);
  return response.data.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(
    `${base_url}/blog-category/${id}`,
    config
  );
  return response.data.data;
};

const blogCategoryService = {
  createBlogCategory,
  updateBlogCategory,
  getBlogCategories,
  getBlogCategory,
  deleteBlogCategory,
};

export default blogCategoryService;

import axios from "axios";
import { base_url } from "../../utils/base_url";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}/blog`);

  return response.data.data;
};

const blogService = {
  getBlogs,
};

export default blogService;

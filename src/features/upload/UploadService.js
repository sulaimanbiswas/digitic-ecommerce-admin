import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";

const uploadImages = async (data) => {
  const response = await axios.post(
    `${base_url}/upload/upload-images`,
    data,
    config
  );
  return response.data.data;
};

const deleteImages = async (id) => {
  const response = await axios.delete(
    `${base_url}/upload/delete-image/${id}`,
    config
  );
  return response.data.data;
};

const uploadService = {
  uploadImages,
  deleteImages,
};

export default uploadService;

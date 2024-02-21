import axios from "axios";
import { base_url } from "../../utils/base_url";
import config from "../../utils/config";

const createColor = async (color) => {
  const response = await axios.post(`${base_url}/color`, color, config);
  return response.data.data;
};

const updateColor = async (id, color) => {
  const response = await axios.put(`${base_url}/color/${id}`, color, config);
  return response.data.data;
};

const getColors = async () => {
  const response = await axios.get(`${base_url}/color`);
  return response.data.data;
};

const getColor = async (id) => {
  const response = await axios.get(`${base_url}/color/${id}`);
  return response.data.data;
};

const deleteColor = async (id) => {
  const response = await axios.delete(`${base_url}/color/${id}`, config);
  return response.data.data;
};

const colorService = {
  getColors,
  updateColor,
  createColor,
  getColor,
  deleteColor,
};

export default colorService;

import axios from "axios";

const CustomAxios = axios.create({ baseURL: process.env.CLASSES_API_HOST });
export default CustomAxios;
import axios from "axios";
import nextConfig from "../../next.config";

const CustomAxios = axios.create({ baseURL: nextConfig.env.CLASSES_API_BASE_URL });
export default CustomAxios;
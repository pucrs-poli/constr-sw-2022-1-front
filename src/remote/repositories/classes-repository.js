import nextConfig from "../../../next.config";
import customAxios from '../../configs/axios';

export class ClassesRepository {

    fetchAllClasses = async () => {
        const axiosResponse = await customAxios.get(`${nextConfig.env.CLASSES_API_BASE_URL}/classes`);

        return axiosResponse.data;
    }

    fetchClassById = async (id) =>{
        const axiosResponse = await customAxios.get(`${nextConfig.env.CLASSES_API_BASE_URL}/classes/${id}`);

        return axiosResponse.data;
    }
}
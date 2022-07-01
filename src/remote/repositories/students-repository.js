import nextConfig from "../../../next.config";
import customAxios from '../../configs/axios';

export class StudentsRepository {

    fetchAll= async () =>{
        const axiosResponse = await customAxios.get(`${nextConfig.env.CLASSES_API_BASE_URL}/students`);

        return axiosResponse.data;
    }
}
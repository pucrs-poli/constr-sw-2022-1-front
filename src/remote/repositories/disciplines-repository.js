import nextConfig from "../../../next.config";
import customAxios from '../../configs/axios';

export class DisciplinesRepository {

    fetchById = async (id) =>{
        const axiosResponse = await customAxios.get(`${nextConfig.env.DISCIPLINES_API_BASE_URL}/disciplinas/${id}`);

        return axiosResponse.data;
    }
}
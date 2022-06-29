import CustomAxios from "../../configs/axios";

const axios = CustomAxios;

export class ClassesRepository {

    fetchAllClasses = async () => {
        const axiosResponse = await axios.get(`${process.env.CLASSES_API_HOST}/classes`);
        console.log(axiosResponse);
        return axiosResponse.data;
    }
}
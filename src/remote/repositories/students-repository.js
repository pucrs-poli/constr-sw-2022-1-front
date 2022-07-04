import nextConfig from "../../../next.config";
import customAxios from '../../configs/axios';
import StudentRemoteModel from "./models/StudentRemoteModel";

export default class StudentsRepository {

    fetchAll = async () => {
        const axiosResponse = await customAxios.get(`${nextConfig.env.CLASSES_API_BASE_URL}/students`);

        return axiosResponse.data;
    }

    fetchById = async (studentId) => {
        const axiosResponse = await customAxios.get(`${nextConfig.env.CLASSES_API_BASE_URL}/students/${studentId}`);

        return axiosResponse.data;
    }

    updateById = async (studentId, student) => {
        const studentRemoteModel = new StudentRemoteModel();
        studentRemoteModel.student_id = student.id;
        studentRemoteModel.name = student.name;
        studentRemoteModel.enrollment = student.enrollment;

        const axiosResponse = await customAxios.patch(`${nextConfig.env.CLASSES_API_BASE_URL}/students/${studentId}`, studentRemoteModel);

        return axiosResponse.data;
    }

    createStudent = async (student) => {
        const studentRemoteModel = new StudentRemoteModel();
        studentRemoteModel.name = student.name;
        studentRemoteModel.enrollment = student.enrollment;

        return customAxios.post(`${nextConfig.env.CLASSES_API_BASE_URL}/students`, studentRemoteModel);
    }

    deleteStudent = async (studentId) => {
        return customAxios.delete(`${nextConfig.env.CLASSES_API_BASE_URL}/students/${studentId}`);
    }
}
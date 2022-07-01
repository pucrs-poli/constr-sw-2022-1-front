import nextConfig from "../../../next.config";
import customAxios from '../../configs/axios';
import ClassModel from "../../models/Class";
import ClassRemoteModel from "./models/ClassRemoteModel";
import ScheduleRemoteModel from "./models/ScheduleRemoteModel";

export class ClassesRepository {

    fetchAllClasses = async () => {
        const axiosResponse = await customAxios.get(`${nextConfig.env.CLASSES_API_BASE_URL}/classes`);

        return axiosResponse.data;
    }

    fetchClassById = async (id) => {
        const axiosResponse = await customAxios.get(`${nextConfig.env.CLASSES_API_BASE_URL}/classes/${id}`);

        return axiosResponse.data;
    }

    updateById = async (id, clazz = new ClassModel()) => {
        const repoModel = new ClassRemoteModel();
        repoModel.class_id = clazz.id;
        repoModel.id_discipline = clazz.discipline.id;
        repoModel.id_user = clazz.teacher.id;

        const axiosResponse = await customAxios.patch(`${nextConfig.env.CLASSES_API_BASE_URL}/classes/${id}`, repoModel);

        return axiosResponse.data;
    }

    create = async (clazz = new ClassModel()) => {
        const repoModel = new ClassRemoteModel();
        repoModel.class_id = undefined;
        repoModel.id_discipline = clazz.discipline.id;
        repoModel.id_user = clazz.teacher.id;
        repoModel.schedules = clazz.schedules.map(sch => {
            return {
                hour: sch.hour,
                week_day: sch.hour,
            }
        });

        repoModel.students = clazz.students.map(st => {
            return {
                student_id: st.id,
                enrollment: st.enrollment,
                name: st.name
            }
        });

        repoModel.year = new Date().getFullYear();
        repoModel.semester = clazz.semester;
        repoModel.class_number = 1;

        let axiosResponse = await customAxios.post(`${nextConfig.env.CLASSES_API_BASE_URL}/classes`, repoModel);

        while (axiosResponse.status == 400 && axiosResponse.data.detail == 'The class already exists') {
            repoModel.class_number++;
            axiosResponse = await customAxios.post(`${nextConfig.env.CLASSES_API_BASE_URL}/classes`, repoModel);
        }

        return axiosResponse.data;
    }


    deleteAllStudentsFromClass = (classId) => {
        return customAxios.delete(`${nextConfig.env.CLASSES_API_BASE_URL}/classes/${classId}/students`);
    }

    deleteAllSchedulesFromClass = (classId) => {
        return customAxios.delete(`${nextConfig.env.CLASSES_API_BASE_URL}/classes/${classId}/schedules`);
    }

    linkStudentWithClass = (classId, studentId) => {
        return customAxios.post(`${nextConfig.env.CLASSES_API_BASE_URL}/classes/${classId}/students/${studentId}`);
    }

    addScheduleToClass = async (classId, schedule = new ScheduleRemoteModel()) => {
        return customAxios.post(`${nextConfig.env.CLASSES_API_BASE_URL}/classes/${classId}/schedules`, schedule);
    }
}
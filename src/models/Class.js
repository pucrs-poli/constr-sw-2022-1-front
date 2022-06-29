export default class ClassModel {
    id = '';
    imagePath = '';
    discipline = {
        id: '',
        name: ''
    };

    schedule = {
        id: '',
        hour: ''
    };

    teacher = {
        id: '',
        name: ''
    };

    resource = {
        id: '',
        name: ''
    };

    students = [
        {
            name: "",
            id: "",
            enrollment: ""
        },
    ];

    year = 0;
    semester = 0;
}
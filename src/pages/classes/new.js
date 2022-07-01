import { Avatar, Button, Checkbox, Container, FormControlLabel, Grid, InputLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomAppBar from '../../components/CustomAppBar';
import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';
import LoadingModal from '../../components/modals/LoadingModal';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ClassModel from '../../models/Class';
import StudentModel from '../../models/Student';
import { ClassesRepository } from '../../remote/repositories/classes-repository';
import { DisciplinesRepository } from '../../remote/repositories/disciplines-repository';
import { StudentsRepository } from '../../remote/repositories/students-repository';

export default function AddStudent(props) {
    const classesRepository = new ClassesRepository();
    const disciplinesRepository = new DisciplinesRepository();
    const studentsRepository = new StudentsRepository();

    const router = useRouter();

    const [controls, setControls] = useState({ modalSave: { isOpen: false, isLoading: false }, selectedStudentId: '' });
    const [classData, setClassData] = useState(new ClassModel());
    const [disciplineData, setDisciplineData] = useState({
        id: '0',
        name: ''
    });
    const [schedulesData, setSchedulesData] = useState([]);
    const [teacherData, setTeacherData] = useState({
        id: '0',
        name: ''
    });

    const [studentsData, setStudentsData] = useState([]);

    const [allStudents, setAllStudents] = useState([
        {
            name: "",
            id: "",
            enrollment: ""
        }
    ]);

    const [allDisciplines, setAllDisciplines] = useState([
        {
            name: "",
            id: ""
        }
    ]);


    const mockTeachersData = [
        {
            id: 'ce5e56f4-638a-4b6c-9d3a-b2919e389e17',
            name: 'Eduardo Arruda'
        },
        {
            id: '4bee67a0-5e98-4106-868a-619ba69864a7',
            name: 'Silvia'
        },
        {
            id: 'b72205ae-3d1c-4d19-b183-1bdd369758c8',
            name: 'Yamagutti'
        },
        {
            id: 'feebb458-0280-444e-9ba5-e1e9a6051d9b',
            name: 'Marcelo Cohen'
        }
    ];

    const mockHoursData = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'P',
    ];

    useEffect(() => {
        studentsRepository.fetchAll().then(stData => {
            const foundStudents = stData.map(d => {
                const s = new StudentModel();

                s.id = d.student_id;
                s.name = d.name;
                s.enrollment = d.enrollment;

                return s;
            });

            setAllStudents(foundStudents);
        });

        disciplinesRepository.fetchAll().then(disc => {
            const foundDisciplines = disc.map(d => {
                return {
                    id: d.id,
                    name: d.nome
                };
            });

            setAllDisciplines(foundDisciplines);
        });

    }, []);

    const handleChangeTeacher = (event) => {
        setTeacherData({
            id: event.target.value
        })
    }

    const handleChangeStudent = (event) => {
        setControls({
            modalSave: controls.modalSave,
            selectedStudentId: event.target.value
        });
    }

    const handleChangeDiscipline = (event) => {
        setDisciplineData({
            id: event.target.value
        });
    }

    const handleChangeSemester = (event) => {
        const updatedClassData = { ...classData };
        updatedClassData.semester = event.target.value;

        setClassData(updatedClassData);
    }

    const handleChangeHour = (event) => {
        const newHour = event.target.value;
        const foundScheduleIndex = schedulesData.findIndex(sch => sch.hour.indexOf(newHour) != -1);
        let schedulesUpdate = [];

        schedulesData.forEach(sch => {
            schedulesUpdate.push(sch);
        });

        if (foundScheduleIndex != -1) {
            schedulesUpdate.splice(foundScheduleIndex, 1);
        } else {

            schedulesUpdate.push({
                hour: newHour
            });
        }

        setSchedulesData(schedulesUpdate);
    }

    const addSelectedStudentToList = () => {
        if (!controls.selectedStudentId) {
            return;
        }

        const newStudent = allStudents.find(s => s.id == controls.selectedStudentId);
        const updatedStudents = [];

        updatedStudents.push(newStudent);
        studentsData.forEach(s => {
            updatedStudents.push(s);
        });

        const newMockData = allStudents.filter(s => s.id != controls.selectedStudentId);

        setControls({
            modalSave: controls.modalSave,
            selectedStudentId: ''
        })

        setAllStudents(newMockData);
        setStudentsData(updatedStudents);
    }

    const removeStudentFromClass = (studentId) => {
        const student = studentsData.find(s => s.id == studentId);

        allStudents.push(student);

        setStudentsData(studentsData.filter(s => s.id != student.id));
        setAllStudents(allStudents);
    }

    const closeModal = (isOpen) => {
        setControls({
            modalSave: {
                isOpen: isOpen,
                isLoading: controls.modalSave.isLoading
            },
            selectedStudentId: controls.selectedStudentId
        });

        router.push('/classes');
    }

    const saveClass = () => {
        classData.discipline = disciplineData;
        classData.teacher = teacherData;
        classData.students = studentsData;
        classData.schedules = schedulesData;

        setControls({
            modalSave: {
                isOpen: true,
                isLoading: true
            }
        });

        classesRepository.create(classData).then(() => {
            setControls({
                modalSave: {
                    isOpen: true,
                    isLoading: false
                }
            });

        });
    }

    const mountStudentList = () => {
        return (
            <List dense sx={{
                width: '100%', bgcolor: 'background.paper', bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,

            }}
            >
                {
                    studentsData.length == 0 ?
                        <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '1rem' }} >
                            <Typography color="red" component="span" variant={'h6'} >
                                Não existem alunos cadastrados para esta turma.
                            </Typography>
                        </div> :
                        studentsData.map((s, indx) => {
                            return (
                                <ListItem secondaryAction={
                                    <ConfirmDeleteModal title={`Remover aluno`} description={
                                        <span>
                                            <span>Deseja realmente remove o aluno  <b>{s.name}</b> da turma de {disciplineData.name}?</span>
                                        </span>
                                    }
                                        positiveCallback={() => removeStudentFromClass(s.id)}
                                        positiveActionText={'Remover'} />
                                } key={indx} component="div" disablePadding>
                                    <ListItemButton key={indx + 'list-item-button'}>
                                        <ListItemAvatar key={indx + 'list-item-avatar'}>
                                            <Avatar
                                                key={indx + 'avatar'}
                                                alt={s.name}
                                                src={`frontend.png`}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText key={indx + 'list-item-text'} id={s.id} primary={s.name} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
            </List>
        );
    }

    return (
        <>
            <CustomAppBar title="Construção de Software" />

            <Container sx={{ marginTop: '50px' }}>
                <Grid container width={'80%'} margin={'auto'}>
                    <span style={{ cursor: 'pointer', marginBottom: '3rem' }} onClick={() => router.push('/classes')}>
                        <ArrowBackIcon sx={{ fontSize: '24pt', color: '#1976d2' }} />
                        <Typography color="#1976d2" component="span" sx={{ fontSize: '18pt', verticalAlign: 'bottom' }} >
                            voltar
                        </Typography>
                    </span>
                    <Grid item sm={12} sx={{ textAlign: 'center' }}>
                        <Typography color="inherit" component="span" variant={'h4'}>
                            Cadastrar nova turma
                        </Typography>

                    </Grid>
                    <Grid item sm={10} margin={'10px'}>
                        <InputLabel id="id-discipline">Disciplina</InputLabel>

                        <Select
                            labelId="id-discipline"
                            id="id-discipline"
                            value={disciplineData.id}
                            onChange={handleChangeDiscipline}
                            fullWidth
                        >
                            {
                                allDisciplines.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)
                            }
                        </Select>
                    </Grid>
                    <Grid item sm={2} margin={'10px'}>
                        <InputLabel id="id-semester">Semestre</InputLabel>

                        <Select
                            labelId="id-semester"
                            id="id-semester"
                            value={classData.semester}
                            onChange={handleChangeSemester}
                            fullWidth
                        >
                            {
                                [1, 2].map(s => <MenuItem key={s} value={s}>{new Date().getFullYear()}/{s}</MenuItem>)
                            }
                        </Select>
                    </Grid>
                    <Grid item sm={12} margin={'10px'}>
                        <InputLabel id="id-teacher">Professor</InputLabel>

                        <Select
                            labelId="id-teacher"
                            id="id-teacher"
                            value={teacherData.id}
                            onChange={handleChangeTeacher}
                            fullWidth
                        >
                            {
                                mockTeachersData.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)
                            }
                        </Select>
                    </Grid>
                    <Grid item sm={12} sx={{ alignSelf: 'end' }} margin={'10px'}>
                        <InputLabel id="id-schedule">Horário</InputLabel>

                        {
                            mockHoursData.map((d, indx) =>
                                <FormControlLabel key={indx}
                                    control={
                                        <Checkbox key={d} value={d} checked={!!schedulesData.find(sch => sch.hour.toUpperCase().indexOf(d) != -1)} onChange={handleChangeHour} />
                                    }
                                    label={d} />)
                        }
                    </Grid>

                    <Grid item sm={12}>
                        <InputLabel id="id-students">Alunos</InputLabel>

                        {mountStudentList()}
                    </Grid>
                    <Grid item sm={12}>
                        <Grid container>
                            <Grid item xs={10}>
                                <Select
                                    labelId="id-student-select"
                                    id="id-student-select"
                                    value={controls.selectedStudentId}
                                    onChange={handleChangeStudent}
                                    fullWidth
                                >
                                    {
                                        allStudents.map(d => <MenuItem key={d.id + 'student'} value={d.id}>{d.name} - {d.enrollment}</MenuItem>)
                                    }
                                </Select>
                            </Grid>
                            <Grid item sm={2} sx={{ marginTop: '10px', textAlign: 'right' }}>
                                <Button variant="contained" onClick={addSelectedStudentToList}>Incluir aluno</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} marginTop={'5rem'} marginBottom={'5rem'}>
                        <Grid item sm={12} sx={{ marginTop: '10px', textAlign: 'right' }}>
                            <Button variant="contained" onClick={saveClass}>Salvar</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            <LoadingModal open={controls.modalSave.isOpen} openCloseModal={closeModal} isLoading={controls.modalSave.isLoading} messageAfterLoaded={'Turma sava com sucesso!'} />

        </>);



}

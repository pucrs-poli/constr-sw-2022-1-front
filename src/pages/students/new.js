import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CustomAppBar from '../../components/CustomAppBar';
import LoadingModal from '../../components/modals/LoadingModal';

import StudentModel from '../../models/Student';
import StudentsRepository from '../../remote/repositories/students-repository';

export default function AddStudent(props) {
    const studentsRepository = new StudentsRepository();

    const router = useRouter();

    const [controls, setControls] = useState({ modalSave: { isOpen: false, isLoading: false, messageAfterLoaded: '', hasApiResponseError: false } });
    const [formErrors, setFormErrors] = useState({
        name: {
            hasError: false,
            helperText: ''
        },
        enrollment: {
            hasError: false,
            helperText: ''
        }
    });

    const [studentData, setStudentData] = useState(new StudentModel());

    const save = () => {
        if (formErrors.enrollment.hasError || formErrors.name.hasError) {
            return;
        }
        setControls({
            modalSave: {
                isOpen: true,
                isLoading: true
            }
        });

        studentsRepository.createStudent(studentData).then(() => {
            setControls({
                modalSave: {
                    isOpen: true,
                    messageAfterLoaded: 'Aluno salvo com sucesso!'
                }
            });

        }).catch((res) => {
            if (res.response.status == 400) {
                setControls({
                    modalSave: {
                        isOpen: true,
                        messageAfterLoaded: 'Um aluno com esta matrícula já está cadastrado.',
                        hasApiResponseError: true
                    }
                });
            }
        });
    }

    const openCloseModal = (isOpen) => {
        const hasApiError = controls.modalSave.hasApiResponseError;

        setControls({
            modalSave: {
                isOpen: isOpen,
                isLoading: controls.modalSave.isLoading
            }
        });

        if (!hasApiError) {
            router.push('/students');
        }
    }

    const handleChangeName = (event) => {
        if (event.target.value.trim() == '') {
            setFormErrors({
                name: {
                    hasError: true,
                    helperText: 'O nome é obrigatório'
                },
                enrollment: formErrors.enrollment
            })
        } else {
            setFormErrors({
                name: {
                    helperText: ''
                },
                enrollment: formErrors.enrollment
            })
        }

        setStudentData({
            name: event.target.value,
            enrollment: studentData.enrollment,
            id: studentData.id
        });
    }

    const handleChangeEnrollment = (event) => {
        if (event.target.value.trim() == '') {
            setFormErrors({
                name: formErrors.name,
                enrollment: {
                    hasError: true,
                    helperText: 'A matrícula é obrigatória.'
                }
            })
        } else if (event.target.value.trim().length != 8) {
            setFormErrors({
                name: formErrors.name,
                enrollment: {
                    hasError: true,
                    helperText: 'A matrícula deve conter exatamente 8 caracteres.'
                }
            })
        } else {
            setFormErrors({
                name: formErrors.name,
                enrollment: {
                    helperText: ''
                }
            })
        }

        setStudentData({
            name: studentData.name,
            enrollment: event.target.value,
            id: studentData.id
        });
    }

    return (
        <>
            <CustomAppBar title="Construção de Software" />
            <Container sx={{ marginTop: '50px' }}>
                <Grid container width={'80%'} margin={'auto'}>
                    <Grid item sm={12} sx={{ textAlign: 'center' }}>
                        <Typography color="inherit" component="span" variant={'h4'}>
                            Edição de Aluno
                        </Typography>
                    </Grid>
                    <Grid item sm={12} sx={{ marginTop: '50px' }}>
                        <TextField
                            error={formErrors.name.hasError}
                            label="Nome"
                            id="student-name"
                            fullWidth
                            value={studentData.name}
                            onChange={handleChangeName}
                            helperText={formErrors.name.helperText}
                        />

                    </Grid>
                    <Grid item sm={12}>
                        <Grid item sm={4} sx={{ marginTop: '10px' }}>
                            <TextField
                                error={formErrors.enrollment.hasError}
                                label="Matrícula"
                                id="student-enrollment"
                                value={studentData.enrollment}
                                onChange={handleChangeEnrollment}
                                type="number"
                                helperText={formErrors.enrollment.helperText}
                            />
                        </Grid>
                    </Grid>
                    <Grid item sm={12}>
                        <Grid item sm={12} sx={{ marginTop: '10px', textAlign: 'right' }}>
                            <Button variant="contained" onClick={save}>Salvar</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <LoadingModal open={controls.modalSave.isOpen} openCloseModal={openCloseModal} isLoading={controls.modalSave.isLoading} messageAfterLoaded={controls.modalSave.messageAfterLoaded} />
        </>
    );
}

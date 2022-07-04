

import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CustomAppBar from '../../components/CustomAppBar';
import LoadingModal from '../../components/modals/LoadingModal';
import StudentsRepository from '../../remote/repositories/students-repository';

export default function EditStudent(props) {

  const [controls, setControls] = useState({ modalSave: { isOpen: false, isLoading: false } });
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

  const router = useRouter();

  const studentsRepository = new StudentsRepository();

  const [studentData, setStudentData] = useState(
    {
      name: "",
      id: "",
      enrollment: ""
    }
  );

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    studentsRepository.fetchById(router.query.studentId).then(d => {
      const sTData = {
        id: d.student_id,
        name: d.name,
        enrollment: d.enrollment
      };

      setStudentData(sTData);
    });

  }, [router.isReady]);

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

    studentsRepository.updateById(studentData.id, studentData).then(() => {
      setControls({
        modalSave: {
          isOpen: true,
          isLoading: false
        }
      });

    });
  }

  const openCloseModal = (isOpen) => {
    setControls({
      modalSave: {
        isOpen: isOpen,
        isLoading: controls.modalSave.isLoading
      }
    });

    router.push('/students');
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
          hasError: false,
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
          hasError: false,
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
      <LoadingModal open={controls.modalSave.isOpen} openCloseModal={openCloseModal} isLoading={controls.modalSave.isLoading} messageAfterLoaded={'Aluno salvo com sucesso!'} />
    </>
  );
}


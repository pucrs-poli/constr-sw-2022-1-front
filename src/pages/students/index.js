import EditIcon from '@mui/icons-material/Edit';
import { Button, Container, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import CustomAppBar from '../../components/CustomAppBar';
import CustomDataTable from '../../components/data-table/CustomDataTable';
import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';
import StudentModel from '../../models/Student';
import StudentsRepository from '../../remote/repositories/students-repository';

export default function ListClasses(props) {
  const router = useRouter();

  const [modalState, setModalState] = useState({
    opened: false,
  });

  const [studentsData, setStudentsData] = useState([new StudentModel()]);

  const studentsRepository = new StudentsRepository();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    studentsRepository.fetchAll().then(allstudents => {
      const students = allstudents.map(st => {
        return {
          id: st.student_id,
          name: st.name,
          enrollment: st.enrollment
        }
      });

      setStudentsData(students);
    });

  }, [router.isReady]);

  const handleOpen = () => {
    setModalState({
      opened: true
    });
  }

  const deleteStudent = (studentId) => {
    studentsRepository.deleteStudent(studentId).then(() => {
      const studentsWithoutDeleted = studentsData.filter(st => st.id != studentId);

      setStudentsData(studentsWithoutDeleted);
    });
  }

  return (
    <>
      <CustomAppBar title="Construção de Software" />
      <Container>
        <Grid item sm={12} marginTop={'5rem'} marginBottom={'5rem'}>
          <Grid item sm={12} sx={{ marginTop: '10px', textAlign: 'right' }}>
            <Button variant="contained" onClick={() => router.push('/students/new')}>Cadastrar novo aluno</Button>
          </Grid>
        </Grid>
        <Grid container marginTop={'20px'}>
          <CustomDataTable
            handleOpen={handleOpen}
            headers={[
              {
                title: 'Nome',
                columnSize: 8
              },
              {
                title: 'Matrícula',
                columnSize: 3
              },
              {
                title: 'Ações',
                columnSize: 1
              }
            ]}
            bodyItems={
              studentsData.map(d => {
                return {
                  imagePath: 'frontend.png',
                  bodyItemTexts: [
                    d.name,
                    d.enrollment,
                    <Grid container>
                      <Grid item md={6}>
                        <a href={`/students/${d.id}`}>
                          <EditIcon sx={{ color: '#1976d2' }} />
                        </a>
                      </Grid>
                      <Grid item md={6} sx={{ cursor: 'pointer' }}>
                        <ConfirmDeleteModal title={`Excluir aluno`} description={
                          <span>
                            <span>Deseja realmente excluir o aluno {d.name}?</span>
                          </span>
                        }
                          positiveCallback={() => deleteStudent(d.id)}
                          positiveActionText={'Excluir'} />
                      </Grid>
                    </Grid>
                  ]
                };
              })
            }
          />
        </Grid>
      </Container>
    </>
  );




}


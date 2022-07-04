import EditIcon from '@mui/icons-material/Edit';
import { Button, Container, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import CustomAppBar from '../../components/CustomAppBar';
import CustomDataTable from '../../components/data-table/CustomDataTable';
import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';
import ClassModel from '../../models/Class';
import { ClassesRepository } from '../../remote/repositories/classes-repository';
import { DisciplinesRepository } from '../../remote/repositories/disciplines-repository';

export default function ListClasses(props) {
  const router = useRouter();
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

  const [modalState, setModalState] = useState({
    opened: false,
  });

  const [classesData, setClassesData] = useState([new ClassModel()]);

  const classesRepository = new ClassesRepository();
  const disciplinesRepository = new DisciplinesRepository();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    disciplinesRepository.fetchAll().then(allDisciplines => {
      classesRepository.fetchAllClasses().then(data => {
        const classes = data.map(cl => {
          const clazz = new ClassModel();

          clazz.id = cl.class_id;
          clazz.imagePath = 'frontend.png';
          clazz.schedules = cl.schedules.map(sch => {
            return {
              id: sch.schedule_id,
              hour: sch.hour
            };
          });
          const foundDiscipline = allDisciplines.find(discData => discData.id === cl.id_discipline);

          clazz.discipline = !!foundDiscipline ? {
            id: foundDiscipline.id,
            name: foundDiscipline.nome
          } : {};

          clazz.teacher = mockTeachersData.find(tech => tech.id === cl.id_user);

          return clazz;
        });

        setClassesData(classes);
      });
    });

  }, [router.isReady]);

  const handleOpen = () => {
    setModalState({
      opened: true
    });
  }

  const deleteClass = (classId) => {
    classesRepository.deleteClass(classId).then(() => {
      const classesWithoutDeleted = classesData.filter(cl => cl.id != classId);

      setClassesData(classesWithoutDeleted);
    });
  }

  return (
    <>
      <CustomAppBar title="Construção de Software" />
      <Container>
        <Grid item sm={12} marginTop={'5rem'} marginBottom={'5rem'}>
          <Grid item sm={12} sx={{ marginTop: '10px', textAlign: 'right' }}>
            <Button variant="contained" onClick={() => router.push('/classes/new')}>Criar nova turma</Button>
          </Grid>
        </Grid>
        <Grid container>
          <CustomDataTable
            handleOpen={handleOpen}
            headers={[
              {
                title: 'Turma',
                columnSize: 6
              },
              {
                title: 'Horário',
                columnSize: 2
              },
              {
                title: 'Responsável',
                columnSize: 3
              },
              {
                title: 'Ações',
                columnSize: 1
              }
            ]}
            bodyItems={
              classesData.map(d => {
                return {
                  imagePath: d?.imagePath,
                  bodyItemTexts: [
                    d.discipline.name,
                    d.schedules.map(sch => sch.hour).join(),
                    d.teacher.name,
                    <Grid container>
                      <Grid item md={6}>
                        <a href={`/classes/${d.id}`}>
                          <EditIcon sx={{ color: '#1976d2' }} />
                        </a>
                      </Grid>
                      <Grid item md={6} sx={{ cursor: 'pointer' }} >
                        <ConfirmDeleteModal title={`Excluir turma`} description={
                          <span>
                            <span>Deseja realmente excluir a turma de {d.discipline.name}?</span>
                          </span>
                        }
                          positiveCallback={() => deleteClass(d.id)}
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
      {/* {this.modal()} */}
    </>
  );




}


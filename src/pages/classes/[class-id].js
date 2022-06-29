import { Avatar, Button, Checkbox, Container, FormControlLabel, Grid, InputLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';
import CustomAppBar from '../../components/CustomAppBar';
import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';

import LoadingModal from '../../components/modals/LoadingModal';
import ClassModel from '../../models/Class';
import DisciplineModel from '../../models/Discipline';
import StudentModel from '../../models/Student';
import { ClassesRepository } from '../../remote/repositories/classes-repository';
export default class EditStudent extends React.Component {

  constructor(props) {
    super(props);
    this.handleChangeTeacher = this.handleChangeTeacher.bind(this);
    this.handleChangeSchedule = this.handleChangeTeacher.bind(this);
    this.handleChangeResource = this.handleChangeResource.bind(this);
    this.handleChangeStudent = this.handleChangeStudent.bind(this);
    this.removeStudentFromClass = this.removeStudentFromClass.bind(this);
    this.mountStudentList = this.mountStudentList.bind(this);
    this.addSelectedStudentToList = this.addSelectedStudentToList.bind(this);
    this.openCloseModal = this.openCloseModal.bind(this);
    this.showHideLoadingInModal = this.showHideLoadingInModal.bind(this);

    this.classesRepository = new ClassesRepository();



    // this.mockData? = {
    //   id: '098',
    //   imagePath: 'frontend.png',
    //   discipline: {
    //     id: '123',
    //     name: 'Construção de Software'
    //   },
    //   schedule: {
    //     id: '321',
    //     hour: 'JK'
    //   },
    //   teacher: {
    //     id: '809',
    //     name: 'Eduardo Arruda'
    //   },
    //   resource: {
    //     id: 'res-123',
    //     name: 'Auditório - 516'
    //   },
    //   students: [
    //     // {
    //     //   name: "Kevin",
    //     //   student_id: "caa6154b-03e3-45b2-820d-aa548030af3e",
    //     //   enrollment: "16204042"
    //     // },
    //     {
    //       name: "Rodrigo",
    //       student_id: "caa6154c-03e3-45b2-820d-aa548030af3e",
    //       enrollment: "16204042"
    //     },
    //     {
    //       name: "Diego",
    //       student_id: "caa6154d-03e3-45b2-820d-aa548030af3e",
    //       enrollment: "16204042"
    //     },
    //     {
    //       name: "Edson",
    //       student_id: "caa6154e-03e3-45b2-820d-aa548030af3e",
    //       enrollment: "16204042"
    //     },
    //     {
    //       name: "Ricardo",
    //       student_id: "caa6154f-03e3-45b2-820d-aa548030af3e",
    //       enrollment: "16204042"
    //     },
    //     {
    //       name: "Taylor",
    //       student_id: "caa6154g-03e3-45b2-820d-aa548030af3e",
    //       enrollment: "16204042"
    //     },
    //     {
    //       name: "Alex",
    //       student_id: "caa6154h-03e3-45b2-820d-aa548030af3e",
    //       enrollment: "16204042"
    //     },
    //     {
    //       name: "Michel",
    //       student_id: "caa6154i-03e3-45b2-820d-aa548030af3e",
    //       enrollment: "16204042"
    //     },
    //     {
    //       name: "Tiago",
    //       student_id: "caa6154j-03e3-45b2-820d-aa548030af3e",
    //       enrollment: "16204042"
    //     }
    //   ],
    //   year: 2022,
    //   semester: 2
    // };

    this.mockStudentsData = [
      {
        name: "Kevin",
        student_id: "caa6154b-03e3-45b2-820d-aa548030af3e",
        enrollment: "16204049"
      },
      {
        name: "Rodrigo",
        student_id: "caa6154c-03e3-45b2-820d-aa548030af3e",
        enrollment: "16204042"
      },
      {
        name: "Diego",
        student_id: "caa6154d-03e3-45b2-820d-aa548030af3e",
        enrollment: "16204042"
      },
      {
        name: "Edson",
        student_id: "caa6154e-03e3-45b2-820d-aa548030af3e",
        enrollment: "16204042"
      },
      {
        name: "Ricardo",
        student_id: "caa6154f-03e3-45b2-820d-aa548030af3e",
        enrollment: "16204042"
      },
      {
        name: "Taylor",
        student_id: "caa6154g-03e3-45b2-820d-aa548030af3e",
        enrollment: "16204042"
      },
      {
        name: "Alex",
        student_id: "caa6154h-03e3-45b2-820d-aa548030af3e",
        enrollment: "16204042"
      },
      {
        name: "Michel",
        student_id: "caa6154i-03e3-45b2-820d-aa548030af3e",
        enrollment: "16204042"
      },
      {
        name: "Tiago",
        student_id: "caa6154j-03e3-45b2-820d-aa548030af3e",
        enrollment: "16204042"
      }
    ];


    this.mockTeachersData = [
      {
        id: '809',
        name: 'Eduardo Arruda'
      },
      {
        id: '321',
        name: 'Silvia'
      },
      {
        id: '456',
        name: 'Yamagutti'
      },
      {
        id: '654',
        name: 'Marcelo Cohen'
      }
    ];

    this.mockHoursData = [
      'A',
      'B',
      'C',
      'D',
      'D',
      'E',
      'E1',
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

    this.mockResourcesData = [
      {
        id: 'res-123',
        name: 'Auditório - 516'
      },
      {
        id: 'res-345',
        name: 'Notebook 02'
      },
      {
        id: 'res-543',
        name: 'LAPRO - 211.2'
      },
    ];

  }

  componentDidMount() {
    this.classesRepository.fetchAllClasses().then(data => {
      this.mockData = data.map(d => {
        const clazz = new ClassModel();
        clazz.id = d.class_id;
        clazz.year = d.year;
        clazz.semester = d.semester;
        clazz.students = d.students.map(s => {
          const student = new StudentModel();
          student.id = s.student_id;
          student.name = s.name;
          student.enrollment = s.enrollment;

          return student;
        });

        const discipline = new DisciplineModel();
        discipline.id = d.id_discipline;

        clazz.discipline = discipline;
        return clazz;
      });


      this.state = {
        controls: {
          selectedStudentId: '',
          modalSave: {
            isLoading: false,
            isOpen: false
          }
        },
        data: this.mockData,
        modal: {
          opened: false
        }
      };
    });
  }

  render = () => (
    <>
      <CustomAppBar title="Construção de Software" />
      <Container sx={{ marginTop: '50px' }}>
        <Grid container width={'80%'} margin={'auto'}>
          <Grid item sm={12} sx={{ textAlign: 'center' }}>
            <Typography color="inherit" component="span" variant={'h4'}>
              {this.mockData?.discipline.name} {`${this.mockData?.year}/${this.mockData?.semester}`}
            </Typography>

          </Grid>
          <Grid></Grid>
          <Grid item sm={12} margin={'10px'}>
            <InputLabel id="id-teacher">Professor</InputLabel>

            <Select
              labelId="id-teacher"
              id="id-teacher"
              value={this.mockData?.teacher.id}
              onChange={this.handleChangeTeacher}
              fullWidth
            >
              {
                this.mockTeachersData.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)
              }
            </Select>
          </Grid>
          <Grid item sm={12} sx={{ alignSelf: 'end' }} margin={'10px'}>
            <InputLabel id="id-schedule">Horário</InputLabel>

            {/* <Select
              labelId="id-schedule"
              id="id-schedule"
              value={this.mockData?.schedule.id}
              onChange={this.handleChangeSchedule}
              fullWidth
            > */}
            {
              this.mockHoursData.map((d, indx) =>
                <FormControlLabel key={indx}
                  control={
                    <Checkbox key={d} value={d} checked={this.mockData?.schedule.hour.toUpperCase().indexOf(d) != -1} />
                  }
                  label={d} />)
            }
            {/* </Select> */}

          </Grid>
          <Grid item sm={12} sx={{ alignSelf: 'end' }} margin={'10px'}>
            <InputLabel id="id-resource">Recurso</InputLabel>

            <Select
              labelId="id-resource"
              id="id-resource"
              value={this.mockData?.resource.id}
              onChange={this.handleChangeResource}
              fullWidth
            >
              {
                this.mockResourcesData.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)
              }
            </Select>
          </Grid>

          <Grid item sm={12}>
            <InputLabel id="id-students">Alunos</InputLabel>

            {this.mountStudentList()}
          </Grid>
          <Grid item sm={12}>
            <Grid container>
              <Grid item xs={10}>
                <Select
                  labelId="id-student-select"
                  id="id-student-select"
                  value={this.state?.controls.selectedStudentId}
                  onChange={this.handleChangeStudent}
                  fullWidth
                >
                  {
                    this.mockStudentsData.filter(s => !this.state?.data.students.map(sMock => sMock.enrollment).includes(s.enrollment)).map(d => <MenuItem key={d.student_id} value={d.student_id}>{d.name} - {d.enrollment}</MenuItem>)
                  }
                </Select>
              </Grid>
              <Grid item sm={2} sx={{ marginTop: '10px', textAlign: 'right' }}>
                <Button variant="contained" onClick={this.addSelectedStudentToList}>Incluir aluno</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} marginTop={'5rem'} marginBottom={'5rem'}>
            <Grid item sm={12} sx={{ marginTop: '10px', textAlign: 'right' }}>
              <Button variant="contained" onClick={() => {
                const currState = this.state;
                currState.controls.modalSave.isOpen = true;
                currState.controls.modalSave.isLoading = true;

                this.setState(currState);

                setTimeout(() => {
                  const currState = this.state;
                  currState.controls.modalSave.isLoading = false;

                  this.setState(currState);
                }, 5000);
              }}>Salvar</Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <LoadingModal open={this.state?.controls.modalSave.isOpen} openCloseModal={this.openCloseModal} isLoading={this.state?.controls.modalSave.isLoading} messageAfterLoaded={'Turma sava com sucesso!'} />

    </>
  );

  handleChangeTeacher(event) {
    this.mockData.teacher.id = event.target.value;
    const currentState = this.state;
    currentState.data = this.mockData;
    this.setState(currentState);
  }

  handleChangeSchedule(event) {
    this.mockData.schedule.id = event.target.value;

    const currentState = this.state;
    currentState.data = this.mockData;
    this.setState(currentState);
  }

  handleChangeResource(event) {
    this.mockData.resource.id = event.target.value;

    const currentState = this.state;
    currentState.data = this.mockData;
    this.setState(currentState);
  }

  handleChangeStudent(event) {
    const currentState = this.state;
    currentState.controls.selectedStudentId = event.target.value;
    this.setState(currentState);
  }

  addSelectedStudentToList() {
    const newStudent = this.mockStudentsData.find(s => s.student_id == this.state?.controls.selectedStudentId);
    this.mockData?.students.push(newStudent);

    const currentState = this.state;
    currentState.data = this.mockData;
    this.setState(currentState);
  }

  removeStudentFromClass(studentId) {
    this.mockData.students = this.mockData?.students.filter(s => s.student_id != studentId);
    const currentState = this.state;
    currentState.data = this.mockData;
    this.setState(currentState);
  }

  openCloseModal(isOpen) {
    const currentState = this.state;
    currentState.controls.modalSave.isOpen = isOpen;
    this.setState(currentState);
  }

  showHideLoadingInModal(isLoading) {
    const currentState = this.state;
    currentState.controls.modalSave.isLoading = isLoading;
    this.setState(currentState);
  }

  mountStudentList() {
    return (
      <List dense sx={{
        width: '100%', bgcolor: 'background.paper', bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,

      }}
      >
        {
          this.state?.data?.students.map((s, indx) => {
            return (
              <ListItem secondaryAction={
                <ConfirmDeleteModal title={`Remover aluno`} description={
                  <span>
                    <span>Deseja realmente remove o aluno  <b>{s.name}</b> da turma de {this.mockData?.discipline.name}?</span>
                  </span>
                }
                  positiveCallback={() => this.removeStudentFromClass(s.student_id)}
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
                  <ListItemText key={indx + 'list-item-text'} id={s.student_id} primary={s.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    );
  }
}
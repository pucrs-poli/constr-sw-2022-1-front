import { Button, Container, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';
import CustomAppBar from '../../components/CustomAppBar';


export default class ListStudents extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.mockData;
    this.handleChangeDiscipline = this.handleChangeDiscipline.bind(this);
    this.handleChangeTeacher = this.handleChangeTeacher.bind(this);
    this.handleChangeSchedule = this.handleChangeTeacher.bind(this);
    this.handleChangeResource = this.handleChangeResource.bind(this);

    this.mockData = {
      id: '098',
      imagePath: 'frontend.png',
      discipline: {
        id: '123',
        name: 'Construção de Software'
      },
      schedule: {
        id: '321',
        hour: 'JK'
      },
      teacher: {
        id: '809',
        name: 'Eduardo Arruda'
      },
      resource: {
        id: 'res-123',
        name: 'Auditório - 516'
      }
    };

    this.mockDisciplinesData = [
      {
        id: '123',
        name: 'Construção de Software'
      },
      {
        id: '321',
        name: 'Engenharia de Requisitos'
      },
      {
        id: '456',
        name: 'Banco de Dados I'
      },
      {
        id: '654',
        name: 'Banco de Dados II'
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

    this.mockSchedulesData = [
      {
        id: '123',
        hour: 'JK'
      },
      {
        id: '321',
        hour: 'JKNP'
      },
      {
        id: '456',
        hour: 'JKLMNP'
      }
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

  render = () => (
    <>
      <CustomAppBar title="Construção de Software" />
      <Container sx={{ marginTop: '50px' }}>
        <Grid container width={'80%'} margin={'auto'}>
          <Grid item sm={12} sx={{ textAlign: 'center' }}>
            <Typography color="inherit" component="span" variant={'h4'}>
              Edição de Turma
            </Typography>
          </Grid>
          <Grid item sm={12} margin={'10px'}>
            <InputLabel id="id-discipline">Disciplina</InputLabel>

            <Select
              labelId="id-discipline"
              id="id-discipline"
              value={this.mockData.discipline.id}
              onChange={this.handleChangeDiscipline}
              fullWidth
            >
              {
                this.mockDisciplinesData.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)
              }
            </Select>


          </Grid>
          <Grid item sm={12} margin={'10px'}>
            <InputLabel id="id-teacher">Professor</InputLabel>

            <Select
              labelId="id-teacher"
              id="id-teacher"
              value={this.mockData.teacher.id}
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

            <Select
              labelId="id-schedule"
              id="id-schedule"
              value={this.mockData.schedule.id}
              onChange={this.handleChangeSchedule}
              fullWidth
            >
              {
                this.mockSchedulesData.map(d => <MenuItem key={d.id} value={d.id}>{d.hour}</MenuItem>)
              }
            </Select>
          </Grid>
          <Grid item sm={12} sx={{ alignSelf: 'end' }} margin={'10px'}>
            <InputLabel id="id-resource">Recurso</InputLabel>

            <Select
              labelId="id-resource"
              id="id-resource"
              value={this.mockData.resource.id}
              onChange={this.handleChangeResource}
              fullWidth
            >
              {
                this.mockResourcesData.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)
              }
            </Select>
          </Grid>

          <Grid item sm={12}>
            <Grid item sm={12} sx={{ marginTop: '10px', textAlign: 'right' }}>
              <Button variant="contained">Salvar</Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );


  handleChangeDiscipline(event) {
    this.mockData.discipline.id = event.target.value;

    this.setState(this.mockData);
  }

  handleChangeTeacher(event) {
    this.mockData.teacher.id = event.target.value;

    this.setState(this.mockData);
  }

  handleChangeSchedule(event) {
    this.mockData.schedule.id = event.target.value;

    this.setState(this.mockData);
  }

  handleChangeResource(event) {
    this.mockData.resource.id = event.target.value;

    this.setState(this.mockData);
  }
}
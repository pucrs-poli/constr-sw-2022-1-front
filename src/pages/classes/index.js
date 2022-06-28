import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Container, Divider, Grid, Modal, Typography } from '@mui/material';
import React from 'react';

import CustomAppBar from '../../components/CustomAppBar';
import CustomDataTable from '../../components/data-table/CustomDataTable';

export default class ListClasses extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.mockData = [
      {
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
        user: {
          id: '809',
          name: 'Eduardo Arruda'
        },
        resource: {
          id: 'res-123',
          name: 'Auditório - 516'
        }
      }
    ];
  }


  handleOpen() {
    this.state.opened = true;
    this.setState(this.state);
  }

  render = () => (
    <>
      <CustomAppBar title="Construção de Software" />
      <Container>
        <Divider />
        <Grid container marginTop={'20px'}>
          {/* Filtro de horário */}
          <Grid item md={2}>
            <Grid item marginTop={'20px'}>
              <Typography color="inherit" component="div" fontSize={'12pt'}>
                Horário
              </Typography>
            </Grid>
          </Grid>
          <CustomDataTable
            handleOpen={this.handleOpen}
            headers={[
              {
                title: 'Turma',
                columnSize: 6
              },
              {
                title: 'Recurso',
                columnSize: 2
              },
              {
                title: 'Horário',
                columnSize: 1
              },
              {
                title: 'Responsável',
                columnSize: 2
              },
              {
                title: 'Ações',
                columnSize: 1
              }
            ]}
            bodyItems={
              this.mockData.map(d => {
                return {
                  imagePath: d.imagePath,
                  bodyItemTexts: [
                    d.discipline.name,
                    d.resource.name,
                    d.schedule.hour,
                    d.user.name,
                    <Grid container>
                      <Grid item md={6}>
                        <a href={`/classes/${d.id}`}>
                          <EditIcon />
                        </a>
                      </Grid>
                      <Grid item md={6} sx={{ cursor: 'pointer' }}>
                        <DeleteIcon />
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


import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Container, Divider, Grid } from '@mui/material';
import React from 'react';

import CustomDataTable from '../../components/data-table/CustomDataTable';

export default class ListStudents extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    }
    this.mockData = [
      {
        id: '098',
        enrollment: '16204179',
        name: 'Rodrigo Machado'
      },
      {
        id: '123',
        enrollment: '16204042',
        name: 'Kevin'
      }
    ];
  }

  render = () => (
    <>
      <Container>
        <Divider />
        <Grid container marginTop={'20px'} >
          <CustomDataTable
            margin={'auto'}
            handleOpen={this.handleOpen}
            headers={[
              {
                title: 'Matrícula',
                columnSize: 2
              },
              {
                title: 'Nome',
                columnSize: 8
              },
              {
                title: 'Ações',
                columnSize: 2,
              }
            ]}
            bodyItems={
              this.mockData.map(d => {
                return {
                  imagePath: d.imagePath,
                  bodyItemTexts: [
                    d.enrollment,
                    d.name,
                    <Grid container>
                      <Grid item md={6}>
                        <a href={`/students/${d.id}`}>
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


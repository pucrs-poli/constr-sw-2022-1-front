

import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import CustomAppBar from '../../components/CustomAppBar';


export default class ListStudents extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    }
    this.mockData =
    {
      id: '098',
      enrollment: '16204179',
      name: 'Rodrigo Machado'
    };
  }

  render = () => (
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
              label="Nome"
              id="student-name"
              fullWidth
            />

          </Grid>
          <Grid item sm={12}>
            <Grid item sm={4} sx={{ marginTop: '10px' }}>
              <TextField
                label="Matrícula"
                id="student-name"
              />
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Grid item sm={12} sx={{ marginTop: '10px',textAlign:'right' }}>
              <Button variant="contained">Salvar</Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );




}


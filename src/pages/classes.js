import ViewHeadlineSharpIcon from '@mui/icons-material/ViewHeadlineSharp';
import { Container, Divider, FormControl, Grid, InputLabel, NativeSelect, Typography } from '@mui/material';
import CustomAppBar from '../components/CustomAppBar';

import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';
import CustomDataTable from '../components/data-table/CustomDataTable';
export default function Classes() {
  return (
    <>
      <CustomAppBar title="Construção de Software" />
      <Container>
        <Grid container marginTop={'50px'} marginBottom={'20px'} >
          <Grid item md={10} alignSelf={'center'}>
            <Typography variant="h6" color="inherit" component="div" >
              Turmas
            </Typography>
          </Grid>
          <Grid item md={1} alignSelf={'center'}>
            <ViewModuleOutlinedIcon fontSize='large' />
            <ViewHeadlineSharpIcon fontSize='large' />
          </Grid>
          <Grid item md={1}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Ordenar
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: 'Ordenar',
                  id: 'sort-select',
                }}
              >
                <option value={10}>Últimos</option>
                <option value={20}>Primeiros</option>
                <option value={30}>Turma</option>
                <option value={30}>Aluno</option>
                <option value={30}>Horáio</option>
                <option value={30}>Responsável</option>
              </NativeSelect>
            </FormControl>
          </Grid>
        </Grid>
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
            headerTitles={['Turma', 'Recurso', 'Horário', 'Responsável']}
            bodyItems={
              [
                {
                  imagePath: 'frontend.png',
                  bodyItemTexts: [
                    'Construção de Software',
                    'Auditório - 516',
                    'JK',
                    'Eduardo Arruda'
                  ]
                },
                {
                  imagePath: 'frontend.png',
                  bodyItemTexts: [
                    'Construção de Software',
                    'Auditório - 516',
                    'JK',
                    'Eduardo Arruda'
                  ]
                }
              ]
            }
          />
        </Grid>
      </Container>
    </>
  );
}

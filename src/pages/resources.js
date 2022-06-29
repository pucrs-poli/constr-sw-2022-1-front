import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  TextField,
  Grid,
  Snackbar,
  Alert,
  Text
} from '@mui/material';
import { Add, DeleteOutline } from '@mui/icons-material';

function createData(name, type, description, model, available) {
  return { name, type, description, model, available };
}

const rows = [
  createData('Notebook ASUS', 'Notebook', 'Notebook ASUS Intel i5 8GB', 'NPAS400', 'Sim'),
  createData('Projetor CASIO', 'Projetor', 'Projetor CASIO 2021', 'PJCASIO0293', 'Não'),
  createData('Adaptador MULTILASER', 'Adaptador', 'Adaptador MULTILASER para MACBOOK', 'AN4912', 'Sim'),
];

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [alertIsOpen, setAlertIsOpen] = useState(false);

  const[name, setName] = useState('');
  const[type, setType] = useState('');
  const[description, setDescription] = useState('');
  const[model, setModel] = useState('');

  useEffect(() => {
    setResources(rows);
  }, []);

  function handleSubmit() {
    setResources([
      ...resources,
      {
        name,
        type,
        description,
        model,
        available: 'Sim',
      }
    ]);

    setName('');
    setType('');
    setDescription('');
    setModel('');

    setModalIsOpen(false);
    setAlertIsOpen(true);
  }

  function handleCloseAlert() {
    console.log('passei aqui');
    setAlertIsOpen(false);
  }

  return (
    <Layout>
      <TableContainer
        component={Paper}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end' }}
      >
      <Button
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '10px 10px 10px 0',
        }}
        variant="contained"
        endIcon={<Add fontSize="medium" />}
        onClick={() => setModalIsOpen(true)}
      >
        Adicionar novo recurso
      </Button>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>NOME</TableCell>
              <TableCell align="center">TIPO</TableCell>
              <TableCell align="center">DESCRIÇÃO</TableCell>
              <TableCell align="center">MODELO</TableCell>
              <TableCell align="center">DISPONÍVEL</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {resources.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.model}</TableCell>
              <TableCell align="center">{row.available}</TableCell>
              <TableCell align="center">
                <Button>
                  <DeleteOutline color='error' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: '8px',
            p: 10,
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 2,
            paddingRight: 2,
            width: '400px',
          }}
        whiteSpace="normal"
        >
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TextField
              label="Nome"
              variant="outlined"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              label="Tipo"
              variant="outlined"
              value={type}
              required
              onChange={(e) => setType(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              label="Descrição"
              variant="outlined"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              label="Modelo"
              variant="outlined"
              value={model}
              required
              onChange={(e) => setModel(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button fullWidth variant="contained" onClick={handleSubmit}>Cadastrar</Button>
          </Grid>
        </Grid>
        </Box>
      </Modal>
      <Snackbar
        open={alertIsOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Cadastrado com sucesso!
        </Alert>
      </Snackbar>
    </Layout>
  )
}
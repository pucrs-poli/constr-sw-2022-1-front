import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { ConfirmModal } from '../components/ConfirmModal';
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
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add, DeleteOutline, ModeEditOutline } from '@mui/icons-material';

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
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [model, setModel] = useState('');
  const [available, setAvailable] = useState('');

  const [resourceIndex, setresourceIndex] = useState(-1);

  useEffect(() => {
    setResources(rows);
  }, []);

  function handleSubmit() {
    if (resourceIndex !== -1) {
      let updatedResources = resources;
      updatedResources[resourceIndex] = {
        name,
        type,
        description,
        model,
        available,
      };

      setResources(updatedResources);
    } else {
      setResources([
        ...resources,
        {
          name,
          type,
          description,
          model,
          available: available || 'Sim',
        }
      ]);

      setAlertIsOpen(true);
    }

    handleCloseModal();
  }

  function handleCloseAlert() {
    setAlertIsOpen(false);
  }

  function handleDelete() {
    let updatedResources = resources;
    updatedResources.splice(resourceIndex, 1);

    setResources(updatedResources);
    handleCloseDialog();
  }

  function handleCloseDialog() {
    setDialogIsOpen(false);
    setresourceIndex(-1);
  }

  function handleEdit(name, type, description, model, available) {
    setName(name);
    setType(type);
    setDescription(description);
    setModel(model);
    setAvailable(available);
    setModalIsOpen(true);
  }

  function handleCloseModal() {
    setName('');
    setType('');
    setDescription('');
    setModel('');
    setAvailable('');

    setModalIsOpen(false);
    setresourceIndex(-1);
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
          {resources.map((row, index) => {
            const { name, type, description, model, available } = row;

            return (
              <TableRow
                key={name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="center">{type}</TableCell>
                <TableCell align="center">{description}</TableCell>
                <TableCell align="center">{model}</TableCell>
                <TableCell align="center">{available}</TableCell>
                <TableCell align="center">
                <Button onClick={() => {
                  setresourceIndex(index);
                  handleEdit(name, type, description, model, available);
                }}>
                    <ModeEditOutline />
                  </Button>
                  <Button onClick={() => {
                    setresourceIndex(index);
                    setDialogIsOpen(true);
                  }}>
                    <DeleteOutline color='error' />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={modalIsOpen} onClose={handleCloseModal}>
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
          {available && (
            <Grid item>
             <InputLabel id="available">Disponível</InputLabel>
            <Select
              labelId="available"
              value={available}
              label="Available"
              onChange={(e) => setAvailable(e.target.value)}
            >
              <MenuItem value='Sim'>Sim</MenuItem>
              <MenuItem value='Não'>Não</MenuItem>
            </Select>
            </Grid>
          )}
          <Grid item>
            <Button fullWidth variant="contained" onClick={handleSubmit}>
              {resourceIndex !== -1 ? 'Atualizar' : 'Cadastrar'}
            </Button>
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
      <ConfirmModal
        isOpen={dialogIsOpen}
        onClose={handleCloseDialog}
        description="Deseja mesmo apagar este recurso?"
        actions={
          <>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleDelete} autoFocus>
              Apagar
            </Button>
          </>
        }
      />
    </Layout>
  )
}
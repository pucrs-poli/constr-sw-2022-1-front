import * as React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomBox from "../components/CustomBox";
import CustomLine from "../components/CustomLine";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const theme = createTheme();

let disciplinaMock =
  [
    {
      "id": "1",
      "codigo": "41231",
      "creditos": 4,
      "nome": "Alest 1",
      "objetivo": "algum objetivo",
      "ementa": "lorem ipsum",
      "nivel": 3,
      "ativa": true
    },
    {
      "id": "2",
      "codigo": "21231",
      "creditos": 4,
      "nome": "Alest 2",
      "objetivo": "algum objetivo",
      "ementa": "lorem ipsum",
      "nivel": 3,
      "ativa": true
    },
    {
      "id": "3",
      "codigo": "31234",
      "creditos": 4,
      "nome": "Alest 3",
      "objetivo": "algum objetivo",
      "ementa": "lorem ipsum",
      "nivel": 3,
      "ativa": true
    },
    {
      "id": "4",
      "codigo": "44231",
      "creditos": 4,
      "nome": "Alest 4",
      "objetivo": "algum objetivo",
      "ementa": "lorem ipsum",
      "nivel": 3,
      "ativa": true
    }

  ]

export default function Disciplines() {
  const [disciplina, setDisciplina] = React.useState(disciplinaMock)

  const [showMatricula, setShowMatricula] = React.useState(false);
  const handleShowMatriculaOpen = () => setShowMatricula(true);
  const handleShowMatriculaClose = () => setShowMatricula(false);

  const [addDisciplina, setAddDisciplina] = React.useState(false)
  const handleAddDisciplinaOpen = () => setAddDisciplina(true)
  const handleAddDisciplinaClose = () => setAddDisciplina(false)




  function adicionarDisciplina() {
    //tem que usar state pra atualizar o front
    const novaDisciplina = {
      "id": "5",
      "nome": "Outro curso",
      "curriculos": [
        {
          "id": "999",
          "nome": "curriculo 1"
        }
      ]
    }

    setDisciplina([...disciplina,novaDisciplina])
    setAddDisciplina(false)
    //limpar campos da disciplina
  }

  return <>
    <ThemeProvider theme={theme}>
      <Container component="main">
        <Button onClick={handleAddDisciplinaOpen}>Cadastrar Disciplina</Button>

        <Grid container>
          <Grid item >
            <CustomLine title="Disciplinas" curriculo="Curriculos" cursos="Cursos" />
          </Grid>
          {
            disciplina.map(function (disciplina, index) {
              return (
                <>
                  <Grid item key={disciplina.id}>
                    <CustomLine onClick={handleShowMatriculaOpen}
                      title={disciplina.nome}
                      curriculo="Algum curriculo ai"
                      cursos="ES" />

                  </Grid>
                  <Modal
                    open={showMatricula}
                    onClose={handleShowMatriculaClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h3" component="h2">
                        {disciplina.nome}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {disciplina.codigo}-{disciplina.creditos}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        objetivo da disciplina: {disciplina.objetivo}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        ementa da disciplina: {disciplina.ementa}
                      </Typography>
                    </Box>
                  </Modal>
                </>
              )
            })
          }

        </Grid>

        <Modal
                open={addDisciplina}
                onClose={handleAddDisciplinaClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h5" component="h2">
                   Adicionar uma disciplina
                  </Typography>
                  
                  <TextField id="standard-basic" label="Nome da disciplina" variant="standard" />
                  <TextField id="standard-basic" label="Codigo da disciplina" variant="standard" />
                  <TextField id="standard-basic" label="Creditos da disciplina" variant="standard" />
                  <TextField id="standard-basic" label="Objetivo da disciplina" variant="standard" />
                  <TextField id="standard-basic" label="Ementa da disciplina" variant="standard" />
                  <TextField id="standard-basic" label="Nivel da disciplina" variant="standard" />
                  {/* codigo, creditos, nome, objetivo, ementa, nivel, ativa */}

                  <Button onClick={adicionarDisciplina}>Cadastrar Disciplina</Button>
                </Box>
                
              </Modal>
      </Container>

     

    </ThemeProvider>
  </>
}
import * as React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomBox from "../components/CustomBox";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import CustomAppBar from '../components/CustomAppBar'

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
let idCount = 2
let curriculosMock = [
  {
    "id": "1",
    "nome": "98AL"
  }
]

const mockDisciplinas = [
  {
    "id": 1,
    "codigo": 98903,
    "creditos": 2,
    "nome": "Processos de Software",
    "objetivo": "Aprender sobre processos de software",
    "ementa": "Ementa da disciplina",
    "nivel": 5,
    "ativa": true
  },{
    "id": 2,
    "codigo": 98902,
    "creditos": 2,
    "nome": "Banco de Dados II",
    "objetivo": "Aprender modelagem de banco de dados",
    "ementa": "Ementa da disciplina",
    "nivel": 3,
    "ativa": true
  },{
    "id": 3 ,
    "codigo": 95300,
    "creditos": 4,
    "nome": "Calculo I",
    "objetivo": "Ementa da disciplina",
    "ementa": "lorem ipsum",
    "nivel": 3,
    "ativa": true
  }

]

export default function Curriculums() {

  const [curriculos, setCurriculos] = React.useState(curriculosMock)
  const [disciplinas, setDisciplinas] = React.useState(mockDisciplinas)

  const [addCurriculums, setAddCurriculums] = React.useState(false)
  const [showCurriculums, setShowCurriculums] = React.useState(false)
  const [editCurriculum, setEditCurriculum] = React.useState(false)

  const handleAddCurriculumsOpen = () => setAddCurriculums(true)
  const handleAddCurriculumsClose = () => setAddCurriculums(false)



  function handleShowCurriculumsOpen(id) {
    const curriculum = curriculos.find(curriculo => curriculo.id === id)
    if (curriculum) {
      setCurriculumsName(curriculum.nome)
      setCurriculumsId(curriculum.id)
    }

    setShowCurriculums(true)
  }

  function handleShowCurriculumsClose() {
    setShowCurriculums(false)
    limparCampos()
  }
  function handleEditCurriculumsOpen(id) {
    setShowCurriculums(false)
    setEditCurriculum(true)
  }

  function handleEditCurriculumsClose() {
    setEditCurriculum(false)
    limparCampos()
  }

  const [curriculumsName, setCurriculumsName] = React.useState('');
  const [curriculumsId, setCurriculumsId] = React.useState("")

  function adicionarCurriculo() {
    //tem que usar state pra atualizar o front
    const novoCurriculo = {
      "id": idCount++,
      "nome": curriculumsName
    }

    setCurriculos([...curriculos, novoCurriculo])
    setAddCurriculums(false)
    limparCampos()
    //limpar campos do curriculo
  }

  function editarCurriculo() {
    const curriculo = curriculos.find(curri => curri.id === curriculumsId)

    curriculo.nome = curriculumsName

    const curriculumsEdit = curriculos
    curriculumsEdit.forEach(curr => {
      if(curr.id === curriculo.id) {
        curr = curriculo
      }
    })

    setCurriculos(curriculumsEdit)
    setEditCurriculum(false)
    limparCampos()
  }

  function removerCurriculo(){
    //TODO chamar endpoint de remocao, mas por enquanto só retira do array mocado
    const curriculumsEdit = curriculos
    const index = curriculos.findIndex(curr => curr.id === curriculumsId)
    curriculumsEdit.splice(index,1)

    setCurriculos(curriculumsEdit)
    setShowCurriculums(false)
    limparCampos()
  }

  function limparCampos() {
    setCurriculumsName("")
  }

  return <>
    <ThemeProvider theme={theme}>
      <CustomAppBar title="Construção de software" />
      <Container component="main">
        <Button onClick={handleAddCurriculumsOpen}>Cadastrar curriculo</Button>

        <Grid container>

          {
            curriculos.map(function (curriculo, index) {
              return (
                <>
                  <Grid item key={index}>
                    <CustomBox onClick={() =>handleShowCurriculumsOpen(curriculo.id)} title={curriculo.nome} description={curriculo.id} />
                  </Grid>
                </>
              )
            })
          }

        </Grid>

        <Modal
          open={addCurriculums}
          onClose={handleAddCurriculumsClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Adicionar um curriculo
            </Typography>
            <TextField id="name" name="name" label="Nome do curriculo" variant="standard" value={curriculumsName}
              onChange={(e) => setCurriculumsName(e.target.value)} />

            <Button onClick={adicionarCurriculo}>Cadastrar Curriculo</Button>
          </Box>

        </Modal>

        <Modal //show curriculo
          open={showCurriculums}
          onClose={handleShowCurriculumsClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              {curriculumsName}
            </Typography>
            {
              disciplinas.map((disciplina, index) => 
                <Typography key={disciplina.id} id="modal-modal-title" variant="h6" component="h6">{disciplina.nome} | nivel: {disciplina.nivel} | codigo: {disciplina.codigo}-{disciplina.creditos} </Typography>
              )
            }

            <Button onClick={handleEditCurriculumsOpen}>Editar curriculo</Button>
            <Button onClick={removerCurriculo}>Remover curriculo</Button>
          </Box>

        </Modal>

        <Modal //edit curriculo
          open={editCurriculum}
          onClose={handleEditCurriculumsClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Editar curriculo
            </Typography>
            <TextField id="name" name="name" label="Nome do curriculo" variant="standard" value={curriculumsName}
              onChange={(e) => setCurriculumsName(e.target.value)} />
            {
              disciplinas.map((disciplina, index) => 
                <Typography key={disciplina.id} id="modal-modal-title" variant="h6" component="h6">{disciplina.nome} | nivel: {disciplina.nivel} | codigo: {disciplina.codigo}-{disciplina.creditos} </Typography>
              )
            }
            {/* <TextField id="name" name="name" label="Nome do curriculo" variant="standard" value={curriculumsName}
              onChange={(e) => setCurriculumsName(e.target.value)} /> */}

            <Button onClick={editarCurriculo}>Salvar</Button>
          </Box>

        </Modal>

      </Container>

    </ThemeProvider>
  </>
}
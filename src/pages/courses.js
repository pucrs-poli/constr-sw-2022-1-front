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

let courses = [
  {
    "id": 1,
    "nome": "Sistemas de informação",
    "curriculos": [
      {
        "id": 1,
        "nome": "98AM"
      },
      {
        "id": 2,
        "nome": "4624"
      }
    ]
  }
]

export default function Courses() {

  const [cursos, setCursos] = React.useState(courses)

  const [addCourse, setAddCourse] = React.useState(false)
  const [showCurso, setShowCurso] = React.useState(false)
  const [editCurso, setEditCurso] = React.useState(false)

  const [courseName, setCourseName] = React.useState("");
  const [curriculosCurso, setCurriculosCurso] = React.useState("")
  const [curriculos, setCurriculos] = React.useState([])
  const [idCurso, setIdCurso] = React.useState()

  const handleAddCourseOpen = () => setAddCourse(true)
  const handleAddCourseClose = () => setAddCourse(false)
  let cursoId = 2;
  let curriculoId = 3

  function handleShowCursoOpen(id) {
    const curso = cursos.find(curs => curs.id === id)

    if (curso) {
      setCourseName(curso.nome)
      setCurriculos(curso.curriculos)
      setIdCurso(curso.id)
    }

    setShowCurso(true)
  }

  function handleShowCursoClose() {
    setShowCurso(false)
    limparCampos()
  }

  function handleEditCursoOpen() {
    setShowCurso(false)
    setEditCurso(true)
  }

  function handleEditCursoClose() {
    setEditCurso(false)
    limparCampos()
  }

  function adicionarCurso() {
    //tem que usar state pra atualizar o front
    let listaCurriculos = []

    curriculosCurso.split(",").forEach(curr => {
      listaCurriculos.push({
        id: curriculoId++,
        nome: curr
      })
    })

    const novoCurso = {
      "id": cursoId++,
      "nome": courseName,
      "curriculos": listaCurriculos
    }

    setCursos([...cursos, novoCurso])
    setAddCourse(false)
    limparCampos()
  }

  function editarCursos() {
    const curso = cursos.find(curs => curs.id === idCurso)
    let listaCurriculos = []

    curso.nome = courseName

    const cursosEdit = cursos
    cursosEdit.forEach(curs => {
      if (curs.id === curso.id) {
        curs = curso
      }
    })

    setCursos(cursosEdit)
    setEditCurso(false)
    limparCampos()

  }

  function removerCurso() {
    const cursoEdit = cursos
    const index = cursos.findIndex(curs => curs.id === idCurso)
    cursoEdit.splice(index, 1)

    setCursos(cursoEdit)
    setShowCurso(false)
    limparCampos()
  }


  function limparCampos() {
    setCourseName("")
    setIdCurso("")
    setCurriculosCurso([])
  }

  return <>
    <ThemeProvider theme={theme}>
      <CustomAppBar title="Construção de software" />
      <Container component="main">
        <Button onClick={handleAddCourseOpen}>Cadastrar curso</Button>

        <Grid container>

          {
            cursos.map(function (curso, index) {
              return (
                <>
                  <Grid item key={curso.id}>
                    <CustomBox onClick={() => handleShowCursoOpen(curso.id)} title={curso.nome} />
                  </Grid>
                </>
              )
            })
          }

        </Grid>
        <Modal
          open={addCourse}
          onClose={handleAddCourseClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Adicionar um curso
            </Typography>

            <TextField id="name" name="name" label="Nome do curso" variant="standard" value={courseName}
              onChange={(e) => setCourseName(e.target.value)} />

            <TextField id="name" name="name" label="curriculos do curso (separar por vírgula)" variant="standard" value={curriculosCurso}
              onChange={(e) => setCurriculosCurso(e.target.value)} />
            {/* codigo, creditos, nome, objetivo, ementa, nivel, ativa */}

            <Button onClick={adicionarCurso}>Cadastrar Curso</Button>
          </Box>

        </Modal>
      </Container>
      <Modal //show cursos
        open={showCurso}
        onClose={handleShowCursoClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {courseName}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h6">Lista de curriculos</Typography>
          {
            curriculos.map((curriculo, index) =>
              <Typography key={curriculo.id} id="modal-modal-title" variant="h6" component="h6">{curriculo.nome}</Typography>
            )
          }

          <Button onClick={handleEditCursoOpen}>Editar curso</Button>
          <Button onClick={removerCurso}>Remover curso</Button>
        </Box>

      </Modal>

      <Modal //edit curriculo
        open={editCurso}
        onClose={handleEditCursoClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Editar currilo
          </Typography>
          <TextField id="name" name="name" label="Nome do curso" variant="standard" value={courseName}
            onChange={(e) => setCourseName(e.target.value)} />
          {
            // disciplinas.map((disciplina, index) =>
            //   <Typography key={disciplina.id} id="modal-modal-title" variant="h6" component="h6">{disciplina.nome} | nivel: {disciplina.nivel} | codigo: {disciplina.codigo}-{disciplina.creditos} </Typography>
            // )
          }
          {/* <TextField id="name" name="name" label="Nome do curriculo" variant="standard" value={curriculumsName}
              onChange={(e) => setCurriculumsName(e.target.value)} /> */}

          <Button onClick={editarCursos}>Salvar</Button>
        </Box>

      </Modal>

    </ThemeProvider>
  </>
}

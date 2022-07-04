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
    "id":"1",
    "nome":"Engenharia de software",
    "curriculos": [
      {
        "id":"999",
        "nome":"curriculo 1"
      }
    ]
  },{
    "id":"2",
    "nome":"Engenharia da computacao",
    "curriculos": [
      {
        "id":"998",
        "nome":"curriculo 1"
      }
    ]
  },{
    "id":"3",
    "nome":"Sistemas de informacao",
    "curriculos": [
      {
        "id":"999",
        "nome":"curriculo 1"
      }
    ]
  },{
    "id":"4",
    "nome":"Ciencia da computacao",
    "curriculos": [
      {
        "id":"999",
        "nome":"curriculo 1"
      }
    ]
  },
]

export default function Courses() {  
  //const [courses, setCourses] = React.useState("Courses")   

  const [curso, setCurso] = React.useState(courses)

  const [addCourse, setAddCourse] = React.useState(false)
  const handleAddCourseOpen = () => setAddCourse(true)
  const handleAddCourseClose = () => setAddCourse(false)

  const [courseName, setCourseName] = React.useState('');

  function adicionarCursoOld() {
    //tem que usar state pra atualizar o front
    console.log("passou aqui");
    courses.push({
      "id":"5",
      "nome":"Outro curso",
      "curriculos": [
        {
          "id":"999",
          "nome":"curriculo 1"
        }
      ]
    })
  }

  function adicionarCurso() {
    //tem que usar state pra atualizar o front
    const novoCurso = {
      "id":"5",
      "nome": courseName,
      "curriculos": [
        {
          "id":"999",
          "nome":"curriculo 1"
        }
      ]
    }

    setCurso([...curso,novoCurso])
    setAddCourse(false)
    setCourseName("")
    //limpar campos do curso
  }

  return <>
      <ThemeProvider theme={theme}>
        <Container component="main">
        <Button onClick={handleAddCourseOpen}>Cadastrar curso</Button>

        <Grid container>

          {
            curso.map(function(curso, index){
              return (
                <>
                <Grid item key={index}> 
                  <CustomBox onClick={()=>alert(curso.nome)} title={curso.nome}/>
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
                   onChange={(e) => setCourseName(e.target.value)}/>
                  {/* codigo, creditos, nome, objetivo, ementa, nivel, ativa */}

                  <Button onClick={adicionarCurso}>Cadastrar Curso</Button>
                </Box>
                
              </Modal>
        </Container>

      </ThemeProvider> 
  </>
}

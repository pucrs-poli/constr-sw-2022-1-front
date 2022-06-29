import * as React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomBox from "../components/CustomBox";

const theme = createTheme();

export default function Courses() {
  // const [courses, setCourses] = React.useState("Courses")

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

  function adicionarCurso() {
    //tem que usar state pra atualizar o front
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

  return <>
      <ThemeProvider theme={theme}>
        <Container component="main">
        <Button onClick={adicionarCurso}>Cadastrar curso</Button>

        <Grid container>

          {
            courses.map(function(course, index){
              return (
                <>
                <Grid item key={index}> 
                  <CustomBox onClick={()=>alert(course.nome)} title={course.nome}/>
                </Grid>
                </>
              )
            })
          }

        </Grid>

        </Container>

      </ThemeProvider> 
  </>
}

import * as React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomBox from "../components/CustomBox";
import CustomLine from "../components/CustomLine";


const theme = createTheme();

export default function Disciplines() {
 
  let disciplina = 
    [
      {
        "id":"1",
        "codigo":"1",
        "creditos":4,
        "nome":"Alest 1",
        "objetivo":"algum objetivo",
        "ementa":"lorem ipsum",
        "nivel":3,
        "ativa":true
      },
      {
        "id":"2",
        "codigo":"2",
        "creditos":4,
        "nome":"Alest 2",
        "objetivo":"algum objetivo",
        "ementa":"lorem ipsum",
        "nivel":3,
        "ativa":true
      },
      {
        "id":"3",
        "codigo":"3",
        "creditos":4,
        "nome":"Alest 3",
        "objetivo":"algum objetivo",
        "ementa":"lorem ipsum",
        "nivel":3,
        "ativa":true
      },
      {
        "id":"4",
        "codigo":"4",
        "creditos":4,
        "nome":"Alest 4",
        "objetivo":"algum objetivo",
        "ementa":"lorem ipsum",
        "nivel":3,
        "ativa":true
      }
  
  ]

  function adicionarCurso() {
    //tem que usar state pra atualizar o front
    disciplina.push({
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
        <Button onClick={adicionarCurso}>Cadastrar Disciplina</Button>

        <Grid container>
            <Grid item > 
              <CustomLine title="Disciplinas" curriculo="Curriculos" cursos="Cursos" />
            </Grid>
          {
            disciplina.map(function(disciplina, index){
              return (
                <>
                <Grid item key={index}> 
                  <CustomLine onClick={()=>alert(disciplina.nome)} title={disciplina.nome} curriculo="Algum curriculo ai" cursos="ES"/>
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
import * as React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomBox from "../components/CustomBox";

const theme = createTheme();

export default function Curriculums() {
  let curriculos = [
    {
      "id":"999",
      "nome":"curriculo 1"
    },
    {
      "id":"998",
      "nome":"curriculo 2"
    },{
      "id":"997",
      "nome":"curriculo 3"
    }
  ]

  function adicionarCurrilo() {
    //tem que usar state pra atualizar o front
    curriculos.push(
      {
        "id":"996",
        "nome":"curriculo 4"
      }
    )
  }

  return <>
      <ThemeProvider theme={theme}>
        <Container component="main">
        <Button onClick={adicionarCurrilo}>Cadastrar curriculo</Button>

        <Grid container>

          {
            curriculos.map(function(curriculo, index){
              return (
                <>
                <Grid item key={index}> 
                  <CustomBox onClick={()=>alert(curriculo.nome)} title={curriculo.nome} description={curriculo.id}/>
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
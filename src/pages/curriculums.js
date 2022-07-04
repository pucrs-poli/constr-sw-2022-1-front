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

let curriculosMock = [
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

export default function Curriculums() {

  const [curriculos, setCurriculos] = React.useState(curriculosMock)

  const [addCurriculums, setAddCurriculums] = React.useState(false)
  const handleAddCurriculumsOpen = () => setAddCurriculums(true)
  const handleAddCurriculumsClose = () => setAddCurriculums(false)

  const [curriculumsName, setCurriculumsName] = React.useState('');
  const [curriculumsId, setCurriculumsId] = React.useState('');

  function adicionarCurriculo() {
    //tem que usar state pra atualizar o front
    const novoCurriculo = {
      "id": curriculumsId,
      "nome": curriculumsName    
    }
  
    setCurriculos([...curriculos,novoCurriculo])
    setAddCurriculums(false)
    setCurriculumsName("")
    setCurriculumsId("")
    //limpar campos do curriculo
  }

  function adicionarCurriloOld() {
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
        <Button onClick={handleAddCurriculumsOpen}>Cadastrar curriculo</Button>

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
                <TextField id="id" name="id" label="Id do curriculo" variant="standard" value={curriculumsId}
                  onChange={(e) => setCurriculumsId(e.target.value)}/>
                <TextField id="name" name="name" label="Nome do curriculo" variant="standard" value={curriculumsName}
                  onChange={(e) => setCurriculumsName(e.target.value)}/>
                {/* codigo, creditos, nome, objetivo, ementa, nivel, ativa */}

                <Button onClick={adicionarCurriculo}>Cadastrar Curriculo</Button>
              </Box>
                
        </Modal>

        </Container>

      </ThemeProvider> 
  </>
}
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
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
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
let idCount = 1;
let disciplinaMock =
  [
    {
      "id": idCount++,
      "codigo": "4471X",
      "creditos": 2,
      "nome": "Engenharia Econômica",
      "objetivo": "Aprender sobre engenharia econômica",
      "ementa": "Ementa da disciplina",
      "nivel": 7,
      "ativa": true
    }
  ]

export default function Disciplines() {
  const [disciplinas, setDisciplinas] = React.useState(disciplinaMock)

  const [showDisciplina, setShowDisciplina] = React.useState(false);
  const [editDisciplina, setEditDisciplina] = React.useState(false)
  const handleShowDisciplinaClose = () => setShowDisciplina(false);

  const [addDisciplina, setAddDisciplina] = React.useState(false)
  const handleAddDisciplinaOpen = () => setAddDisciplina(true)
  const handleAddDisciplinaClose = () => setAddDisciplina(false)

  const [nomeDisciplina, setNomeDisciplina] = React.useState("")
  const [codigoDisciplina, setCodigoDisciplina] = React.useState("")
  const [creditosDisciplina, setCreditosDisciplina] = React.useState("")
  const [objetivoDisciplina, setObjetivoDisciplina] = React.useState("")
  const [ementaDisciplina, setEmentaDisciplina] = React.useState("")
  const [nivelDisciplina, setNivelDisciplina] = React.useState("")
  const [disciplinaAtiva, setDisciplinaAtiva] = React.useState(false)
  const [idDisciplina, setIdDisciplina] = React.useState("")

  function handleShowDisciplinaOpen(id) {
    const disciplina = disciplinas.find(disc => disc.id === id)
    if (disciplina) {

      setNomeDisciplina(disciplina.nome)
      setCodigoDisciplina(disciplina.codigo)
      setCreditosDisciplina(disciplina.creditos)
      setObjetivoDisciplina(disciplina.objetivo)
      setEmentaDisciplina(disciplina.ementa)
      setNivelDisciplina(disciplina.nivel)
      setDisciplinaAtiva(disciplina.ativa)
      setIdDisciplina(disciplina.id)
    }

    setShowDisciplina(true)
  }

  function handleEditDisciplinaOpen(id) {
    setShowDisciplina(false)
    setEditDisciplina(true)
  }

  function handleEditDisciplinaClose(){
    
    limparCampos()
    setEditDisciplina(false)
  }


  function adicionarDisciplina() {
    //tem que usar state pra atualizar o front
    
    const disciplina = {
      id: idCount++,
      "codigo": codigoDisciplina,
      "creditos": creditosDisciplina,
      "nome": nomeDisciplina,
      "objetivo": objetivoDisciplina,
      "ementa": ementaDisciplina,
      "nivel": nivelDisciplina,
      "ativa": true
    }

    setDisciplinas([...disciplinas, disciplina])
    
    setAddDisciplina(false)
    limparCampos()
    //limpar campos da disciplina
  }

  function editarDisciplina() {
    const disciplina = disciplinas.find(disc => disc.id === idDisciplina)

    disciplina.nome = nomeDisciplina
    disciplina.codigo = codigoDisciplina
    disciplina.objetivo = objetivoDisciplina
    disciplina.ementa = ementaDisciplina
    disciplina.nivel = nivelDisciplina
    disciplina.creditos = creditosDisciplina
    disciplina.ativa = disciplinaAtiva

    const disciplinasEdit = disciplinas
    disciplinasEdit.forEach(disc => {
      if(disc.id === disciplina.id) {
        disc = disciplina
      }
    })

    setDisciplinas(disciplinasEdit)
    setEditDisciplina(false)
    limparCampos()
  }

  function removerDisciplina(){
    //TODO chamar endpoint de remocao, mas por enquanto só retira do array mocado
    const disciplinasEdit = disciplinas
    const index = disciplinas.findIndex(disc => disc.id === idDisciplina)
    disciplinasEdit.splice(index,1)

    setDisciplinas(disciplinasEdit)
    setShowDisciplina(false)
    limparCampos()
  }

  function limparCampos() {
    setNomeDisciplina("")
    setCodigoDisciplina("")
    setCreditosDisciplina("")
    setObjetivoDisciplina("")
    setEmentaDisciplina("")
    setNivelDisciplina("")
    setDisciplinaAtiva(false)
    setIdDisciplina("")
  }

  return <>
    <ThemeProvider theme={theme}>
      <CustomAppBar title="Construção de software" />
      <Container component="main">
        <Button onClick={handleAddDisciplinaOpen}>Cadastrar Disciplina</Button>

        <Grid container>
          <Grid item >
            <CustomLine title="Disciplinas" field1="Nivel" field2="Codigo-Creditos" />
          </Grid>
          {
            disciplinas.map(function (disciplina, index) {
              return (
                <>
                  <Grid item key={disciplina.id}>
                    <CustomLine onClick={() => handleShowDisciplinaOpen(disciplina.id)}
                      title={disciplina.nome}
                      field1={disciplina.nivel}
                      field2={disciplina.codigo + "-" + disciplina.creditos} />
                  </Grid>
                  
                </>
              )
            })
          }

        </Grid>
        <Modal
                    open={showDisciplina}
                    onClose={handleShowDisciplinaClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h3" component="h2">
                        {nomeDisciplina}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {codigoDisciplina}-{creditosDisciplina}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        objetivo da disciplina: {objetivoDisciplina}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        ementa da disciplina: {ementaDisciplina}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        nivel da disciplina: {nivelDisciplina}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Disciplina ativa: {disciplinaAtiva ? "Sim" : "Não"}
                      </Typography>
                      <Button onClick={() => handleEditDisciplinaOpen(idDisciplina)}>Editar</Button>
                      <Button onClick={removerDisciplina}>Remover</Button>
                    </Box>
                  </Modal>
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

            <TextField id="standard-basic" label="Nome da disciplina" variant="standard" value={nomeDisciplina}
                  onChange={(e) => setNomeDisciplina(e.target.value)}/>
            <TextField id="standard-basic" label="Codigo da disciplina" variant="standard"  value={codigoDisciplina}
                  onChange={(e) => setCodigoDisciplina(e.target.value)}/>
            <TextField id="standard-basic" label="Creditos da disciplina" variant="standard" value={creditosDisciplina}
                  onChange={(e) => setCreditosDisciplina(e.target.value)} />
            <TextField id="standard-basic" label="Objetivo da disciplina" variant="standard"  value={objetivoDisciplina}
                  onChange={(e) => setObjetivoDisciplina(e.target.value)}/>
            <TextField id="standard-basic" label="Ementa da disciplina" variant="standard"  value={ementaDisciplina}
                  onChange={(e) => setEmentaDisciplina(e.target.value)}/>
            <TextField id="standard-basic" label="Nivel da disciplina" variant="standard"  value={nivelDisciplina}
                  onChange={(e) => setNivelDisciplina(e.target.value)}/>

            <Button onClick={adicionarDisciplina}>Cadastrar Disciplina</Button>
          </Box>

        </Modal>

        <Modal
          open={editDisciplina}
          onClose={handleEditDisciplinaClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Editar disciplina
            </Typography>

            <TextField id="standard-basic" label="Nome da disciplina" variant="standard" value={nomeDisciplina}
                  onChange={(e) => setNomeDisciplina(e.target.value)}/>
            <TextField id="standard-basic" label="Codigo da disciplina" variant="standard"  value={codigoDisciplina}
                  onChange={(e) => setCodigoDisciplina(e.target.value)}/>
            <TextField id="standard-basic" label="Creditos da disciplina" variant="standard" value={creditosDisciplina}
                  onChange={(e) => setCreditosDisciplina(e.target.value)} />
            <TextField id="standard-basic" label="Objetivo da disciplina" variant="standard"  value={objetivoDisciplina}
                  onChange={(e) => setObjetivoDisciplina(e.target.value)}/>
            <TextField id="standard-basic" label="Ementa da disciplina" variant="standard"  value={ementaDisciplina}
                  onChange={(e) => setEmentaDisciplina(e.target.value)}/>
            <TextField id="standard-basic" label="Nivel da disciplina" variant="standard"  value={nivelDisciplina}
                  onChange={(e) => setNivelDisciplina(e.target.value)}/>
            <FormControlLabel 
            control={
              <Checkbox checked={disciplinaAtiva} onChange={() => setDisciplinaAtiva(!disciplinaAtiva)}/>
            }
              label="Disciplina ativa"
            />

            <Button onClick={editarDisciplina}>Salvar</Button>
          </Box>

        </Modal>
      </Container>



    </ThemeProvider>
  </>
}
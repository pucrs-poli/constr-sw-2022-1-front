import * as React from "react";
import { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from '@mui/material/Stack';
import Layout from "../components/layout";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// BUILDINGS -> buildingNumber; buildingName; buildingDescription & isEnabled: Boolean
// CLASSROOMS -> classroomNumber; clasroomName; capacity; isEnabled;   (referenciando pra building no input)

const theme = createTheme();

export default function Registerlessons() {
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
    setAge(event.target.value);
  };

  const [isShown, setIsShown] = useState(false);
  
  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [data, setData] = React.useState(new Date());

  const [age, setAge] = React.useState('');

  return (
    <Layout>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                >
                <Typography component="h1" variant="h5">
                    Cadastro de Aulas
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                            <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="lessonName"
                            label="Nome da aula"
                            id="lesson-name"
                            />
                        </Grid>

                        <Grid item xs={7} md={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Numero da Turma"
                                id="numero-turma"
                            />
                        </Grid>
                       
                        <Grid item xs={8} md={8}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} 
                                        margin="normal"
                                        required
                                        fullWidth
                                    />}
                                    label="Data e Hora"
                                    value={data}
                                    onChange={(newValue) => {
                                    setValue(newValue);
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={9} md={8}>
                            <InputLabel>Conteúdos</InputLabel>
                            <Select
                                    id="conteudo"
                                    defaultValue={40}
                                    label="Coteudo Aula"
                                    onChange={handleChange}
                                >
                                <MenuItem value={40}>Selecione</MenuItem>
                                <MenuItem value={10}>AWS</MenuItem>
                                <MenuItem value={20}>Web Services</MenuItem>
                                <MenuItem value={30}>Docker</MenuItem>
                            </Select>
                        </Grid>
                        
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="A conteúdo está disponível?"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            onClick={handleClick}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Cadastrar
                        </Button>

                    </Grid>
                </Box>
            </Box>
            {isShown && (
                <Alert severity="success">
                    <AlertTitle>Cadastro efetuado!</AlertTitle>
                        Aula cadastrada <strong>com sucesso!</strong>
                    </Alert>
            )}
            {isShown && <Box />}
            </Container>
        </ThemeProvider>
    </Layout>

  );
}

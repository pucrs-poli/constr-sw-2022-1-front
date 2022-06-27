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

// BUILDINGS -> buildingNumber; buildingName; buildingDescription & isEnabled: Boolean
// CLASSROOMS -> classroomNumber; clasroomName; capacity; isEnabled;   (referenciando pra building no input)

const theme = createTheme();

export default function ClassroomRegister() {
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
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

  return (
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
            Cadastro de salas
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
                  name="classroomName"
                  label="Nome da sala"
                  id="classroom-name"
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="classroom-capacity"
                  label="Capacidade da sala"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              id="classroom-number"
              label="Número da sala"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="A sala está disponível?"
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
          </Box>
        </Box>
        {isShown && (
          <Alert severity="success">
            <AlertTitle>Cadastro efetuado!</AlertTitle>
            O prédio e a sala foram cadastrados <strong>com sucesso!</strong>
          </Alert>
        )}
        {isShown && <Box />}
      </Container>
    </ThemeProvider>
  );
}

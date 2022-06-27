import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// BUILDINGS -> buildingNumber; buildingName; buildingDescription & isEnabled: Boolean
// CLASSROOMS -> classroomNumber; clasroomName; capacity; isEnabled;   (referenciando pra building no input)

const theme = createTheme();

export default function BuildingRegister() {
  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
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
            Cadastro de prédio
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
                  name="buildName"
                  label="Nome do prédio"
                  id="buildname"
                />
              </Grid>

              <Grid item xs={6} md={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="standard-number"
                  label="Número do prédio"
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
              multiline
              maxRows={5}
              value={value}
              onChange={handleChange}
              id="buildDescription"
              label="Descrição do prédio"
              name="BuildDescription"
              autoFocus
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="O prédio está ativo."
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              href="/classroom/"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

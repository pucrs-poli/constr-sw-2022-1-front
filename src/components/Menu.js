import Grid from '@mui/material/Grid';

const Menu = () =>{
    return <Grid container id="grid-menu" direction="column" spacing={2}>
                <Grid>
                    <a id="menu-label">MENU</a>
                </Grid>
                <Grid>
                    <h6>
                        <a href="/classes">Aulas</a>
                    </h6>
                </Grid>
                <Grid>
                    <h6>
                        <a href="/courses">Turma</a>
                    </h6>
                </Grid>
                <Grid>
                    <h6>
                        <a href="/buildings">Prédios</a>
                    </h6>
                </Grid>
                <Grid>
                    <h6>
                        <a href="/reservations">Recursos</a>
                    </h6>
                </Grid>
            </Grid>
};


export default Menu;
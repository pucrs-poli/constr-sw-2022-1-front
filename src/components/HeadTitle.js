import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const HeadTitle = () =>{
    return <AppBar position="static">
    <Toolbar variant="dense" >
        <Typography variant="h6" color="inherit">
            Construção de Software
        </Typography>
    </Toolbar>
</AppBar>
};

export default HeadTitle;

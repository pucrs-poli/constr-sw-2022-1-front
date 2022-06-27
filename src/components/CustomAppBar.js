import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';

const CustomAppBar = ({ title }) => {
    return (
        <AppBar position="static" >
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                </IconButton>
                <Typography variant="h6" color="inherit" component="div" margin={'auto'}>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar
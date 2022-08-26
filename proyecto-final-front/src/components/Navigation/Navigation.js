import react, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Navigate } from "react-router-dom";

export const Navigation = () => {

    const [navigate, setNavigate] = useState(false);
    const [navigateReporte, setNavigateReporte] = useState(false);


    const navForm = () => {
        setNavigate(true);
    }

    if (navigate) {
        return <Navigate to='/saveForm' />;
    }

    const navReporte = () => {
        setNavigateReporte(true);
    }

    if (navigateReporte) {
        return <Navigate to='/viewParticipants' />;
    }


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ background: "#1d2b3a" }} >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Universidad de Guatemala
                        </Typography>
                        <Button color="inherit" onClick={navForm} >Formulario</Button>
                        <Button color="inherit" onClick={navReporte} >Reporte</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </>

    );
}

export default Navigation;

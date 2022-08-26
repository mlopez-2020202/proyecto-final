import react, { useState } from 'react'
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import './SaveForm.css'

import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const SaveForm = () => {

    const [navigate, setNavigate] = useState(false);
    const [carnet, setCarnet] = useState('');
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [direccion, setDireccion] = useState('');
    const [genero, setGenero] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');//DATE
    const [carrera, setCarrera] = useState('');
    const [generoPoesia, setGeneroPoesia] = useState('');
    const [idParticipante, setIdParticipante] = useState('');

    const navigateToViewForm = useNavigate();

    const viewForm = (id) => {
        navigateToViewForm('/viewForm', { state: { idParticipante: id } })
    }

    const addForm = async () => {

        var data = {
            _id: idParticipante,
            carnet: carnet,
            nombreCompleto: nombreCompleto,
            direccion: direccion,
            genero: genero,
            telefono: telefono,
            fechaNacimiento: fechaNacimiento,
            carrera: carrera,
            generoPoesia: generoPoesia,
        }

        await axios.post('https://final-level-up.herokuapp.com/form/saveForm', data)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: (res.data.message),
                    confirmButtonColor: '#28B463'
                });
                viewForm(res.data.form._id);
            }).catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: (err.response.data.message || err.response.data),
                    confirmButtonColor: '#E74C3C'
                });
            });
    }

    const view = () => {
        setNavigate(true)
    }

    if (navigate) {
        return <Navigate to='/viewParticipants' />;
    }

    return (
        <>
            <div className='body'>
                <div className='container' >
                    <h1>Evento de Poesia</h1>
                    <div className='form-group'>
                        <div className='inputBox'>
                            <input type="text" required='requerido' id="carnet" name='carnet' onChange={event => setCarnet(event.target.value)} />
                            <span>Carnet</span>
                        </div>

                        <div className='inputBox'>
                            <input type="text" required='requerido' id="nombreCompleto" name='nombreCompleto' onChange={event => setNombreCompleto(event.target.value)} />
                            <span>Nombre Completo</span>
                        </div>

                        <div className='inputBox'>
                            <input type="text" required='requerido' id="direccion" name='direccion' onChange={event => setDireccion(event.target.value)} />
                            <span>Dirección</span>
                        </div>

                        <div className='inputBox'>
                            <input type="text" required='requerido' id="genero" name='genero' onChange={event => setGenero(event.target.value)} />
                            <span>Género</span>
                        </div>

                        <div className='inputBox'>
                            <input type="text" required='requerido' id="telefono" name='telefono' onChange={event => setTelefono(event.target.value)} />
                            <span>Teléfono</span>
                        </div>

                        <div className='inputBox'>
                            <input type="date" required='requerido' id="fechaNacimiento" name='fechaNacimiento' onChange={event => setFechaNacimiento(event.target.value)} />
                        </div>

                        <div className='inputBox'>
                            <input type="text" required='requerido' id="carrera" name='carrera' onChange={event => setCarrera(event.target.value)} />
                            <span>Carrera</span>
                        </div>

                        <div className='inputBox'>
                            <input type="text" required='requerido' id="generoPoesia" name='generoPoesia' onChange={event => setGeneroPoesia(event.target.value)} />
                            <span>Género de Poesia</span>
                        </div>

                    </div>
                    <a onClick={addForm}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Registrarse
                    </a >
                </div>
            </div>
            <Box sx={{ width: '100%', mt: 5 }}>
                <Grid container justifyContent="center">
                    <Grid>
                        <Button variant="contained" color="primary" onClick={view}> Ver Participantes <VisibilityIcon /></Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default SaveForm;

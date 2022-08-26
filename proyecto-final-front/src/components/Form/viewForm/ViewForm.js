import react, { useState, useEffect } from 'react'
import { Navigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import './ViewForm.css'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export const ViewForm = () => {

  const location = useLocation();

  const [dataRegistro, setDataRegistro] = useState('');
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    axios.get(`https://final-level-up.herokuapp.com/form/getParticpante/${location.state.idParticipante}`)
      .then((res) => {
        setDataRegistro(res.data.participante);
      }).catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error obteniendo tu Formulario',
          confirmButtonColor: '#E74C3C'
        });
      });
  }, [])


  const back = () => {
    setNavigate(true)
  }

  if (navigate) {
    return <Navigate to='/saveForm' />;
  }

  return (
    <>
      <div className='body'>
        <div className='contenedor'>
          <h1>Registro completado</h1>
          <h4>Informacion del participante</h4>
          <div className='form-group'>
            <div className='inputBox'>
              <label className='titulo'>Carnet</label>
              <input type="text" value={dataRegistro.carnet} disabled id="carnet" name='carnet' />
            </div>

            <div className='inputBox'>
              <label className='titulo'>Nombre completo</label>
              <input type="text" value={dataRegistro.nombreCompleto} id="nombreCompleto" name='nombreCompleto' />
            </div>

            <div className='inputBox'>
              <label className='titulo'>Carrera</label>
              <input type="text" value={dataRegistro.carrera} id="carrera" name='carrera' />
            </div>

            <div className='inputBox'>
              <label className='titulo'>Género de Poesía</label>
              <input type="text" value={dataRegistro.generoPoesia} id="generoPoesia" name='generoPoesia' />
            </div>

            <div className='inputBox'>
              <label className='titulo'>Fecha de Declamación</label>
              <input type="text" value={dataRegistro.fechaDeclamacion} id="fechaDeclamacion" name='fechaDeclamacion' />
            </div>

          </div>
        </div>
      </div>
      <Box sx={{ width: '100%', mt: 5 }}>
        <Grid container justifyContent="center">
          <Grid>
            <Button variant="contained" color="primary" onClick={back}> <ArrowBackIcon />Volver</Button>
          </Grid>
        </Grid>
      </Box>
    </>


  )
}

export default ViewForm;

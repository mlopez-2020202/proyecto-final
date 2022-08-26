import react, { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export const ViewParticipants = () => {

  const [participantes, setParticipantes] = useState([]);
  const [navigateCarrera, setNavigateCarrera] = useState(false);
  const [navigateEdad, setNavigateEdad] = useState(false);
  const [navigateGenero, setNavigateGenero] = useState(false);
  const [navigateFecha, setNavigateFecha] = useState(false);
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    axios.get('https://final-level-up.herokuapp.com/form/getParticpantes')
      .then((res) => {
        setParticipantes(res.data.participantes);
      }).catch((err) => {
        Swal.fire({
          icon: 'error',
          title: (err.response.data.message || err.response.data),
          confirmButtonColor: '#E74C3C'
        });
      });
  }, [])


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const rows = participantes.map((participante) => {
    return {
      Carnet: participante.carnet,
      NombreCompleto: participante.nombreCompleto,
      Direccion: participante.direccion,
      Genero: participante.genero,
      Id: participante._id,
      Telefono: participante.telefono,
      FechaNacimiento: participante.fechaNacimiento,
      Carrera: participante.carrera,
      GeneroPoesia: participante.generoPoesia,
      FechaInscripcion: participante.fechaInscripcion,
      FechaDeclamacion: participante.fechaDeclamacion,
      Edad: participante.edad,
    }
  });

  const verCarrera = () => {
    setNavigateCarrera(true)
  }

  if (navigateCarrera) {
    return <Navigate to='/viewParticipantsCarrera' />;
  }

  const verEdad = () => {
    setNavigateEdad(true)
  }

  if (navigateEdad) {
    return <Navigate to='/viewParticipantsEdad' />;
  }

  const verPoesia = () => {
    setNavigateGenero(true)
  }

  if (navigateGenero) {
    return <Navigate to='/viewParticipantsPoesia' />;
  }

  const verDeclamacion = () => {
    setNavigateFecha(true)
  }

  if (navigateFecha) {
    return <Navigate to='/viewParticipantsDeclamacion' />;
  }

  const back = () => {
    setNavigate(true)
  }

  if (navigate) {
    return <Navigate to='/saveForm' />;
  }

  return (
    <>
      <br />
      <br />
      <h1>Participantes</h1>
      <TableContainer component={Paper} sx={{ width: '90%', marginLeft: '5%' }}>
        <Table aria-label="customized table">
          <TableHead sx={{ background: "#1d2b3a" }}>
            <TableRow>
              <StyledTableCell align='center'>Carnet</StyledTableCell>
              <StyledTableCell align='center'>Nombre Completo</StyledTableCell>
              <StyledTableCell align='center'>Carrera</StyledTableCell>
              <StyledTableCell align='center'>Edad</StyledTableCell>
              <StyledTableCell align='center'>Genero de Poesia</StyledTableCell>
              <StyledTableCell align='center'>Fecha de Inscripcion</StyledTableCell>
              <StyledTableCell align='center'>Fecha de Declamacion</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.Carnet}>
                <StyledTableCell align="center">{row.Carnet}</StyledTableCell>
                <StyledTableCell align="center">{row.NombreCompleto}</StyledTableCell>
                <StyledTableCell align="center">{row.Carrera}</StyledTableCell>
                <StyledTableCell align="center">{row.Edad}</StyledTableCell>
                <StyledTableCell align="center">{row.GeneroPoesia}</StyledTableCell>
                <StyledTableCell align="center">{row.FechaInscripcion.slice(0, -14)}</StyledTableCell>
                <StyledTableCell align="center">{row.FechaDeclamacion.slice(0, -14)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h2>Ver participantes por:</h2>

      <Box sx={{ width: '100%', mt: 5 }}>
        <Grid container justifyContent="center">
          <Grid>
            <Button variant="contained" color="success" onClick={verCarrera}>Carrera  <VisibilityIcon /></Button>
            <Button sx={{ ml: 5 }} variant="contained" color="success" onClick={verEdad}>Edad  <VisibilityIcon /></Button>
            <Button sx={{ ml: 5 }} variant="contained" color="success" onClick={verPoesia}>Género de Poesía  <VisibilityIcon /></Button>
            <Button sx={{ ml: 5 }} variant="contained" color="success" onClick={verDeclamacion}>Fecha de Declamación  <VisibilityIcon /></Button>
          </Grid>
        </Grid>
      </Box>
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

export default ViewParticipants;





'use strict'

const mongoose = require('mongoose');
const formSchema = mongoose.Schema({
    carnet: String,
    nombreCompleto: String,
    direccion: String,
    genero: String,
    telefono: String,
    fechaNacimiento: Date,
    carrera: String,
    generoPoesia: String,
    fechaInscripcion: Date,
    fechaDeclamacion: Date,
    edad: Number
});

module.exports = mongoose.model('Form', formSchema);
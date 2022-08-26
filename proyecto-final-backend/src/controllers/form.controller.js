'use strict'

const Form = require('../models/form.model');
const { validateData } = require('../utils/validate');

exports.testForm = (req, res)=>
{
    return res.send({message: 'Función de Testeo exitosamente.'}); 
}

exports.saveForm = async(req, res) => {
    try{

        const params = req.body;
        const data = {
            carnet: params.carnet,
            nombreCompleto: params.nombreCompleto,
            direccion: params.direccion,
            genero: params.genero,
            telefono: params.telefono,
            fechaNacimiento: params.fechaNacimiento,
            carrera: params.carrera,
            generoPoesia: params.generoPoesia.toUpperCase(),
            fechaInscripcion: new Date(),
        }

        const msg = validateData(data);
        if(msg) return res.status(400).send(msg);

        if(data.carnet.length !== 6) return res.status(400).send({message: 'EL carnet debe tener 6 digitos'});
        
        if(data.carnet[0] === '0' || data.carnet[1] === '0' || data.carnet[2] === '0' || data.carnet[3] === '0' || data.carnet[4] === '0' || data.carnet[5] === '0')
            return res.status(400).send({message: 'El carnet no puede contener ceros'});

        if(data.carnet[0] !== 'A' && data.carnet[0] !== 'a') return res.status(400).send({message: 'El carnet debe comenzar con la letra A/a'});

        if(data.carnet[2] !== '5') return res.status(400).send({message: 'El tercer digito debe ser 5'});

        if(data.carnet[5] !== '1' && data.carnet[5] !== '3' && data.carnet[5] !== '9') return res.status(400).send({message: 'El ultimo digito debe ser 1, 3 o 9'});
    
        const generoValido = params.genero.toUpperCase();
        if (generoValido === 'MASCULINO') {
            params.genero = 'MASCULINO';
        } else if (generoValido === 'FEMENINO') {
            params.genero = 'FEMENINO';
        } else {
            return res.status(400).send({ message: 'Genero Inválido.'});
        }

        const fechaActual = new Date();
        const fechaNaci = new Date(params.fechaNacimiento)
        const edad = (fechaActual.getFullYear()) - (fechaNaci.getFullYear());

        if(edad < 18) return res.status(400).send({message: 'Debes ser mayor a 17 años para concursar'});

        data.edad = edad;

        const generoPoesiaValido = params.generoPoesia.toUpperCase();
        if (generoPoesiaValido === 'LIRICO') {
            params.generoPoesia = 'LIRICO';
        } else if (generoPoesiaValido === 'EPICO') {
            params.generoPoesia = 'EPICO';
        } else if (generoPoesiaValido === 'DRAMATICO') {
            params.generoPoesia = 'DRAMATICO';
        }else {
            return res.status(400).send({ message: 'Genero de poesía Inválido.'});
        }

        if(data.carnet[5] === '1' && data.generoPoesia === 'DRAMATICO'){
            let day = new Date(data.fechaDeclamacion = fechaActual);
            const fechaDec = day.getDate();
            const dia = fechaActual.getDay();
            let diaDec;
            if(dia === 6){
                diaDec = fechaDec + 9;
            }else if(dia === 5){
                diaDec = fechaDec + 10;
            }else{
                diaDec = fechaDec + 8;
            }

            data.fechaDeclamacion = new Date(day).setDate(diaDec)

        }else if(data.carnet[5] === '3' && data.generoPoesia === 'EPICO'){
            let day = new Date(data.fechaDeclamacion = fechaActual);
            const fechaDec = new Date(day.getFullYear(), day.getMonth() + 1, 0).getDate();
            
            data.fechaDeclamacion = new Date(day).setDate(fechaDec);

        }else{
            let day = new Date(data.fechaDeclamacion = fechaActual);
            const fechaDec = day.getDate();
            const dia = fechaActual.getDay();
            let diaDec;
            if(dia === 6){//SABADO
                diaDec = fechaDec + 6;
            }else if(dia === 5){//VIERNES
                diaDec = fechaDec + 7;
            }else if(dia === 4){//JUEVES
                diaDec = fechaDec + 1;
            }else if(dia === 3){//MIERCOLES
                diaDec = fechaDec + 2;
            }else if(dia === 2){//MARTES
                diaDec = fechaDec + 3;
            }else if(dia === 1){//LUNES
                diaDec = fechaDec + 4;
            }else{//DOMINGO
                diaDec = fechaDec + 5;
            }

            data.fechaDeclamacion = new Date(day).setDate(diaDec)
        }

        const form = new Form(data);
        await form.save();

        if(form) return res.send({message: 'Registro completado', form});
        return res.status(400).send({message: 'No se guardo el formulario'});

    }catch(err)
    {
        console.log(err); 
        return res.status(500).send({message:'Error al guardar el Formulario.'}); 
    }
}

exports.getParticipantes = async (req, res) => {
    try{
        const participantes = await Form.find();
        if(!participantes) return res.status(400).send({message: 'Participantes no encontrados'});
        return res.send({message: 'Partcipantes encontrados: ' , participantes})
    }catch(err)
    {
        console.log(err); 
        return res.status(500).send({message:'Error al obtener todos los participantes.'}); 
    }
}

exports.getParticipante = async(req, res) =>{
    try{
        const participanteID = req.params.id;
        const participante = await Form.findOne({_id: participanteID});
        if(!participante) return res.status(400).send({message: 'Participante no encontrado'});
        return res.send({message: 'Participante encontrado: ', participante});
    }catch(err)
    {
        console.log(err); 
        return res.status(500).send({message:'Error al obtener un participante.'}); 
    }
}
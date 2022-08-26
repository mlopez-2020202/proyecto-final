'use strict'

const express = require('express');
const formController = require('../controllers/form.controller');
const api = express.Router();

api.get('/testForm', formController.testForm);
api.post('/saveForm', formController.saveForm);
api.get('/getParticpantes', formController.getParticipantes);
api.get('/getParticpante/:id', formController.getParticipante);


module.exports = api;
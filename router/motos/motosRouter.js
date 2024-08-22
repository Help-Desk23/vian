const express = require('express');
const { getMotos } = require('../../controllers/motos/motos');


const moto = express.Router();

// Ruta GET

moto.get("/motos", getMotos);


module.exports = {
    moto
};
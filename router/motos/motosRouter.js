const express = require('express');
const { getMotos, addMoto, upload } = require('../../controllers/motos/motos');


const moto = express.Router();

// Ruta GET

moto.get("/motos", getMotos);

// Ruta POST

moto.post('/motos', upload.single('img_motos'), addMoto);


module.exports = {
    moto
};
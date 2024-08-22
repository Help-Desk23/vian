const express = require('express');
const { getMotos, addMoto, upload, deleteMoto,  } = require('../../controllers/motos/motos');


const moto = express.Router();

// Ruta GET

moto.get("/motos", getMotos);

// Ruta POST

moto.post('/motos', upload.single('img_motos'), addMoto);

// Ruta PUT


// Ruta DELETE

moto.delete('/motos/:id_motos', deleteMoto);


module.exports = {
    moto
};
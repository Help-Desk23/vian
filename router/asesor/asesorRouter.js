const express = require('express');
const { getAsesores, addAsesores, loginAsesores } = require('../../controllers/asesor/asesor');


const asesores = express.Router();


// Ruta GET

asesores.get("/asesores", getAsesores);

// Ruta POST

asesores.post("/asesores", addAsesores);

// Ruta POST LOGIN

asesores.post("/login", loginAsesores);


module.exports = {
    asesores
};
const express = require('express');
const { getCosto, addCosto, updateCosto } = require('../../controllers/costovarios/costovarios');


const costo = express.Router();


// Ruta GET

costo.get('/costo', getCosto);

// Ruta POST

costo.post('/costo', addCosto);

// Ruta PUT

costo.put('/costo/:id', updateCosto);



module.exports = {
    costo
}
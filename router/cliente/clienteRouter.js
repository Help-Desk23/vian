const express = require('express');
const { getCliente, addCliente } = require('../../controllers/cliente/cliente');

const client = express.Router();

// Ruta GET

client.get('/cliente', getCliente);

// Ruta POST

client.post('/cliente', addCliente);





module.exports = {
    client
};

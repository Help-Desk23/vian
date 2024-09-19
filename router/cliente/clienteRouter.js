const express = require('express');
const { getCliente, addCliente, getClientes } = require('../../controllers/cliente/cliente');

const client = express.Router();

// Ruta GET

client.get('/cliente', getCliente);

// Ruta POST

client.post('/cliente', addCliente);

// Ruta GET mostrar clientes completos

client.get('/clientes', getClientes)


module.exports = {
    client
};

const express = require("express");
const { getSucursales, addSucursal } = require("../../controllers/sucursales/sucursal");


const sucursal = express.Router();

// Ruta GET

sucursal.get("/sucursal", getSucursales);

// Ruta POST

sucursal.post("/sucursal", addSucursal);


module.exports = { sucursal };
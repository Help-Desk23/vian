const express = require("express");
const { getAdmin, addAdmin } = require("../../controllers/administrador/admin");

const router = express.Router();

// Ruta GET

router.get("/admin", getAdmin);

// Ruta POST

router.post("/admin", addAdmin);


module.exports = {
    router
}
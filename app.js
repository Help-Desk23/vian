const express = require("express");
const { db, sql } = require("./config/db");
const { router } = require("./router/administrador/adminRouter");
const { sucursal } = require("./router/sucursales/sucursalRouter");
const { asesores } = require("./router/asesor/asesorRouter");
const app = express();

app.use(express.json());


//configuración de variable de entorno

require('dotenv').config();


app.get("/", (req, res) => {
    res.end("HOLA MUNDO!");
})

// Administrador

app.use("/", router);

// Sucursales

app.use("/", sucursal);

// Asesores

app.use("/", asesores);


// Manejo de Errores en la conexion a la base de datos

sql.connect(db)
    .then(() => {
        console.log("Conexión a la base de datos exitosa");
    })
    .catch(err => {
        console.error("Error al conectar la base de datos", err);
    });


// Configuracion del puerto

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
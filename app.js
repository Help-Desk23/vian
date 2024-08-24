const express = require("express");
const path = require('path');
const { db, sql } = require("./config/db");
const { router } = require("./router/administrador/adminRouter");
const { sucursal } = require("./router/sucursales/sucursalRouter");
const { asesores } = require("./router/asesor/asesorRouter");
const { moto } = require("./router/motos/motosRouter");
const { costo } = require("./router/costovarios/costoRouter");


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

// Motos

app.use('/', moto);

// Costo

app.use('/', costo);


// Manejo de Errores en la conexion a la base de datos

sql.connect(db)
    .then(() => {
        console.log("Conexión a la base de datos exitosa");
    })
    .catch(err => {
        console.error("Error al conectar la base de datos", err);
    });


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Configuracion del puerto

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
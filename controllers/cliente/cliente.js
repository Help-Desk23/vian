const { db, sql } = require("../../config/db");

// Controlador GET para obtener cliente

const getCliente = async(req, res) => {
    try{
        const pool = await sql.connect(db);
        const result = await pool.request().query('SELECT * FROM cliente');

        if(result.recordset.length === 0){
            return res.status(400).json({ error: 'No se encontro cliente'});
        }
    } catch(err) {
        console.error("Erro al obtener clientes", err);
        res.status(500).json({error: "Error al obtener clientes"});
    }
};

// Controlador POST para agregar cliente

const addCliente = async(req, res) => {
    try{
        const {nombre, telefono, plazo, precious, inicialbs, cuota_mes, id_motos, id_asesores, id_sucursal} = req.body;

        const pool = await sql.connect(db);
        const result = await pool.request()
        .input('nombre', sql.VarChar, nombre)
        .input('telefono', sql.Int, telefono)
        .input('plazo', sql.Int, plazo)
        .input('precious', sql.VarChar, precious)
        .input('inicialbs', sql.VarChar, inicialbs)
        .input('fecha', sql.Date, new Date())
        .input('cuota_mes', sql.Decimal(5,2), cuota_mes)
        .input('id_motos', sql.Int, id_motos)
        .input('id_asesores', sql.Int, id_asesores)
        .input('id_sucursal', sql.Int, id_sucursal)
        .query(` INSERT INTO cliente (nombre, telefono, plazo, precious, inicialbs, fecha, cuota_mes, id_motos, id_asesores, id_sucursal) 
            VALUES (@nombre, @telefono, @plazo, @precious, @inicialbs, @fecha, @cuota_mes, @id_motos, @id_asesores, @id_sucursal)`);

            res.status(201).json({message: 'Cliente agregado correctamente'})
    } catch(err) {
        console.error('Error al agregar cliente', err);
        res.status(500).json({ error: 'Error al agregar cliente'});
    }
};



module.exports = {
    getCliente,
    addCliente
}

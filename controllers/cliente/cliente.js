const { db, sql } = require("../../config/db");

// Controlador GET para obtener cliente

const getCliente = async(req, res) => {

    try{
        const pool = await sql.connect(db);
        const result = await pool.request().query('SELECT * FROM cliente');

        if(result.recordset.length === 0){
            console.log("No se encontró ningún cliente");
            return res.status(400).json({ error: 'No se encontro cliente'});
        } else {
            return res.status(200).json(result.recordset);
        }
    } catch(err){
        console.error("Error al obtener clientes", err);
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


// Controlador GET para mostrar Cliente Completos

const getClientes = async (req, res) => {
    try {
        const pool = await sql.connect(db);
        
        const result = await pool.request()
            .query(`
                SELECT 
                    c.id_cliente,
                    c.nombre AS nombre_cliente,
                    c.telefono,
                    c.plazo,
                    c.precious,
                    c.inicialbs,
                    c.fecha,
                    c.cuota_mes,
                    m.modelo AS modelo,
                    a.nombre AS asesor,
                    s.sucursal AS sucursal,
                    m.img_motos AS img_moto
                FROM 
                    cliente c
                JOIN 
                    motos m ON c.id_motos = m.id_motos
                JOIN 
                    asesores a ON c.id_asesores = a.id_asesores
                JOIN 
                    sucursales s ON c.id_sucursal = s.id_sucursal
            `);

        // Si no se encuentran registros, retornar un error 404
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'No se encontraron registros' });
        }

        // Responder con los datos obtenidos
        res.status(200).json(result.recordset);
        
    } catch (err) {
        console.error('Error al obtener el reporte de cliente:', err);
        res.status(500).json({ error: 'Error al obtener el reporte de cliente' });
    }
};


module.exports = {
    getCliente,
    addCliente,
    getClientes
}

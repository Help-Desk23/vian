const {db, sql} = require('../../config/db');


// Controlador GET para obtener sucursales

const getSucursales = async(req, res) => {
    try{
        const pool = await sql.connect(db);
        const result = await pool.request().query('SELECT * FROM sucursales');

        if(result.recordset.length === 0){
            return res.status(400).json({ error: 'No se encontro ninguna sucursal'});
        }
        
        res.status(200).json(result.recordset);
    } catch(err){
        console.error('Error al obtener sucursales', err);
        res.status(500).json({error: 'Error al obtener sucursales'});
    }
};

// Controlador POST para agregar sucursales

const addSucursal = async(req, res) => {
    const { sucursal } = req.body;

    try{
        const pool = await sql.connect(db);

        const result = await pool.request()
        .input('sucursal', sql.VarChar, sucursal)
        .query('INSERT INTO sucursales (sucursal) VALUES (@sucursal)');

        res.status(201).json({ message: 'Sucursal ingresada correctamente'});
    } catch(err){
        console.error("Error al ingresar una sucursal");
        res.status(500).json({error: "Error al ingresar una sucursal"});
    }
};

module.exports = {
    getSucursales,
    addSucursal
};
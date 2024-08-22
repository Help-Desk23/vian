const {db, sql} = require('../../config/db');


// Controlador GET para obtener administradores

const getAdmin = async (req, res) => {
    try {
        const pool = await sql.connect(db);
        const result = await pool.request().query('SELECT * FROM useradmin');

        if (result.recordset.length === 0) {
            return res.status(400).json({ error: 'No se encontró ningún usuario'});
        }

        res.status(200).json(result.recordset);
    } catch (err) {
        console.error("Error al obtener administradores:", err);
        res.status(500).json({ error: 'Error al obtener administradores' });
    }
};

// Controlador POST para agregar usuario

const addAdmin = async(req, res) => {

    const { nombre, usuario, contraseña } = req.body;

    try{
        const pool = await sql.connect(db);

        const result = await pool.request()
        .input('nombre', sql.VarChar, nombre)
        .input('usuario', sql.VarChar, usuario)
        .input('contraseña', sql.VarChar, contraseña)
        .query('INSERT INTO useradmin (nombre, usuario, contraseña) VALUES (@nombre, @usuario, @contraseña)');

        res.status(201).json({ message: 'Usuario ingresado exitosamente' });

    } catch (err) {
        console.error("Error al ingresar usuario", err);
        res.status(500).json({ error: 'Error al ingresar usuario'});
    }
};

module.exports = { 
    getAdmin,
    addAdmin 
};
const {db, sql} = require('../../config/db');

// Controlador GET para obtener asesores

const getAsesores = async(req, res) => {
    try{
        const pool = await sql.connect(db);
        const result = await pool.request().query('SELECT * FROM asesores');

        if(result.recordset.length === 0){
            return res.status(400).json({error: 'No se encontro ningun asesor'})
        }

        res.status(200).json(result.recordset);
    } catch(err){
        console.error('Error al obtener asesores', err);
        res.status(500).json({error: 'Error al obtener asesores'});
    }
};

// Controlador POST para agregar asesores

const addAsesores = async(req, res) => {
    const { nombre, usuario, contraseña, id_sucursal } = req.body;

    try{
    const pool = await sql.connect(db);

    const result = await pool.request()
    .input('nombre', sql.VarChar, nombre)
    .input('usuario', sql.VarChar, usuario)
    .input('contraseña', sql.VarChar, contraseña)
    .input('id_sucursal', sql.Int, id_sucursal)
    .query('INSERT INTO asesores (nombre, usuario, contraseña, id_sucursal) VALUES (@nombre, @usuario, @contraseña, @id_sucursal)');

    res.status(201).json({ message: 'Asesor ingresado exitosamente'});
    } catch (err){
        console.error("Error al ingresar asesor");
        res.status(500).json({ error: 'Error al ingresar asesor'});
    }
};

// Controlador POST para iniciar sesion

const loginAsesores = async (req, res) => {
    const { usuario, contraseña } = req.body;

    try {
        const pool = await sql.connect(db);

        const userResult = await pool.request()
            .input('usuario', sql.VarChar, usuario)
            .query('SELECT * FROM asesores WHERE usuario = @usuario');

        if (userResult.recordset.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const passwordResult = await pool.request()
            .input('usuario', sql.VarChar, usuario)
            .input('contraseña', sql.VarChar, contraseña)
            .query('SELECT * FROM asesores WHERE usuario = @usuario AND contraseña = @contraseña');

        if (passwordResult.recordset.length > 0) {
            const asesor = passwordResult.recordset[0];
            res.status(200).json({ message: "Inicio exitoso", asesor });
        }

    } catch (err) {
        console.error("Error al iniciar sesión:", err);
        res.status(500).json({ error: 'Error en el servidor al iniciar sesión' });
    }
};

module.exports = {
    getAsesores,
    addAsesores,
    loginAsesores
};
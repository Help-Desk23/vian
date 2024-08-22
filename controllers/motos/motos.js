const {db, sql} = require('../../config/db');
const multer = require('multer');
const path = require('path');


// Configuración de multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Controlador GET para obtener las motos

const getMotos = async(req, res) => {
    try{
        const pool = await sql.connect(db);
        const result = await pool.request().query('SELECT * FROM motos');

        if(result.recordset.length === 0){
            return res.status(400).json({error: 'No se encontro ninguna moto'});
        }
        res.status(200).json(result.recordset);
    } catch (err){
        console.error("Error al obtener motos", err);
        res.status(500).json({error: "Error al obtener motos"});
    }
};

// Controlador POST para agregar motos

const addMoto = async (req, res) => {
    const { modelo, precious, inicialbs } = req.body;
    const img_motos = req.file ? req.file.path : null;

    try {
        const pool = await sql.connect(db);

        const result = await pool.request()
            .input('modelo', sql.VarChar, modelo)
            .input('precious', sql.VarChar, precious)
            .input('inicialbs', sql.VarChar, inicialbs)
            .input('img_motos', sql.VarChar, img_motos)
            .query('INSERT INTO motos (modelo, precious, inicialbs, img_motos) VALUES (@modelo, @precious, @inicialbs, @img_motos)');

        res.status(201).json({ message: "Moto añadida exitosamente" });

    } catch (err) {
        console.error("Error al añadir la moto:", err);
        res.status(500).json({ error: 'Error al añadir la moto' });
    }
};

// Controlador PUT para actualizar datos de la moto


// Controlador DELETE para eliminar moto

const deleteMoto = async (req, res) => {
    const { id_motos } = req.params;

    try {
        const pool = await sql.connect(db);

        const result = await pool.request()
            .input('id_motos', sql.Int, id_motos)
            .query('SELECT * FROM motos WHERE id_motos = @id_motos');

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Moto no encontrada' });
        }

        await pool.request()
            .input('id_motos', sql.Int, id_motos)
            .query('DELETE FROM motos WHERE id_motos = @id_motos');

        res.status(200).json({ message: 'Moto eliminada exitosamente' });

    } catch (err) {
        console.error("Error al eliminar la moto:", err);
        res.status(500).json({ error: 'Error al eliminar la moto' });
    }
};


module.exports = {
    getMotos,
    addMoto,
    deleteMoto,
    upload
};
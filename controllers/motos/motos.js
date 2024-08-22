const {db, sql} = require('../../config/db');

// Contraolador GET para obtener las motos

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


module.exports = {
    getMotos
};
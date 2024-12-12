// api/appointments.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Necesario en Vercel con PostgreSQL
});

module.exports = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET': // Obtener todos los appointments
      try {
        const result = await pool.query('SELECT * FROM appointments');
        res.status(200).json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las citas' });
      }
      break;

    case 'POST': // Insertar una nueva cita
      const { name, description, startdate, enddate } = req.body;

      if (!name || !description || !startdate || !enddate) {
        res.status(400).json({ error: 'Faltan campos requeridos' });
        return;
      }

      try {
        const result = await pool.query(
          'INSERT INTO appointments (name, description, startdate, enddate) VALUES ($1, $2, $3, $4) RETURNING *',
          [name, description, startdate, enddate]
        );
        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al insertar la cita' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

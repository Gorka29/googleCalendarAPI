const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir cualquier origen
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder a preflight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        const result = await pool.query('SELECT * FROM appointments');
        return res.status(200).json(result.rows);
      }

      case 'POST': {
        const { name, description, startdate, enddate } = req.body;

        if (!name || !description || !startdate || !enddate) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await pool.query(
          'INSERT INTO appointments (name, description, startdate, enddate) VALUES ($1, $2, $3, $4) RETURNING *',
          [name, description, startdate, enddate]
        );
        return res.status(201).json(result.rows[0]);
      }

      default: {
        res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
        return res.status(405).end(`Method ${method} Not Allowed`);
      }
    }
  } catch (err) {
    console.error('Error en la API:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

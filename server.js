// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('.'));

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta de pronósticos (ejemplo fijo)
app.get('/api/pronosticos', (req, res) => {
  res.json({
    resultado: `✅ Partidos de hoy:\n- Real Madrid vs Barcelona\n- Liverpool vs Man City\n- PSG vs Bayern\n\n✨ El Mago analiza estos encuentros...`
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor en puerto ${PORT}`);
});
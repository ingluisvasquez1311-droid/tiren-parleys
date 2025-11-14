// server.js — Pronósticos inteligentes con estadísticas reales
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;
const API_KEY = "5d336df03a293338648ef0478999076c"; // ← Reemplaza con tu clave real

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ruta de pronósticos inteligentes
app.post('/api/pronosticos', async (req, res) => {
  try {
    const hoy = new Date().toISOString().split('T')[0];

    // 1. Obtener partidos de hoy
    const partidosRes = await axios.get('https://v3.football.api-sports.io/fixtures', {
      headers: { 'x-rapidapi-key': API_KEY },
      params: { date: hoy, timezone: 'America/Curacao' }
    });

    const partidos = partidosRes.data.response || [];

    if (partidos.length === 0) {
      return res.json({
        resultado: "✅ No hay partidos programados para hoy.\n💡 El Mago regresa mañana."
      });
    }

    // 2. Filtrar ligas top (mayor confiabilidad de pronóstico)
    const ligasTop = [
      'Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 
      'UEFA Champions League', 'Copa Libertadores', '

      // Ruta para “Consejos del Mago”
app.post('/api/pronosticos', async (req, res) => {
  try {
    // ✅ Fecha dinámica de hoy (en formato YYYY-MM-DD)
    const hoy = new Date().toLocaleDateString('en-CA');

    // Llamada a API-Sports
    const partidosRes = await axios.get('https://v3.football.api-sports.io/fixtures', {
      headers: { 'x-rapidapi-key': API_KEY },
      params: { date: hoy, timezone: 'America/Curacao' }
    });

    const partidos = partidosRes.data.response || [];

    if (partidos.length === 0) {
      return res.json({
        resultado: "✅ No hay partidos programados para hoy.\n💡 El Mago regresa mañana."
      });
    }

    // Tomar hasta 3 partidos
    const seleccion = partidos.slice(0, 3);
    const pronosticos = seleccion.map((p, i) => {
      const local = p.teams.home.name;
      const visitante = p.teams.away.name;
      return `✅ Partido ${i + 1}: ${local} vs ${visitante}`;
    }).join('\n');

    res.json({ resultado: pronosticos });

  } catch (error) {
    console.error("Error en pronósticos:", error.message);
    res.status(500).json({ resultado: "⚠️ No se pudieron cargar los partidos de hoy." });
  }
});
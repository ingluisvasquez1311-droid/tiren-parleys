const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const app = express();

const API_KEY = "TU_API_KEY_AQUI";  // <-- PON AQUÍ TU KEY REAL

app.use(express.static("public"));

app.get("/api/partidos-hoy", async (req, res) => {
    try {
        const response = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
            headers: { 
                "x-apisports-key": API_KEY,
                "x-apisports-host": "v3.football.api-sports.io"
            }
        });

        const json = await response.json();
        res.json(json);

    } catch (error) {
        res.status(500).json({ error: "Error consultando la API" });
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const FILE_PATH = "./highscore.json";
const API_KEY = process.env.API_KEY


// Highscore aus datei laden
let highscore = 0;
if (fs.existsSync(FILE_PATH)) {
    const data = fs.readFileSync(FILE_PATH);
    highscore = JSON.parse(data).highscore;
}

// Endpunkt API zum abrufen des Highscores
app.get("/get_highscore", (req, res) => {
    res.json({highscore});
});


// Endpunkt API zum setzten des Highscores
app.post("/set_highscore", (req, res) => {
    const newScore = req.body.score;
    if (newScore > highscore) {
        highscore = newScore;
        fs.writeFileSync(FILE_PATH, JSON.stringify({highscore}));
    }
    res.json({highscore})
});


// Server Starten
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}.`)
})
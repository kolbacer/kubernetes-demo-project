const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server started (http://localhost:3000/) !");
});

// enable CORS
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("/", (req, res) => {
    res.send ("I am running");
});

// mock heroes
let heroes = [
    {id: 1, name: "Thor"},
    {id: 2, name: "Spiderman"},
    {id: 3, name: "Heisenberg"},
    {id: 4, name: "Jessie Pinkman"},
    {id: 5, name: "Samurai Jack"},
]

app.get("/api/heroes", (req, res) => {
    const name = req.query.name

    if (name) {
        let foundHeroes = heroes.filter(hero => hero.name.includes(name))
        res.send(foundHeroes)
    } else {
        res.send(heroes);
    }
});

app.get("/api/heroes/:id", (req, res) => {
    const id = parseInt(req.params.id)
    let hero = heroes.find(hero => hero.id == id)
    if (hero)
        res.send(hero)
    else
        res.sendStatus(404).send('Not found')
});

app.put("/api/heroes", (req, res) => {
    const hero = req.body
    let heroId = hero.id
    let indexToPut = heroes.findIndex(hero => hero.id == heroId)
    heroes[indexToPut] = hero
    res.send(hero);
});

app.post("/api/heroes", (req, res) => {
    const hero = req.body
    heroes.push(hero)
    res.send(hero);
});

app.delete("/api/heroes/:id", (req, res) => {
    const id = parseInt(req.params.id)
    let indexToDelete = heroes.findIndex(hero => hero.id == id)
    if (indexToDelete == -1)
        res.sendStatus(404).send('Not found')
    else {
        heroes.splice(indexToDelete, 1);
        res.send({message: 'hero with id=' + indexToDelete + ' was deleted'})
    }
});
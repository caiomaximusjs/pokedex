const express = require("express");
const path = require("path");
const { ppid } = require("process");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

let pokedex = [
  {
    id: 1,
    nome: "Bulbassaur",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    descricao:
      "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    tipo: "Grass",
    tamanho: "0.7m",
    peso: "6.9kg",
    categoria: "sementes",
  },
  {
    id: 2,
    nome: "Charmander",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    descricao:
      "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail",
    tipo: "Fire",
    tamanho: "0.6m",
    peso: "8.5kg",
    categoria: "Dragão",
  },
  {
    id: 3,
    nome: "Squirtle",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    descricao:
      "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
    tipo: "Water",
    tamanho: "0.5m",
    peso: "9.0kg",
    categoria: "Tartaruga pequena",
  },
  {
    id: 4,
    nome: "Ivysaur",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png",
    descricao:
      "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs",
    tipo: "Grass",
    tamanho: "1m",
    peso: "13.0kg",
    categoria: "Sementes",
  },
  {
    id: 5,
    nome: "Venusaur",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png",
    descricao:
      "Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.",
    tipo: "Grass",
    tamanho: "2m",
    peso: "100.0kg",
    categoria: "Sementes",
  },
  {
    id: 6,
    nome: "Charmeleon",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png",
    descricao:
      "It has a barbaric nature. In battle, it whips its fiery tail around and slashes away with sharp claws.",
    tipo: "Fire",
    tamanho: "1.1m",
    peso: "19.0kg",
    categoria: "Flamejante",
  },
  {
    id: 7,
    nome: "Charizard",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png",
    descricao:
      "t spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames",
    tipo: "Fire",
    tamanho: "1.7m",
    peso: "90.5kg",
    categoria: "Flamejante",
  },
  {
    id: 8,
    nome: "Wartortle",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png",
    descricao:
      "It is recognized as a symbol of longevity. If its shell has algae on it, that Wartortle is very old.",
    tipo: "Water",
    tamanho: "1.0m",
    peso: "22.5kg",
    categoria: "Tartaruga",
  },
  {
    id: 9,
    nome: "Blastoise",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png",
    descricao:
      "It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell.",
    tipo: "Water",
    tamanho: "1.6m",
    peso: "85.5kg",
    categoria: "Marisco",
  },
];

let pokemon = undefined;

app.get("/", function (req, res) {
  const id = req.params.id - 1;
  res.render("index", { pokedex, pokemon, id });
});
app.get("/details/:id", (req, res) => {
  const id = req.params.id - 1;
  res.render("detalhes", { pokedex, id });
});
app.get("/cadastro", (req, res) => {
  res.render("cadastro", { pokemon });
});
app.get("/update/:id", (req, res) => {
  const id = req.params.id - 1;
  res.render("update", { pokedex, id });
});

app.post("/create", (req, res) => {
  const pokemon = req.body;
  pokemon.id = pokedex.length + 1;
  pokedex.push(pokemon);
  res.redirect("/#cards");
});

app.get("/detalhes/:id", (req, res) => {
  const id = +req.params.id;
  pokemon = pokedex.filter(Boolean).find((pokemon) => pokemon.id === id);
  res.redirect("/update/:id");
});

app.post("/update/:id", (req, res) => {
  const id = +req.params.id - 1;
  const newPokemon = req.body;
  newPokemon.id = id + 1;
  pokedex[id] = newPokemon;
  pokemon = undefined;
  res.redirect("/#cards");
});
app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;

  delete pokedex[id];
  res.redirect("/#cards");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);

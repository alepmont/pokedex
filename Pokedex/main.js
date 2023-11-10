const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 1017; i++){
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 1017; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }

    let minPokemonId, maxPokemonId;

    if (botonId === "kanto") {
        minPokemonId = 1;
        maxPokemonId = 151;
    } else if (botonId === "jotho") {
        minPokemonId = 152;
        maxPokemonId = 251;
    } else if (botonId === "hoenn") {
        minPokemonId = 252;
        maxPokemonId = 386;
    } else if (botonId === "sinnoh") {
        minPokemonId = 387;
        maxPokemonId = 493;
    } else if (botonId === "teselia") {
        minPokemonId = 494;
        maxPokemonId = 649;
    } else if (botonId === "kalos") {
        minPokemonId = 650;
        maxPokemonId = 721;
    } else if (botonId === "alola") {
        minPokemonId = 722;
        maxPokemonId = 809;
    } else if (botonId === "galar") {
        minPokemonId = 810;
        maxPokemonId = 905;
    } else if (botonId === "paldea") {
        minPokemonId = 906;
        maxPokemonId = 1017;
    }
    


    for (let i = minPokemonId; i <= maxPokemonId; i++) {
        fetch(`${URL}${i}`)
            .then((response) => response.json())
            .then(data => {
                mostrarPokemon(data);
            });
    }
}))
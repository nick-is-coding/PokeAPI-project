const pokemon = 'https://pokeapi.co/api/v2/pokemon/';
const mainContainer = document.getElementById("main-container");

let pokeStorage = [];
let pokeFavorites = [];
let counter = 0;
let num = 0;

let catchPokemon = () => {
    let counter = 0;
    while(counter < 30) {
        let id = Math.floor(Math.random() * 550) + 1;
        const finalURL = pokemon + id;
        
        fetch(finalURL)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                storePokemon(data);
            });
        counter ++;}
    };

let storePokemon = (data) => {
    let caughtPokemon = {
        pokeName: data.name.toUpperCase(),
        pokeID: data.id,
        imgSrc: data.sprites.other.dream_world.front_default,
        type: data.types[0].type.name,
        hp: data.stats[0].base_stat,
        attackStat: data.stats[1].base_stat
    };
    pokeStorage.push(caughtPokemon);
    generateCard();
};

console.log(pokeStorage);

let generateCard = () => {
        document.getElementById("main-container").insertAdjacentHTML("beforeend",
            `<div class="container">
                <div class="poke-card" id=card>
                    <div class="poke-content">
                        <div class="poke-name">
                            <span>${pokeStorage[num].pokeName}</span>
                        </div>
                        <div class="heart-shape empty"><button><i class="fa-regular fa-heart"></i></button></div>
                        <div class="img-wrapper">
                            <img src=${pokeStorage[num].imgSrc} alt="">
                        </div>
                        <div class="stats">
                            <ul class="stat-list">
                                <li class="stat-type value">
                                    <span>Type</span>
                                    <span class="replace1">${pokeStorage[num].type}</span>
                                </li>
                                <li class="stat-hp value">
                                    <span>HP</span>
                                    <span class="replace2">${pokeStorage[num].hp}</span>
                                </li>
                                <li class="stat-attack value">
                                    <span>Attack</span>
                                    <span class="replace3">${pokeStorage[num].attackStat}</span>
                                </li>
                            </ul> 
                        </div>
                    </div>
                </div>
            </div>`)
    num++;
};

catchPokemon();


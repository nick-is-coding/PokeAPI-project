const pokemon = 'https://pokeapi.co/api/v2/pokemon/';
const mainContainer = document.getElementById("main-container");
const originalContainer = document.getElementById("original-container");
const favoriteContainer = document.getElementById("my-favorites");

let sortToggle = document.getElementById("sort-button");
let favToggle = document.getElementById("sort-fave");
let theSum = document.getElementById("hp-sum");
let theAttack = document.getElementById("attack-sum");

let pokeStorage = [];
let favoriteStorage = [];
let counter = 0;
let num = 0;
let isAscending = true;
let sum = 0;
let attack = 0;

let totalStats = () => {
    theSum.textContent = `${sum}`;
    theAttack.textContent = `${attack}`;
}

let buttonFunctionality = (poke) => {
    const moveButton = document.getElementById(`move-button-${pokeStorage[num].pokeID}`);
    const blockToMove = document.getElementById(`blockToMove-${pokeStorage[num].pokeID}`);
    const addText = 'add to team';
    const removeText = 'remove from team';
    let cardState = 'not-favorite';

    moveButton.addEventListener("click", () => {
        if (cardState === "not-favorite") {
            moveButton.setAttribute("data-state", "favorite");
            moveButton.textContent = removeText;
            favoriteContainer.appendChild(blockToMove);
            cardState = "favorite";
            favoriteStorage.push(poke);
            pokeStorage.splice(pokeStorage.indexOf(poke), 1);
            sum += poke.hp;
            attack += poke.attackStat;
            totalStats();
        } else {
            moveButton.removeAttribute("data-state", "favorite");
            moveButton.textContent = addText;
            originalContainer.appendChild(blockToMove);
            cardState = "not-favorite";
            pokeStorage.push(poke);
            favoriteStorage.splice(favoriteStorage.indexOf(poke), 1);
            sum -= poke.hp;
            attack -= poke.attackStat;
            totalStats();
        }
    });
};

let generateCard = (poke) => {
    document.getElementById("original-container").insertAdjacentHTML("beforeend",
        `<div id="blockToMove-${poke.pokeID}" class="container">
            <div class="poke-card" id=${poke.pokeID}>
                <div class="poke-content">
                    <div class="poke-name">
                        <span id="sort-${poke.pokeName}">${poke.pokeName}</span>
                    </div>
                    <div class="img-wrapper">
                        <img src=${poke.imgSrc} alt="">
                    </div>
                    <div class="stats">
                        <ul class="stat-list">
                            <li class="stat-type value">
                                <span>type</span>
                                <span>${poke.type}</span>
                            </li>
                            <li class="stat-hp value">
                                <span>hp</span>
                                <span>${poke.hp}</span>
                            </li>
                            <li class="stat-attack value">
                                <span>attack</span>
                                <span>${poke.attackStat}</span>
                            </li>
                        </ul> 
                        <div class="heart-shape empty">
                            <button id="move-button-${poke.pokeID}" class="fave-button">add to team</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        );
    buttonFunctionality(poke);
    num++;
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
    generateCard(caughtPokemon);
};

let catchPokemon = () => {
    let counter = 0;
    while(counter < 30) {
        let id = Math.floor(Math.random() * 550) + 1;
        const finalURL = pokemon + id;
        
        fetch(finalURL)
            .then((response) => response.json())
            .then((data) => {
                storePokemon(data);
            });
        counter ++;
    }
};

let runSort = () => {
    num = 0;
        pokeStorage.sort((pokeA, pokeB) => {
            let nameA = pokeA.pokeName.toLowerCase();
            let nameB = pokeB.pokeName.toLowerCase();
            if (isAscending) {
                if (nameA < nameB) {
                    return -1;
                } else if (nameA > nameB) {
                    return 1;
                }
                return 0;
            } else {
                if (nameA > nameB) {
                    return -1;
                } else if (nameA < nameB) {
                    return 1;
                }
                return 0;
            }
        });

        isAscending = !isAscending;

        if(isAscending) {
            sortToggle.innerHTML = "sort a-z";
        } else {
            sortToggle.innerHTML = "sort z-a";
        }

        pokeStorage.forEach((poke, index) => {
            let card = document.getElementById(`blockToMove-${poke.pokeID}`);
            card.getElementsByClassName("poke-name")[0].textContent = poke.pokeName;
            originalContainer.appendChild(card);
        });
};

let sortFaves = () => {
        num = 0;
        favoriteStorage.sort((pokeA, pokeB) => {
            let nameA = pokeA.pokeName.toLowerCase();
            let nameB = pokeB.pokeName.toLowerCase();
            if (isAscending) {
                if (nameA < nameB) {
                    return -1;
                } else if (nameA > nameB) {
                    return 1;
                }
                return 0;
            } else {
                if (nameA > nameB) {
                    return -1;
                } else if (nameA < nameB) {
                    return 1;
                }
                return 0;
            }
        });

        isAscending = !isAscending;

        if(isAscending) {
            favToggle.innerHTML = "sort a-z";
        } else {
            favToggle.innerHTML = "sort z-a";
        }

        favoriteStorage.forEach((poke, index) => {
            let card = document.getElementById(`blockToMove-${poke.pokeID}`);
            card.getElementsByClassName("poke-name")[0].textContent = poke.pokeName;
            favoriteContainer.appendChild(card);
        });
};

catchPokemon();
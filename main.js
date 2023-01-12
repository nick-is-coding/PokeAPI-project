const pokemon = 'https://pokeapi.co/api/v2/pokemon/';
const mainContainer = document.getElementById("main-container");
const originalContainer = document.getElementById("original-container");
let sortToggle = document.getElementById("sort-button");

let pokeStorage = [];
let counter = 0;
let num = 0;
let isAscending = true;

let buttonFunctionality = () => {
    const moveButton = document.getElementById(`move-button-${pokeStorage[num].pokeID}`);
    const container2 = document.getElementById('my-favorites');
    const blockToMove = document.getElementById(`blockToMove-${pokeStorage[num].pokeID}`);
    const addText = 'ADD TO TEAM';
    const removeText = 'REMOVE FROM TEAM';
    let cardState = 'not-favorite';

    moveButton.addEventListener("click", () => {
        if (cardState === "not-favorite") {
            moveButton.setAttribute("data-state", "favorite");
            moveButton.textContent = removeText;
            container2.appendChild(blockToMove);
            cardState = "favorite";
        } else {
            moveButton.removeAttribute("data-state", "favorite");
            moveButton.textContent = addText;
            originalContainer.appendChild(blockToMove);
            cardState = "not-favorite";
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
                                <span>Type</span>
                                <span class="replace1">${poke.type}</span>
                            </li>
                            <li class="stat-hp value">
                                <span>HP</span>
                                <span class="replace2">${poke.hp}</span>
                            </li>
                            <li class="stat-attack value">
                                <span>Attack</span>
                                <span class="replace3">${poke.attackStat}</span>
                            </li>
                        </ul> 
                        <div class="heart-shape empty">
                            <button id="move-button-${poke.pokeID}" class="fave-button">ADD TO TEAM</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        );
    buttonFunctionality();
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
    sortToggle.addEventListener('click', sortCards = () => {
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
            sortToggle.innerHTML = "Sort A-Z";
        } else {
            sortToggle.innerHTML = "Sort Z-A";
        }

        pokeStorage.forEach((poke, index) => {
            let card = document.getElementById(`blockToMove-${poke.pokeID}`);
            card.getElementsByClassName("poke-name")[0].textContent = poke.pokeName;
            originalContainer.appendChild(card);
        });
    });
};


catchPokemon();
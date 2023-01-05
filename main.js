const pokemon = 'https://pokeapi.co/api/v2/pokemon/';
const card = document.getElementById("card");

let getPokemon = () => {
    let id = Math.floor(Math.random() * 150) + 1;

    const finalURL = pokemon + id;

    fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {
            generateCard(data);
    });
};

let generateCard = (data) => {
    console.log(data);
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name.toUpperCase();
    const attackStat = data.stats[1].base_stat;
    const type = data.types[0].type.name;
    
    card.innerHTML = `
            <div class="poke-content">
                <div class="poke-name">
                    <span>${pokeName}</span>
                </div>
                <div class="img-wrapper">
                    <img src=${imgSrc} alt="">
                </div>
                <div class="stats">
                    <ul class="stat-list">
                        <li class="stat-type value">
                            <span>Type</span>
                            <span class="replace1">${type}</span>
                        </li>
                        <li class="stat-hp value">
                            <span>HP</span>
                            <span class="replace2">${hp}</span>
                        </li>
                        <li class="stat-attack value">
                            <span>Attack</span>
                            <span class="replace3">${attackStat}</span>
                        </li>
                    </ul> 
                </div>
            </div>
    `
}

console.log(getPokemon());
// const card = document.getElementById("card");

// let getPokemon = () => {
//     fetch(url)
//     .then((response) => response.json())
//     .then((data) =>  )
// } 


/* PLANNING 

1. GET DATA FROM API
> how do i get data from API? 
> do i need multiple API calls to retrieve multiple types of data? 

2. CREATE A FUNCTION THAT CREATES HTML BASED ON DATA I GET FROM API
> this will need to input data for the following fields 
    -- pokemon name
    -- image
    -- type
    -- hp
    -- attack

3. REPEAT THIS FUNCTION 30 TIMES TO DISPLAY 30 CARDS IN DOM
> create a function that will loop until the 30 card threshold is met
> store this in a collection array (objects within an array)

4. CREATE A FAVORITES COLLECTION
> create a "favorite button" on the card that will push it from the collections array to the 
    favorite's array
> create a click event that if the user unclicks the card, once in the favorites array, it will remove and return it
    to the collections array

5. Build toggle button that will sort the cards alphabetically

6. Display the total sum of some piece of data in the array
    -- maybe total team health points? or attack? 

7. Make responsive









*/ 




// console.log(pokemon);
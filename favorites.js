const modalOpen = '[data-open]';
const modalClose = '[data-close]';
const isVisible = 'is-visible';

const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

for(const elm of openModal) {
    elm.addEventListener('click', function() {
        const modalID = this.dataset.open;
        document.getElementById(modalID).classList.add(isVisible);
    })
};

for(const elm of closeModal) {
    elm.addEventListener('click', function() {
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    })
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
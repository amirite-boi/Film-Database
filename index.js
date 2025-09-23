//API: "https://www.omdbapi.com/?apikey=e4a9d54e&s=fast"

//UNIVERSAL
const searchInput = document.querySelector("#search");
const value = localStorage.getItem("value");
const click = document.querySelector('.search__wrapper')

click.addEventListener('click', function() {
    const enterKeyEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        which: 13,
        keyCode: 13,
        bubbles: true,
        cancelable: true
    });

    document.dispatchEvent(enterKeyEvent);
});

searchInput.addEventListener("input", e => {
    const value = e.target.value;
    console.log(value);

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            getFilms(value);
        }
    }) 
});


//INDEX PAGE

// SEARCH PAGE
const filmsListElement = document.querySelector('.films__row');

async function getFilms(value) {
    const films = await fetch(`https://www.omdbapi.com/?apikey=e4a9d54e&s=${value}`)
    const filmsData = await films.json();

    console.log(filmsData);
    filmsListElement.innerHTML = filmsData.Search.map((film) => filmHTML(film)).join("");
}

getFilms(value);

function filmHTML(film) {
    return `<div class="film__wrapper">
        <figure class="film__poster">
        <a href="https://www.imdb.com/title/${film.imdbID}/" target="_blank">
            <img
            class="film__poster--img"
            src="${film.Poster}"
            alt="${film.Title}"
            />
        </a>
        </figure>
        <div class="film__content">
            <div class="film__content--extra-info">
                <div class="title film__content--title">
                ${film.Title}
                </div>
                <div class="film__info--year">Year: ${film.Year}</div>
            </div>
        </div>
    </div>`;
}
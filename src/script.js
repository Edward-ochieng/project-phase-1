const startMovies = [
    'Chips',
    'Bright',
    'Rush hour',
    'The Nun',
    '6 underground',
    'Army of the dead',
    'Army of thieves',
    'Red notice',
    'John wick',
    'Man from toronto'
];
const startSeries = [
    'Lucifer',
    'Gangs of london',
    'peaky blinders',
    'Money heist',
    'The Flash',
    'Vikings',
    'Arrow',
    'Constantine',
    'Supergirl',
    'Stranger things'
];
const startShows = [
    'Two and a half men',
    'The big bang theory',
    'Friends',
    'The Office',
    'Family guy',
    'How I met your mother',
    'The IT crowd',
    'Bojack Horseman',
    'Brooklyn nine nine',
    'Seinfeld'
];

const startAnimes = [
    'Tokyo ghoul',
    'Rising of the shield hero',
    'Hunter x hunter',
    'Castlevania',
    'Boruto',
    'Naruto',
    'One Piece',
    'My hero academia',
    'Demon slayer',
    'Tokyo revengers'
]

const generateUrl = (name) => {
    return `https://omdbapi.com/?apikey=5a25029d&s=${name}`;
}

const element = (elementId) => {
    return document.getElementById(elementId);
}

const showMovieHandler = async (movieId) => {

    if(!movieId){
        return;
    }

    const loadingContainer = element('loading-container');
    const headerTitle = element('modal-title');
    const image = element('modal-image');
    const titleText = element('modal-title-text');
    const year = element('modal-year');
    const rated = element('modal-rated');
    const genre = element('modal-genre');
    const director = element('modal-director');
    const plot = element('modal-plot');
    const language = element('modal-language');
    const country = element('modal-country');
    const rating = element('modal-rating');

    headerTitle.style.display = 'none';
    image.style.display = 'none';
    titleText.style.display = 'none';
    year.style.display = 'none';
    rated.style.display = 'none';
    genre.style.display = 'none';
    director.style.display = 'none';
    plot.style.display = 'none';
    language.style.display = 'none';
    country.style.display = 'none';
    rating.style.display = 'none';

    loadingContainer.style.display = 'inline-block';

    const response = await fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=5a25029d`);
    const data = await response.json();

    headerTitle.innerHTML = data.Title;
    image.src = data.Poster;
    titleText.innerHTML = `Title: ${data.Title}`;
    year.innerHTML = `Year: ${data.Year}`;
    rated.innerHTML = `Rated: ${data.Rated}`;
    genre.innerHTML = `Genre: ${data.Genre}`;
    director.innerHTML = `Director: ${data.Director}`;
    plot.innerHTML = `Plot: ${data.Plot}`;
    language.innerHTML = `Language: ${data.Language}`;
    country.innerHTML = `Country: ${data.Country}`;
    rating.innerHTML = `Rating: ${data.imdbRating}`;

    loadingContainer.style.display = 'none';

    headerTitle.style.removeProperty('display');
    image.style.removeProperty('display');
    titleText.style.removeProperty('display');
    year.style.removeProperty('display');
    rated.style.removeProperty('display');
    genre.style.removeProperty('display');
    director.style.removeProperty('display');
    plot.style.removeProperty('display');
    language.style.removeProperty('display');
    country.style.removeProperty('display');
    rating.style.removeProperty('display');
}

const searchHandler = async (event) => {
    event.preventDefault();
    const list = element('search-list');
    const input = element('input').value;
    if(input.lenght === 0) {
        return;
    }
    location.href = '#search-container';
    const url = `${generateUrl(input)}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data.Search) {
        input.innerHTML = `<li>We have not found anything</li>`;
        return;
    }
    list.innerHTML = '';
    for (const a of data.Search){
        list.innerHTML += `<li onClick="showMovieHandler('${a.imdbID}')" data-bs-toggle="modal" data-bs-target="#exampleModal">${a.Title}</li>`;
    }
}

const documentPushHandler = async (array, dom, type) => {
    for(const a of array){
        const url = type ? `${generateUrl(a)}&type=${type}` : generateUrl(a); 
        const response = await fetch(url);
        const data = await response.json();
        const result = data.Search[0];
        dom.innerHTML += `<div class="card" style="width: 18rem;"><img src="${result.Poster}" class="card-img-top" alt="${result.Title}"><div class="card-body"><h5 class="card-title">${result.Title}</h5><p class="card-text">Year - ${result.Year}</p><button onClick="showMovieHandler('${result.imdbID}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">See more</button></div></div>`;
    }
}

const initialization = async () => {
    const movies = document.getElementById('movies');
    const series = document.getElementById('series');
    const shows = document.getElementById('shows');
    const animes = document.getElementById('animes');

    documentPushHandler(startMovies, movies);
    documentPushHandler(startSeries, series, 'series');
    documentPushHandler(startShows, shows, 'series');
    documentPushHandler(startAnimes, animes, 'series');

}

const form = element('form');

form.addEventListener('submit', searchHandler);

document.addEventListener('DOMContentLoaded', initialization);



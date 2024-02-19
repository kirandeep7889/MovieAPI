const API_KEY = 'f29a88ce';

export async function fetchBatmanMovies(searchQuery) {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.Search;
}

export async function fetchMovies(searchQuery) {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.Search;
}

export async function fetchMovieDetails(movieId) {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function favMoviesArray() {
    const favoriteMovieIds = getFavoriteMovieIds();
    const movies = [];

    for (const movieId of favoriteMovieIds) {
        const movieDetails = await fetchMovieDetails(movieId);
        movies.push(movieDetails);
    }

    return movies;
}

function getFavoriteMovieIds() {
    const favoriteMovieIds = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    return favoriteMovieIds;
}

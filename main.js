import { fetchMovies } from "./fetchData.js";
import { renderMovieCard, renderFavoriteMovies } from "./renderUI.js";
import { getFavoriteMovies, toggleFavorite } from "./favorites.js";

document.querySelector("img").addEventListener("click", async () => {
    const searchQuery = document.querySelector("input").value;
    const movies = await fetchMovies(searchQuery);
    renderSearchResults(movies);
});

function renderSearchResults(movies) {
    const movieContainer = document.querySelector(".container");
    movieContainer.innerHTML = "";
    for (let movie of movies) {
        const isFavorite = true; 
        renderMovieCard(movie, isFavorite);
    }
}

document.querySelector('.container').addEventListener('click', (event) => {
    if (event.target.classList.contains('favorite-icon')) {
        const movieId = event.target.dataset.movieId;
        toggleFavorite(movieId);
        const favoriteMovies = getFavoriteMovies();
        renderFavoriteMovies(favoriteMovies);
    }
});

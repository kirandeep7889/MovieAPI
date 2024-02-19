// favorites.js

export function getFavoriteMovies() {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    return favorites;
}

export function toggleFavorite(movieId) {
    let favorites = getFavoriteMovies();
    const index = favorites.indexOf(movieId);
    if (index === -1) {
        favorites.push(movieId);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
}

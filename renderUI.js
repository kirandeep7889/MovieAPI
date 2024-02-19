const favoriteMoviesContainer = document.querySelector(".favoriteMoviesContainer");
favoriteMoviesContainer.innerHTML = '';

const title = document.createElement("h2");
title.textContent = "Favorite Movies";
favoriteMoviesContainer.appendChild(title);

const movieDiv = document.createElement("div");
movieDiv.classList.add("fav-Movies-Card");
favoriteMoviesContainer.appendChild(movieDiv);

import { favMoviesArray } from "./fetchData.js";
import { fetchBatmanMovies } from "./fetchData.js";

export function renderFavMovieCard(movie) {
    const { imdbID, Year, Poster, Title, Type } = movie;

    const favMovieCard = document.createElement("div");
    favMovieCard.classList.add("favMovieCard");
    favMovieCard.setAttribute("key", imdbID);

    const paraDiv = document.createElement("div");
    favMovieCard.appendChild(paraDiv);

    const yearParagraph = document.createElement("p");
    yearParagraph.textContent = Year;
    paraDiv.appendChild(yearParagraph);

    const posterDiv = document.createElement("div");
    posterDiv.classList.add("poster-container");
    const posterImg = document.createElement("img");
    posterImg.setAttribute("alt", Title);
    posterImg.setAttribute("src", Poster !== "N/A" ? Poster : "https://via.placeholder.com/400");
    posterDiv.appendChild(posterImg);

    favMovieCard.appendChild(posterDiv);

    const infoDiv = document.createElement("div");
    const typeSpan = document.createElement("span");
    typeSpan.textContent = Type;
    infoDiv.appendChild(typeSpan);

    const titleHeader = document.createElement("h3");
    titleHeader.textContent = Title;
    infoDiv.appendChild(titleHeader);

    favMovieCard.appendChild(infoDiv);

    return favMovieCard;
}

export function renderMovieCard(movie) {
    const { imdbID, Year, Poster, Title, Type } = movie;

    const movieCard = document.createElement("div");
    movieCard.classList.add("movieCard");
    movieCard.setAttribute("key", imdbID);

    const paraDiv = document.createElement("div");
    movieCard.appendChild(paraDiv);

    const yearParagraph = document.createElement("p");
    yearParagraph.textContent = Year;
    paraDiv.appendChild(yearParagraph);

    const posterDiv = document.createElement("div");
    posterDiv.classList.add("poster-container");
    const posterImg = document.createElement("img");
    posterImg.setAttribute("alt", Title);
    posterImg.setAttribute("src", Poster !== "N/A" ? Poster : "https://via.placeholder.com/400");
    posterDiv.appendChild(posterImg);

    const favouriteIcon = document.createElement('i');
    favouriteIcon.classList.add('favorite-icon');
    favouriteIcon.dataset.movieId = imdbID;
    favouriteIcon.textContent = localStorage.getItem(imdbID) === 'true' ? '❤️' : '♡';
    favouriteIcon.style.color = localStorage.getItem(imdbID) === 'true' ? 'red' : '';
    posterDiv.appendChild(favouriteIcon);

    movieCard.appendChild(posterDiv);

    const infoDiv = document.createElement("div");
    const typeSpan = document.createElement("span");
    typeSpan.textContent = Type;
    infoDiv.appendChild(typeSpan);

    const titleHeader = document.createElement("h3");
    titleHeader.textContent = Title;
    infoDiv.appendChild(titleHeader);

    movieCard.appendChild(infoDiv);

    favouriteIcon.addEventListener('click', function () {
        if (favouriteIcon.textContent === '❤️') {
            favouriteIcon.textContent = '♡';
            favouriteIcon.style.color = '';
            localStorage.setItem(imdbID, 'false');
        } else {
            favouriteIcon.textContent = '❤️';
            favouriteIcon.style.color = 'red';
            localStorage.setItem(imdbID, 'true');
        }
    });

    document.querySelector('.container').appendChild(movieCard);
}

export async function renderFavoriteMovies(favoriteMovies) {
    const title = document.querySelector(".favoriteMoviesContainer h2");

    while (favoriteMoviesContainer.lastChild !== title) {
        favoriteMoviesContainer.removeChild(favoriteMoviesContainer.lastChild);
    }

    if (favoriteMovies.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'You have no favorite movies yet.';
        favoriteMoviesContainer.appendChild(message);
    } else {
        for (const movieId of favoriteMovies) {
            const movie = await getMovieDetails(movieId);
            if (movie) {
                const favMovieCard = renderFavMovieCard(movie);
                favoriteMoviesContainer.appendChild(favMovieCard);
            }
        }
    }
}

async function moviesFav() {
    const m = await favMoviesArray();
    return m;
}

async function getMovieDetails(movieId) {
    const movies = await moviesFav();
    const movie = movies.find(movie => movie.imdbID === movieId);
    return movie || null;
}

window.onload = async function () {
    const allMovies = await fetchBatmanMovies("batman");
    const batmanMovies = allMovies.filter(movie => movie.Title.toLowerCase().includes('batman'));

    for (const movie of batmanMovies) {
        if (movie.Title && movie.Year && movie.imdbID && movie.Type && movie.Poster) {
            renderMovieCard(movie);
        } else {
            console.log("Skipping movie due to missing properties:", movie);
        }
    }
    const favoriteMovieIds = Object.keys(localStorage);
    await renderFavoriteMovies(favoriteMovieIds);
}

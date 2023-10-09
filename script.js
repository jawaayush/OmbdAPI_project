const apiKey = '3467e41'; // Replace with your actual API key
const movieList = document.getElementById('movie-list');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// Function to fetch and display movies
async function fetchMovies(query) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Search) {
            movieList.innerHTML = ''; // Clear previous results

            data.Search.forEach(movie => {
                const movieCard = createMovieCard(movie);
                movieList.appendChild(movieCard);
            });
        } else {
            movieList.innerHTML = '<li>No movies found.</li>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to create a movie card element
function createMovieCard(movie) {
    const movieCard = document.createElement('li');
    movieCard.classList.add('movie-card');

    const poster = movie.Poster === 'N/A' ? 'placeholder.jpg' : movie.Poster;

    movieCard.innerHTML = `
        <div class="movie-image">
            <img src="${poster}" alt="${movie.Title}">
        </div>
        <div class="movie-info">
            <h2>${movie.Title}</h2>
            <p>Year: ${movie.Year}</p>
            <p>Rating: ${movie.imdbRating}</p>
        </div>
    `;

    return movieCard;
}

// Handle search button click
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== '') {
        fetchMovies(searchTerm);
    }
});

// Handle Enter key press in the search input field
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.trim();

        if (searchTerm !== '') {
            fetchMovies(searchTerm);
        }
    }
});

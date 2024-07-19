document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://localhost:4000/films'; // URL to fetch movie data

    const filmList = document.getElementById('films');
    const movieDetails = document.getElementById('movie-details');
    const movieTitle = document.getElementById('movie-title');
    const moviePoster = document.getElementById('movie-poster');
    const movieRuntime = document.getElementById('movie-runtime');
    const movieShowtime = document.getElementById('movie-showtime');
    const availableTickets = document.getElementById('available-tickets');
    const buyTicketButton = document.getElementById('buy-ticket');

    async function fetchMovies() {
        try {
            const response = await fetch(url);
            const movies = await response.json();
            displayMovies(movies);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    }

    function displayMovies(movies) {
        movies.forEach(movie => {
            const li = document.createElement('li');
            li.className = 'film item';
            li.innerText = movie.title;
            li.addEventListener('click', () => displayMovieDetails(movie));
            filmList.appendChild(li);
        });
    }

    function displayMovieDetails(movie) {
        movieTitle.innerText = movie.title;
        moviePoster.src = movie.poster;
        movieRuntime.innerText = `Runtime: ${movie.runtime} minutes`;
        movieShowtime.innerText = `Showtime: ${movie.showtime}`;

        const ticketsAvailable = movie.capacity - movie.tickets_sold;
        availableTickets.innerText = `Available Tickets: ${ticketsAvailable}`;

        buyTicketButton.disabled = ticketsAvailable <= 0;
        buyTicketButton.innerText = ticketsAvailable > 0 ? 'Buy Ticket' : 'Sold Out';

        buyTicketButton.onclick = () => {
            if (ticketsAvailable > 0) {
                buyTicket(movie);
            }
        };

        if (ticketsAvailable === 0) {
            filmList.querySelector(`li:contains(${movie.title})`).classList.add('sold-out');
        }
    }

    function buyTicket(movie) {
        movie.tickets_sold++;
        const ticketsAvailable = movie.capacity - movie.tickets_sold;
        availableTickets.innerText = `Available Tickets: ${ticketsAvailable}`;

        if (ticketsAvailable === 0) {
            buyTicketButton.innerText = 'Sold Out';
            buyTicketButton.disabled = true;
            filmList.querySelector(`li:contains(${movie.title})`).classList.add('sold-out');
        }
    }

    // Fetch movies on page load
    fetchMovies();
});


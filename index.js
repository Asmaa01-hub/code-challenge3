document.addEventListener('DOMContentLoaded', () => {
    const films = [
        {
            "id": "1",
            "title": "The Giant Gila Monster",
            "runtime": "108",
            "capacity": 30,
            "showtime": "04:00PM",
            "tickets_sold": 10,
            "description": "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.",
            "poster": "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
        },
        {
            "id": "2",
            "title": "Manos: The Hands Of Fate",
            "runtime": "118",
            "capacity": 50,
            "showtime": "06:45PM",
            "tickets_sold": 14,
            "description": "A family gets lost on the road and stumbles upon a hidden, underground, devil-worshiping cult led by the fearsome Master and his servant Torgo.",
            "poster": "https://www.gstatic.com/tv/thumb/v22vodart/47781/p47781_v_v8_ac.jpg"
        }
    ];

    const filmList = document.getElementById('films');
    const movieDetails = document.getElementById('movie-details');
    const movieTitle = document.getElementById('movie-title');
    const moviePoster = document.getElementById('movie-poster');
    const movieRuntime = document.getElementById('movie-runtime');
    const movieShowtime = document.getElementById('movie-showtime');
    const availableTickets = document.getElementById('available-tickets');
    const buyTicketButton = document.getElementById('buy-ticket');

    films.forEach(movie => {
        const li = document.createElement('li');
        li.className = 'film item';
        li.innerText = movie.title;
        li.addEventListener('click', () => displayMovieDetails(movie));
        filmList.appendChild(li);
    });

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
});
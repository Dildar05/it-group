document.addEventListener('DOMContentLoaded', function () {
	const Links = document.querySelectorAll('.nav__menu-link')

	Links.forEach(link => {
		link.addEventListener('click', function (event) {
			event.preventDefault()

			Links.forEach(link => link.classList.remove('active'))

			this.classList.add('active')
			document.getElementById(target).classList.add('active')
		})
	})
})
document.querySelector('.burger').addEventListener('click', function () {
	this.classList.toggle('active')
	document.querySelector('.header__nav').classList.toggle('open')
})
document.addEventListener('DOMContentLoaded', function () {
	const tabLinks = document.querySelectorAll('.navbar__date-item')
	const tabContents = document.querySelectorAll('.date__content')
	const nextDaySeansButton = document.querySelector('.next-day-seans')

	function activateTab(target) {
		tabLinks.forEach(link => {
			link.classList.remove('active')
			if (link.getAttribute('date-tab') === target) {
				link.classList.add('active')
			}
		})
		tabContents.forEach(content => content.classList.remove('active'))
		document.getElementById(target).classList.add('active')
	}

	tabLinks.forEach(link => {
		link.addEventListener('click', function (event) {
			event.preventDefault()
			const target = this.getAttribute('date-tab')
			activateTab(target)
			this.classList.add('active')
		})
	})

	if (nextDaySeansButton) {
		nextDaySeansButton.addEventListener('click', function (event) {
			event.preventDefault()
			const target = this.getAttribute('date-tab')
			activateTab(target)
			this.classList.add('active')
		})
	}
})
document.addEventListener('DOMContentLoaded', function () {
	fetch('scripts/movies.json')
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok ' + response.statusText)
			}
			return response.json()
		})
		.then(movies => {
			const container = document.getElementById('movie-container')

			movies.forEach(movie => {
				const movieCard = document.createElement('div')
				movieCard.classList.add('movie-card')

				const showtimes = movie.showtimes
					.map(
						(time, index) =>
							`<div class="show">
                        <div class="show-time">${time}</div> 
                        <div class="show-format-coast">
                            <div>${movie.filmFormat[index]}</div>
                            <div>${movie.cost[index]}</div>
                        </div>
                        <div class="show-hall">${movie.hall[index]}</div>                 
                    </div>`
					)
					.join('')

				const genres = movie.genre
					.map(genre => `<div class="genre-block">${genre}</div>`)
					.join('')

				movieCard.innerHTML = `
                    <div class="movie-poster">
                        <img src="${movie.poster}" alt="${movie.title}">
                        ${
													movie.premiere
														? '<div class="label-premiere">Премьера</div>'
														: ''
												}
                    </div>
                    <div class="movie-info">
                        <div class="movie-title">${movie.title}</div>
                        <div class="movie-genre">${genres}</div>
                        <div class="movie-times">
                            ${showtimes}
                        </div>
                    </div>
                    
                `

				container.appendChild(movieCard)
			})
		})
		.catch(error => console.error('Error loading movies:', error))
})

const APIURL = 'https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
const IMAGEURL = 'https://image.tmdb.org/t/p/w500'
const SEARCHURL = 'https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1&include_adult=false&query='

getMovies()

document.getElementById('search').addEventListener("keyup",function(event){
    event.preventDefault();
    if(event.key === 'Enter'){
        getSearchedMovies(document.getElementById('search').value)
    }
})

async function getMovies(){
    let response = await fetch(APIURL)
    const movieData = await response.json();

    movieData.results.forEach((movie) => {
        const main = document.querySelector('main')
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
        <img 
            src=${IMAGEURL + movie.poster_path}
        />
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <span>${movie.vote_average}</span>
        </div>       
        `;

        main.appendChild(movieEl)

    });
}

async function getSearchedMovies(moviename) {
    const response = await fetch(SEARCHURL + moviename)
    const movieData = await response.json()

    const mainContainer = document.getElementById('main')

    if(movieData.errors === undefined){
        mainContainer.innerHTML = ''
       
        movieData.results.forEach((movie) => {
            const main = document.querySelector('main')
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie')
    
            movieEl.innerHTML = `
            <img 
                src=${IMAGEURL + movie.poster_path}
            />
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span>${movie.vote_average}</span>
            </div>       
            `;
    
            main.appendChild(movieEl)
        });
    }else{
        mainContainer.innerHTML = ''
        getMovies()
    }
}
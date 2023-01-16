const baseURL = 'https://api.themoviedb.org/3'

const category = {
    movie: 'movie',
    tv: 'tv',
}
const urls = {
    movies: '/discover/movie',
    movieId: '/movie',
    genres: '/genre/movie/list',
    search: '/search/movie',
    moviesPopular: '/movie/popular',
    moviesTrending: '/trending/all/day',
}

export {
    baseURL,
    urls,
    category,
}

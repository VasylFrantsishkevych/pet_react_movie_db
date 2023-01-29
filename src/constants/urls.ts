const baseURL = 'https://api.themoviedb.org/3'

const category = {
    movie: 'movie',
    tv: 'tv',
}
const movieType = {
    popular: '/popular',
    topRated: '/top_rated',
    upcoming: '/upcoming',
    nowPlaying: '/now_playing',
}

const tvType = {
    popular: '/popular',
    topRated: '/top_rated',
}
const trendingTimeWindow = {
    day: '/day',
    week: '/week'
}
const urls = {
    search: '/search/movie',
}

export {
    baseURL,
    urls,
    category,
    trendingTimeWindow,
    movieType,
    tvType,
}

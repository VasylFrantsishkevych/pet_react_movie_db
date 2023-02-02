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
    onTheAir: '/on_the_air',
}
const trendingTimeWindow = {
    day: '/day',
    week: '/week'
}
const searchUrls = {
    searchMulti: '/search/multi',
}

export {
    baseURL,
    searchUrls,
    category,
    trendingTimeWindow,
    movieType,
    tvType,
}

// axios package
import axios from "axios";

// instance for axios package
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/discover',
    params: {},
})

// here all apis
export const movieApi = (url, params, genreIds, popularity_desc) => instance.get(`${url}?api_key=2dca580c2a14b55200e784d157207b4d&primary_release_year=${params}&sort_by=${popularity_desc}&vote_count.gte=100&with_genres=${genreIds}&include_adult=${false}`).then(res => res).catch(err => err)
export const genreList = () => axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d`).then(res => res).catch(err => err)
export const search = (title) => axios.get(`https://api.themoviedb.org/3/search/movie?query=${title}&api_key=2dca580c2a14b55200e784d157207b4d&include_adult=${false}`).then(res => res).catch(err => err)
export const cast = (movie_id) => axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=2dca580c2a14b55200e784d157207b4d`).then(res => res).catch(err => err)
export const genreForEachMovie = (movie_id) => axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=2dca580c2a14b55200e784d157207b4d`).then(res => res).catch(err => err)

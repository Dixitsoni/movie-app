import React, { useEffect, useRef, useState } from 'react'
import Header from './header/Header'
import MovieSection from './movieSection/MovieSection'
import { genreList, movieApi, search } from '../service/service'

function DefaultLayout() {
    // isSearchOpen is for storing Boolean value  (toggling search input)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    // searchData is for storing the searched movie Data
    const [searchData, setSearchData] = useState([])

    // active is for storing the multiple ids value
    const [active, setActive] = useState([])

    // movieData state is used for storing the movie data intially
    const [movieData, setMovieData] = useState([])

    // movieDataByGenre state is used for storing the movie data which is filtered by genre
    const [movieDataByGenre, setMovieDataByGenre] = useState([])

    // year state is used for storing the year value in Number or string
    const [year, setYear] = useState(2012)

    // genreNameList state is used for storing the genre list which is coming from api
    const [genreNameList, setGenreNameList] = useState([])

    // loading state is used for storing the boolean value for displaying loading untill the data is not displayed
    const [loading, setLoading] = useState(true)

    // eleRef is used to reference the dom element
    const eleRef = useRef(null)

    // This useEffect is to render the 2012 year when first load an when update the year this useEffect run again
    useEffect(() => {
        if (active.length === 0) {
            getMovieList('/movie', year, '', "popularity.desc")
        }
    }, [year])


    /* This useEffect is for scroll event occur then scrollHandler method trigger and update when Dom of lists loaded
        and scroll down */
    useEffect(() => {
        if (active.length > 0) {
            window.removeEventListener("scroll", scrollHandler)
        } else {
            window.addEventListener("scroll", scrollHandler)
        }
    }, [eleRef.current, document.documentElement.scrollTop])

    window.onbeforeunload = function () {
        document.documentElement.scrollTop = 0;
    }
    // This is to render the list of genre (genre ui filter)  
    useEffect(() => {
        genreList().then(res => {
            setGenreNameList(res.data.genres)
        }).catch(err => [
            console.log(err)
        ])
    }, [])


    // This method is for scrolling down then update year by 1 and getting Data of movies of next year   
    function scrollHandler(e) {
        console.log(e)
        const d = new Date();
        let yearData = d.getFullYear();
        if (year >= yearData || year < 2012) {
            return false
        } else {
            if (document.documentElement.scrollTop + window.innerHeight + 1 >= document.documentElement.scrollHeight) {
                setYear(year + 1)
            }
        }
    }


    /* This method is for api call for getting movie data of year wise and add list of year wise data by scrolling
       down  */
    const getMovieList = (url, params, genreIds, popularity_desc, searchGenre) => {
        setLoading(true)
        movieApi(url, params, genreIds, popularity_desc).then(res => {
            if (Boolean(genreIds)) {
                setLoading(false)
                setMovieDataByGenre([{ year: searchGenre, allMovies: res.data.results }])
            } else {
                setLoading(false)
                setMovieDataByGenre([])
                setMovieData([...movieData, ...[{ year: params, allMovies: res.data.results }]])
            }
        }).catch(err => {
            setLoading(false)
            console.log(err)
        })
    }

    // this method is used for filtering the data by clicking on genre
    const clickHandler = (e, id, index) => {
        const getActiveIds = active.length > 0 ? active.map(id => id.id) : []
        if (getActiveIds.includes(id)) {
            let removeId = [...active]
            const remove = removeId.findIndex((id) => id.index === index)
            if (remove < 0) {
                return false
            } else {
                removeId.splice(remove, 1)
                const genreIds = removeId.map(id => id.id)
                const getGenreIds = genreIds.join(',')
                if (getGenreIds.length > 0) {
                    getMovieList('/movie', "", genreIds, "", "Search By Genre : ")
                } else {
                    getMovieList('/movie', year, "", "popularity.desc", "")
                }
                setActive([...removeId])
            }
        } else {
            let ids = [...new Set([...active, { index: index, id: id }])]
            const genreIds = ids.map(id => id.id)
            const getGenreIds = genreIds.join(',')
            getMovieList('/movie', "", getGenreIds, "", "Search By Genre : ")
            setActive([...new Set([...active, { index: index, id: id }])])
        }
    }

    // this method is used for toggling (display and hide) the search input but this is valid for mobile view
    const searchOpenHandler = () => {
        setIsSearchOpen(!isSearchOpen)
        setSearchData('')
    }


    // this method is used for search the movies data and for this search api call
    const searchHandler = (e) => {
        setLoading(true)
        const flag = Boolean(e.target.value)
        if (!flag) {
            setLoading(false)
            setSearchData([])
        } else {
            let allMovieListYearWise = []
            let movielist = {
                allMovies: []
            }
            search(e.target.value).then(res => {
                if (res.data.results.length > 0) {
                    movielist.allMovies = res.data.results
                    allMovieListYearWise.push(movielist)
                    setLoading(false)
                    setSearchData(allMovieListYearWise)
                } else {
                    setLoading(false)
                    setSearchData([{ notFound: "Movies not Found" }])
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    // logic of debouncing when search the movie data
    function debounce(func, timeout = 200) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    const processChange = debounce((e) => searchHandler(e));

    return (
        <div className="App App-header">
            <Header
                genreNameList={genreNameList}
                active={active}
                searchOpenHandler={searchOpenHandler}
                isSearchOpen={isSearchOpen}
                clickHandler={clickHandler}
                searchHandler={processChange}
            />
            <MovieSection
                movieData={movieData}
                eleRef={eleRef}
                searchData={searchData}
                movieDataByGenre={movieDataByGenre}
                loading={loading}
                active={active}
            />
        </div>
    )
}

export default DefaultLayout
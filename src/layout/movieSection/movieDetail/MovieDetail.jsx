import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { cast, genreForEachMovie } from '../../../service/service'
import profilePicture from '../../../assets/man-avatar-icon-flat-illustration-man-avatar-vector-icon-any-web-design_98396-3377.avif'
import moviePicture from '../../../assets/vecteezy_movie-clapper-on-wooden-background_4340262.jpg'

function MovieDetail() {
    const [movieDetail, setMovieDetail] = useState([])
    const [directorDetail, setDirectorDetail] = useState([])
    const [genreData, setGenreData] = useState({ title: '', genres: [], overview: '' })
    const { id } = useParams()


    useEffect(() => {
        cast(id).then(res => {
            setMovieDetail(res.data.cast.slice(0, 5))
            const getDirectorInfo = res.data.crew.find(name => name.department === "Directing")
            setDirectorDetail(getDirectorInfo)
        }).catch(err => {
            console.log(err)
        })
        genreForEachMovie(id).then(res => {
            setGenreData(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [id])

    return (
        <div>
            <div className='movie-detail_heading'>
                <h2 className='movie_fix_heading color'>MOVI<span style={{ color: '#f88383' }}>E FIX</span></h2>
                <h1 className='color' style={{ marginBottom: 10, marginLeft: 10 }}>Title : {genreData?.title}</h1>
            </div>
            <div className='movie_detail_container'>
                <div className='movie-detail'>
                    {genreData?.poster_path ? <img width={'100%'} height={300} src={`https://image.tmdb.org/t/p/w500/${genreData?.poster_path}`} alt='movieimage' /> : <img width={'100%'} height={300} src={moviePicture} alt='movieimage' />}
                </div>
                <div className='color movie_info'>
                    <p><span className='genre'>Genre :</span> {genreData?.genres?.map((genre, index) => {
                        return <span key={index} className='genre_value'> {genre.name} , </span>
                    })}</p>

                    <div style={{ marginTop: 20 }}>
                        <p className='genre'>cast : </p>
                        <div className='genre_cast_container cast_sliced_data'>
                            {movieDetail.map((genre, index) => {
                                return (
                                    <div key={index} className='cast_data_container'>
                                        <div className='cast_images'>
                                            {genre?.profile_path ? <img src={`https://image.tmdb.org/t/p/w500/${genre?.profile_path}`} alt="profile" /> : <img src={profilePicture} alt='movieimage' />}
                                        </div>
                                        <p className="genre_each">{genre?.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div style={{ marginTop: 20, }}>
                        <p className='genre'>Director :</p>
                        <div className='director_container'>
                            <div>
                                <div className='cast_images'>
                                    {directorDetail?.profile_path ? <img src={`https://image.tmdb.org/t/p/w500/${directorDetail?.profile_path}`} alt="profile" /> : <img src={profilePicture} alt="profile" />}
                                </div>
                                <p className='director_name'>{directorDetail?.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className='short_description_container'>
                <span className='genre short_description'>Short Description :</span>
                <p className='overview_short_description genre_value'> {genreData?.overview}</p>
            </p>
        </div>
    )
}

export default MovieDetail
import React from 'react'
import { useNavigate } from 'react-router-dom';

function CustomCard({ movie, index, year }) {

    const navigate = useNavigate()
    const currentYear = new Date(Date.now()).getFullYear()

    return (
        <div key={index} className='card_container'>
            <h4 className='year'>{year}  {movie.year}</h4>
            <div className='card'>
                {
                    movie.allMovies?.map((movieData, index) => {
                        return (
                            <div className='inner_car_width_height' key={index + 1} onClick={() => navigate(`movie-detail/${movieData.id}`)}>
                                <div>
                                    <div>
                                        <img className='image_first' style={{ borderRadius: 5 }} src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} alt='movie' />
                                    </div>
                                    <div className='title_container' style={{ width: 100 }}>
                                        <p className='title_movie'>{movieData.title?.toUpperCase()}</p>
                                        <p className='rating'><span className="fa fa-star checked"></span>{movieData.vote_average}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            {
                currentYear === movie.year && <div style={{ textAlign: 'center', paddingBottom: 20 }}><h3>Movies are Coming Soon.....</h3></div>
            }
        </div>

    )
}

export default CustomCard   
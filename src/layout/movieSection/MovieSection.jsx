import React from 'react'
import CustomCard from '../../components/CustomCard/CustomCard'

function MovieSection({ searchData, eleRef, movieData, movieDataByGenre, loading, active }) {
    return (
        <>
            {
                !searchData[0]?.notFound ? searchData.length === 0 ?
                    <div ref={eleRef} id='ref_ele'>
                        <div className=''>
                            {
                                movieDataByGenre.length === 0 ? movieData.map((singlemovie, index) => {
                                    return <CustomCard year={'Year : '} index={index} active={active} movie={singlemovie} />
                                }) : movieDataByGenre?.map((singlemovie, index) => {
                                    return <CustomCard year={''} index={index} active={active} movie={singlemovie} />
                                })

                            }
                        </div>
                    </div>
                    :
                    <div>
                        <h5 className='year'>{'Search Results'}</h5>
                        <div className=''>
                            {
                                searchData.map((singlemovie, index) => {
                                    return <CustomCard year={''} index={index} movie={singlemovie} />
                                })

                            }
                        </div>
                    </div> :
                    <div>
                        <h4 className='year'>{'Search Results :-'}</h4>
                        <p className='not_found'>{searchData[0].notFound} !</p>
                    </div>
            }

            {
                loading && <div className='loading'>
                    <p>Loading......</p>
                </div>
            }
        </>
    )
}

export default MovieSection
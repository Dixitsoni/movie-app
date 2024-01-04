import React from 'react'
import CustomTab from '../../components/CustomTab/CustomTab'
import CustomInput from '../../components/CustomInput/CustomInput'

function Header({ searchOpenHandler, searchHandler, isSearchOpen, clickHandler, active, genreNameList }) {
    return (
        <div>
            <div className='d-flex'>
                <div className='header_container'>
                    <h2 className='movie_fix_heading'>MOVI<span style={{ color: '#f88383' }}>E FIX</span></h2>
                    <span title='click to open the search input' className='search_icon' onClick={searchOpenHandler}>&#128269;</span>
                </div>
                <div className='input_search'>
                    <CustomInput
                        type={'search'}
                        placeholder={"Search By Title name"}
                        onChange={searchHandler}
                    />
                </div>
                {isSearchOpen && <div className='search_open'>
                    <CustomInput
                        type={'search'}
                        placeholder={"Search By Title name"}
                        onChange={searchHandler}
                        style={{ padding: 10, width: '100%', borderRadius: 10, border: 'none' }}
                    />
                </div>}
            </div>
            <div style={{ marginTop: '20px', marginLeft: '5px' }}>
                <h5 className='genre_filter'>Genre Movies</h5>
            </div>

            <div className='tab_container margin_top'>
                {
                    genreNameList.map((genreData, index) => {
                        return (
                            <CustomTab
                                index={index}
                                genre={genreData}
                                onClick={clickHandler}
                                genreKey={active}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Header
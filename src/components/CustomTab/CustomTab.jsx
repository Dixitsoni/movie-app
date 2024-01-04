import React from 'react'

function CustomTab({ index, genre, onClick, genreKey }) {
    const genre_ids = genreKey.map(id => id.id)
    return (
        <div key={index} className={genre_ids.includes(genre.id) ? "genre_key" : "genre_key_style"}
            onClick={(e) => onClick(e, genre.id, index)}
        >
            <p className='genre_name'>{genre.name}</p>
        </div >
    )
}

export default CustomTab
import React, { useState } from 'react';
import SearchForm from './SearchForm';
import Video from './Video';
import axios from 'axios';

const SearchResultList = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');
    const [alert, setAlert] = useState('');

    const searchSubmit = (title) => {   
        // TODO pass URL down in props?
        axios.get(`http://localhost:3000/videos?query=${title}`)
            .then((response) => {
                if (response.data.length > 0) {
                    setSearchResults(response.data);
                } else {
                    setSearchResults(['none'])
                }
                setError('');
            })
            .catch((error) => {
                setError(error.message);
                setSearchResults([]);
            });
    };

    const addFilm = (newFilm) => {
        // TODO pass base URL down in props
        axios.post(`http://localhost:3000/videos`, newFilm)
            .then((response) => {
                // TODO - display a message to let user know
                // film successfully added?
                setAlert(`You have added ${newFilm.title} to your library`);
                setError('');
            })
            .catch((error) => {
                // TODO - display error message?
                console.log(error.response)
                setError(error.response.data.errors);
                setAlert('');
            });
    };

    const buildResults = searchResults.map((video) => {
        return (
            <Video
                key={video.external_id}
                title={video.title}
                imageUrl={video.image_url}
                overview={video.overview}
                releaseDate={video.release_date}
                externalId={video.external_id}
                buttonClass="add-film"
                buttonText="ADD"
                addFilmCallback={addFilm}
            />
        )
    })

    return (
        <div>
            <SearchForm onSubmitCallback={searchSubmit} />
            {/* TODO - style errors and alerts to be more obvious */}
            <div>{ error ? error : '' }</div>
            <div>{ alert ? alert : '' }</div>
            <h3>Search Results</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th className="tableHeader">TITLE</th>
                        <th className="tableHeader">ADD TO LIBRARY</th>
                        <th className="tableHeader">OVERVIEW</th>
                    </tr>
                </thead>
                <tbody>
                    { searchResults[0] === 'none' ? <tr><td>sorry, film not found</td></tr> : buildResults }
                </tbody>
            </table>
        </div>
    )
}

export default SearchResultList;
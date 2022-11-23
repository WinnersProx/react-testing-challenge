import React, { useState } from 'react'
import './App.css'
import 'h8k-components'

import { Movieform, Movieslist, Search } from './components'

const title = 'Favorite Movie Directory'

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleMovieSubmission = (movie) => {
    const newMovies = [ ...movies, movie ];

    setMovies(newMovies);
    setFilteredMovies(newMovies);
  }

  const onSearch = (value) => {
    if(value.length == 0) setFilteredMovies([...movies]);

    if(value.length >= 2) {
      const filteredData = movies.filter(m => (
        new RegExp(value, 'i').test(m.name)
      ));
  
      setFilteredMovies(filteredData);
    }
  }

  return (
    <div>
      <h8k-navbar header={ title } />
      <div className='layout-row justify-content-center mt-100'>
        <div className='w-30 mr-75'>
          <Movieform onMovieSubmitted={handleMovieSubmission} />
        </div>
        <div className='layout-column w-30'>
          <Search onSearch={onSearch} />
          <Movieslist movies={filteredMovies} /> 
          {!!(!filteredMovies.length && movies.length) && <div data-testid='noResult'>
            <h3 className='text-center'>No Results Found</h3>
          </div>}
        </div>
      </div> 
    </div>
  )
}

export default App;

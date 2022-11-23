import React from 'react'

function Search({ onSearch }) {

  const handleFormSearch = (e) => {

    onSearch(e.target.value);
  }

  return (
    <section className='layout-row justify-content-center mb-40'>
      <input 
        type='text'
        placeholder='Search for movie by name' 
        className='w-75 py-2'
        data-testid='search'
        onChange={handleFormSearch}
      />
    </section>
  )
}

export default Search

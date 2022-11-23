import React, { useEffect, useState } from 'react'

const DURATION_REGEX = /^[0-9]{1,}[\.\d]+[m|h]{1}$/;

const formatDuration = (duration) => {
  if(duration.includes('m')) {
    return (parseFloat(duration) / 60).toFixed(2);
  }

  return duration;
}

function Movieform({ onMovieSubmitted }) {
  const [ name, setName ] = useState();
  const [ rating, setRating ] = useState();
  const [ duration, setDuration ] = useState();
  const [ hasFormatError, setHasFormatError] = useState(false);

  useEffect(() => {
    if(hasFormatError) setHasFormatError(false);

  }, [name, rating, duration]);

  const handleFormSubmission = () => {
    const hasError = !DURATION_REGEX.test(duration);

    if(hasError) return setHasFormatError(true);

    if(!name.trim() || !duration.trim() || !rating) return;
    
    onMovieSubmitted({ 
      name,
      rating,
      duration: formatDuration(duration)
    });
  }

  return (
    <section>
      <div className='card pa-30'>
        <form onSubmit={ e => e.preventDefault() }>
          <div className='layout-column mb-15'>
            <label htmlFor='name' className='mb-3'>Movie Name</label>
            <input 
              type='text' 
              id='name'
              placeholder='Enter Movie Name'
              data-testid='nameInput'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='layout-column mb-15'>
            <label htmlFor='ratings' className='mb-3'>Ratings</label>
            <input 
              type='number' 
              id='ratings'
              placeholder='Enter Rating on a scale of 1 to 100'
              data-testid='ratingsInput'
              onChange={(e) => setRating(+e.target.value)}
            />
          </div>
          <div className='layout-column mb-30'>
            <label htmlFor='duration' className='mb-3'>Duration</label>
            <input 
              type='text' 
              id='duration'
              placeholder='Enter duration in hours or minutes'
              data-testid='durationInput'
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          {hasFormatError && (<div 
            className='alert error mb-30'
            data-testid='alert'
          >
            Please specify time in hours or minutes (e.g. 2.5h or 150m)
          </div>)}
          <div className='layout-row justify-content-end'>
            <button 
              type='submit'
              className='mx-0'
              data-testid='addButton'
              onClick={handleFormSubmission}
            >
              Add Movie
            </button>
          </div>
          </form>
      </div> 
    </section>
  )
}

export default Movieform

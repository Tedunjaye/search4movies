import './App.css'
import { useEffect, useState } from 'react'
import SearchIcon from './search.svg'
import MovieCard from '../components/MovieCard'



const API_URL = 'https://www.omdbapi.com?apikey=d4344854'


function App() {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  
  useEffect(() => {
    searchMovies('all', 1)
  }, [searchValue])
  
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    
    if (data.Response === "True") {
      setMovies(data.Search)
      setTotalPages(Math.ceil(data.totalResults / 10))
    } else {
      setMovies([])
      setTotalPages(1)
    }
      
  }

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber)
    searchMovies(searchValue, pageNumber)
  }

  const pageNumbers = []
  for (let i = 1; i <= totalPages - 803; i++) {
    pageNumbers.push(i)
  }
  

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <div className='search'>
        <input
          type='text'
          placeholder='Search for movies'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt='search'
          onClick={() => searchMovies(searchValue, 1)}
        />
      </div>

      {movies?.length > 0 ? (
            <>
              <div className='container'>
                {movies.map((movie) => (
                (
                  <MovieCard key={movie.imdbID} movie={movie} />
                )
                ))}
              </div>
              <div className='pagination'>
                  {pageNumbers.map((pageNumber) => (
                    <button 
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={pageNumber === page ? 'active' : ''}
                    >
                      {pageNumber}
                    </button>
                  ))}
              </div>
            </>
          ) : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
      }
    </div>
  )
}

export default App

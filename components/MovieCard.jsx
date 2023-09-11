import PropTypes from 'prop-types';

const MovieCard = (props) => {
  return (
    <div className='movie' >
      <div>
        <p>{props.movie.Year}</p>
      </div>

      <div>
        <img src={props.movie.Poster !== 'N/A' ? props.movie.Poster : 'https://via.placeholder.com/400'} alt={props.movie.Title} />
      </div>

      <div>
        <span>{props.movie.Type}</span>
        <h3>{props.movie.Title}</h3>
      </div>
    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired
  }).isRequired
}

export default MovieCard;

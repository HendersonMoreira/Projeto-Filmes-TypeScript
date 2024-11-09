import { Movie } from "@/types/movie";
import StarRating from "../StarRating";
import './index.scss';
import { Link } from 'react-router-dom';

export interface Props {
    movie: Movie;
}

export default function MovieCard(props: Props) {
    const movie = props.movie;

    const formattedDate = new Date(movie.release_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return (
        <li className='movie-card'>
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="movie-infos">
                <p className="movie-title">
                    {movie.title}
                </p>
                {movie.vote_average > 0 && 
                <StarRating
                    rating={movie.vote_average}
                />
                }
                 
                <div className="hidden-content">
                    {movie.overview &&
                        <p className='descrition'>
                            {movie.overview.length > 100
                                ? `${movie.overview.substring(0, 100)}...`
                                : movie.overview
                            }
                        </p>
                    }
                    <div>
                        <p>
                            {formattedDate}
                        </p>
                    </div>
                    <Link to={`/movie/${movie.id}`} className="btn-default">
                        Ver Mais
                    </Link>
                </div>
            </div>
        </li>
    );
}

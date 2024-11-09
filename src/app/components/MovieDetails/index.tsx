import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Movie } from "@/types/movie";
import Navbar from '../Navbar'; // Importar o Navbar
import '../MovieDetails/index.scss';

export default function MovieDetails() {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {
                        api_key: '83764158abee749bb576cae6afbbdb94',
                        language: 'pt-BR'
                    }
                });
                setMovie(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes do filme:", error);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie) {
        return <div>Carregando...</div>;
    }

    const handleSearch = (query: string) => {
        console.log("Search query:", query);
    };

    const handleSelectCategory = (category: string) => {
        console.log("Selected category:", category);
    };

    return (
        <div className="movie-details-container">
            <Navbar onSearch={handleSearch} onSelectCategory={handleSelectCategory} /> {/* Adicionar o Navbar */}
            <div className="movie-details">
                <div className="movie-info">
                    <h1>{movie.title}</h1>
                    <div className="movie-details-header">
                        <p>Data de lançamento: {new Date(movie.release_date).toLocaleDateString('pt-BR')}</p>
                        <p>Avaliação: {movie.vote_average}</p>
                    </div>
                    <p className="movie-overview">{movie.overview}</p>
                </div>
                <div className="movie-image">
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
                </div>
            </div>
        </div>
    );
}

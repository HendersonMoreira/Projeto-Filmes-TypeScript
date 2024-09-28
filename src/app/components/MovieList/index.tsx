'use client';

import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import MovieCard from '../MovieCard';
import { Movie } from '@/types/movie';
import ReactLoading from 'react-loading';
import ReactPaginate from 'react-paginate';

export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);

    useEffect(() => {
        getMovies(currentPage + 1);
    }, [currentPage]);

    const getMovies = async (page: number) => {
        setIsLoading(true);
        try {
            const response = await axios({
                method: 'get',
                url: 'https://api.themoviedb.org/3/discover/movie',
                params: {
                    api_key: '83764158abee749bb576cae6afbbdb94',
                    language: 'pt-BR',
                    page: page
                }
            });
            setMovies(response.data.results);
            setPageCount(response.data.total_pages);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        }
        setIsLoading(false);
    }

    const handlePageClick = (data: { selected: number }) => {
        setCurrentPage(data.selected);
    };

    if (isLoading) {
        return (
            <div className='loading-container'>
                <ReactLoading type='balls' color='red' height={'4%'} width={'5%'}/>
            </div>
        );
    }

    return (
        <div>
            <ul className="movie-list">
                {movies.map((movie) =>
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                )}
            </ul>
            <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
                forcePage={currentPage}
            />
        </div>
    );
}

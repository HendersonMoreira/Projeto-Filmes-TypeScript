'use client';

import { useEffect, useState, useCallback } from 'react';
import './index.scss';
import axios from 'axios';
import MovieCard from '../MovieCard';
import { Movie } from '@/types/movie';
import ReactLoading from 'react-loading';
import ReactPaginate from 'react-paginate';
import Navbar from '../Navbar';

const categoriesMap: { [key: string]: string } = {
  'Ação': '28',
  'Mistério': '9648',
  'Comédia': '35',
  'Drama': '18',
  'Ficção Científica': '878'
};

interface APIParams {
  api_key: string;
  language: string;
  page: number;
  query?: string;
  with_genres?: string;
}

export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getMovies(currentPage + 1);
        }, 300); // Adiciona um debounce de 300ms

        return () => clearTimeout(delayDebounceFn);
    }, [currentPage, searchQuery, selectedCategory]);

    const getMovies = async (page: number) => {
        setIsLoading(true);
        try {
            const params: APIParams = {
                api_key: '83764158abee749bb576cae6afbbdb94',
                language: 'pt-BR',
                page: page,
            };

            if (searchQuery) {
                params.query = searchQuery;
            }

            if (selectedCategory) {
                params.with_genres = categoriesMap[selectedCategory];
            }

            const response = await axios({
                method: 'get',
                url: searchQuery
                  ? 'https://api.themoviedb.org/3/search/movie'
                  : 'https://api.themoviedb.org/3/discover/movie',
                params: params
            });

            setMovies(response.data.results);
            setPageCount(response.data.total_pages);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        }
        setIsLoading(false);
    };

    const handlePageClick = (data: { selected: number }) => {
        setCurrentPage(data.selected);
    };

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        setSelectedCategory('');  // Reset the category filter on search
        setCurrentPage(0); // Reset page to 0 on search
    }, []);

    const handleSelectCategory = useCallback((category: string) => {
        setSelectedCategory(category);
        setSearchQuery('');  // Reset the search query on category selection
        setCurrentPage(0); // Reset page to 0 on category change
    }, []);

    if (isLoading) {
        return (
            <div className='loading-container'>
                <ReactLoading type='balls' color='red' height={'4%'} width={'5%'}/>
            </div>
        );
    }

    return (
        <div>
            <Navbar onSearch={handleSearch} onSelectCategory={handleSelectCategory} />
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

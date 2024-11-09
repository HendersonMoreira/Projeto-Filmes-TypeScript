'use client';

import React, { useState } from 'react';
import './index.scss';

const categories = ['Início', 'Ação', 'Mistério', 'Comédia', 'Drama', 'Ficção Científica'];

export default function Navbar({ onSearch, onSelectCategory }: { onSearch: (query: string) => void, onSelectCategory: (category: string) => void }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleCategoryClick = (category: string) => {
        onSelectCategory(category);
        setIsOpen(false); // Fecha a barra lateral ao selecionar uma categoria
    };

    return (
        <>
            <nav className="navbar">
                <h1 className="page-title">Filmes e Animes</h1>
                <div className="navbar-search">
                    <input
                        type="text"
                        placeholder="Pesquisar..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Pesquisar</button>
                </div>
                <button className="menu-button" onClick={toggleSidebar}>
                    ☰
                </button>
            </nav>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <ul>
                    {categories.map(category => (
                        <li
                            key={category}
                            className="category-item"
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
            {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
        </>
    );
}

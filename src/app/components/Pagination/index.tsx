import React from "react";
import ReactPaginate from "react-paginate";
import './index.scss';

interface PaginationProps {
    pageCount: number;
    onPageChange: (selectedItem: { selected: number }) => void;
    currentPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange, currentPage }) => {
    return (
        <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={onPageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
            forcePage={currentPage} // Força a atualização da página atual
        />
    );
};

"use client";
import React, { useState } from 'react';
import { books } from '../data/booksData'; // Import the books data

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const BookList = () => {
  const itemsPerPage = 6; // Number of books per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the books to display on the current page
  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Calculate the total number of pages
  const totalPages = Math.ceil(books.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Good Reads</h1>
      <div className="row">
        {currentBooks.map((book, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              {/* Book Image */}
              <img
                src={book.imageUrl}
                alt={book.title}
                className="card-img-top"
                style={{ height: '300px', objectFit: 'cover' }} // Set image size and style
              />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                  <strong>Author:</strong> {book.author}
                </p>
                <p className="card-text">
                  <strong>Year:</strong> {book.year}
                </p>
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous"
            >
              &laquo;
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next"
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BookList;

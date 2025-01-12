"use client";

import React, { useState } from "react";
import { books } from "../data/booksData";
import "bootstrap/dist/css/bootstrap.min.css";
import { Book } from "@/interfaces/book";

const BookList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  // Modal controls
  const openModal = (book: Book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Good Reads</h1>
      <div className="row">
        {currentBooks.map((book, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="card-img-top"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                  <strong>Author:</strong> {book.author}
                </p>
                <p className="card-text">
                  <strong>Year:</strong> {book.year}
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => openModal(book)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
              onClick={() => handlePageChange(page)}
            >
              <button className="page-link">{page}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Modal */}
      {showModal && selectedBook && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedBook.title}</h5>
                <button
                  type="button"
                  
                  className="close ms-auto"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Author:</strong> {selectedBook.author}
                </p>
                <p>
                  <strong>Year:</strong> {selectedBook.year}
                </p>
                <p>
                  <strong>Description:</strong> {selectedBook.description || "No description available."}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;

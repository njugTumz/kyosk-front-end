import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { books } from '@/data/booksData';


const page = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Book List</h1>
      <div className="row">
        {books.map((book, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text"><strong>Author:</strong> {book.author}</p>
                <p className="card-text"><strong>Year:</strong> {book.year}</p>
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;

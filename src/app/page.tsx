import React from 'react';;
import { books } from '../data/booksData'; // Import the books data

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Good Reads</h1>
      <div className="row">
        {books.map((book, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              {/* Book Image */}
              <img
                src={book.imageUrl}
                alt={book.title}
                className="card-img-top"
                style={{ height: '300px', objectFit: 'cover' }}  // Set image size and style
              />
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

export default Home;

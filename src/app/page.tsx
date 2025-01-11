import React from 'react';
import BookItem from '../components/BookItem';
import { Book } from '@/interfaces/book';

const books: Book[] = [
  { title: '1984', author: 'George Orwell', year: 1949 },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
];

const Home = () => {
  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book, index) => (
          <BookItem key={index} book={book} />
        ))}
      </ul>
    </div>
  );
};

export default Home;

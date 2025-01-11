import { Book } from "@/interfaces/book";

  
const BookItem = ({ book }: { book: Book }) => {
    return (
        <li>
        <strong>{book.title}</strong> by {book.author} ({book.year})
        </li>
    );
};

export default BookItem;
  
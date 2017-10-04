import React from 'react';
import PropTypes from 'proptypes';
import Loading from './loading';
import Book from './book';

const renderBooks = (books, updateBook) => {
  if (books.length) {
    return (
      <ol className="books-grid">
        {
          books.map(book => (
            <Book
              key={book.id}
              data={book}
              updateBook={updateBook}
            />
          ))
        }
      </ol>
    )
  }

  return (
    <div>
      <h2>No books on the shelf</h2>
    </div>
  )
}

const BooksShelf = ({ title, books, loadingBooks, updateBook }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      {
        loadingBooks ?
        <Loading />
        : renderBooks(books, updateBook)
      }
    </div>
  </div>
);

BooksShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  loadingBooks: PropTypes.bool,
  updateBook: PropTypes.func.isRequired,
};

export default BooksShelf;

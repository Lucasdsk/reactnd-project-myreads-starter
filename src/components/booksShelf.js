import React from 'react'
import PropTypes from 'proptypes'
import Loading from './loading'
import Book from './book'

const BooksShelf = ({ title, books, loadingBooks }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      {
        loadingBooks ?
        <Loading />
        : (
          <ol className="books-grid">
            {
              books.map(book => (
                <Book key={book.id} data={book}/>
              ))
            }
          </ol>
        )
      }
    </div>
  </div>
)

BooksShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  loadingBooks: PropTypes.bool,
}

export default BooksShelf
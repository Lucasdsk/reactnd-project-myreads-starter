import React, { Component } from 'react'
import * as BooksAPI from './../../BooksAPI'
import { Link } from 'react-router-dom'
import BooksShelf from './../../components/booksShelf'

class Home extends Component {

  state = {
    shelfCurrentlyReading: [],
    shelfWantToRead: [],
    shelfRead: [],
    loadingBooks: true,
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll()
    console.log('allBooks', books)
    this.setState({
      loadingBooks: false,
      shelfCurrentlyReading: this.filterBooksByShelf(books, 'currentlyReading'),
      shelfWantToRead: this.filterBooksByShelf(books, 'wantToRead'),
      shelfRead: this.filterBooksByShelf(books, 'read'),
    })
  }

  filterBooksByShelf = (books = [], shelf = '') => {
    return books.filter(book => book.shelf === shelf)
  }

  render() {
    const {
      shelfCurrentlyReading,
      shelfWantToRead,
      shelfRead,
      loadingBooks,
    } = this.state
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BooksShelf
              title="Currently Reading"
              loadingBooks={loadingBooks}
              books={shelfCurrentlyReading}
            />
            <BooksShelf
              title="Want to Read"
              loadingBooks={loadingBooks}
              books={shelfWantToRead}
            />
            <BooksShelf
              title="Read"
              loadingBooks={loadingBooks}
              books={shelfRead}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            Add a book
          </Link>
        </div>
      </div>
    )
  }
}

export default Home

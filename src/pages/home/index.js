import React, { Component } from 'react';
import * as BooksAPI from './../../BooksAPI';
import { Link } from 'react-router-dom';
import BooksShelf from './../../components/booksShelf';

class Home extends Component {

  state = {
    shelfs: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    books: [],
    loadingBooks: true
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({
      loadingBooks: false,
      books,
      shelfs: {
        currentlyReading: this.filterBooksByShelf(books, 'currentlyReading'),
        wantToRead: this.filterBooksByShelf(books, 'wantToRead'),
        read: this.filterBooksByShelf(books, 'read')
      }
    });
  }

  filterBooksByShelf = (books = [], shelf = '') => {
    return books.filter(book => book.shelf === shelf);
  }

  updateBookShelf = async (book, shelf) => {
    this.setState({
      loadingBooks: true
    });

    const shelfsUpdated = await BooksAPI.update(book, shelf);

    Object.keys(shelfsUpdated).forEach(shelf => {
      this.setState(prevState => ({
        loadingBooks: false,
        shelfs: {
          ...prevState.shelfs,
          [shelf]: prevState.books.filter(book => shelfsUpdated[shelf].includes(book.id))
        }
      }));
    });
  }

  render() {
    const {
      shelfs: {
        currentlyReading,
        wantToRead,
        read
      },
      books,
      loadingBooks
    } = this.state;

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
              books={currentlyReading}
              updateBook={this.updateBookShelf}
            />
            <BooksShelf
              title="Want to Read"
              loadingBooks={loadingBooks}
              books={wantToRead}
              updateBook={this.updateBookShelf}
            />
            <BooksShelf
              title="Read"
              loadingBooks={loadingBooks}
              books={read}
              updateBook={this.updateBookShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to={{
            pathname: '/search',
            state: { books }
          }}>
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;

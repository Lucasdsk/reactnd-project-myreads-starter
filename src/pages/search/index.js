import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './../../BooksAPI';
import BooksShelf from './../../components/booksShelf';
import Loading from './../../components/loading'

/**
 * Função de debouce para não fazer muitas requisições para a API
 * Fonte: http://loopinfinito.com.br/2013/09/24/throttle-e-debounce-patterns-em-javascript/
 */
const debounce = (function () {
  const timeWindow = 500;
  let timeout;

  const implementation = function (callback, options) {
    callback(options);
  };

  return function(callback, options) {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function(){
      implementation.apply(context, args);
    }, timeWindow);
  };
}());

class Search extends Component {

  state = {
    loadingBooks: false,
    books: [],
    searchTerm: ''
  }

  searchBooks = (event) => {
    const {value} = event.target;

    this.setState({
      loadingBooks: true,
      searchTerm: value
    }, () => {
      debounce(async () => {
        const books = await BooksAPI.search(value);
        if (books) {
          this.setState({
            loadingBooks: false,
            books
          });
        } else {
          this.setState({
            loadingBooks: false,
            books: []
          });
        }
      });
    });
  }

  renderBooks = () => {
    const { books, loadingBooks } = this.state;

    if (!!books.length) {
      return (
        <BooksShelf
          title="Books found"
          loadingBooks={loadingBooks}
          books={books}
        />
      );
    } else if (!loadingBooks) {
      return (
        <h2>No book found! Search by title or author</h2>
      );
    } else {
      return <Loading />;
    }
  }

  render() {
    const {
      searchTerm
    } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchTerm}
              onChange={(event) => this.searchBooks(event)}
            />
          </div>
        </div>
        <div className="search-books-results">
          { this.renderBooks() }
        </div>
      </div>
    );
  }
}

export default Search;

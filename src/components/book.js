import React from 'react';
import PropTypes from 'proptypes';
import DropDown from './dropDown';

const Book = ({ data, updateBook }) => {
  const {
    title,
    authors,
    imageLinks: {
      thumbnail,
    },
    shelf,
  } = data

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ backgroundImage: `url(${thumbnail})` }}></div>
        <DropDown
          book={data}
          selectedShelf={shelf}
          onChange={updateBook}
        />
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors && authors.join(',')}</div>
    </div>
  )
};

Book.propTypes = {
  data: PropTypes.object.isRequired,
  updateBook: PropTypes.func.isRequired,
};

export default Book;

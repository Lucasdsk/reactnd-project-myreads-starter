import React from 'react'
import PropTypes from 'proptypes'

const Book = ({ data }) => {
  const {
    title,
    authors,
    imageLinks: {
      thumbnail,
    }
  } = data

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ backgroundImage: `url(${thumbnail})` }}></div>
        <div className="book-shelf-changer">
          <select>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors && authors.join(',')}</div>
    </div>
  )
}

Book.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Book

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const shelfs = [
  'currentlyReading',
  'wantToRead',
  'read',
  'none',
];

class DropDown extends Component {

  state = {
    opened: false
  }

  toggleOptions = () => {
    this.setState(prevState => ({
      opened: !prevState.opened,
    }));
  }

  changeShelf = (shelf) => {
    const { book } = this.props
    this.setState(prevState => ({
      opened: !prevState.opened,
    }), () => this.props.onChange(book, shelf));
  }

  render() {
    const {
      opened
    } = this.state;

    const {
      selectedShelf
    } = this.props;

    return (
      <div className="book-shelf-container">
        <div className={`book-shelf-bg ${opened ? 'opened' : ''}`} onClick={this.toggleOptions} />
        <div className="book-shelf-changer" onClick={this.toggleOptions} />
        <div className={`book-shelf-changer-options ${opened ? 'opened' : ''}`}>
          {
            shelfs.map(shelf => (
              <div
                key={shelf}
                className={`book-shelf-changer-item ${selectedShelf === shelf ? 'selectedOption' : ''}`}
                onClick={() => this.changeShelf(shelf)}
              >
                {shelf}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

DropDown.defaultProps = {
  selectedShelf: 'none'
};

DropDown.propTypes = {
  book: PropTypes.object.isRequired,
  selectedShelf: PropTypes.string,
  onChange: PropTypes.func
};

export default DropDown;

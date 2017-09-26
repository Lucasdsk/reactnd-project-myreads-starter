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
    opened: false,
    selectedShelf: 'none',
  }

  toggleOptions = () => {
    this.setState(prevState => ({
      opened: !prevState.opened,
    }));
  }

  changeShelf = (shelf) => {
    this.setState(prevState => ({
      selectedShelf: shelf,
      opened: !prevState.opened,
    }));
  }

  render() {
    return (
      <div className="book-shelf-container">
        <div className={`book-shelf-bg ${this.state.opened ? 'opened' : ''}`} onClick={this.toggleOptions} />
        <div className="book-shelf-changer" onClick={this.toggleOptions} />
        <div className={`book-shelf-changer-options ${this.state.opened ? 'opened' : ''}`}>
          {
            shelfs.map(shelf => (
              <div
                key={shelf}
                className={`book-shelf-changer-item ${this.state.selectedShelf === shelf ? 'selectedOption' : ''}`}
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

DropDown.propTypes = {
  selectedShelf: PropTypes.string,
}

export default DropDown;

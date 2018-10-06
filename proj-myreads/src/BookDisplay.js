import React, { Component } from 'react';
import CurrentlyReadingShelf from './CurrentlyReading'
import WantToReadShelf from './WantToRead'
import ReadShelf from './Read'

class BookDisplayShelves extends Component {
  render() {
    return (
      <CurrentlyReadingShelf />
      <WantToReadShelf />
      <ReadShelf />
    )
  }
}

export default BookDisplayShelves

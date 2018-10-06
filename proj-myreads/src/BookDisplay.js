import React from 'react';
import Shelf from './Shelf'

class BookDisplayShelves extends React.Component {
  state = {}

  render() {
    return (
      <div>
        <Shelf id="currentlyReading" name="Currently Reading" />
        <Shelf id="wantToRead" name="Want to Read" />
        <Shelf id="read" name="Read" />
      </div>
    )
  }
}

export default BookDisplayShelves

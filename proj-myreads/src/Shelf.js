import React from 'react';
import Book from './SingleBook'

class Shelf extends React.Component {
  state = {}

  render() {
    const { books, type } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{type}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter(book => book.currentShelf === `${type}`).map(book => (
              <Book book={book}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf

import React, { Component } from 'react';
import Book from './SingleBook'

class Shelf extends React.Component {
  render() {
    var books = this.prop.books

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.prop.type}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter(book => book.currentShelf = `${this.prop.type}`).map(book => (
              <Book books={book}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf

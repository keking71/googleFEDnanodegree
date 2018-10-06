import React from 'react';
import Book from './SingleBook'
import * as BooksAPI from './BooksAPI'

class Shelf extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books});
    })
  }

  // changeShelf = (book) => {
  //  this.setState({book.currentShelf: event.target.option})
//  }

  render() {
    const { id, name } = this.props;
    const { books } = this.state;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter(book => book.shelf === `${id}`).map(book => (
              <Book book={book} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf

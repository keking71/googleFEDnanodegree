import React from 'react';
import { Route } from 'react-router-dom' //import Route component to handle UI display
import Search from './Search' //import Search component
import BookList from './BookList' //import BookList component
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books});
    })
  }

  changeShelf = (book, shelf) => {
      BooksAPI.update(book, shelf)
          .then(resp => {
            book.shelf = shelf;
            this.setState(state => ({
                book: state.books.filter(b => b.id !== book.id).concat([book])
            }))
          })
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
          <Route exact path="/" render={()=><BookList books={books} updateShelf={this.changeShelf} />} /> {/* when on '/', display the BookList comp */}
          <Route path="/search" render={()=><Search books={books} updateShelf={this.changeShelf} />} /> {/*when on '/search', display the Search comp */}
      </div>
    )
  }
}

export default BooksApp

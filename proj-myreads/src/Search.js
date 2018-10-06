import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './SingleBook'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Search extends Component {
  state = {
    query: '',
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books});
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  render() {
    let showingBooks = []

    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showingBooks = this.state.books.filter((book) => (match.test(book.title) || match.test(book.authors)))
    } else {
      showingBooks = this.state.books
    }

    showingBooks.sort(sortBy('title'))


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.query}
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map(book => (
              <Book book={book} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search

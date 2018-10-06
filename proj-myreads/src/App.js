import React from 'react';
import { Route } from 'react-router-dom' //import Route component to handle UI display
import Search from './Search' //import Search component
import BookList from './BookList' //import BookList component
import './App.css'

class BooksApp extends React.Component {
  state = {
  }

  render() {
    return (
      <div className="app">
          <Route exact path="/" component={BookList}/> {/* when on '/', display the BookList comp */}
          <Route path="/search" component={Search}/> {/*when on '/search', display the Search comp */}
      </div>
    )
  }
}

export default BooksApp

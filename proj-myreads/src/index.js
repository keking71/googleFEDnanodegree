import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>, //wrap the app in the Browser Router to listen to the URL
  document.getElementById('root')
  )

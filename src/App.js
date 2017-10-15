import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Search from './pages/search';

const BooksApp = () => (
  <div className="app">
    <Route exact path="/" component={Home} />
    <Route path="/search" component={Search} />
  </div>
);

export default BooksApp;

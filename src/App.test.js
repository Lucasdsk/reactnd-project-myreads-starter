import React from 'react';
import ReactDOM from 'react-dom';
import './setupTests.js';
import App from './App';

it('renders without crashing', () => {
  expect(shallow(<App />));
});

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BooksList from './components/BooksList';
import BookDetails from './components/BookDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/book-details/:isbn" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

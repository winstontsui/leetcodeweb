import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page from './components/Page';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/1" element={<Page pageNumber={1} />} />
        <Route path="/2" element={<Page pageNumber={2} />} />
        <Route path="/3" element={<Page pageNumber={3} />} />
        <Route path="/4" element={<Page pageNumber={4} />} />
        <Route path="/5" element={<Page pageNumber={5} />} />
      </Routes>
    </Router>
  );
};

export default App;

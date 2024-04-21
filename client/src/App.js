import React from 'react';
import Create from './pages/Create';
import Home from './pages/Home';
import UserArticles from './pages/UserArticles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BasicExample from './pages/Navi';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<Create />} />
          <Route path="/" element={<Home />} />
          <Route path="/myArticles" element={<UserArticles />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

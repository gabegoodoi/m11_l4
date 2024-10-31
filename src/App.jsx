import React from 'react';
import BrowseCharacters from './components/BrowseCharacters.jsx';
import CharacterDetail from './components/CharacterDetail';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Comics from './components/Comics';
import { NavLink, Routes, Route }  from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div>
      <h1>Marvel React Project</h1>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/characters">Characters</NavLink>
        <NavLink to="/comics">Comics</NavLink>
      </nav>
      <Routes>
        <Route path="/characters" element={<BrowseCharacters />} />
        <Route path='/' element={<Home />} />
        <Route path='/comics' element={<Comics />} />
        <Route path='/*' element={<NotFound />} />
        <Route path='/character/:id' element={<CharacterDetail />} />
      </Routes>
    </div>
  );
}

export default App;

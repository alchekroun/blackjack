import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BlackJackPage from './pages/BlackJackPage';
import PracticePage from './pages/PracticePage';
import Header from './components/Header';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path='/' element={<BlackJackPage />} />
          <Route exact path='/practice' element={<PracticePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

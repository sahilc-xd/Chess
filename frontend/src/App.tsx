import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from './screens/Landing';
import { Game } from './screens/Game';

function App() {

  return (
    <>
      <BrowserRouter  >
      <Routes>
          <Route path="/" element={<Landing />}></Route> 
          <Route path="/game" element={<Game />}></Route> 
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

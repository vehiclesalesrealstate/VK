import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Succursal from './pages/Succursal';
import './App.css';
import Footer from './components/Footer';
import Upload from './Templates/Upload';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/VK" exact element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/succursal" element={<Succursal />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

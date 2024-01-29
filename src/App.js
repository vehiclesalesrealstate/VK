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
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AuthProvider } from './routes/AuthContext';
import Buy from './Templates/Buy';
import SignUpAdmin from './pages/SignUpAdmin';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/succursal" element={<Succursal />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/buy" element={<Buy />} />
          <Route path='/SignUpAdmin' element={<SignUpAdmin />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>

  );
}

export default App;

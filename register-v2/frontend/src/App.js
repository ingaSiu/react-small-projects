import { BrowserRouter, Route, Routes } from 'react-router-dom';

// pages & components
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;


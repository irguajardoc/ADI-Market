import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Marketplace from '../pages/Marketplace';
import Login from '../pages/Login';
import Register from '../pages/Register';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
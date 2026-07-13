import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Marketplace from '../pages/Marketplace';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreatePost from "../pages/Createpost";
import Detail from "../pages/Detail";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/crear-publicacion" element={<CreatePost />}/>
        <Route path="/publicacion/:id" element={<Detail />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
import { Routes, Route } from 'react-router-dom';
import Sample from './pages/Sample';
import Login from './pages/Login';
import Callback from './pages/Callback';
import MyProfile from './pages/MyProfile';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Sample />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/callback" element={<Callback />}></Route>
      <Route path="/myProfile" element={<MyProfile />}></Route>
    </Routes>
  );
};

export default Router;

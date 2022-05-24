import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Callback() {
  const hash = new URL(window.location.href).hash.split('&')[0];
  const token = hash.split('=')[1];
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.setItem('token', token);
    navigate('/');
    return () => {
      console.clear();
    };
  }, [token, navigate]);

  navigate('/');
  console.log(token);
  return <div>로그인중~~~~~!!! {token} </div>;
}

export default Callback;

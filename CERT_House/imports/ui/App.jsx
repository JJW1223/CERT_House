import React, { useState } from 'react';
import { Test } from './Test.jsx';
import { Login } from './Login.jsx';
import { Signup } from './Signup.jsx';

export const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const goToLogin = () => {
    setCurrentPage('login'); // 로그인 페이지로 전환
  };

  const goToSignup = () => {
    setCurrentPage('signup'); // 회원가입 페이지로 전환
  };

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      {currentPage === 'home' && <Test goToLogin={goToLogin} goToSignup={goToSignup} />}
      {currentPage === 'login' && <Login />}
      {currentPage === 'signup' && <Signup />}
    </div>
  );
};

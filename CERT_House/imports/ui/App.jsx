import React, { useState } from 'react';
import { Test } from './Test.jsx';
import { Login } from './Login.jsx';
import { Signup } from './Signup.jsx';
import { Notice } from './Notice';
import { NoticeForm } from './NoticeForm';

export const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const goToLogin = () => {
    setCurrentPage('login'); // 로그인 페이지로 전환
  };

  const goToSignup = () => {
    setCurrentPage('signup'); // 회원가입 페이지로 전환
  };

  const goToNotice = () => {
    setCurrentPage('Notice');
  };

  const goToWrite = () => {
    setCurrentPage('Write');
  };  

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      {currentPage === 'home' && <Test goToLogin={goToLogin} goToSignup={goToSignup} />}
      {currentPage === 'login' && <Login />}
      {currentPage === 'signup' && <Signup />}
      {currentPage === 'Notice' && <Notice />}
      {currentPage === 'Write' && <NoticeForm />}
    </div>
  );
};

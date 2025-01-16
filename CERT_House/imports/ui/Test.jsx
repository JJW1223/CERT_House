import React, { useState } from 'react';

export const Test = ({ goToLogin, goToSignup }) => {

    const [message, setMessage] = useState('');

    const handleCheckAuth = () => {
        const token = localStorage.getItem('token');
        Meteor.call('protected.route', token, (err, response) => {
          if (err) {
            setMessage(err.reason || '인증 실패');
          } else {
            setMessage(response);
          }
        });
      };

  return (
    <div>
        <h1>토큰 인증 테스트</h1>
        <button onClick={handleCheckAuth}>인증 확인 good</button>
        {message && <p>{message}</p>}

      <p>Test</p>
      <button onClick={goToLogin}>로그인</button>
      <button onClick={goToSignup}>회원가입</button>
    </div>
  );
};

import React from 'react';

export const Test = ({ goToLogin, goToSignup }) => {
  return (
    <div>
      <p>Test</p>
      <button onClick={goToLogin}>로그인</button>
      <button onClick={goToSignup}>회원가입</button>
    </div>
  );
};

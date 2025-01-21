import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.call('users.login', username, password, (err, result) => {
      if (err) {
        // 로그인 에러 처리
        setMessage(err.reason || '로그인 실패');
      } else {
        const { token } = result;
        localStorage.setItem('token', token); // JWT 로컬에 저장
        setMessage(result.message);
      }
    });
  };

  return (
    <div className="login-container"> {/* 로그인 UI를 감싸는 div 추가 */}
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;

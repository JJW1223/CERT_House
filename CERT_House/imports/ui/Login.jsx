import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // react-router-dom v5
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.call('users.login', username, password, (err, result) => {
      if (err) {
        setMessage(err.reason || '로그인 실패');
      } else {
        const { token } = result;
        localStorage.setItem('token', token); 
        onLogin(username); 
        setMessage(result.message);
        history.push('/'); // 로그인 시 메인 페이지로 이동
      }
    });
  };

  return (
    <div className="login-container">
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

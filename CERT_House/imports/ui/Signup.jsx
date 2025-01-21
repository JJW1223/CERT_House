import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import './Signup.css'; // CSS 파일 임포트

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 회원가입 메서드 호출
    Meteor.call('users.signup', username, password, (error, response) => {
      if (error) {
        setMessage(error.reason); // 에러 메시지 표시
      } else {
        setMessage(response); // 성공 메시지 표시
      }
    });
  };

  return (
    <div className="signup-container"> {/* 로그인 UI를 감싸는 div 추가 */}
      <h2>회원가입</h2>
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
        <button type="submit">회원가입</button>
      </form>
      {message && <p>{message}</p>} {/* 서버에서 반환된 메시지 표시 */}
    </div>
  );
};

export default Signup;

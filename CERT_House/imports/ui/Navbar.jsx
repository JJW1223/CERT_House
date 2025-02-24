import React from 'react';
import { Link, useHistory } from 'react-router-dom'; // useHistory 추가
import './Navbar.css'; // CSS 파일 import
import { Meteor } from 'meteor/meteor'; // Meteor import

const Navbar = ({ user, onLogout }) => {
  const history = useHistory(); // useHistory 훅 사용

  const handleLogout = () => {
    Meteor.call('users.logout', (err) => {
      if (err) {
        console.error('Logout failed:', err); // 로그아웃 실패 시 에러 로그
      } else {
        onLogout(); // 사용자 상태 초기화
        localStorage.removeItem('token'); // token 삭제
        history.push('/'); // 메인 페이지로 리디렉션
      }
    });
  };

  return (
    <nav>
      <Link to="/" className="cert">CERT</Link>
      <ul>
        <li className="notices"><Link to="/communities">Community</Link></li>
        <li className="notices"><Link to="/notices">Notices</Link></li>
        <li className="login-signup">
          {user ? (
            <>
              <span className="username">user: {user.username}</span>
              <button className="logout-button" onClick={handleLogout}>Logout</button> {/* 로그아웃 처리 */}
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Signup</Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Notice from './Notice'; // Notice 컴포넌트
import Navbar from './Navbar'; // Navbar 컴포넌트 import

export const App = () => {
  const [user, setUser] = useState(null); // 사용자 상태 관리

  const handleLogin = (username) => {
    setUser({ username }); // 사용자 상태 업데이트
  };

  

  const handleLogout = () => {
    localStorage.removeItem('token'); // JWT 삭제
    setUser(null); // 사용자 상태 초기화
  };

  return (
    <Router>
      <div>
        {/* 네비게이션 바 */}
        <Navbar user={user} onLogout={handleLogout} /> {/* Navbar에 사용자 정보와 로그아웃 함수 전달 */}

        {/* 라우팅 설정 */}
        <Switch>
          <Route 
            path="/login" 
            render={(props) => <Login {...props} onLogin={handleLogin} />} 
          />
          <Route path="/signup" component={Signup} />
          <Route path="/notices" component={Notice} />
          <Route path="/" exact>
            <Main />
          </Route> 
        </Switch>
      </div>
    </Router>
  );
};

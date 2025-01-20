// imports/ui/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Main.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Notice from './Notice'; // Notice 컴포넌트
import Navbar from './Navbar'; // Navbar 컴포넌트 import

export const App = () => {
  return (
    <Router>
      <div>
        {/* 네비게이션 바 */}
        <Navbar /> {/* Navbar 컴포넌트 사용 */}

        {/* 라우팅 설정 */}
        <Switch>
          <Route path="/login" component={Login} />
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

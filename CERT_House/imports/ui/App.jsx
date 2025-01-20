// imports/ui/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Test from './Test.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Notice from './Notice'; // Notice 컴포넌트
import NoticeForm from './NoticeForm'; // NoticeForm 컴포넌트

export const App = () => {
  return (
    <Router>
      <div>
        

        {/* 네비게이션 바 */}
        <nav>
          <ul>
            <li><Link to="/">CERT</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/notices">Notices</Link></li>
            
          </ul>
          
        </nav>

        {/* 라우팅 설정 */}
        <Switch>
          
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/notices" component={Notice} />
          <Route path="/" exact>
            <Test />
          </Route> 
          
        </Switch>

        
      </div>
    </Router>
  );
};

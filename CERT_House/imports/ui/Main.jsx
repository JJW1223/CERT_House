import React from 'react';
import './Main.css'; 


const Main = () => {
  return (
    <div className="main-container">
      {/* 동아리 소개 */}
      <section className="club-introduction">
      <img src='/Logo_only.png' alt="Club Logo" className="club-logo" />
      <div className="cert-title">
          <div className="cert-row">
            <h1 className="cert-letter-title">C</h1>
            <h1 className="cert-letter-title">E</h1>
            <h1 className="cert-letter-title">R</h1>
            <h1 className="cert-letter-title">T</h1>
          </div>
          <div className = "cert-row-0">
          <div className="cert-row-1">
            <h1 className="cert-letter-1">o</h1>
            <h1 className="cert-letter-1">m</h1>
            <h1 className="cert-letter-1">p</h1>
            <h1 className="cert-letter-1">u</h1>
            <h1 className="cert-letter-1">t</h1>
            <h1 className="cert-letter-1">e</h1>
            <h1 className="cert-letter-1">r</h1>
          </div>
          <div className="cert-row-2">
            <h1 className="cert-letter-2">m</h1>
            <h1 className="cert-letter-2">e</h1>
            <h1 className="cert-letter-2">r</h1>
            <h1 className="cert-letter-2">g</h1>
            <h1 className="cert-letter-2">e</h1>
            <h1 className="cert-letter-2">n</h1>
            <h1 className="cert-letter-2">c</h1>
            <h1 className="cert-letter-2">y</h1>
          </div>
          <div className="cert-row-3">
            <h1 className="cert-letter-3">e</h1>
            <h1 className="cert-letter-3">s</h1>
            <h1 className="cert-letter-3">p</h1>
            <h1 className="cert-letter-3">o</h1>
            <h1 className="cert-letter-3">n</h1>
            <h1 className="cert-letter-3">s</h1>
            <h1 className="cert-letter-3">e</h1>
          </div>
          <div className="cert-row-4">
            <h1 className="cert-letter-4">e</h1>
            <h1 className="cert-letter-4">a</h1>
            <h1 className="cert-letter-4">m</h1>
          </div>
          </div>
          
        </div>
        <div className="introduction-text">
        <h1>About Our Club</h1>
        <p>
          We are a club in the Department of Computer Science at Chungbuk National University, focusing on information security activities. We collaborate to conduct studies and projects.
        </p>
        </div>
      </section>

      {/* 멤버 프로필 */}
      <section className="member-profiles">
        <h2>Member Profiles</h2>
        <div className="profiles">
          {[          { name: '조진우', role: '회장', introduction: '열심히 하겠습니다!', img: 'path/to/profile1.jpg' }, 
                      { name: '엄지현', role: '부장', introduction: '안녕하세요', img: 'path/to/profile2.jpg' },           
                      { name: '김채은', role: '부장', introduction: '안녕하세요', img: 'path/to/profile3.jpg' },            
                      { name: '김민서', role: '회원', introduction: '안녕하세요', img: 'path/to/profile4.jpg' },            
                      { name: '임수현', role: '회원', introduction: '안녕하세요', img: 'path/to/profile5.jpg' },            
                      { name: '전상민', role: '회원', introduction: '안녕하세요', img: 'path/to/profile6.jpg' },          ].map((member, index) => (
            <div className="profile" key={index}>
              <img src='/mascot.png' alt={`${member.name}'s profile`} className="profile-img" />
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="introduction">{member.introduction}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 동아리 수상 정보 */}
      <section className="awards">
        <h2>Awards</h2>
        <ul>
          <li>2023 - Best Project Award</li>
          <li>2022 - Innovation Challenge Winner</li>
          <li>2021 - Excellence in Research</li>
        </ul>
      </section>
    </div>
  );
};

export default Main;

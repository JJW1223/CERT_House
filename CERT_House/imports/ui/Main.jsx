import React from 'react';
import './Main.css'; // CSS 파일 import

const Main = () => {
  return (
    <div className="main-container">
      {/* 동아리 소개 */}
      <section className="club-introduction">
        <h1>About Our Club</h1>
        <img src="path/to/logo.png" alt="Club Logo" className="club-logo" />
        <p>
          We are a club in the Department of Computer Science at Chungbuk National University, focusing on information security activities. We collaborate to conduct studies and projects.
        </p>
      </section>

      {/* 멤버 프로필 */}
      <section className="member-profiles">
        <h2>Member Profiles</h2>
        <div className="profiles">
          {[          { name: '조진우', role: '회장', introduction: '열심히 하겠습니다!', img: 'path/to/profile1.jpg' }, 
                      { name: '엄지현', role: '부장', introduction: '미정', img: 'path/to/profile2.jpg' },           
                      { name: '김채은', role: '부장', introduction: '', img: 'path/to/profile3.jpg' },            
                      { name: '김민서', role: '회원', introduction: '', img: 'path/to/profile4.jpg' },            
                      { name: '임수현', role: '회원', introduction: '', img: 'path/to/profile5.jpg' },            
                      { name: '전상민', role: '회원', introduction: '', img: 'path/to/profile6.jpg' },          ].map((member, index) => (
            <div className="profile" key={index}>
              <img src={member.img} alt={`${member.name}'s profile`} className="profile-img" />
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

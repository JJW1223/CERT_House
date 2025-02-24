import React, { useState } from 'react';
import './NoticeForm.css'; // CSS 파일 임포트
import jwt_decode from 'jwt-decode';

const CommunityForm = ({ goBack }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const token = localStorage.getItem('token');
  if (!token) {
    alert("로그인 후 공지사항을 작성할 수 있습니다.");
    goBack();
    return;
  }

  const decoded = jwt_decode.jwtDecode(token);
  const userName = decoded.username; 

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call("Comm_notices.insert", title, content, userName, (error) => {
      if (error) {
        alert("오류가 발생했습니다: " + error.message);
      } else {
        alert("공지사항이 등록되었습니다.");
        goBack();
      }
    });
    setTitle('');
    setContent('');
  };

  return (
    <div className="notice-form-container">
      <h1>자유게시글 작성</h1>
      <div className="divider"></div> 
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          required
        />
        
        {/* 버튼을 감싸는 div 추가 */}
        <div className="button-container">
          <button type="button" onClick={goBack}>취소</button>
          <button type="submit">등록</button>
        </div>
      </form>
    </div>
  );
};

export default CommunityForm;

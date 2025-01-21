import React, { useState } from 'react';
import './NoticeForm.css'; // CSS 파일 임포트

const NoticeForm = ({ goBack }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call("notices.insert", title, content, (error) => {
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
      <h1>공지사항 작성</h1>
      <div className="divider"></div> 
      <div className="button-container">
        <button type="button" onClick={goBack}>취소</button>
          <button type="submit">등록</button>
        </div>
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
        
      </form>
    </div>
  );
};

export default NoticeForm;

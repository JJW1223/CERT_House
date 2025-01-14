import React, { useState } from 'react';
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { NoticesCollection } from "/imports/api/NoticesCollection"
import { NoticeForm } from "./NoticeForm"
import { NoticeItem } from "./NoticeItem"
import { NoticeEdit } from "./NoticeEdit"; 

export const Notice = () => {
  const [currentPage, setCurrentPage] = useState('Notice');
  const [currentNotice, setCurrentNotice] = useState(null);
  const notices = useTracker(() => {
      const handle = Meteor.subscribe('notices');
      if (!handle.ready()) {
          return []; // 데이터가 준비되지 않았을 때 빈 배열 반환
      }
      return NoticesCollection.find({}, { sort: { createdAt: -1 } }).fetch();
  });

  const goToWrite = () => {
      setCurrentPage('write');
      setCurrentNotice(null); // 새 글쓰기 모드
  };

  const handleNoticeClick = (notice) => {
      setCurrentPage('detail');
      setCurrentNotice(notice); 
  };

  const goBack = () => {
      setCurrentPage('Notice');
      setCurrentNotice(null);
  };

  if (currentPage === 'Notice') {
      return (
          <div>
              <h1>공지사항</h1>
              <ul>
                  {notices.map((notice) => (
                      <li key={notice._id} onClick={() => handleNoticeClick(notice)}>
                          <NoticeItem notice={notice} />
                      </li>
                  ))}
              </ul>
              <button onClick={goToWrite}>글쓰기</button>
          </div>
      );
  }

  if (currentPage === 'write') {
      return <NoticeForm goBack={goBack} />;
  }

  if (currentPage === 'detail' && currentNotice) {
      return (
          <div>
              <h1>{currentNotice.title}</h1>
              <p>{currentNotice.content}</p>
              <button onClick={() => {
                  setCurrentPage('edit'); //수정 페이지로 이동
                  setCurrentNotice(currentNotice); 
              }}>수정하기</button>
              <button onClick={goBack}>뒤로 가기</button>
          </div>
      );
  }

  if (currentPage === 'edit' && currentNotice) {
      return <NoticeEdit notice={currentNotice} goBack={goBack} />;
  }

  return null;
};

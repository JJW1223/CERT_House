import React, { useState } from 'react';
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { NoticesCollection } from "/imports/api/NoticesCollection"
import { NoticeForm } from "./NoticeForm"
import { NoticeItem } from "./NoticeItem"

export const Notice = () => {
  const [currentPage, setCurrentPage] = useState('Notice');
  const notices = useTracker(() => {
    const handle = Meteor.subscribe('notices');
    if (!handle.ready()) {
       return []; // 데이터가 준비되지 않았을 때 빈 배열 반환
    }
    const data = NoticesCollection.find({}, { sort: { createdAt: -1 } }).fetch();
    console.log(data); // 체크용
    return data;
  });

  const goToWrite = () => {
    setCurrentPage('write');
  };

  if (currentPage === 'Notice'){
    return (
      <div>
        <h1>공지사항</h1>
          <ul>
            {notices.map((notice) => (
              <NoticeItem key={notice._id} notice={notice} />
            ))}
          </ul>
        <button onClick={goToWrite}>글쓰기</button>
      </div>
    );
  }

  if (currentPage === 'write'){
    return <NoticeForm goBack={() => setCurrentPage('Notice')} />;
  }

  return null;
};
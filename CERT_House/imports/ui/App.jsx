import React, { useState } from 'react';
import { Notice } from './Notice';
import { NoticeForm } from './NoticeForm';

export const App = () => {
  const [currentPage, setCurrentPage] = useState('Notice');
  
  const goToNotice = () => {
    setCurrentPage('Notice');
  };

  const goToWrite = () => {
    setCurrentPage('Write');
  };

  return (
    <div>
      { currentPage === 'Notice' && <Notice /> }
      { currentPage === 'Write' && <NoticeForm /> }
    </div>
  );
};
import React from 'react';

const NoticeItem = ({ notice }) => {
    return (
        <li className="notice-item"> {/* CSS 클래스를 추가 */}
            <h2>{notice.title}</h2>
            <p>{notice.userName}</p>
            <div className='divider'></div>
        </li>
    );
};

export default NoticeItem;

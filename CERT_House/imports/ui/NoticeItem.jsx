import React from 'react';

const NoticeItem = ({ notice }) => {
    return (
        <li>
            <h2>{notice.title}</h2>
            <p>{notice.content}</p>
        </li>
    );
};

export default NoticeItem;
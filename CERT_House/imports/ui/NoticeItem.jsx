import React from 'react';

export const NoticeItem = ({ notice }) => {
    return (
        <li>
            <h2>{notice.title}</h2>
            <p>{notice.content}</p>
            {/* <p>{notice.createdAt.toString()}</p> */}
        </li>
    );
};
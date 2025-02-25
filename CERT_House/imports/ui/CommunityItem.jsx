import React from 'react';

const CommunityItem = ({ community }) => {
    return (
        <li className="notice-item"> {/* CSS 클래스를 추가 */}
            <h2>{community.title}</h2>
            <p>{community.userName}</p>
            <div className='divider'></div>
        </li>
    );
};

export default CommunityItem;

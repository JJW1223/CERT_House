import React, { useEffect, useState } from 'react';
import { NoticesCollection } from "/imports/api/NoticesCollection";

const NoticeEdit = ({ notice, goBack }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (notice) {
            setTitle(notice.title);
            setContent(notice.content);
        }
    }, [notice]);

    const handleSubmit = (e) => {
        e.preventDefault();
        Meteor.call("notices.update", notice._id, title, content, (error) => {
            if (error) {
                alert("오류가 발생했습니다: " + error.message);
            } else {
                alert("공지사항이 수정되었습니다.");
                goBack(); 
            }
        });
    };

    return (
        <div>
            <h1>공지사항 수정</h1>
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
                <button type="submit">수정</button>
            </form>
            <button onClick={goBack}>취소</button>
        </div>
    );
};

export default NoticeEdit;
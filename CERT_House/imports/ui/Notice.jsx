import React, { useState } from 'react';
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { NoticesCollection } from "/imports/api/NoticesCollection"
import { CommentsCollection } from "/imports/api/CommentsCollection"
import { NoticeForm } from "./NoticeForm"
import { NoticeItem } from "./NoticeItem"
import { NoticeEdit } from "./NoticeEdit";

const Notice = () => {
    const [currentPage, setCurrentPage] = useState('Notice');
    const [currentNotice, setCurrentNotice] = useState(null);
    const [newComment, setNewComment] = useState('');

    const notices = useTracker(() => {
        const handle = Meteor.subscribe('notices');
        if (!handle.ready()) {
            return []; 
        }
        return NoticesCollection.find({}, { sort: { createdAt: -1 } }).fetch();
    });

    const comments = useTracker(() => {
        const handle = Meteor.subscribe('comments');
        if (!handle.ready()){
            return [];
        }
        return CommentsCollection.find({ noticeId: currentNotice?._id }, { sort: { createdAt: -1 } }).fetch();
    })

    const deleteNotice = () => {
        if (confirm("정말로 삭제하시겠습니까?")) {
            Meteor.call("notices.delete", currentNotice._id, (error) => {
                if (error) {
                    alert("오류가 발생: " + error.message);
                } else {
                    alert("글이 정상적으로 삭제 되었습니다.");
                    goBack();
                }
            });
        }
    };

    const addComment = () => {
        if (!newComment.trim()) {
            alert('댓글을 입력하세요.');
            return;
        }

        Meteor.call('comments.insert', {
            noticeId: currentNotice._id,
            content: newComment,
        }, (error) => {
            if (error) {
                alert("댓글 추가 중 오류 발생: " + error.message);
            } else {
                alert("성공적으로 댓글을 달았습니다");
                setNewComment('');
            }
        });
    };

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
                        <div key={notice._id} onClick={() => handleNoticeClick(notice)}>
                            <NoticeItem notice={notice} />
                        </div>
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
                <button onClick={deleteNotice}>삭제</button>

                <hr />
                <h2>댓글</h2>
                <div>                
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="댓글을 입력하세요"
                    />
                    <button onClick={addComment}>댓글 추가</button>
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment._id}>{comment.content}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    if (currentPage === 'edit' && currentNotice) {
        return <NoticeEdit notice={currentNotice} goBack={goBack} />;
    }

    return null;
};

export default Notice;

import React, { useState } from 'react';
import { useTracker } from "meteor/react-meteor-data";
import { NoticesCollection } from "/imports/api/NoticesCollection";
import { CommentsCollection } from "/imports/api/CommentsCollection";
import { Users } from "/imports/api/users";
import NoticeForm from "./NoticeForm";
import NoticeItem from "./NoticeItem";
import NoticeEdit from "./NoticeEdit";
import './Notice.css'; // CSS 파일 임포트
import jwt_decode from 'jwt-decode';

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
        if (!handle.ready()) {
            return [];
        }
        return CommentsCollection.find({ noticeId: currentNotice?._id }, { sort: { createdAt: -1 } }).fetch();
    });

    const users = useTracker(() => {
        const handle = Meteor.subscribe('users');
        if (!handle.ready()){
            return [];
        }
        return Users.find().fetch();
    });

    const deleteNotice = () => {
        if (confirm("정말로 삭제하시겠습니까?")) {
            Meteor.call("notices.delete", currentNotice._id, (error) => {
                if (error) {
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
        const token = localStorage.getItem('token');
        if(!token){
            alert("로그인 후 댓글을 추가할 수 있습니다.");
            return;
        }
        try {
            const decoded = jwt_decode.jwtDecode(token);
            const userId = decoded.userId;
            const userName = decoded.username; 
            console.log(userId, userName);

            Meteor.call('comments.insert', {
                noticeId: currentNotice._id,
                content: newComment,
                userId: userId,
                userName: userName,
            }, (error) => {
                if (error) {
                    alert("댓글 추가 중 오류 발생: " + error.message);
                } else {
                    alert("성공적으로 댓글을 달았습니다");
                    setNewComment('');
                }
            });
        } catch (error) {
            alert("유효하지 않는 토큰입니다.");
            return;
        }
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

    return (
        <div className="notice-container"> 
            <h1 className="notice-title">공지사항</h1> 
            <div className="divider"></div> 
            <button onClick={goToWrite}>글쓰기</button> 
            {currentPage === 'Notice' && (
                <div className="notice-list"> 
                    {notices.map((notice) => (
                        <div key={notice._id} className="notice-item" onClick={() => handleNoticeClick(notice)}>
                            <NoticeItem notice={notice} />
                        </div>
                    ))}
                </div>
            )}

            {currentPage === 'write' && <NoticeForm goBack={goBack} />}

            {currentPage === 'detail' && currentNotice && (
                <>
                    <h1 className="current-notice-title">{currentNotice.title}</h1> {/* 제목에 클래스 추가 */}
                    <p className="current-notice-content">{currentNotice.content}</p> {/* 콘텐츠에 클래스 추가 */}

                    <button onClick={goBack}>뒤로 가기</button>

                    <button onClick={() => {
                        setCurrentPage('edit'); // 수정 페이지로 이동
                        setCurrentNotice(currentNotice);
                    }}>수정하기</button>
                    
                    <button onClick={deleteNotice}>삭제</button>

                    <div className="divier"></div>
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
                                <li key={comment._id}>{comment.userName}
                                    <p>{comment.content}<span> ({new Date(comment.createdAt).toLocaleString()})</span></p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}

            {currentPage === 'edit' && currentNotice && (
                <NoticeEdit notice={currentNotice} goBack={goBack} />
            )}
        </div>
    );
};

export default Notice;

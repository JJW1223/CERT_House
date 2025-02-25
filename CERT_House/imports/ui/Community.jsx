import React, { useState, useEffect } from 'react';
import { useTracker } from "meteor/react-meteor-data";
import { CommunityCollection } from "/imports/api/CommunityCollection";
import { CommentsCollection } from "/imports/api/CommentsCollection";
import { Users } from "/imports/api/users";
import CommunityForm from "./CommunityForm";
import CommunityItem from "./CommunityItem";
import CommunityEdit from "./CommunityEdit";
import './Notice.css'; // CSS 파일 임포트
import jwt_decode from 'jwt-decode';

const Community = () => {
    const [currentPage, setCurrentPage] = useState('Community');
    const [currentCommunity, setCurrentCommunity] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [userName, setUserName] = useState('');

    const communities = useTracker(() => {
        const handle = Meteor.subscribe('communities');
        if (!handle.ready()) {
            return []; 
        }
        return CommunityCollection.find({}, { sort: { createdAt: -1 } }).fetch();
    });

    const comments = useTracker(() => {
        const handle = Meteor.subscribe('comments');
        if (!handle.ready()) {
            return [];
        }
        return CommentsCollection.find({ noticeId: currentCommunity?._id }, { sort: { createdAt: -1 } }).fetch();
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
            Meteor.call("Comm_notices.delete", currentCommunity._id, (error) => {
                if (error) {
                } else {
                    alert("글이 정상적으로 삭제 되었습니다.");
                    goBack();
                }
            });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwt_decode.jwtDecode(token);
                setUserName(decoded.username);
            } catch (error) {
                console.error("유효하지 않은 토큰");
            }
        }
    }, []); // 빈 배열을 두 번째 인자로 주어 한 번만 실행되도록 설정

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
                noticeId: currentCommunity._id,
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
        setCurrentCommunity(null); // 새 글쓰기 모드
    };

    const handleNoticeClick = (community) => {
        setCurrentPage('detail');
        setCurrentCommunity(community);
    };

    const goBack = () => {
        setCurrentPage('Community');
        setCurrentCommunity(null);
    };

    return (
        <div className="notice-container"> 
            <h1 className="notice-title">자유게시판</h1> 
            <div className="divider"></div> 
            <button onClick={goToWrite}>글쓰기</button> 
            {currentPage === 'Community' && (
                <div className="notice-list"> 
                    {communities.map((community) => (
                        <div key={community._id} className="notice-item" onClick={() => handleNoticeClick(community)}>
                            <CommunityItem community={community} />
                        </div>
                    ))}
                </div>
            )}

            {currentPage === 'write' && <CommunityForm goBack={goBack} />}

            {currentPage === 'detail' && currentCommunity && (
                <>
                    <h1 className="current-notice-title">{currentCommunity.title}</h1> {/* 제목에 클래스 추가 */}
                    <p className="current-notice-content">{currentCommunity.content}</p> {/* 콘텐츠에 클래스 추가 */}

                    <button onClick={goBack}>뒤로 가기</button>
                    
                    {userName === currentCommunity.userName && (
                        <>
                            <button onClick={() => {
                                setCurrentPage('edit');
                                setCurrentCommunity(currentCommunity);
                            }}>수정하기</button>
                            <button onClick={deleteNotice}>삭제</button>
                        </>
                    )}

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

            {currentPage === 'edit' && currentCommunity && (
                <CommunityEdit community={currentCommunity} goBack={goBack} />
            )}
        </div>
    );
};

export default Community;

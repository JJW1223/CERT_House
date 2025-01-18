import React, { useState } from 'react';
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { NoticesCollection } from "/imports/api/NoticesCollection"
import { CommentsCollection } from "/imports/api/CommentsCollection"
import { NoticeForm } from "./NoticeForm"
import { NoticeItem } from "./NoticeItem"
import { NoticeEdit } from "./NoticeEdit";

export const Notice = () => {
    const [currentPage, setCurrentPage] = useState('Notice');
    const [currentNotice, setCurrentNotice] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [editComment, setEditComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);

    const notices = useTracker(() => {
        const handle = Meteor.subscribe('notices');
        if (!handle.ready()) {
            return []; // 데이터가 준비되지 않았을 때 빈 배열 반환
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

    const editCommentHandler = () => {
        if (!editComment.trim()) {
            alert('수정할 댓글을 입력하세요.');
            return;
        }

        Meteor.call('comments.update', editingCommentId, editComment, (error) => {
            if (error) {
                alert("댓글 수정 중 오류 발생: " + error.message);
            } else {
                alert("댓글이 수정되었습니다.");
                setEditComment('');
                setEditingCommentId(null);
            }
        });
    };

    const deleteComment = (commentId) => {
        if (confirm("정말로 삭제하시겠습니까?")) {
            Meteor.call('comments.delete', commentId, (error) => {
                if (error) {
                    alert("댓글 삭제 중 오류 발생: " + error.message);
                } else {
                    alert("댓글이 삭제되었습니다.");
                }
            });
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
                            <li key={comment._id}>
                                {editingCommentId === comment._id ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={editComment}
                                            onChange={(e) => setEditComment(e.target.value)}
                                        />
                                        <button onClick={editCommentHandler}>수정 완료</button>
                                        <button onClick={() => setEditingCommentId(null)}>취소</button>
                                    </div>
                                ) : (
                                    <div>
                                        <span>{comment.content}</span>
                                        <button onClick={() => {
                                            setEditingCommentId(comment._id);
                                            setEditComment(comment.content);
                                        }}>수정</button>
                                        <button onClick={() => deleteComment(comment._id)}>삭제</button>
                                    </div>
                                )}
                            </li>
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

import { Meteor } from "meteor/meteor";
import { CommentsCollection } from "./CommentsCollection";

Meteor.methods({
    'comments.insert'(comment) {
        if (!comment.userId){
            throw new Meteor.Error("comments.insert.authorized", "로그인 후 댓글을 작성할 수 있습니다.");
        };
        return CommentsCollection.insertAsync({
            noticeId: comment.noticeId,
            content: comment.content,
            userName: comment.userName,
            createdAt: new Date(),
        });
    },

    "comments.delete"(commentId){
        if (!this.userId) {
            throw new Meteor.Error("comments.delete.authorized", "You must be logged in to delete comments.");
        }

        if(!commentId){
            throw new Meteor.Error("comments.delete.invalid-id", "Comment ID is required");
        }

        // 댓글 작성자와 현재 사용자 ID 비교
        if (comment.userId !== this.userId) {
            throw new Meteor.Error("comments.delete.forbidden", "You are not authorized to delete this comment.");
        }
        return CommentsCollection.removeAsync({ _id: commentId });
    },

    "comments.update"(commentId, content){
        if (!this.userId) {
            throw new Meteor.Error("comments.update.authorized", "You must be logged in to update comments.");
        }

        const comment = CommentsCollection.findOne({ _id: commentId });
        if (!comment) {
            throw new Meteor.Error("comments.update.not-found", "Comment not found.");
        }

        // 댓글 작성자와 현재 사용자 ID 비교
        if (comment.userId !== this.userId) {
            throw new Meteor.Error("comments.update.forbidden", "You are not authorized to update this comment.");
        }

        try{
            const result = CommentsCollection.updateAsync(commentId, {
                $set: {
                    content,
                    updatedAt: new Date(),
                },
            });
            if(result === 0){
                throw new Meteor.Error('update-failed')
            }
        } catch (error) {
            throw new Meteor.Error('update-failed', 'No document updated. Check if the noticeId is valid.');
        }
    },
})
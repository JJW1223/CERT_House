import { Meteor } from "meteor/meteor";
import { CommentsCollection } from "./CommentsCollection";

Meteor.methods({
    'comments.insert'(comment) {
        return CommentsCollection.insertAsync({
            noticeId: comment.noticeId,
            content: comment.content,
            createdAt: new Date(),
        });
    },

    "comments.delete"(commentId){
        if(!commentId){
            throw new Meteor.Error("comments.delete.invalid-id", "Comment ID is required");
        }

        return CommentsCollection.removeAsync({ _id: commentId });
    },

    "comments.update"(commentId, content){
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
// insert notice into the DB
import { Meteor } from "meteor/meteor";
import { NoticesCollection } from "./NoticesCollection";

Meteor.methods({
    "notices.insert"(title, content, userName) { // 유저 추가
        return NoticesCollection.insertAsync({ 
            title, 
            content, 
            userName,
            createdAt: new Date() 
        });
    },
    "notices.delete"(noticeId) {
        if (!noticeId) {
            throw new Meteor.Error("notices.delete.invalid-id", "Notice ID is required");
        }

        return NoticesCollection.removeAsync({ _id: noticeId });
    },
    "notices.update"(noticeId, title, content){
        try{
            const result = NoticesCollection.updateAsync(noticeId, {
                $set: {
                    title,
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
});


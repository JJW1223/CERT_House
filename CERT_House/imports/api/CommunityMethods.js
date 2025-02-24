import { Meteor } from "meteor/meteor";
import { CommunityCollection } from "./CommunityCollection";

Meteor.methods({
    "Comm_notices.insert"(title, content, userName) { // 유저 추가
        return CommunityCollection.insertAsync({ 
            title, 
            content, 
            userName,
            createdAt: new Date() 
        });
    },
    "Comm_notices.delete"(communityId) {
        if (!communityId) {
            throw new Meteor.Error("notices.delete.invalid-id", "Notice ID is required");
        }

        return CommunityCollection.removeAsync({ _id: communityId });
    },
    "Comm_notices.update"(communityId, title, content){
        try{
            const result = CommunityCollection.updateAsync(communityId, {
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


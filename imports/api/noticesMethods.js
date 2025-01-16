// insert notice into the DB
import { Meteor } from "meteor/meteor";
import { NoticesCollection } from "./NoticesCollection";

Meteor.methods({
    "notices.insert"(title, content) {
        return NoticesCollection.insertAsync({ title, content, createdAt: new Date() });
    },
    "notices.delete"(noticeId) {
        if (!noticeId) {
            throw new Meteor.Error("notices.delete.invalid-id", "Notice ID is required");
        }

        return NoticesCollection.removeAsync({ _id: noticeId });
    },
});


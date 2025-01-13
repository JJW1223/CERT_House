// insert notice into the DB
import { Meteor } from "meteor/meteor";
import { NoticesCollection } from "./NoticesCollection";

Meteor.methods({
    "notices.insert"(title, content) {
        return NoticesCollection.insertAsync({title, content, createdAt: new Date() });
    },
});


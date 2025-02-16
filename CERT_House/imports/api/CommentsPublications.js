import { Meteor } from "meteor/meteor";
import { CommentsCollection } from "./CommentsCollection"
import { Users } from "./users"

Meteor.publish("comments", () => {
    return CommentsCollection.find();
});

Meteor.publish("users", () => {
    return Users.find();
});
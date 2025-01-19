import { Meteor } from "meteor/meteor";
import { CommentsCollection } from "./CommentsCollection"

Meteor.publish("comments", () => {
    return CommentsCollection.find();
});
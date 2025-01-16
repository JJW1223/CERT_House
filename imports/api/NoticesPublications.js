import { Meteor } from "meteor/meteor";
import { NoticesCollection } from "./NoticesCollection"

Meteor.publish("notices", () => {
    return NoticesCollection.find();
});
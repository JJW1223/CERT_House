import { Meteor } from "meteor/meteor";
import { CommunityCollection } from "./CommunityCollection"

Meteor.publish("communities", () => {
    return CommunityCollection.find();
});
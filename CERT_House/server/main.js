import { Meteor } from "meteor/meteor";
import { NoticesCollection } from "/imports/api/NoticesCollection";
import { CommentsCollection } from "/imports/api/CommentsCollection";
require("../imports/api/NoticesPublications");
require("../imports/api/noticesMethods");
require("../imports/api/CommentsPublications");
require("../imports/api/commentsMethods");

const insertNotice = async (noticeText) => {
  try {
    await NoticesCollection.insertAsync({ text: noticeText });
    console.log("Notice inserted successfully:", noticeText);
  } catch (e) {
    console.error("Error inserting notice:", e);
  }
};

const insertComment = async (commentText) => {
  try {
    await CommentsCollection.insertAsync({ text: commentText });
    console.log("Comment inserted successfully:", commentText);
  } catch (e) {
    console.error("Error inserting comment:", e);
  }
};

Meteor.startup(async () => {
  if ((await NoticesCollection.find().countAsync()) === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach(insertNotice);
  }
  if ((await CommentsCollection.find().countAsync()) === 0) {
    [
      "First Comment",
      "Second Comment"
    ].forEach(insertComment);
  }
});


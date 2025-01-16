import { Meteor } from "meteor/meteor";
import { NoticesCollection } from "/imports/api/NoticesCollection";
require("../imports/api/NoticesPublications");
require("../imports/api/noticesMethods");

const insertNotice = async (noticeText) => {
  try {
    await NoticesCollection.insertAsync({ text: noticeText });
    console.log("Notice inserted successfully:", noticeText);
  } catch (e) {
    console.error("Error inserting notice:", e);
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
});


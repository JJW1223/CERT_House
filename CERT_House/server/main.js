const { Meteor } = require('meteor/meteor');
const { NoticesCollection } = require('/imports/api/NoticesCollection');
require("../imports/api/NoticesPublications");
require("../imports/api/noticesMethods");

const insertNotice = (noticeText) =>
  NoticesCollection.insertAsync({ text: noticeText });

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

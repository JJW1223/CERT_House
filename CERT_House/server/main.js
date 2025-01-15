import { Meteor } from "meteor/meteor";
import { NoticesCollection } from "/imports/api/NoticesCollection";
require("../imports/api/NoticesPublications");
require("../imports/api/noticesMethods");

const insertNotice = (noticeText) =>
  NoticesCollection.insert({ text: noticeText }); // insertAsync -> insert

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

// 공지사항 수정 메소드 정의
Meteor.methods({
  'notices.update'(noticeId, title, content) {
    try {
      const result = NoticesCollection.updateAsync(noticeId, { // update -> updateAsync
        $set: {
          title,
          content,
          updatedAt: new Date(),
        },
      });
      if (result === 0) {
        throw new Meteor.Error('update-failed', 'No document updated. Check if the noticeId is valid.');
      }
    } catch (error) {
      throw new Meteor.Error('update-error', error.message);
    }
  },
});

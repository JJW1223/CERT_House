import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
require("../imports/api/NoticesPublications");
require("../imports/api/noticesMethods");
require("../imports/api/CommentsPublications");
require("../imports/api/commentsMethods");
require("dotenv").config();
import '../imports/api/users.js'; // users.js 파일을 가져옵니다.

console.log(Meteor.settings.JWT_SECRET); // 디버깅용 로그
console.log("서버 시작");

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.startup(async () => {
  
});
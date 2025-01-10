import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Users = new Mongo.Collection('users');

if (Meteor.isServer) {
  // 중복 아이디 확인 및 회원가입 처리
  Meteor.methods({
    async 'users.signup'(username, password) {
      // 중복 아이디 확인 (비동기 함수 사용)
      const existingUser = await Users.findOneAsync({ username });
      if (existingUser) {
        throw new Meteor.Error('duplicate-username', '이미 사용중인 아이디입니다.');
      }

      // 새 사용자 추가
      await Users.insertAsync({ username, password });
      return '회원가입 성공!';
    }
  });
}

export { Users };

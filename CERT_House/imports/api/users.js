import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Users = new Mongo.Collection('users');

if (Meteor.isServer) {
  // 중복 아이디 확인 및 회원가입 처리
  Meteor.methods({
    // 회원가입
    async 'users.signup'(username, password) {
      // 중복 아이디 확인 (비동기 함수 사용)
      const existingUser = await Users.findOneAsync({ username });
      if (existingUser) {
        throw new Meteor.Error('duplicate-username', '이미 사용중인 아이디입니다.');
      }

      // 새 사용자 추가(회원여부 포함)
      await Users.insertAsync({ username, password});
      return '회원가입 성공!';
    },

    // 로그인
    async 'users.login'(username, password) {
      const user = await Users.findOneAsync({username});
      console.log('찾은사용자: ', user); // 테스트
      // 회원 여부와 비밀번호 확인
      if (!user) {
        throw new Meteor.Error('user-not-found', '존재하지 않는 아이디입니다.');
      }

      const { username: storedUsername, password: storedPassword } = user;

      // 입력한 username과 DB의 username 비교는 생략 (이미 조건에서 조회됨)
      if (storedPassword !== password) {
        throw new Meteor.Error('incorrect-password', '비밀번호가 일치하지 않습니다.');
      }

      return '로그인 성공!';
    },
  });
}

export { Users };


// 아이디, 비번, 회원여부 -> 회원가입 할 때 넣음
// 로그인시 - 회원여부 체크(회원일시만 로그인)

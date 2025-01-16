import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import jwt from 'jsonwebtoken';

const USER_KEY = Meteor.settings.JWT_SECRET ; // 환경 변수 가져오기


const Users = new Mongo.Collection('users');

if (Meteor.isServer) {
  // 중복 아이디 확인 및 회원가입 처리
  Meteor.methods({
    // 회원가입
    async 'users.signup'(username, password) {
      // 중복 아이디 확인
      const existingUser = await Users.findOneAsync({ username });
      if (existingUser) {
        throw new Meteor.Error('duplicate-username', '이미 사용중인 아이디입니다.');
      }

      // 새 사용자 추가 (회원여부는 기본값 "X"로 설정)
      await Users.insertAsync({ username, password, membership: 'X' });
      return '회원가입 성공! 관리자가 승인해야 로그인 가능합니다.';
    },

    // 로그인
    async 'users.login'(username, password) {
      const user = await Users.findOneAsync({ username });
      console.log('찾은 사용자: ', user); // 테스트

      // 회원 여부와 비밀번호 확인
      if (!user) {
        throw new Meteor.Error('user-not-found', '존재하지 않는 아이디입니다.');
      }

      if (user.password !== password) {
        throw new Meteor.Error('incorrect-password', '비밀번호가 일치하지 않습니다.');
      }

      if (user.membership !== 'O') {
        throw new Meteor.Error('membership-denied', '회원 승인이 필요합니다.');
      }

      // JWT 생성
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        USER_KEY,
        { expiresIn: '1h' }
      );

      return { message: '로그인 성공!', token };
    },

    // 토큰 검증
    async 'protected.route'(token) {
      try {
        const decoded = jwt.verify(token, USER_KEY);
        return `안녕하세요, ${decoded.username}님!`;
      } catch (err) {
        throw new Meteor.Error('invalid-token', '유효하지 않은 토큰입니다.');
      }
    },
  });
}

export { Users };

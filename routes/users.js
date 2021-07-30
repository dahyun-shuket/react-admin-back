const { getUserByUserID, create, updateUser, getUser, updatePwd, list, idCheck, remove, login, logout } = require('../controller/users.js');
const router = require('express').Router();
// const {tokenVerify} = require('../model/auth')

// 유저 생성
router.post('/create', create);

// 유저 seq 갖고오기
router.post('/get', getUser);

// 유저 정보 수정
router.post('/update', updateUser);

// 유저 ID 갖고오기
router.post('/getid', getUserByUserID);

// 비밀번호 수정
router.post('/updatepwd', updatePwd);

// 유저 리스트
router.post('/list', list);

// 유저 아이디 중복 체크
router.post('/idCheck', idCheck);

// 회원 탈퇴
router.post('/remove', remove);

// 로그인
router.post('/login', login);

// 로그아웃
//router.post('/logout', logout);



module.exports = router;
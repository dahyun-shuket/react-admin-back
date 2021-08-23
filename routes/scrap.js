var express = require('express');
var router = express.Router();

const { create, remove, removeSeq, list } = require('../controller/scrap.js');

// 스크랩 생성
router.post('/create',  create);

// 스크랩 삭제
router.post('/remove', remove);

// 스크랩 한개 찾아서 삭제
router.post('/removeSeq',  removeSeq);

// 스크랩 리스트
router.post('/list',  list);

module.exports = router;

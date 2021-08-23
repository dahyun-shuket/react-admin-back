const {create, list, get, remove, update, updateLogo, logo} = require('../controller/mart.js');
const router = require('express').Router();
const express = require('express');
var path = require('path');
const multer = require('multer');
// const upload = multer({ dest: 'upload/' });
// const upload = multer({ dest: './upload' });
router.use('/image', express.static('./upload'));


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./upload/");
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    },
  });

  const upload = multer({
    storage: multer.diskStorage({
      // set a localstorage destination
      destination: (req, file, cb) => {
        cb(null, './upload/');
      },
      // convert a file name
      filename: (req, file, cb) => {
        cb(null, new Date().valueOf() + path.extname(file.originalname));
      },
    }),
  });

router.post('/create',  create);

router.post('/get', get);

router.post('/remove', remove);

// router.post('/update',  update);
router.post('/update', update);

router.post('/logo',  logo);

router.post('/updateLogo', upload.single('LOGOFILE'), updateLogo);



// 유저 리스트
router.post('/list', list);


module.exports = router;
const { getFile } = require('../controller/file');

var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
    //   var mediaPath = req.app.get('mediaPath') + "uploads/";
      var mediaPath = req.app.get('mediaPath') + "uploads/" + req.body.location;
      if (!fs.existsSync(mediaPath)) { fs.mkdirSync(mediaPath, {recursive:true}); };
      callback(null, mediaPath)
    },
    filename: function (req, file, callback) {
      callback(null, uuid.v4() + path.extname(file.originalname));
    }
})

var upload = multer({ storage: storage })

router.post('/uploadSingle', upload.single('LOGOFILE'), function(req, res, next) {
    const file = req.file;
    
    if (!file) {
        console.log("error", `router/uploadSingle: 파일 업로드가 실패했습니다`);
        res.json({result: 'fail', data: ''});  
    } else {
        console.log('file ---  ',file)
        console.log("info", `router/uploadSingle: 파일 업로드 성공 -- ${file.path}`);
        res.json({result: 'success', data: file });
    }
});

router.post('/uploadMulti', upload.array('uploadFiles'), function(req, res, next) {
    const file = req.file;

    if (!file) {
        console.log("error", `router/uploadSingle: 파일 업로드가 실패했습니다`);
        res.json({result: 'fail', data: ''});  
    } else {
        console.log(file);
        console.log("info", `router/uploadSingle: 파일 업로드 성공 -- ${file.path}`);
        res.json({result: 'success', data: file });
    }
});

router.get('/get/:SEQ', getFile);

module.exports = router;
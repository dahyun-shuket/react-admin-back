const { getUserByUserID, getUsers, updateUser, getUserByID, create} = require('../model/users.js');
const { genSaltSync, hashSync, compareSync, hash } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const userService = require('../model/users.js');
const secrectKey = require('../config/secretkey').secrectKey;
const option = require('../config/secretkey').option;

module.exports = {
    // 유저 생성
    async create(req, res, next) {
        let loginId = req.body.LOGINID;
        let pwd = req.body.PWD;

        let salt = genSaltSync(10);
        pwd = hashSync(pwd, salt);

        let result = await userService.create(loginId, pwd);
        if(!result) {
            res.json({
                result: 'fail',
                message: '회원가입 실패'
            })
        }
        if(result){
            res.json({
                result:'success',
                data: result
            });
        } else {
            res.json({
                result:'fail',
                data: null
            });
        }
    },

    // seq 정보 갖고오기
    async getUser(req, res, next) {
        const seq = req.body.SEQ;
        const result = await userService.getUser(seq);
        console.log(result);
        console.log(seq);

        if(result) {
            res.json({
                success:'success',
                data:result
            });
        } else {
            res.json({
                success:'fail',
                data: null
            })
        }
    },
    // 유저 정보 수정
    async updateUser(req, res, next) {
        let seq = req.body.SEQ;
        let loginId = req.body.LOGINID;
        let pwd = req.body.PWD;
        let salt = genSaltSync(10);
        pwd = hashSync(pwd, salt);

        const result = await userService.updateUser(seq,loginId, pwd);        

        res.json({
            result: (result === null) ? 'fail' : 'success',
            data: result
        })
    },

    // userId 갖고오기
    async getUserByUserID(req,res,next){
        let loginId = req.body.LOGINID;
        
        const result = await userService.getUserByUserID(loginId);

        res.json({
            result: (result === null) ? 'fail' : 'success',
            data: result
        })

    },

    // 유저 비밀번호 수정
    async updatePwd(req, res, next){
        let seq = req.body.SEQ;
        let pwd = req.body.PWD;

        const salt = genSaltSync(10);
        pwd = hashSync(pwd, salt);
        let result = await userService.updatePwd(seq, pwd);
        console.log(result)
        res.json({
            result: (result === null) ? 'fail' : 'success',
            data: result
        })
    },

    // 유저 리스트
    async list(req, res, next){
        //let seq = req.body.SEQ;
        const result = await userService.list();
        
        res.json({
            result: (result === null) ? 'fail' : 'success',
            data: result
        })
    },

    // 아이디 중복 체크
    async idCheck(req, res, next){
        let loginId = req.body.LOGINID;

        const result = await  userService.idCheck(loginId);
        res.json({
            result: (result === null) ? 'fail' : 'success',
            data: result
        })
    },

    // 회원 탈퇴
    async remove(req, res, next) {
        let seq = req.body.SEQ;

        const result = await userService.remove(seq);
        res.json({
            result: (result === null) ? 'fail' : 'success',
            data: result
        })
    },

    // 로그인
    async login(req, res, next){
        let loginId = req.body.LOGINID;
        let pwd = req.body.PWD;

        const userInfo = await userService.login(loginId);
        console.log(userInfo);
        if(!userInfo){
            res.json({
                result: 'fail',
                message: '로그인 실패 11'
            })
        }
        
        // 비밀번호 
        const result = compareSync(pwd, userInfo.PWD); // 비밀번호 hash 비교
        console.log(result); 
        if(result) {
            // token
            const payload = {seq: userInfo.SEQ, loginId: userInfo.LOGINID}
            const tokenInfo = sign( payload, secrectKey, option );
            
            res.json({
                result: 'success',
                data:{
                    seq:userInfo.SEQ,
                    loginId: userInfo.LOGINID,
                    token: tokenInfo
                }
            });
        } else {
            res.json({
                result: 'fail',
                data: null,
                message: '로그인 실패 22'
            })
        }

    }

}
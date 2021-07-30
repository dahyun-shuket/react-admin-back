const pool = require('../config/database');

module.exports = class userService{
    // 유저 생성
    static async create(loginId, pwd) {
        try {
            const [rows, fileds] = await pool.query(`INSERT INTO login(LOGINID, PWD,CREATED,MODIFIED, ACTIVE) VALUES (?,?,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP(),'Y')`,[loginId, pwd]);
            return rows;
        } catch (error) {
            console.log("create model Error ! : " + error);
        }
    };
    // seq 정보 갖고오기
    static async getUser(seq){
        try {
            const [rows, fields] = await pool.query(`SELECT SEQ, LOGINID, PWD, CREATED,MODIFIED, ACTIVE FROM login WHERE SEQ=? `, 
            [seq]
            );
            if(rows.length > 0){
                return rows[0];
            } else {
                return null;
            }
            
            
        } catch (error) {
            console.log("getUsers model Error ! : " + error);
        }
        
    };
    // 유저 정보 수정
    static async updateUser(seq,loginId, pwd) {
        try {
            //const [rows, fields] = await pool.query(`UPDATE login SEQ, LOGINID, PWD, CREATED, MODIFIED, ACTIVE SET WHERE SEQ=?`, [seq, loginId, pwd]);
            const [rows, fields] = await pool.query(`UPDATE login SET LOGINID=?, PWD=?, MODIFIED=NOW() WHERE SEQ=?`, [loginId, pwd, seq]);
            return rows;
        } catch (error) {
            return null;
        }
    };
    // 유저 아이디 갖고 오기
    static async getUserByUserID(loginId){
        try {
            const [rows, fields] = await pool.query(`SELECT SEQ, LOGINID, PWD, CREATED FROM LOGIN WHERE LOGINID=?`, [loginId]);
            return rows;
        } catch (error) {
            return null;
        }
    };
    // 유저 비밀번호 수정
    static async updatePwd(seq, pwd){
        try {
            const [rows, fields] = await pool.query(`UPDATE LOGIN SET PWD=? WHERE SEQ=?`, [pwd, seq]);
            return rows;

        } catch (error) {
            return null;
        }
    };
    // 유저 리스트
    static async list(){
        try {
            const [rows, fields] = await pool.query(`SELECT SEQ, LOGINID, PWD,CREATED,MODIFIED, ACTIVE FROM LOGIN ORDER BY SEQ DESC`, []);
            return rows;
        } catch (error) {
            return null;
        }
    };
    // 아이디 중복 체크
    static async idCheck(loginId){
        try {
            const [rows, fields] = await pool.query(`SELECT LOGINID FROM LOGIN WHERE LOGINID=?`, [loginId]);
            let checkUser = new Object();
            checkUser.tf = false; 
            if(rows[0] === undefined){
                console.log('아이디 사용가능');
                checkUser.tf = true; 
                return checkUser;
            } else {
                console.log('아이디 사용 불가능');
                checkUser.tf = false;
                return checkUser;
            }
        } catch (error) {
            return null;
        }
    };
    // 회원탈퇴
    static async remove(seq) {
        try {
            const [rows, fields] = await pool.query(`UPDATE LOGIN SET MODIFIED=NOW(), ACTIVE='N' WHERE SEQ=?`, [seq]);
            return rows;
        } catch (error) {
            return null;
        }
    };
    // 로그인
    static async login(loginId){
        try {
            const [rows, fields] = await pool.query(`SELECT SEQ, LOGINID, PWD FROM LOGIN WHERE LOGINID=?`, [loginId]);
            return rows[0];
        } catch (error) {
            return null;
        }
    }
}
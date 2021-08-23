const pool = require('../config/database');
const path = require('path');
const fs = require('fs');

module.exports = class userService{
    // 유저 생성
    static async create(name, logofile,  regno, address, contact) {
        try {
            const [rows, fileds] = await pool.query(`INSERT INTO MART (NAME, LOGOFILE, REGNO, ADDRESS, CONTACT, CREATED, MODIFIED, ACTIVE) VALUES (?, ?,?,?,?,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP(),'Y')`,[name, logofile, regno, address, contact]);
            return rows.insertId;
        } catch (error) { 
            console.log("create model Error ! : " + error);
        }
    };

    // 유저 리스트
    static async list(seq, name, logofile, regno, address, contact){
        try {
            const query = `SELECT SEQ, NAME, LOGOFILE, REGNO, ADDRESS, CONTACT, CREATED, MODIFIED, ACTIVE FROM MART WHERE ACTIVE='Y'  ${(name) ? `AND NAME LIKE '%${name}%'`:''} ORDER BY SEQ DESC`;
            const [rows, fields] = await pool.query(query, [seq, name, logofile, regno, address, contact]);
            return rows;
        } catch (error) {
            return null;
        }
    };

    // 유저 가져오기
    static async get(seq){
        try {
            const query = `SELECT SEQ, NAME, REGNO, POSTCODE, ADDRESS, ADDRESSEXTRA, CONTACT, HRONAME, HROCONTACT, HRORANK FROM MART WHERE SEQ=?`;
            const [rows, fields] = await pool.query(query, [seq]);
            if (rows.length > 0) 
                return rows[0];
            else {
                console.log('error', `models/martModel.get: No data found`);           
                return null;
            }  
            return rows;
        } catch (error) {
            return null;
        }
    };

    // 유저 삭제하기
    static async remove(seq) {
        try {
            const [rows, fileds] = await pool.query(`UPDATE MART SET MODIFIED=NOW(), ACTIVE='N' WHERE SEQ=?`, [seq]); 
            return rows;
        } catch(error) {
            logger.writeLog(`[ERROR] models/mart/delete:  + ${error}`);
            return null;
        };

    }

    // 마트 수정하기
    static async update(seq, name, regno, postcode, address, addressextra, contact, hroname, hrocontact, hrorank) {
        try {
            const [rows, fileds] = await pool.query(`UPDATE MART SET  NAME=?, REGNO=?, POSTCODE=?, ADDRESS=?, ADDRESSEXTRA=?, CONTACT=?, HRONAME=?, HROCONTACT=?, HRORANK=?, MODIFIED=NOW() WHERE SEQ=?`, 
            [  name, regno, postcode, address, addressextra, contact, hroname, hrocontact, hrorank,seq]);
            return rows;
        } catch (error) {
            return null;
        }
    }

    // // 마트 로고 수정
    // static async logo(mediaPath, seq, logoFile) {
    //     console.log(mediaPath);
    //     const connection = await pool.getConnection(async conn => conn);
    //     try 
    //     {
    //         await connection.beginTransaction();    // transaction

    //         // 기존 파일을 찾아서 삭제
    //         const [rowsFind, fieldsFind] = await pool.query(`SELECT SEQ, LOCATION, FILENAME, RELATED_SEQ FROM FILESTORAGE WHERE RELATED_TABLE=? AND RELATED_SEQ=?`, ['MART', seq]);
            
    //         if (rowsFind.length > 0) {
    //             // 기존 파일 정보가 있으면 삭제
    //             try {
    //                 fs.unlinkSync(mediaPath + "upload/" + rowsFind[0].LOCATION + "/" + rowsFind[0].FILENAME);
    //             } catch {
    //                 console.log("파일 삭제 오류");    
    //             }
    //             // 레코드도 삭제
    //             await pool.query(`DELETE FROM FILESTORAGE WHERE SEQ=?`, [rowsFind[0].SEQ]);
    //         }
    //         // 새로운 파일 저장 정보를 추가
    //         const [rows, fields] = await pool.query(`INSERT INTO FILESTORAGE 
    //             (LOCATION, FILENAME, RELATED_TABLE, RELATED_SEQ) VALUES (?, ?, ?, ?)`, [path.dirname(logoFile), path.basename(logoFile), 'MART', seq]);
    //         // 해당 정보로 로고 파일 정보 갱신

    //         await pool.query(`UPDATE MART SET LOGOFILE=?, MODIFIED=CURRENT_TIMESTAMP() WHERE SEQ=?`, [rows.insertId, seq]);

    //         await connection.commit(); // commit
    //         connection.release();

    //         return rows.insertId;
    //     } catch (error) {
    //         await connection.rollback();    // rollback
    //         connection.release();

    //         console.log('error', `models/martModel.updateLogo: ${error}`);           
    //         return null;
    //     }
    // }

    // 마트 로고 수정
    static async logo(mediaPath, seq, logoFile) {
        const connection = await pool.getConnection(async conn => conn);
        try 
        {
            await connection.beginTransaction();    // transaction

            // 기존 파일을 찾아서 삭제
            const [rowsFind, fieldsFind] = await pool.query(`SELECT SEQ, LOCATION, FILENAME, RELATED_SEQ FROM FILESTORAGE WHERE RELATED_TABLE=? AND RELATED_SEQ=? AND LOCATION='martlogo'`, ['MART', seq]);
            
            if (rowsFind.length > 0) {
                // 기존 파일 정보가 있으면 삭제
                try {
                    // fs.unlinkSync(mediaPath + "upload/");
                    fs.unlinkSync(mediaPath + "upload/" + rowsFind[0].LOCATION + "/" + rowsFind[0].FILENAME);
                } catch {
                    console.log('error', `models/martModel.logo: ${error}`);    
                }
                // 레코드도 삭제
                await pool.query(`DELETE FROM FILESTORAGE WHERE SEQ=? AND LOCATION='martlogo'`, [rowsFind[0].SEQ]);
            }
            // 새로운 파일 저장 정보를 추가
            const [rows, fields] = await pool.query(`INSERT INTO FILESTORAGE 
                (LOCATION, FILENAME, RELATED_TABLE, RELATED_SEQ) VALUES (?, ?, ?, ?)`, [path.dirname(logoFile), path.basename(logoFile), 'MART', seq]);
                
            // 해당 정보로 로고 파일 정보 갱신

            await pool.query(`UPDATE MART SET LOGOFILE=?, MODIFIED=CURRENT_TIMESTAMP() WHERE SEQ=?`, [rows.insertId, seq]);

            await connection.commit(); // commit
            connection.release();

            return rows.insertId;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            console.log('error', `models/martModel.updateLogo: ${error}`);           
            return null;
        }
    }

    // 마트 로고 수정 
    static async updateLogo(seq, logofile) {
        try {
            const [rows, fileds] = await pool.query(`UPDATE MART SET LOGOFILE=?, MODIFIED=NOW() WHERE SEQ=?`, 
            [  logofile,seq]);
            return rows;
        } catch (error) {
            return null;
        }
    }

}
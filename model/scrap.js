const pool = require('../config/database');

module.exports = class scrapModel {
    static async create(userSeq, recruitSeq) {
        const connection = await pool.getConnection(async conn => conn); 
        try 
        {
            await connection.beginTransaction();    // transaction

            await connection.query(`DELETE FROM SCRAP WHERE USER_SEQ=? AND RECRUIT_SEQ=?`, [userSeq, recruitSeq]);
            const [rows, fields] = await connection.query(`INSERT INTO SCRAP (USER_SEQ, RECRUIT_SEQ, CREATED) VALUES ( ?, ?, CURRENT_TIMESTAMP())`, [userSeq, recruitSeq]);
            await connection.commit(); // commit
            connection.release();
            console.log('info', `models/scrapModel.create: ${userSeq} 유저가 ${recruitSeq}번 공고를 스크랩했습니다.`);           
                return rows.insertId;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            console.log('error', `models/scrapModel.create: ${error}`);           
            return null;
        }
    }
    static async remove(userSeq, recruitSeq) {
        try 
        {
            await pool.query(`DELETE FROM SCRAP WHERE USER_SEQ=? AND RECRUIT_SEQ=?`, [userSeq, recruitSeq]);
            return recruitSeq;
        } catch (error) {
            console.log('error', `models/scrapModel.remove: ${error}`);           
            return null;
        }
    }
    static async removeSeq(seq) {
        try 
        {
            await pool.query(`DELETE FROM SCRAP SEQ=?`, [seq]);
            return recruitSeq;
        } catch (error) {
            console.log('error', `models/scrapModel.removeSeq: ${error}`);           
            return null;
        }
    }
    static async list(seq) {
        try 
        {
            const [rows, fields] = await pool.query(`SELECT USER_SEQ, RECRUIT_SEQ, CREATED FROM SCRAP ORDER BY SEQ DESC`, [seq]);
            if (rows.length > 0) 
                return rows;
            else {
                console.log('error', `models/noticeModel.list: No data found`);           
            }
        } catch (error) {
            console.log('error', `models/scrapModel.list: ${error}`);           
            return null;
        }
    }
};
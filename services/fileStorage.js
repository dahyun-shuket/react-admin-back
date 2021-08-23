const pool = require('../config/database');


module.exports = class fileStorageModel {
    static async create(location, fileName, related_Table, related_Seq) {
        try 
        {
            const [rows, fields] = await pool.query(`INSERT INTO FILESTORAGE 
                (LOCATION, FILENAME, RELATED_TABLE, RELATED_SEQ, CREATED) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP())`, [location, fileName, related_Table, related_Seq]);
            console.log('INFO', `models/fileStorageModel.create: 파일 ${fileName}, ${related_Table} 테이블의 ${related_Seq}에 연결됨`);           
            return rows.insertId;
        } catch (error) {
            console.log('error', `models/fileStorageModel.create: ${error}`);           
            return null;
        }
    }
    static async get(seq) {
        try 
        {
            const [rows, fields] = await pool.query(`SELECT SEQ, LOCATION, FILENAME, RELATED_TABLE, RELATED_SEQ, CREATED FROM FILESTORAGE WHERE SEQ=?`, [seq]);
            return rows[0];
        } catch (error) {
            console.log('error', `models/fileStorageModel.get: ${error}`);           
            return null;
        }
    }
    static async remove(seq) {
        try 
        {
            const [rows, fields] = await pool.query(`DELETE FROM FILESTORAGE WHERE SEQ=?`, [seq]);
            return Seq;
        } catch (error) {
            console.log('error', `models/fileStorageModel.remove: ${error}`);           
            return null;
        }
    }
}
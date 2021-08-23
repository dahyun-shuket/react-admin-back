// const recruitService = require('../services/recruit.js');
const scrapService = require('../model/scrap.js');


module.exports = {
    // 스크랩 생성
    async create(req, res, next) {
        const userSeq = req.body.userSeq;
        const recruitSeq = req.body.recruitSeq;

        const result = await scrapService.create(userSeq, recruitSeq);

        res.json({
            result: (result == null) ? 'fail' : 'success',
            data: result
        })
    },
    // 스크랩 삭제
    async remove(req, res, next) {
        const userSeq = req.body.userSeq;
        const recruitSeq = req.body.recruitSeq;

        const result = await scrapService.remove(userSeq, recruitSeq);

        res.json({
            result: (result == null) ? 'fail' : 'success',
            data: result
        })
    },
    // seq로 한개의 스크랩 삭제
    async removeSeq(req, res, next) {
        const seq = req.body.seq;

        const result = await scrapService.removeSeq(seq);

        res.json({
            result: (result == null) ? 'fail' : 'success',
            data: result
        })
    },

    // 전체 스크랩 리스트
    async list(req, res, next) {
        const seq = req.body.seq;

        const result = await scrapService.list(seq);

        res.json({
            result: (result == null) ? 'fail' : 'success',
            data: result
        })
    }

    // // 유저의 seq로 해당 유저가 스크랩한 리스트
    // async list(req, res, next) {
    //     const userSeq = req.body.userSeq;
        
    //     const list = await recruitService.list(null, 'Y', null, null, null, null, null, null, null, userSeq, 1, 100);

    //     res.status(200).json({
    //         result: 'success',
    //         data: {
    //             list: list
    //         }
    //     });    
    // },

}


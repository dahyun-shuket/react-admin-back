const {  create, list} = require('../model/mart.js');
const martService = require('../model/mart.js');
const secrectKey = require('../config/secretkey').secrectKey;
const option = require('../config/secretkey').option;

module.exports = {

    // create: async (req, res) => {
    //     let name = req.body.NAME;
    //     let logofile =req.file.LOGOFILE;
    //     let regno = req.body.REGNO;

    //     let address = req.body.ADDRESS;

    //     let contact = req.body.CONTACT;
    // }


    // 유저 생성
    async create(req, res, next) {
        let name = req.body.NAME;
        // let logofile = `./upload/${req.file.LOGOFILE}`;
        // let logofile = '/image/' + req.file.LOGOFILE;
        let logofile = req.body.LOGOFILE;
        // let logofile =req.file.LOGOFILE;
        let regno = req.body.REGNO;

        let address = req.body.ADDRESS;

        let contact = req.body.CONTACT;

        let result = await martService.create(name,logofile, regno, address, contact);
        return res.json({
            result: "success",
            data: {
                list: result,
                // totalCount: totalCount
            }
        });
    },

  
    // 마트 리스트
    async list(req, res, next){

        let seq = req.body.SEQ;

        let name = req.body.NAME;

        let regno = req.body.REGNO;

        let logofile = req.body.LOGOFILE;

        let address = req.body.ADDRESS;

        let contact = req.body.CONTACT;

        const result = await martService.list(seq, name,logofile, regno, address, contact);

        return res.json({
            result: "success",
            data: {
                list: result,
                // totalCount: totalCount
            }
        });

    },

    // 마트 가져오기
    async get(req, res, next){
        let seq = req.body.SEQ;
        // let name = req.body.NAME;
        // let regno = req.body.REGNO;
        // let postcode = req.body.POSTCODE;
        // let address = req.body.ADDRESS;
        // let addressextra = req.body.ADDRESSEXTRA;
        // let contact = req.body.CONTACT;
        // let hroname = req.body.HRONAME;
        // let hrocontact = req.body.HROCONTACT;
        // let hrorank = req.body.HRORANK;

        const result = await martService.get(seq);

        res.json({
            result: (result === null) ? 'fail' : 'success',
            data: result
        })

    },

    // 마트 제거
    async remove(req, res, next){
        let seq = req.body.SEQ;

        const result = await martService.remove(seq);

        res.json({
            result: (result === null) ? 'fail' : 'success',
            data: result
        })

    },

    // 마트 수정
    async update(req, res, next) {
        let seq = req.body.SEQ;
        let name = req.body.NAME;
        let regno = req.body.REGNO;
        let postcode = req.body.POSTCODE;
        let address = req.body.ADDRESS;
        let addressextra = req.body.ADDRESSEXTRA;
        let contact = req.body.CONTACT;
        let hroname = req.body.HRONAME;
        let hrocontact = req.body.HROCONTACT;
        let hrorank = req.body.HRORANK;

        const result = await martService.update(seq, name, regno, postcode, address, addressextra, contact, hroname, hrocontact, hrorank );

        res.json({
            result: (result == null) ? 'fail' : 'success',
            data: result
        })
    },

    // 마트 로고 수정
    async logo(req, res, next) {        
        const seq = req.body.SEQ;
        // const logoFile = req.body.LOGOFILE;

        const location = req.body.LOCATION;
        const logoFile = location + "/" + req.body.LOGOFILE;

        console.log(logoFile)
        const result = await martService.logo(req.app.get('mediaPath'), seq, logoFile);

        // res.json({
        //     result: (result == null) ? 'fail' : 'success',
        //     data: result
        // })
        return res.json({
            result: "success",
            data: {
                list: result,
            }
        });
    },

    // 마트 로고 수정
    async updateLogo(req, res, next) {
        let seq = req.body.SEQ;
        let logofile = req.file.filename;
        const result = await martService.updateLogo(seq, logofile);

        res.json({
            result: (result == null) ? 'fail' : 'success',
            data: result
        })
    }




}
// module.exports = mart;
const jwt = require("jsonwebtoken");
module.exports = {
    async isAuthorized(req, res, next) {
        const token = req.headers['authorization'] || req.query.token;
        const secretKey = req.body.key || req.query.key;

        if (token) {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    res.json({
                        result: "fail",
                        data: err
                    });
                } else {
                    console.log('info', `controller/isAuthorized: 토큰체크 완료`);

                    res.json({
                        result: "success",
                        data: decoded.result
                    });                    
                }
            });
        } else {
            console.log('error', `controller/isAuthorized: 토큰 없음`);           
            res.json({
                result: "fail",
                data: "인증되지 않았습니다"                 
            });
        }
    }
    
}
const jwt = require("jsonwebtoken");


module.exports = {
    tokenVerify: (req, res, next) => {
        // 헤더에서 가져온 토큰
        let token = req.get("Authorization");
        
        const secretKey = (req.body.key) ? req.body.key : req.query.key

        if (token) {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    console.log('info', `services/auth: 비정상 토큰 ${err}`);
                    return res.json({
                        result: "fail",
                        resultdata: "Invalid Token..."
                    });
                } else {
                    console.log('info', `services/auth: 토큰체크완료: ${decoded}`);           
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            console.log('info', `services/auth: 인증되지 않은 사용자`);
            return res.json({
                result: "fail",
                resultdata: "Access Denied! Unauthorized User"
            });
        }
    },
};

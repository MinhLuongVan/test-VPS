const jwt = require('jsonwebtoken')

const middleware = {

    verifyToken : (req,res,next) =>{
        const token = req.headers.token;//hs256
       
        if(token){
            const Token = token.split(" ")[1];
           
            jwt.verify(Token,process.env.JWT_ACCESS_KEY,(error,user) =>{
                if(error){
                  console.log(error)
                  return res.status(403).json("Token đã hết hạn");
                }
                req.user = user;
                // console.log("verify", user)
                next();
            });
    
        }
        else{
           return res.status(401).json("Bạn chưa có token");//Header yêu cầu không chứa mã xác thực cần thiết và client bị từ chối truy cập.
        }
    },
   verifyTokenAuth : (req,res,next) =>{
    middleware.verifyToken(req,res,() =>{
        //  if(req.user.id == req.params.id || req.user.isAdmin )
        if(req.user.isAdmin || req.user.id == req.params.id )
         { 
            next();
        }else{
           return res.status(403).json("Bạn không có quyền sửa hoặc xóa");//Client không được phép xem một file nhất định
        }
        
    }); 
   }
}
module.exports = middleware;
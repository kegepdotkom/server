const jwt     = require('jsonwebtoken')
const User    = require("../models.user")

function isLogin(req,res,next){
  let token = req.headers.token
  if(token){
    jwt.verify(token,process.env.SECRET,function(err,decoded){
      if(!err){
        User.findOne({email:decoded.email},
          function(err,user){
            if(err) res.status(500).json({message : `access denied`})
            else{              
              next()
            }
          })
      }else{
        res.status(500).json({message:"access denied"})
      }
    })
  }else{
    res.status(500).json({message:"access denied"})
  }
}

module.exports = islogin

const User = require('../models/user')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

module.exports = {
    register: (req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            imgUrl: 'https://pro2-bar-s3-cdn-cf3.myportfolio.com/8ee9e0df6a57e6cb08ce8298364354c5/e01d8c8ac8d02856d9ca18a0_rw_1920.jpg?h=cd2ded3063a9f9cc22079f881abdf8f9'
        })
        .then(data => {
            res.status(200).json({
                msg: 'success register',
                data: data
            })
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
    },
    login: (req, res) => {
        User.findOne({
            username: req.body.username
        })
        .then(data => {
            if(!data) {
                res.status(400).json({
                    msg: 'wrong username'
                })
            } else {
                let check = bcrypt.compare(data.password, req.body.password)
                if(!check) {
                    res.status(400).json({
                        msg: 'wrong password'
                    })
                } else {
                    res.status(200).json({
                        token: jwt.token(data),
                        username: req.body.username,
                        imgUrl: data.imgUrl
                    })
                }
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                err: err
            })
        })
    },
    edit: (req, res) => {
        User.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })  
        .then(data => {
            res.status(200).json({
                msg: 'success edit profile',
                data: data
            })
        })
        .catch(err => {
            res.status(400).json({
                err: err
            })
        })
    }
}
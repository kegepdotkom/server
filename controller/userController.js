const User = require('../models/user')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

module.exports = {
    register: (req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            imgUrl: req.body.imgUrl
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
                console.log(req.body)
                let check = bcrypt.compare(data.password, req.body.password)
                if(!check) {
                    res.status(400).json({
                        msg: 'wrong password'
                    })
                } else {
                    res.status(200).json({
                        token: jwt.token(data)
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
            password: req.body.password,
            imgUrl: req.body.imgUrl
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
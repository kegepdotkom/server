const Media = require('../models/media')
var multer  = require('multer')

module.exports = {
    read(req, res) {
        Media.find({}).populate('User')
            .then(media => {
                res.status(200).json({media})
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            })
    },
    store(req, res) {
        Media.create({
            url: req.body.url,
            like: req.body.like,
            title: req.body.title,
            description: req.body.description,
            comment: req.body.comment
        })
            .then(media => {
                res.status(201).json({media})
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            })
    },
    update(req, res) {
        Media.updateOne({
            _id: req.params.id
        }, req.body)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(400).json({err: err.message})
        })
    },
    delete(req, res) {
        Media.deleteOne({
            _id: req.params.id
        })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                console.log(err.message)
                res.status(400).json({err: err.message})
            })
    }
}
const Media = require('../models/media')

module.exports = {
    read(req, res) {
        console.log('=================')
        Media.find({}).populate('like')
            .then(media => {
                res.status(200).json({media})
            })
            .catch(err => {
                res.status(400).json({err: err.message})
            })
    },
    store(req, res) {
        Media.create({
            url: req.file.cloudStoragePublicUrl,
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
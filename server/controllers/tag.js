const Tag = require('../models/tag')
class TagController {
    static create(req,res) {
        const { tag } = req.body

        Tag.create({ tag })
        .then(created => {
            res.status(201).json(created)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'Error while creating new tags'
            })
        })
    }

    static findAll(req,res) {
        let query = {}
        //insert query later if neede

        Tag.find(query)
        .then(found => {
            res.status(200).json(found)
        })
        .catch(err => {
            res.status(500).json({
                message:err.message,
                error: 'Error while finding tag'
            })
        })
    }

    static deleteOne(req,res) {
        const _id = req.params.id
        Tag.findOneAndDelete({_id})
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(500).json({
                message:err.message,
                error: 'Error while deleting tag'
            })
        })
    }

}
module.exports = TagController
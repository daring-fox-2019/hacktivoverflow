const Tag = require('../models/tag')

class TagController {
    static findAll(req, res) {
        Tag.find()
        .then(list => {
            res.status(200).json(list)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static findOne(req, res) {
        Tag.findOne({_id: req.params.id})
            .then(found => {
                res.status(200).json(found)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        let newObj = {
            name: req.body.name
        }

        console.log(`tag creation...`);
        Tag.create(newObj)
        .then(created => {
            console.log(`tag created...`);
            res.status(201).json(created)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static delete(req, res) {
        Tag.findOneAndDelete({_id: req.params.id})
            .then(obj => {
                res.status(200).json(obj)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        let updates = {
            name: req.body.name
        }

        Tag.findOneAndUpdate({_id: req.params.id}, updates, {new: true})
            .then(obj => {
                res.status(200).json(obj)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = TagController
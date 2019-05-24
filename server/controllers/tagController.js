const Tag = require('../models/tagModel')
const User = require('../models/userModel')
class TagController {
    static async showAll(req, res) {
        try {
            let tags = await Tag.find({})
            res.status(200).json(tags)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async delete(req, res) {
        try {
            let deleted = await Tag.findByIdAndDelete(req.params.id)
            res.status(200).json(deleted)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async addTagToUser(req, res) {
        try {
           
            let user = await User.findById(req.authenticatedUser.id)
            if (user.favTags.indexOf(req.body.tag) < 0) {
                let updated = await User.findByIdAndUpdate(req.authenticatedUser.id, {
                    $push : {
                        favTags : req.body.tag
                    }
                },{ new : true })
                res.status(200).json({ updated, message : 'successfully add tag to your watch'})
            } else {
                res.status(400).json({
                    message : 'You already add this tag'
                })
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

}

module.exports = TagController
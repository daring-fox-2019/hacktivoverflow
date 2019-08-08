const Tag = require('../models/tag')
const User = require('../models/user')

class TagController {


  static async create(req,res) {
    try {
      let created = await Tag.create({...req.body})
      res.status(200).json(created)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async deleteTag(req, res) {
    try {
      let foundAndDeleted = await Tag.findByIdAndDelete(req.params.id)
      if (foundAndDeleted) res.status(200).json(foundAndDeleted)
      else res.status(404).json({message : 'Tag is not found'})
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async addTagToUser(req, res) {
    try {
      console.log(req.body.tags);
      
      let found = await User.findById(req.authenticatedUser.id)
      console.log(found, '??');

      if (found.tags.indexOf(req.body.tags) < 0 ) {
        let updated = await User.findOneAndUpdate({_id : req.authenticatedUser.id}, { $push : {tags : req.body.tags} },{new : true})
        res.status(200).json(updated)

      } else {
        res.status(400).json({message : 'You already have this tag'})
      }
 

    } catch (error) {
      console.log(error);
      
      res.status(500).json(error)

    }
  }

  static async findAll(req, res) {
    try {
        let found = await Tag.find({}).populate('questions')
        res.status(200).json(found)
    } catch (error) {
        res.status(500).json(error)
    }
  }

  static async findOne(req, res) {
    try {
      let found = await Tag.find({name : req.body.name}).populate('questions')
      res.status(200).json(found)
  } catch (error) {
      res.status(500).json(error)
  }
  }
}

module.exports = TagController
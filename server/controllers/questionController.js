const Question = require("../models/questionModel");
const Tag = require("../models/tagModel");
const User = require("../models/userModel");

class QuestionController {
  static async create(req, res) {
    try {
      let created = await Question.create({
        title: req.body.title,
        description: req.body.description,
        user: req.body.user,
        tags: []
      });

      let allTags = await Tag.find({});
      req.body.tags.forEach(async inputTag => {
        if (allTags.indexOf(inputTag) < 0) {
          let newtag = await Tag.create({ tagName: inputTag });
          await Question.findByIdAndUpdate(
            { _id: created._id },
            { $push: { tags: newtag._id } },
            { new: true }
          );

          newtag.questions.push(created._id);
          await newtag.save();
        } else {
          let existing = await Tag.findOne({ tagName: inputTag });
          await Question.findByIdAndUpdate(
            { _id: created._id },
            { $push: { tags: existing._id } },
            { new: true }
          );

          existing.questions.push(created._id);
          await existing.save();
        }
      });

      res
        .status(201)
        .json({ created, message: "Question successfully posted!" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static showAll(req, res) {
    
    Question.find()
      .populate("user")
      .populate("tags")
      .then(questions => {
        if (!questions) {
          res
            .status(200)
            .json({ questions, message: "There is no questions posted yet" });
        } else {
          res.status(200).json(questions);
        }
      })
      .catch(err => {
        console.log(err.message);
        
        res.status(500).json(err.message);
      });
  }

  static showList(req, res) {
    Question.find({ user: req.authenticatedUser.id })
      .populate("user")
      .populate("tags")
      .then(questions => {
        res.status(200).json(questions);
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  }

  static showOne(req, res) {
    Question.findById({ _id: req.params.questionId })
      .populate("user")
      .populate("tags")
      .populate("answers")
      .then(question => {
        res.status(200).json(question);
      })
      .catch(err => {
        res.status(500).json(err.message);
      });
  }

  static async showByTags(req, res) {
    try {
      let resultQuestion = [];
      let user = await User.findById(rqe.authenticatedUser.id);

      user.favTags.forEach(async tag => {
        let question = await Question.find({ tags: tag });
        console.log(question);
        resultQuestion.push(question);
      });

      res.status.json(resultQuestion);
    } catch (error) {
      console.log(error);

      res.status(500).json(error);
    }
  }

  static async preferredDiscussions(req, res) {
    try {
      if (req.query.watched) {
        let user = await User.findById(req.authenticatedUser.id);

        let findTags = user.favTags;

        let result = await Question.find({ tags: { $in: findTags } })
          .populate("user")
          .populate("tags");
        console.log(result, "=== result");
        res.status(200).json(result);
      } else {
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static upvote(req, res) {
    let totalVotes = 0;
    let question = null;
    let countVotes = 0
    Question.findById(req.params.questionId)
      .populate("user")
      .then(data => {
        totalVotes = Math.abs(data.upvotes.length - data.downvotes.length);
        question = data;
        let downVote = data.downvotes.find(el => {
          return el == req.authenticatedUser.id;
        });
        let upVote = data.upvotes.find(el => {
          return el == req.authenticatedUser.id;
        });
        let sameVoter = req.authenticatedUser.id == data.user._id;

        if (sameVoter) {
          res.status(400).json({
            message: "you cannot vote your question"
          });
        } else if (!downVote && !upVote) {
          data.upvotes.push(req.authenticatedUser.id);
          return data.save();
        } else if (downVote && !upVote) {
          data.downvotes = data.downvotes.filter(el => {
            return el.toString() !== req.authenticatedUser.id;
          });
          data.upvotes.push(req.authenticatedUser.id);
          return data.save();
        } else if (!downVote && upVote) {
          res.status(400).json({
            message: "You already upvote this question"
          });
        }
      })
      .then(question => {
        totalVotes = Math.abs(
          question.upvotes.length - question.downvotes.length
        );
        countVotes = question.upvotes.length - question.downvotes.length
        res.status(200).json({ totalVotes, countVotes });
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err);
      });
  }

  static downvote(req, res) {
    let totalVotes = 0;
    let countVotes = 0
    Question.findById({ _id: req.params.questionId })
      .then(data => {
        console.log(data, "=== this is data");

        totalVotes = Math.abs(data.upvotes.length - data.downvotes.length);
        let sameVoter = data.user == req.authenticatedUser.id;

        let downVote = data.downvotes.find(el => {
          return el == req.authenticatedUser.id;
        });
        let upVote = data.upvotes.find(el => {
          return el == req.authenticatedUser.id.toString();
        });

        if (sameVoter) {
          res.status(400).json({
            message: "you cannot vote your question"
          });
        } else if (!downVote && !upVote) {
          data.downvotes.push(req.authenticatedUser.id);
          return data.save();
        } else if (upVote && !downVote) {
          data.upvotes = data.upvotes.filter(el => {
            return el.toString() !== req.authenticatedUser.id;
          });
          data.downvotes.push(req.authenticatedUser.id);
          return data.save();
        } else if (!upVote && downVote) {
          res.status(400).json({
            message: "You already downvote this question"
          });
        }
      })
      .then(question => {
        totalVotes = Math.abs(question.upvotes.length - question.downvotes.length);
        countVotes = question.upvotes.length - question.downvotes.length
        res.status(200).json({totalVotes, countVotes});
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err);
      });
  }

  static async delete(req, res) {
    try {
      let deleted = await Question.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ deleted, message: "You have successfully delete question" });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async update(req, res) {
    try {
      // console.log(req.body, "body ??");
      let { tags } = req.body;
      // console.log('masuk 1');
      let updated = await Question.findByIdAndUpdate(req.params.id, {
        $set: {
          title: req.body.title,
          description: req.body.description,
          tags: []
        }
      }, {new : true});

      // console.log(updated, 'COYYYY');
      
      let tagNamesFromdb = [];

      let allTags = await Tag.find({});
      allTags.forEach(inputTagByUser => {
        tagNamesFromdb.push(inputTagByUser.tagName.toLowerCase());
      });

      // console.log(tagNamesFromdb, 'APAKAH TAG NAMES ITU')
      // console.log('masuk 3');

      req.body.tags.forEach(async inputTagByUser => {
        console.log(inputTagByUser, 'IN CHECK NOW');
        
        if (tagNamesFromdb.indexOf(inputTagByUser.toLowerCase()) < 0) {
          console.log(tagNamesFromdb.indexOf(inputTagByUser.toLowerCase()) < 0, 'YAYA');
          
          let newTag = await Tag.create({ tagName: inputTagByUser });
          console.log('masuk 3,5');
          await Question.findByIdAndUpdate(
            { _id: req.params.id },
            { $push: { tags: newTag._id } },
            { new: true }
          );
          

          newTag.questions.push(req.params.id);
          await newTag.save();
          console.log('masuk 4');
        } else {
          let existing = await Tag.findOne({ tagName: inputTagByUser });

          await Question.findByIdAndUpdate(
            { _id: req.params.id },
            { $addToSet: { tags: existing._id } },
            { new: true }
          );

          existing.questions.push(req.params.id);
          await existing.save();
          // console.log('masuk 5');
        }
      });

      res
        .status(200)
        .json({ updated, message: "You successfully update question" });
        // console.log('masuk 6');
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = QuestionController;

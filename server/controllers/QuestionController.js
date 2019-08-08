const Question = require('../models/question')
const Tag = require('../models/tag')
const User = require('../models/user')
class QuestionController {

    static findOne(req, res) {

        console.log('masuk sini/?');
        console.log('APA ISIYA', req.params.questionId);

        Question.findById(req.params.questionId).populate('tags')
            .populate('userId')
            .then(found => {
                if (found) res.status(200).json(found)
                else res.status(404).json({
                    message: 'No such question'
                })
            })
            .catch(err => {
                console.log(err, 'err bagian cari qs');
                res.status(400).json(err)
            })
    }

    static async findByTag(req, res) {
        try {
            let data = await Question.find({
                tags: {
                    "$in": [req.body.tag]
                }
            }).populate('tags')
            .populate('userId')
            res.status(500).json(error)
            
        } catch (error) {
            res.status(500).json(error)
        }
        Question.find({
                tags: {
                    "$in": [req.body.tag]
                }
            }).populate('tags')
            .populate('userId')
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static findByUser(req, res) {
        // console.log('keterima pas minta')
        Question.find({
                userId: req.params.userId
            }).populate('tags')
            .populate('userId')
            .then(found => {
                if (found) res.status(200).json(found)
                else res.status(404).json({
                    message: 'No such question on that user'
                })
            })
            .catch(err => {
                console.log(err, 'err bagian cari qs');
                res.status(400).json(err)
            })
    }

    static async findWatched(req, res) {
        // console.log('masuk get sini');
        try {
            console.log(req.query.watched, 'APA CUY');

            if (req.query.watched == 'true') {
                console.log('AATAAAAS');

                let user = await User.findById(req.authenticatedUser.id)
                console.log('adaUSERRR', user);

                let tagsToFind = user.tags
                // console.log(tagsToFind, '//////');
                let qs = await Question.find({tags : {$in : tagsToFind}}).populate('userId').populate('tags')
                
    
                res.status(200).json(qs)
            } else {
                console.log('BAWAAAAAHHHHH');
                let found = await Question.find({}).populate('tags').populate('userId')
                res.status(200).json(found)
            }

        } catch (error) {
            console.log(error, 'APAPAPAPAPA');

            res.status(500).json(error)
        }
    }

    static async findAll(req, res) {
        console.log('masuk get sini');
        try {

            let { tag, title } = req.query
            let obj = {}
    
            if( tag || title ) { 
               let data = await Tag.find({name : tag})
                   title = new RegExp(`${title}`) 
                   obj = { $or: [{'title' :{ $regex: title , $options: 'i' }} ,{ 'tags' : {$in : data} }] }
            }
         
            let result = await Question.find(obj).populate('userId').populate('tags')
            res.status(200).json(result)

        } catch (error) {
            console.log(error, 'APAPAPAPAPA');

            res.status(500).json(error)
        }
    }

    static async createQuestion(req, res) {
        console.log(req.body, 'HAHAHAHAH');
        try {

            let created = await Question.create({
                ...req.body,
                tags: [],
                userId: req.authenticatedUser.id,
                upVotes: [],
                downVotes: []
            })
            let allTags = await Tag.find({})
            req.body.tags.forEach(async inputTag => {
                if (allTags.indexOf(inputTag) < 0) {
                    let newtag = await Tag.create({
                        name: inputTag
                    })
                    await Question.findByIdAndUpdate({
                        _id: created.id
                    }, {
                        $push: {
                            tags: newtag._id
                        }
                    }, {
                        new: true
                    })
                    let masukgasih = await Tag.findByIdAndUpdate(newtag._id, {
                        $push: {
                            questions: created._id
                        }
                    })
                    await masukgasih.save()

                } else {
                    let existing = await Tag.findOne({
                        name: inputTag
                    })
                    await Question.findByIdAndUpdate({
                        _id: created.id
                    }, {
                        $push: {
                            tags: existing._id
                        }
                    }, {
                        new: true
                    })
                    let kebuat = await Tag.findByIdAndUpdate(existing._id, {
                        $push: {
                            questions: created._id
                        }
                    })
                    await kebuat.save()
                }
            })

            console.log('3 kapan');
            res.status(201).json(created)
            console.log('4');

        } catch (error) {
            res.status(500).json(error)
        }

    }

    static async deleteQuestion(req, res) {
        // console.log('masuk gak');
        try {
            let del = await Question.findByIdAndRemove({
                _id: req.params.questionId
            })
            if (del) res.status(200).json(del)
            else res.status(404).json({
                message: 'No such question'
            })
        } catch (error) {
            console.log(err, '???err bagian delete qs');
            res.status(500).json(err)
        }
    }

    static async updateQuestion(req, res) {

        try {
           let updated = await Question.findByIdAndUpdate(req.params.questionId, {
               $set : { 
                   ...req.body, tags : []
               }
           }, {new : true})
           let tagNamesFromDb = []
           let allTags = await Tag.find({})
           allTags.forEach(inputTagByUser => {
               tagNamesFromDb.push(inputTagByUser.name.toLowerCase())
           })

           req.body.tags.forEach(async inputTagByUser => {
               console.log(inputTagByUser, 'IN CHECK NOW');
               
               if (tagNamesFromDb.indexOf(inputTagByUser.toLowerCase() < 0)) {
                   let newTag = await Tag.create({name : inputTagByUser})
                   await Question.findByIdAndUpdate(req.params.questionId, {$push : {tags : newTag._id}}, {new : true})
                  
                   newTag.questions.push(req.params.id)
                   await newTag.save()
               } else {
                   let existing = await Tag.findOne({name : inputTagByUser})
                   await Question.findByIdAndUpdate(req.params.questionId, 
                    {
                       $addToSet : {tags : existing._id}
                    },
                    {
                        new : true
                    })

                    existing.questions.push(req.params.id)
                    await existing.save()
               }

           })
           res.status(200).json(updated)

        } catch (error) {
            console.log(error);
            
            console.log(err, 'err bagian update qs');
            res.status(500).json(err)
        }
    }



    static async downVote(req, res) {
        try {

            let pertanyaan = await Question.findById(req.params.questionId).populate('userId')
            let idxUp = pertanyaan.upVotes.find((x) => {
                return x == req.authenticatedUser.id
            })
            let idxDown = pertanyaan.downVotes.find((x) => {
                return x == req.authenticatedUser.id
            })
            console.log(idxUp, 'naeekkkkk ==== tuurunnnn', idxDown);
            let samePerson = req.authenticatedUser.id == pertanyaan.userId._id

            if (samePerson) {
                res.status(400).json({
                    message: 'You cannot vote your own question'
                })
            } else if (!idxUp && !idxDown) {
                pertanyaan.downVotes.push(req.authenticatedUser.id)
                await pertanyaan.save()
            } else if (idxUp && !idxDown) {
                pertanyaan.upVotes = pertanyaan.upVotes.filter(user => user.toString() != req.authenticatedUser.id.toString())
                pertanyaan.downVotes.push(req.authenticatedUser.id)
                await pertanyaan.save()
            } else if (!idxUp && idxDown) {
                res.status(400).json({
                    message: 'You have already downvoted'
                })
                // await pertanyaan.save()
            }
            res.status(200).json(pertanyaan)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async upVote(req, res) {
        try {

            let pertanyaan = await Question.findById(req.params.questionId).populate('userId')
            let idxUp = pertanyaan.upVotes.find((x) => {
                return x == req.authenticatedUser.id
            })
            let idxDown = pertanyaan.downVotes.find((x) => {
                return x == req.authenticatedUser.id
            })
            console.log(idxUp, 'naeekkkkk ==== tuurunnnn', idxDown);
            let samePerson = req.authenticatedUser.id == pertanyaan.userId._id


            if (samePerson) {
                res.status(400).json({
                    message: 'You cannot vote your own question'})
            } else if (!idxUp && !idxDown) {
                pertanyaan.upVotes.push(req.authenticatedUser.id)
                await pertanyaan.save()
            } else if (!idxUp && idxDown) {
                pertanyaan.downVotes = pertanyaan.downVotes.filter(el => {
                    return el.toString() != req.authenticatedUser.id
                })
                pertanyaan.upVotes.push(req.authenticatedUser.id)
                await pertanyaan.save()
            } else if (idxUp && !idxDown) {
                res.status(400).json({
                    message: 'You have already upvoted'
                })

            }
            res.status(200).json(pertanyaan)
        } catch (error) {

            console.log(error, 'AAOAOAAO');

            res.status(500).json(error)
        }
    }

}

module.exports = QuestionController
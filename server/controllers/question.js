const questionModel = require('../models/question')
const answerModel = require('../models/answer')

class Question {
    
    static createQuestion(req, res, next){
        const { title, description, tags } = req.body
        const user_id = req.decoded.id
        const upvotes = []
        const downvotes = []
        const answers = []

        questionModel.create( {title, description, user_id, upvotes, downvotes, tags, answers })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err =>{
            next( err )
        })
    }

    static patchUpvote(req, res, next){
        const _id = req.params.id
        const user_id = req.decoded.id

        Promise.all([
           questionModel.findOneAndUpdate({ _id }, {$addToSet : { upvotes: user_id }}),
           questionModel.findOneAndUpdate({ _id }, {$pull : { downvotes: user_id }})
        ])
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err =>{
            next( err )
        })
    }

    static patchDownvote(req, res){
        const _id = req.params.id
        const user_id = req.decoded.id

        Promise.all([
           questionModel.findOneAndUpdate({ _id }, {$addToSet : { downvotes: user_id }}),
           questionModel.findOneAndUpdate({ _id }, {$pull : { upvotes: user_id }})
        ])
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err =>{
            next( err )
        })
    }

    static getAllQuestion(req, res, next){
        const { tag, search } = req.query
        let user_id
        let obj = {}

        if( search ){
            obj = {$or :[{ title : { $regex : search, $options: 'i'}}, { 'tags.text' : { $regex : search, $options: 'i'}}]}
        }

        if( tag){
            obj = { 'tags.text' : {$regex : tag, $options: 'i'}}
        }

        if(req.decoded){
            user_id = req.decoded.id
            obj = {$and: [{ user_id }, obj]}
        }

        console.log(obj)

        questionModel.find( obj )
        .populate({path:'user_id', select: ['name', 'email']})
        .populate({ path: 'answers',
            populate : { path:'user_id', select: ['name', 'email']}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err =>{
            next( err )
        })
    }

    static getOneQuestion(req, res, next){
        const _id = req.params.id

        questionModel.findOne({ _id })
        .populate({path:'user_id', select: ['name', 'email']})
        .populate({ path: 'answers',
            populate : { path:'user_id', select: ['name', 'email']}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err =>{
            next( err )
        })
    }


    static getQuestionById(req,res){
        const id = req.params.id

        questionModel.findById({_id: id})
        .populate({path:'user_id', select: ['name', 'email']})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err =>{
            next( err )
        })
    }

    static updateQuestion(req,res){
        const _id = req.params.id
        const {title, description} = req.body
        const obj = {title, description }

        Object.keys(obj).map( el => {
            if(!obj[el]){
                delete obj[el]
            }
        })

        questionModel.findByIdAndUpdate({ _id }, obj , {new : true})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err =>{
            next( err )
        })
    }

    static checkTag(req, res, next){
        const inputTag = req.query.tag

        questionModel.find({ 'tags.text' : {$regex : inputTag,  $options: 'i' }})
        .then( data => {
            let tags = []
            data.map( el => {
                let newArr = new Set(...[el.tags.map( tag => tag.text)])
                tags = [...new Set([...newArr, ...tags])] 
            })
            
            res.status(200).json(tags)
        })
        .catch( err => {
            next( err )
        })
    }

    static deleteQuestion(req,res, next){
        const _id = req.params.id

        Promise.all([ 
            answerModel.deleteMany({ question_id : _id }),
            questionModel.findOneAndDelete({ _id })
        ])
        .then(data => {
            res.status(200).json(data[1])
        })
        .catch(err =>{
            console.log( err)
            next( err )
        })
    }
}

module.exports = Question
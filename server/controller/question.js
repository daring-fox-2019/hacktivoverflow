const { wrapAsync, givesError } = require('../helpers')
const Question = require('../models/question')
// const { deleteFromBucket } = require('../helpers/image-utility')
// const logz = k => { console.log(`~~~~~logz~~~~~~~`); console.log(k); console.log(`~~~~~~~~~~~~~~~~~~~`) }


const functions = {
    GetQuestionHome: wrapAsync(async function (req, res) {
        let search = {}
        let questions = await Question.find(search).select('by title').populate('by', 'name email')
        res.json(questions);
    }),
    GetTopic: wrapAsync(async function (req, res) {
        console.log(req.params)
        let search = { _id: req.params.id }        
        let topic = await Question.findOne(search).populate('by', 'name email').populate('answers').populate('comments')
        console.log(`returning a topic`)
        if (topic) {
            res.json(topic);
        }else throw givesError(400, 'bad parameter request')

    }),
    Post: wrapAsync(async function (req, res) {
        let newQuestion = { by: req.user._id, ...req.body }
        let question = await Question.create(newQuestion)
        if (question) {
            res.status(201).json(question)
        } else throw givesError(500, 'internal server error, the data cannot be created')
    }),
    Patch: wrapAsync(async function (req, res) {
        let products = await Question.find(search)
        res.json(products);
    }),
    Delete: wrapAsync(async function (req, res) {
        let products = await Question.find(search)
        res.json(products);
    })
}


module.exports = functions
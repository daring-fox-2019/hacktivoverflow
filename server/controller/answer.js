const { wrapAsync, givesError } = require('../helpers')
const Answer = require('../models/answer')
const Question = require('../models/question')
const { deleteFromBucket } = require('../helpers/image-utility')
const logz = k => {
    console.log(`~~~~~logz~~~~~~~`);
    console.log(k);
    console.log(`~~~~~~~~~~~~~~~~~~~`)
}


const functions = {
    GetOneAnswer: wrapAsync(async function (req, res) {
        // let search = {}
        console.log(req.params)
        let answer = await Answer.findOne({ _id: req.params.id }).populate('by', 'name email')
        if (answer)
            res.json(answer);
        else { throw givesError(404,`cannot find the answer author data`) }
    }),
    Post: wrapAsync(async function (req, res) {
        let question = await Question.findOne({ _id: req.body.questionId })
        if (question) {
            let newAnswer = { ...req.body }
            let answer = await Answer.create(newAnswer)
            if (answer) {
                question.answers.push(answer)
                console.log(question.answers)
                let answered = await question.save()
                if (answered) {
                    res.status(201).json(answer);
                } else throw givesError(500, `cannot answer`)
            }
        } else throw givesError(500, `cannot find the right topic`)
    }),
    Patch: wrapAsync(async function (req, res) {

        // let skip = 0,limit = 0
        let products = await Answer.find(search)
        res.json(products);
    }),
    Delete: wrapAsync(async function (req, res) {

        // let skip = 0,limit = 0
        let products = await Answer.find(search)
        res.json(products);
    })
}


module.exports = functions




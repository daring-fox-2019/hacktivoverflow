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
        let answer = await Answer.findOne({ _id: req.params.id }).populate('by', 'name email').populate('comments')
        if (answer)
            res.json(answer);
        else { throw givesError(404, `cannot find the answer author data`) }
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
                } else throw givesError(500, `cannot attach the answer`)
            }
        } else throw givesError(500, `cannot find the right topic`)
    }),
    Patch: wrapAsync(async function (req, res) {
        req.answer.content = req.body.content;
        let newAnswer = await req.answer.save({new:true})
        if(newAnswer ){
            console.log(newAnswer.toObject())
            res.json(newAnswer.toObject());
        }else throw givesError(500,'process cannot update this answer')        
    }),
    Delete: wrapAsync(async function (req, res) {
        console.log(req.body, req.params)
        let question = await Question.update({ _id: req.params.question }, { $pull: { answers: {_id: req.params.id}}})
        console.log(question.n, question.nModified)
        if(question.nModified>0){
            let answer = await req.answer.remove()
            if (answer.$isDeleted()) {
                res.status(204).json();
            } else throw givesError(500, `cannot be deleted`)
        } else throw givesError(500,`cannot be unassociated`)
    })
}


module.exports = functions




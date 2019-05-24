const { wrapAsync, givesError } = require('../helpers')
const Comment = require('../models/comment')
// const { deleteFromBucket } = require('../helpers/image-utility')
// const logz = k => { console.log(`~~~~~logz~~~~~~~`); console.log(k); console.log(`~~~~~~~~~~~~~~~~~~~`) }


const functions = {
    
    GetOne: wrapAsync(async function (req, res) {
        let search = {}
        // let skip = 0,limit = 0
        let products = await Comment.find(search)        
        res.json(products);        
    }),
    Post: wrapAsync(async function (req, res) {
        
        // let skip = 0,limit = 0
        let products = await Comment.find(search)        
        res.json(products);        
    }),
    Patch: wrapAsync(async function (req, res) {
        
        // let skip = 0,limit = 0
        let products = await Comment.find(search)        
        res.json(products);        
    }),
    Delete: wrapAsync(async function (req, res) {
        
        // let skip = 0,limit = 0
        let products = await Comment.find(search)        
        res.json(products);        
    })
}


module.exports = functions
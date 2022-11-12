const mongoose = require("mongoose") ;
const { ObjectId } = mongoose.Schema.Types


const postSchema = mongoose.Schema({
    title : {
         type : String ,
         required : true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        required : false,
        default : 0
    },
    unlike: {
        type: Number,
        required : false,
        default : 0
    },
    time : {
        type : Date ,
        default: Date.now
    },
    
    id: {
        type: String,
        required : true
    }

})

const post = mongoose.model("POST", postSchema)
module.exports = post ;
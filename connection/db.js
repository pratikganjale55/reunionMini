const mongoose = require("mongoose") ;
const db = process.env.DATABASE ;

const connection = mongoose.connect(db) .then(() => {
     console.log("database connection successful")
}).catch((e) => {
    console.log(e) ;
})

module.exports = connection ;
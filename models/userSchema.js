const mongoose = require("mongoose") ;
const jwt = require("jsonwebtoken") ;
const secretValue = process.env.SECREAT_TOKEN ;

const UserSchema = mongoose.Schema({
    name : {
        type : String ,
        require : true 
    },
    email : {
        type : String ,
        require : true 
    },
    image : {
        type : String ,
        require : true 
    },
    bio: {
        type : String ,
        require : true 
    },
    password : {
        type : String ,
        require : true 
    }, 
    cpassword : {
        type : String ,
        require : true 
    },
    follow : {
        type : Number ,
        default : 2
    },
    tokens : [
        {
            token : {
                type : String ,
                require : true 
            }
        }
    ]
})


UserSchema.methods.generateToken = async function() {
    try {
       let createToken = jwt.sign({_id : this._id}, secretValue) 
       this.tokens = this.tokens.concat({token : createToken}) ;
       await this.save() ;
       return createToken;
       
    } catch (e) {
       console.log(e)
       
    }
}

const user = mongoose.model("userInformation", UserSchema)

module.exports = user ;
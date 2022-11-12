const  Routes = require("express") ;

const route = Routes() ;
const User = require("../models/userSchema") ;

// homepage //
route.get("/", (req, res) => {
        return res.send("homepage reunion") ;
})


// account create //

route.post("/account", async(req, res) => {
    console.log(req.body)
    const {name, email,image, bio, password, cpassword } = req.body ;
  
    if(!name|| !email || !image || !bio || !password || !cpassword){
        return res.status(422).send({massage : "please filled fiels property"})
    }

    await User.findOne({email : email})
    .then((userExist) => {
            if(userExist) {
                return res.status(422).json({email : "email already exists"})
            }else if(password !== cpassword) {
                 return res.status(422).json({password : "password not same"})
            }
            else {
                  const newUser = new User({name , email, image, bio, password, cpassword}) ;

                  newUser.save().then(() => {
                    return res.status(201).send({massage : "Account create successful"})
                  }).catch((e) => {
                    return res.status(500).send({massage : "failed data "})
                  })
            }
    }).catch((e) => {
        console.log(e)
    })
})


// login //


route.post("/login", async(req, res) => {
             
   
    try{
        const {email, password} = req.body ;
        
       if(!email || !password) {
          return res.status(422).json({massage : "wrong credientals"})
       } 

       const userDetails = await User.findOne({email : email}) ;
      

       if(userDetails) {
              if(password == userDetails.password){
                  
                const token = await userDetails.generateToken() ;
               
                const {_id }= userDetails._id
                 // set cookies 
               
                console.log(_id)
               
              return  res.status(201).send({massage : "Login Succesful ", token, id: _id })
              

              }
              else {
                 return res.status(422).json({massage : "wrong credentials "})
              }
       }else {
           return res.status(422).json({massage : "wrong credentials "})
       }
    }
    catch(e){
               console.log(e)
    }
   
})

route.get("/details/:userId", async(req, res) => {
      const id = req.params.userId ;
      const detailsData = await User.find({_id : id}) ;

      return res.send(detailsData) ;
})


route.post("/follow/:userId", async(req, res) => {
    const id = req.params.userId ;
    console.log(id)
    const detailsData = await User.findOneAndUpdate({_id : id},{$inc: {follow : 1}})
    return res.send(detailsData)
})
route.post("/unfollow/:userId", async(req, res) => {
    const id = req.params.userId ;
    const detailsData = await User.findOneAndUpdate({_id : id},{$inc: {follow : -1}})
    return res.send(detailsData)
})

module.exports = route ;


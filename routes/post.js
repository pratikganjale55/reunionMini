const  Routes = require("express") ;

const route = Routes() ;
const User = require("../models/postSchema") ;


route.get("/", async(req, res) => {

   const sendData = await User.find({}) ;
      return res.send(sendData)
})


route.post("/createPost/:userId", async(req, res) => {
       const {title, body, photo, like, unlike} = req.body ;
       const id = req.params.userId ;

       

       if(!title || !body || !photo) {
          return res.status(422).send({massage : " filled fiels property"})
       }
       else { 

        
       
         const newPost = await new User({title, body, photo,like, unlike, id }) ;
         newPost.save().then(() => {
            return res.status(201).send({massage : "Poste successful"}) ;
         }).catch(() => {
            return res.status(422).send({massage : "Poste not posted"}) ;
         }) ;
         
       }
})

route.get("/getData/:id", async(req, res) => {
      const id = req.params.id ;

      const getData = await User.find({id : id}) ;

      return res.send(getData) ;
})

route.post("/deletePost/:id", async(req, res) => {
   const id = req.params.id ;

   const resData = await User.deleteOne({_id : id}) ;

   return res.send(resData);
 })


 route.post("/like/:id", async(req, res) => {
      const id = req.params.id ;
      const resData = await User.findOneAndUpdate({_id : id},{$inc: {like : 1}}) 
      
      return res.send(resData)
 })
 route.post("/unlike/:id", async(req, res) => {
   const id = req.params.id ;
   const resData = await User.findOneAndUpdate({_id : id},{$inc: {like : -1}}) 
   return res.send(resData)
})



module.exports = route ;
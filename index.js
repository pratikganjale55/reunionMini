const dotenv = require("dotenv") ;

const express = require("express") ;
const app = express() ;
const cors = require("cors") ;

dotenv.config({path : "./config.env"}) ;

const  auth = require("./routes/auth") ;
const post = require("./routes/post") ;
const connection = require("./connection/db") ;
const port = process.env.PORT || 8000

app.use(cors()) ;
app.use(express.json())
app.use("/", auth) ;
app.use("/post" , post)


app.listen(port, () => {
       console.log("server start 8000")
})
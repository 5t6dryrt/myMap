const express = require('express')
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const pinRoute = require("./routes/pins")
const userRoute = require("./routes/users")
const cors = require("cors")

app.use(cors())
dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
   console.log("connnect db")
}).catch((error)=>{
   console.log(error)
})

app.use(express.json())
app.use("/api/pins", pinRoute);
app.use("/api/users",userRoute)




app.listen(3000,()=>{
   console.log("succes connect")
})
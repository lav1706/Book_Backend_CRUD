const mongoose = require("mongoose")
require("dotenv").config()

const mongoUrl=process.env.MONGODB||3000

const initializeDatabase=async()=>{
    await mongoose.connect(mongoUrl,{
         useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Database is Connected")
    }).catch((error)=>{
        console.log("Error in Connecting Database",error)
    })
}
module.exports={initializeDatabase}
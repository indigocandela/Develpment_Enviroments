const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const app=express();

//the duck routes
const duckRoutes=require("./routes/duck");

require("dotenv-flow").config();

//parse request of content type J-SON
app.use(bodyParser.json());


mongoose.connect
(  
    process.env.DBHOST,
    {
        useUnifiedTopology:true,
        useNewUrlParser:true
    }
).catch(error=>console.log("Error connecting to MongoDB"+error));

mongoose.connection.once('open',()=>console.log('Connected succesfully to MongoDb'));

//routes
app.get("/api/welcome",(req,res)=>{
    res.status(200).send({message: "Welcome to the MEN Restful API"});
})

//here goes post,put,delete->Crud
app.use("/api/ducks",duckRoutes);

const PORT=process.env.PORT || 4000;
app.listen(PORT,function(){
    console.log("Server is runnig on port: " +PORT);

})
module.exports=app;
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const app=express();
const {verifyToken}=require("./validation");

//swagger deps
const swaggerUi=require('swagger-ui-express');
const yaml=require('yamljs');

//setup swagger
const swaggerDefinition=yaml.load('./swagger.yaml');
app.use('/api/docs',swaggerUi.serve,swaggerUi.setup(swaggerDefinition));

//the  routes
const duckRoutes=require("./routes/duck");
const authRoutes=require("./routes/auth");

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
app.use("/api/ducks",verifyToken,duckRoutes);

app.use("/api/tamer",authRoutes);



const PORT=process.env.PORT || 4000;
app.listen(PORT,function(){
    console.log("Server is runnig on port: " +PORT);

})
module.exports=app;
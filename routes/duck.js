const router= require("express").Router();
const duck= require("../models/duck");

//Crud operations

//Create a duck

router.post("/",(req,res)=>{
    data=req.body;
    
    duck.insertMany(data)
    .then(data=>{res.send(data);})
    .catch(err=>{res.status(500).send({message:err.message});})
});

module.exports=router;
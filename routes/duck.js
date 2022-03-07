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

//See all ducks

router.get("/",(req,res)=>{
    data=req.body;
    
    duck.find()
    .then(data=>{res.send(data);})
    .catch(err=>{res.status(500).send({message:err.message});})
});

//See all  ducks in Stock

router.get("/instock",(req,res)=>{
    data=req.body;
    
    duck.find({inStock: true})
    .then(data=>{res.send(data);})
    .catch(err=>{res.status(500).send({message:err.message});})
});

//See an especific duck

router.get("/:id",(req,res)=>{
    data=req.body;
    
    duck.findById(req.params.id)
    .then(data=>{res.send(data);})
    .catch(err=>{res.status(500).send({message:err.message});})
});



module.exports=router;
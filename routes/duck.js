const router= require("express").Router();
const duck= require("../models/duck");
const NodeCache=require('node-cache');

const cache=new NodeCache({stdTTL:600});


//Crud operations

//Create a duck

router.post("/",(req,res)=>{
    data=req.body;

    duck.insertMany(data)
    .then(data=>{res.status(201).send(data);})
    .catch(err=>{res.status(500).send({message:err.message});})
});

//See all ducks

router.get("/",(req,res)=>{
/*
        try{

            //try to get data from the cache
            let ducksCache=cache.get('allDucks')

            if(!ducksCache){
                let data= duck.find();

                console.log("no chce data found, Fetching from DB...");
                const timeToLiveSecs=10;
                cache.set('allDucks',data,timeToLiveSecs);
            }
            
            
            res.send(mapArray(data));

        }
        catch(err){
            res.status(500).send({message:err.message});
        }
*/
    
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

//Update an especific duck

router.put("/:id",(req,res)=>{
    const id=req.params.id;

    
    duck.findByIdAndUpdate(id,req.body)
    .then(data=>{
    if(!data){
        res.status(404).send({message : "Cannot update duck with id= " +id+". Maybe the duck was not found!"})
    }
    else{
        res.send({message: "Duck was succesesfully updated."})

    }
    })
    .catch(err=>{res.status(500).send({message:"Cannot update duck with id= " +id});
    })
});

//Delete an especific duck

router.delete("/:id",(req,res)=>{
    const id=req.params.id;

    
    duck.findByIdAndDelete(id)
    .then(data=>{
    if(!data){
        res.status(404).send({message : "Cannot delete duck with id= " +id+". Maybe the duck was not found!"})
    }
    else{
        res.send({message: "Duck was succesesfully deleted."})

    }
    })
    .catch(err=>{res.status(500).send({message:"Cannot update duck with id= " +id});
    })
});



module.exports=router;
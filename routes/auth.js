
const router= require("express").Router();
const Tamer= require("../models/tamer");
const { registerValidation }=require('../validation');
const bcrypt= require('bcrypt');

//registration
router.post("/register",async(req,res)=>{

    //validation the tamer input(name,email,password)

    const{error}=registerValidation(req.body);

    if(error){
        return res.status(400).json({error: error.details[0].message});
    }

    //check if the email is alredy registerd
    const emailExist= await Tamer.findOne({email: req.body.email});
    if(emailExist){
        return res.status(400).json({error: "Email alredy exists"});
    }
    //hash the password

    const salt =await bcrypt.genSalt(10);
    const password=await bcrypt.hash(req.body.password,salt);

    // Create a tamer object 
    const tamer=new Tamer({
        name:req.body.name,
        email:req.body.email,
        password
    });

    try{
        const savedTamer=await tamer.save();
        res.json({error:null,data:savedTamer._id});

    }catch(error){
        res.status(400),json({error})
    }
});

//login

router.post("/login",async(req,res)=>{
    return res.status(200).json({msg:"Login route..."});
})

module.exports=router;
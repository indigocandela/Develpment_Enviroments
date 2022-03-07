
const router= require("express").Router();
const tamer= require("../models/tamer");
const { registerValidation }=require('../validation');

//registration
router.post("/register",async(req,res)=>{

    //validation the tamer input(name,email,password)

    const{error}=registerValidation(req.body);

    if(error){
        return res.status(400).json({error: error.details[0].message});
    }

    //check if the email is alredy registerd
    const emailExist= await tamer.findOne({email: req.body.email});
    if(emailExist){
        return res.status(400).json({error: "Email alredy exists"});
    }
});

//login

router.post("/login",async(req,res)=>{
    return res.status(200).json({msg:"Login route..."});
})

module.exports=router;
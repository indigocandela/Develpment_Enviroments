
const router= require("express").Router();
const Tamer= require("../models/tamer");
const { registerValidation,loginValidation }=require('../validation');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

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
        return res.status(400).json({error: "Email already exists"});
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

    //validate tamer login input
    const{error}=loginValidation(req.body);

    if(error){
        return res.status(401).json({error: error.details[0].message});
    }

    //validate email:
    const tamer= await Tamer.findOne({email: req.body.email});

    if(!tamer){
        return res.status(402).json({error: "Email is wrong"});
    }

    //once the email exits then we check the password

    const validPassword=await bcrypt.compare(req.body.password, tamer.password);

    if(!validPassword){
        return res.status(403).json({error: "Password is wrong"});
    }

    //create the token and pass it around

    const token=jwt.sign
    ( 
     {//payload
        name:tamer.name,
        id:tamer._id
     },
     //token secret

     process.env.TOKEN_SECRET,
     //exoiration time
     {expiresIn:process.env.JWT_EXPIRES_IN}
    );

    res.header("auth-token",token).json({
        error:null,
        data:{ token }
    })
    

    
});


module.exports=router;
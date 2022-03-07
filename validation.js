const Joi=require('joi');

//Used for validation the registration and the login

//Registration
const registerValidation=(data)=>{
    const schema=Joi.object(
        {
            name:Joi.string().min(6).max(255).required(),
            email:Joi.string().min(6).max(255).required(),
            password:Joi.string().min(6).max(255).required(),
        });
        return schema.validate(data);
}


//Login

module.exports={registerValidation};
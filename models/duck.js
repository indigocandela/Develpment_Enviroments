const mongoose=require("mongoose");
const Schema=mongoose.Schema;

let duckSchema =new Schema(
{
    name:{type:String},
    color:{type:String},
    size:{type:String},
    price:{type:Numbre},
    inStock:{type:Boolean}
}   
);
module.exports=mongoose.model("duck",duckSchema);

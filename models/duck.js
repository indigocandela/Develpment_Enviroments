const mongoose=require("mongoose");
const Schema=mongoose.Schema;

let duckSchema =new Schema(
{
    name:{
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    color:{
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    size:{
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    price:{
        type: Number,
        required: true,
        min: 1,
        max: 255
    },
    inStock:{
        type: Boolean,
        default:false
    }
}   
);
module.exports=mongoose.model("duck",duckSchema);

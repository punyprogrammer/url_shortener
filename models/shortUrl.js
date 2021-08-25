const mongoose=require('mongoose');
const shortid=require('shortid');
const shortUrlSchema= new mongoose.Schema({
    full:{
        type:String,
        required: true
    },
    short:{
        type:String,
        required:true,
        default:shortid.generate

    },
    click:{
        type:Number,
        required:true,
        default:0
    },
    expire_at: {type: Date, default: Date.now, expires: 1296000} 
   
}, {timestamps: true})
module.exports=mongoose.model('ShortUrl',shortUrlSchema);
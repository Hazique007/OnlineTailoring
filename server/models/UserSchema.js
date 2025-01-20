const mongoose=require("mongoose");
const { set } = require("../routes/UserRoute");

const UserSchema = new mongoose.Schema({
    phoneNumber:{
        type:String,
        require:true,
    },
    otp:{
        type:Number,
        require:true,

    },
    otpExpiration:{
        type:Date,
        default:Date.now,
        get:(otpExpiration)=>otpExpiration.getTime(),
        set:(otpExpiration)=>new Date(otpExpiration)
    }
});

module.exports=mongoose.model('Otp',UserSchema)

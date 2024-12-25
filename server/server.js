const express = require ("express");

const mongoose = require("mongoose");
const app = express();

const dotenv =require("dotenv");
const Address = require("./models/addresschema")
dotenv.config();
const cors = require("cors");
app.use(cors());
const addressRoute = require("./routes/AddressRoute");
const personalDetailsRoute = require("./routes/PersonalDetailsRoutes")
const UserRoute = require("./routes/UserRoute")
// Increase the limit to 10mb for JSON data
app.use(express.json({ limit: "10mb" }));
// For URL-encoded data
app.use(express.urlencoded({ limit: "10mb", extended: true }));









mongoose.connect(process.env.URI)
.then(()=>{
    console.log("connected successfully");
    app.listen(process.env.PORT  || 8000 ,(err)=>{
        if(err) console.log(err);

        console.log("running successfully at",process.env.PORT);
        
        
    });
    
}).catch((err)=>{
console.log("error:",err);

})


app.use(addressRoute);
app.use(personalDetailsRoute);
app.use('/api',UserRoute)



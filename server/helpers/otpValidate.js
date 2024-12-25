

const otpVerification = async(otpTime)=>{


    try {

        console.log("Milliseconds is:"+otpTime);
       const cDateTime= new Date();
     var differencevalue=  (otpTime-cDateTime.getTime())/1000;
     differencevalue/=60;
     const minutes= Math.abs(differencevalue);
     console.log("Expired Minutes:"+minutes);
     if(minutes>5){
        return true;


     }
     return false;
     

        
        
    } catch (error) {
        console.log(error.message);
        
    }
}

export default otpVerification;
const User=require('../models/signData');

exports.postData=async(req,res,next)=>{
  try{
    const name=req.body._Name;
    const email=req.body._Email
    const password=req.body._Password
    console.log(' hello data');

    const data=await User.create({name:name,email:email,password:password})
    res.status(201).json({details:data});}
    catch(err){
        console.log(err);
    }
}
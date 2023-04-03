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
        res.status(500).json({error:err})
    }
}


exports.login=async(req,res,next)=>{
  try{
  const email=req.body._email;
  const password=req.body._password
  console.log(password);
console.log(email);
 const user= await User.findAll({where:{email}
  })
  console.log('user');
  if(user.length>0){
    if(user[0].password===password){
      res.status(200).json({success:true,message:'login seccessfully'})
    }
    else{
      res.status(400).json({success:false,message:'password is incorrect'})
    }
  }
  else{
    res.status(404).json({success:false,message:'User not exist'})
  }
}
  catch(err){
   
   res.status(500).json({message:err,success:false})
}
}
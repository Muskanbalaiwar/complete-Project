const User=require('../models/user');

exports.postData=async(req,res,next)=>{
  try{
    const amount=req.body.amn;
    const des=req.body.dec;
    const category=req.body.crt;
    //console.log(amount);

    const data=await User.create({amount:amount,description:des,category:category})
    res.status(201).json({details:data});}
    catch(err){
        console.log(err);
    }
}

exports.getAll=async(req,res,next)=>{
try{
    const data=await User.findAll();
    res.status(201).json({details:data});}

    catch(err){console.log(err)}
}

exports.delete=async(req,res,next)=>{
    try{
    const id=req.params.id;
    await User.destroy({where :{id:id}});
    res.sendStatus(201);}
    catch(err){console.log(err)}
  }

  exports.getData=async(req,res,next)=>{
    try{
    const id=req.params.id;
    const data=await User.findByPk(id);
    res.status(201).json({details:data});}
    catch(err){console.log(err)}
}



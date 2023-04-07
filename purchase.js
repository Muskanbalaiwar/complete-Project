const razorpay=require('razorpay');
const orders=require('../models/orders');

const users=require('../models/signData');
//const Order = require('../models/orders');
//const Razorpay = require('razorpay');


exports.preminum=async(req,res)=>{
    try{
        var rzp = new razorpay({
            key_id:'rzp_test_rj081BJIyoY0Ly',           
            key_secret:'5Bnxd2tYeQQfOIg3aiIu16DG',
          });
          
         // console.log('key id : '+process.env.RAZORPAY_KEY_ID)
        const amount=2500;
        rzp.orders.create({amount, currency:"INR"},(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            const data=req.user.createOrder({orderid:order.id,status:'PENDING'}).then(()=>{
             
                return res.status(201).json({order,key_id:rzp.key_id})
            })

           .catch(err=>{
            throw new Error(err);
           })
        })
    }
    catch(err){
        console.log(err);
        res.status(403).json({message:'something went wrong',error:err})
    }
}


exports.addpremium=async(req,res)=>{
    try{
        const payment_id=req.body.payment_id;
        const order_id=req.body. order_id;
        console.log('payment id : '+payment_id);
        orders.findOne({where:{orderid:order_id,}}).then(order=>{
          orders.update(
            {
                paymentid: payment_id,status: 'Successful',
  },
  {
    where: { paymentid: null, orderid:order_id,status:'PENDING' },
  },).then(()=>{
    users.update({
            ispremium:true,
    },{where:{ispremium:null,}}
    
    )
  }).then(()=>{
           return res.status(202).json({success:true,message:'Transiction Seccess'})
          })
          .catch(err=>{
            throw new Error(err);
          })

        })
        .catch(err=>{
            throw new Error(err);
          })
    }
    catch(err){
        orders.update(
            {
                paymentid: payment_id,status: 'Successful',
  },
  {
    where: { paymentid: null, orderid:order_id,status:'PENDING' },
  },
        )
    }
}
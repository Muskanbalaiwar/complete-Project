const User=require('../models/signData');
const Expense=require('../models/user');


exports.getAll=async (req,res,next)=>{
    try{

        //console.log('>>>>>>>>>>>>>>>>>>>>')
        const expenses=await Expense.findAll();
        const users=await User.findAll();

        const totaldata={};

        expenses.forEach((expense) => {
            //console.log(expense.amount)
            if(totaldata[expense.datumId]){
                
                totaldata[expense.datumId]=totaldata[expense.datumId]+expense.amount
            }
            else{
                totaldata[expense.datumId]=expense.amount
            }
        });
        //console.log('<<<<<<<<<<<<<<<<<<'+JSON.stringify(totaldata))
        var leaderBoardData=[];
       users .forEach((user)=>{
        if(totaldata[user.id]===undefined){
            totaldata[user.id]=0
        }
            
            leaderBoardData.push({name:user.name,total:totaldata[user.id]});
            
        }) 
        leaderBoardData.sort((a, b) => {
            return  b.total- a.total ;
        });
        console.log(leaderBoardData)
        res.status(201).json(leaderBoardData);
       }
    
        catch(err){console.log(err)}
}
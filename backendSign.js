const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const candy = express();
candy.use(cors())
const router=require('.//routes/signRoute');
const sequelize=require('./util/database');

candy.use(bodyParser.json())
candy.use(router);

sequelize.sync()
.then(res=>{
    //console.log(res);
})
.catch(err=>{
    console.log(err);
})
candy.listen(3001);
console.log('program start');
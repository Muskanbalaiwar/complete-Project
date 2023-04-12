const express = require('express');
const sign=require('./models/signData');
const Expense=require('./models/user');
const bodyParser = require('body-parser');
const cors=require('cors');
const app = express();
const Order=require('./models/orders');
app.use(cors())
const router=require('./routes/signRoute');
const oroute=require('./routes/purchase')
const sequelize=require('./util/database');
const route=require('./routes/routeExpense')
const route_order=require('./routes/purchase')
const route_leaderboard=require('./routes/leaderboard')
const route_password=require('./routes/password');
const password_table=require('./models/password')
const reset_route=require('./routes/reset')
app.use(bodyParser.json())
app.use(router);
app.use(route);
app.use(reset_route);
sign.hasMany(Expense)
Expense.belongsTo(sign);
app.use(route_order)
app.use(route_leaderboard)
app.use(route_password)
sign.hasMany(Order)
Order.belongsTo(sign)
sign.hasMany(password_table);
password_table.belongsTo(sign);
sequelize.sync()
.then(res=>{
    console.log('res');
})
.catch(err=>{
    console.log(err);
})
app.listen(3001);

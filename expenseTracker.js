//const Razorpay = require('razorpay');

console.log(1);
var form = document.getElementById('addValue');
var itemList = document.getElementById('items');
var amount = document.getElementById('amount');
var h3=document.getElementById('h3');
var disc = document.getElementById('des');
var catg = document.getElementById('cat');
form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
//itemList.addEventListener('click', editItem);



function addItem(e) {
    e.preventDefault();
    console.log(1);
    const user = {
        amn: e.target.amt.value,    
        dec: e.target.dsc.value,
        crt: e.target.ctg.value,
        
    }

    const token=localStorage.getItem('token')

    axios
    .post("http://localhost:3001/user/post",user,{headers:{'Authorization':token}})
   .then(res =>{
    console.log(('data added'))
    showData((res.data.details))

})
   .catch(err=>console.log(err));
    //console.log(user);

form.reset();
}

function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You sure?')) {
            var li = e.target.parentElement;
            
            console.log(li.id);
            const token=localStorage.getItem('token')
            axios
    .delete(`http://localhost:3001/user/deleteData/${li.id}`,{headers:{'Authorization':token}})
    .then(res=>{console.log('data deleted');
        itemList.removeChild(li)})
    .catch(err=>console.log(err));
           
            
        }
    }
}

// function editItem(e) {
//     if (e.target.classList.contains('edit')) {
//         if (confirm('Are You sure?')) {
//              var editingId = e.target.parentElement;
//              console.log(editingId.id);
//              axios
//              .get(`http://localhost:3001/user/getData/${editingId.id}`)
//              .then((res) =>{
//                 console.log('data editing in process')
//                 amount.value=res.data.details.amount,
//                 disc.value=res.data.details.description,
//                 catg.value=res.data.details.category
//             })
//                 .catch(err=>console.log(err))

//                 axios
//              .delete(`http://localhost:3001/user/deleteData/${editingId.id}`)
//            // item = JSON.parse(localStorage.getItem(editingId));
//             //console.log(editingId);
//             .then(res=> itemList.removeChild(editingId))
//         }
//     }

// }

window.addEventListener("DOMContentLoaded",()=>{
    
    const token=localStorage.getItem('token')
    const decodedToken=parseJwt(token);
    console.log(decodedToken);
    const admin=decodedToken.premium;
    if(admin){
        preminumUSer();
    }
    axios
    .get("http://localhost:3001/user/getData",{headers:{'Authorization':token}})
.then((res)=>{
    console.log('hello')
    //console.log("res dtaa"+JSON.stringify(res.data.details));
    for(var i=0;i<res.data.details.length;i++){
        //console.log("res dtaa"+JSON.stringify(res.data.details[i].id));
       showData(res.data.details[i])
    }
})
.catch(err=>console.log(err));


})

function showData(e){
    //e.preventDefault();
    var newItem = e.amount;
    var newDes = e.description;
    var newCat =e.category;

    var li = document.createElement('li');
    li.id=e.id
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(newItem + " " + newDes + " " + newCat));
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger float-end delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn);
    itemList.append(li);
}

document.getElementById('razorButton').onclick= async function(e){
 const token=localStorage.getItem('token');
  const response=await  axios.get("http://localhost:3001/premium/get",{headers:{"Authorization":token}})
    var options ={
        "key":response.data.key_id,
        "order_id":response.data.order.id,

        "handler":async function(response){
            await axios.post("http://localhost:3001/premium/post",{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
            },{headers:{"Authorization":token}})
            alert('you are premium member now');
            preminumUSer();
        }
    };
    const rzp=new Razorpay(options);
    rzp.open();
    e.preventDefault();

    rzp.on('payment.failed',function(response){
        console.log(response);
        alert('something went wrong');
    })
}
function preminumUSer(){
razorButton.style.visibility='hidden';
h3.innerHTML+='You are a premimum user now';
var leader=document.createElement('input');
leader.setAttribute("type","button");
leader.setAttribute("value","Show Leaderboard")
leader.className = 'btn btn-primary float-end show';
leader.id="leader_id";
h3.append(leader)}



h3.addEventListener('click',showBoard);

async function showBoard(e){

    if (e.target.classList.contains('show')){
        const token=localStorage.getItem('token');
        const boardData=await axios.get("http://localhost:3001/premium/showBoard",{headers:{"Authorization":token}})
      document.body.innerHTML+='<h2>LeaderBoard</h2><br>';

      boardData.data.forEach((details)=>{
        if(details.total===null)
        {
        document.body.innerHTML+=`<li>Name ${details.name} total Expenses 0`;}
        else{
            document.body.innerHTML+=`<li>Name ${details.name} total Expenses ${details.totalExpense}`;
        }
      })
        
    }
}


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}



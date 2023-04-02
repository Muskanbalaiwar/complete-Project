console.log(1)
var form=document.getElementById('form_id');
var name=document.getElementById('name_id');
var email=document.getElementById('email_id');
var password=document.getElementById('password_id');

form.addEventListener('submit',addData);

function addData(e){
    e.preventDefault();
    console.log('data added')
    const user={
        _Name:e.target.Name.value,
        _Email:e.target.Email.value,
        _Password:e.target.Password.value
    }
    console.log('data added')

    axios
    .post("http://localhost:3001/sign/post",user)
   .then(res =>{
    console.log(('data added'))
})
   .catch(err=>console.log(err));

    form.reset();

}
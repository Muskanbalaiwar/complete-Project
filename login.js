var form=document.getElementById('form_id');
var email=document.getElementById('email_id');

form.addEventListener('submit',addItem);

function addItem(e){
    e.preventDefault();
    console.log(1);

    const user={
        _email:e.target.Email.value,
        _password:e.target.Password.value
    }

    axios
    .post("http://localhost:3001/login/post",user)
    .then(res=>{alert('login Successfull')
        console.log('data added')})
    .catch(err=>{console.log(err);
    document.body.innerHTML+=err.message})
}

//alert('Login Successfully')
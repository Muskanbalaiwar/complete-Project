console.log(1);
var form=document.getElementById('form_id');
form.addEventListener('submit',addData);

async function addData(e){
    console.log(1);
    const data={
        _email:e.target.Email.value,
    }

    //const res=await axios("http://localhost:3001/password/forgotpassword",data)

}
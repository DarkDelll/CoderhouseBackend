const form = document.getElementById('registerForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/sessions/register',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        result.json()
        if(result.status===201){
            Swal.fire(
                'Registro Exitoso',
                'Usuario Registrado Correctamente',
                'success'
            ).then((resultado) => {
                if (resultado.isConfirmed) {
                    window.location.replace('/login');
                }
              })    
        }
        if(result.status===400){
            Swal.fire(
                'Error',
                'Usuario ya existe',
                'error'
            )
        }
   
    });
})
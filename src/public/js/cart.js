let form = document.getElementById("formCarrito")

form.addEventListener('submit',e=>{
    e.preventDefault();
    fetch(`/api/carts/${window.usercart}/purchase`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            Swal.fire(
                'Compra Realizada',
                'Su compra se ha realizado correctamente',
                'success',
            ).then((resultado) => {
                if (resultado.isConfirmed) {
                    window.location.replace('/products');
                }
              })

        }
        if(result.status===201){
            Swal.fire(
                'Atencion',
                'Los productos restantes no se encuentran disponibles',
                'info',
            ).then((resultado) => {
                if (resultado.isConfirmed) {
                    window.location.replace('/products');
                }
              })
        }
        if(result.status===500){
            Swal.fire(
                'Error',
                'Error al intentar realizar la compra',
                'error'
            )
        }
    })
})
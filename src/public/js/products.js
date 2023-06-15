const form = document.getElementsByClassName("addProducts")
function handleSubmit(event) {
    event.preventDefault();
    let formulario = event.target;
    let formaction = formulario.getAttribute("action");
    let recorte = formaction.substring(21)

    fetch(`${recorte}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            Swal.fire(
                'Agregado',
                'Producto Agregado correctamente',
                'success',
            )
        }
        if(result.status===500){
            Swal.fire(
                'Error',
                'Error al agregar el producto',
                'error'
            )
        }
    })

    
}
    for (var i = 0; i < forms.length; i++) {
      form[i].addEventListener("submit", handleSubmit);
    }

   

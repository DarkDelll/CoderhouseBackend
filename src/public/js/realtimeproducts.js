const socket = io();

const datos = document.getElementById("datos")

socket.on("products" , (data) => {
    console.log(data)
    let dato = ''
    data.forEach(element => {
        dato += `<hr size="2px" color="black" /> Id: ${element.id} <br> Nombre: ${element.title} <br> Precio: ${element.price} <br>`
})
datos.innerHTML = dato
        
    
})
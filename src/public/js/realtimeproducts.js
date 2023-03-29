const socket = io();

const datos = document.getElementById("datos")

socket.on("products" , (data) => {
    let dato = ''
    data.forEach(element => {
        dato += `<hr size="2px" color="black" /> Id: ${element.id} <br> Nombre: ${element.title} <br> Precio: ${element.price} <br>`
})
datos.innerHTML = dato
            
})

const formulario = document.getElementById("formulario-ingreso")

formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const code = document.getElementById("code").value
    const price = document.getElementById("price").value
    const stock = document.getElementById("stock").value
    const category = document.getElementById("category").value
    const thumbnail = ""
    socket.emit("new-product", {title, description, code, price, stock, category, thumbnail})
})

const eliminar = document.getElementById("eliminar")
eliminar.addEventListener("submit", (e) => {
    e.preventDefault()
    const id = document.getElementById("id").value
    socket.emit("delete-product", id)
})

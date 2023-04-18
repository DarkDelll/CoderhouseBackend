const socket = io();
let user; 
const catBox = document.getElementById('chatBox')

Swal.fire({
    icon: "info",
    title:'Identicate, por favor',
    input: 'text',
    text: 'Ingrese su correo para identificarse en el chat.',
    color: "#716add",
    inputValidator: (value)=>{
        if(!value){
            return "Necesitas escribir tu nombre de usuario para continuar!"
        }
    },
    allowOutsideClick: false 
}).then( result =>{
    user = result.value
}
)

catBox.addEventListener('keyup', evt=>{
    if(evt.key === 'Enter'){
        if(catBox.value.trim().length > 0){
            socket.emit('message', {user: user, message: catBox.value})
            catBox.value = "";
        }
        else{
            alert("Por favor escribir una palabra/mensaje, los espacios no son validos")
        }
    }
})

socket.on('messageLogs', data=>{
    const messageLogs = document.getElementById('messageLogs');
    let logs='';
    data.forEach(log=>{
        log.forEach(log2=>{
        logs += `${log2.user} dice: ${log2.message}<br/>`
        })
    })
    messageLogs.innerHTML=logs;
})
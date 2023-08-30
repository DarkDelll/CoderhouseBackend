const premium = document.getElementById("premium");


premium.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("premiumid").value;
  const obj = {};
  fetch(`/api/users/premium/${id}`, {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 200) {
        Swal.fire(
          "Usuario Premium",
          "El usuario ahora es premium",
          "success"
        ).then((resultado) => {
          if (resultado.isConfirmed) {
            window.location.replace("/users");
          }
        });
      }
      if (result.status === 404) {
        Swal.fire({
            icon: 'error',
            title: 'Usuario no encontrado',
            text: 'El usuario no ha sido encontrado',
            footer: ''
        });
      };
    });
});

const inactivos = document.getElementById("inactivos")

inactivos.addEventListener("submit",e=>{
  e.preventDefault()
  const obj = {};
  fetch(`/api/users/inactives`, {
    method: "DELETE",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    if (result.status === 200) {
      Swal.fire(
        "Usuarios Elimados",
        "Usuarios eliminados correctamente",
        "success"
      ).then((resultado) => {
        if (resultado.isConfirmed) {
          window.location.replace("/users");
        }
      });
    }
    if (result.status === 404) {
      Swal.fire({
          icon: 'error',
          title: 'No hay usuarios',
          text: 'No hay usuarios inactivos',
          footer: ''
      });
    };
  });
})

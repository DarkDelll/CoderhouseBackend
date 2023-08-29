const premium = document.getElementById("premium");
console.log("hola");

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

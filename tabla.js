const boton = document.getElementById("subir-button");
boton.onclick = mandarJSon;

function mandarJSon() {
  //variable con json

  const jSonDePrueba = {
    name: "john_doe",
    email: "john@bar.com",
    phone: "555-555-5555",
  };

  const url =
    "https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items";
  // URL de la API

  // parte de ejecución

  const post = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jSonDePrueba),
    mode: "no-cors",
  };

  fetch(url, post)
    .then((response) => {
      return response.json();

      //return response.json()
    })

    .then((data) => {
      // Manejar los datos JSON

      console.log(data);
    });


  //
  // Obtener el elemento tbody de la tabla
  const tabla = document.getElementById('tablaPersonas')
  const tbody = tabla.getElementsByTagName('tbody')[0];

  // Limpiar contenido existente en la tabla
  tbody.innerHTML = "";

  // Crear una fila y celdas para el JSON
  const fila = tbody.insertRow();
  const celdaNombre = fila.insertCell(0);
  const celdaEmail = fila.insertCell(1);
  const celdaPhone = fila.insertCell(2);

  celdaNombre.textContent = jSonDePrueba.name;
  celdaEmail.textContent = jSonDePrueba.email;
  celdaPhone.textContent = jSonDePrueba.phone;
}
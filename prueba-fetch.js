const boton = document.getElementById("subir-button")

boton.onclick = function () {
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

  fetch(url, post).then((response) => {
    console.log(response);
  });
}

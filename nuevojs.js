const boton = document.getElementById("subir-button");
const tabla = document.getElementById("tablaPersonas"); // Obtenemos la referencia a la tabla
const archivoInput = document.getElementById("archivo-input");

boton.onclick = function () {
  readCSV();
};

function readCSV() {
  const csvFile = archivoInput.files[0];

  if (!csvFile) {
    alert("Please select a CSV file.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {

    const fileContent = event.target.result;
    const lines = fileContent.split("\n");
    const csvArray = [];

    for (let i = 0; i < lines.length; i++) {
      const cols = lines[i].split(",");
      csvArray.push(cols);
    }

    const personas = convertirCSVAPersonas(csvArray);
    console.log(personas);

    mostrarTabla(personas)

    enviarElementos(personas)

  };

  reader.readAsText(csvFile);
}

//////
function mostrarTabla(personas) {
  const tbody = tabla.getElementsByTagName("tbody")[0];

  console.log(tbody)
  // Iterar a través del array de personas y añadir cada persona como una nueva fila en la tabla
  personas.forEach((persona) => {
    const fila = tbody.insertRow();
    const celdaName = fila.insertCell(0);
    const celdaPhone = fila.insertCell(1);
    const celdaEmail = fila.insertCell(2);
    celdaName.textContent = persona.name;
    celdaPhone.textContent = persona.phone;
    celdaEmail.textContent = persona.email;
  });
}

function convertirCSVAPersonas(csv) {
  const personas = [];

  csv.forEach(function (fila) {
    const persona = {
      name: fila[0],
      phone: fila[1],
      email: fila[2],
    };

    personas.push(persona);
  });

  return personas;
}

// URL de la API
 const url =
   "https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items";
  

function enviarElementos(personas) {
  personas.forEach(function (persona) {
    const post = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(persona),
    };


    console.log(post)
    fetch(url, post)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log({ data });
      })
      .catch((error) => {
        console.log("Dentro del catch");
        console.log(error);
      });
  })
  
}





const boton = document.getElementById("subir-button");
const tabla = document.getElementById("tablaPersonas"); // Obtenemos la referencia a la tabla
const fileInput = document.getElementById("file-input");

boton.onclick = function () {
  readCSV();
};

function mostrarTabla(personas) {
  const tbody = tabla.getElementsByTagName("tbody")[0];

  // Iterar a través del array de personas y añadir cada persona como una nueva fila en la tabla
  personas.forEach((persona) => {
    const fila = tbody.insertRow();
    const celdaName = fila.insertCell(0);
    const celdaEmail = fila.insertCell(1);
    const celdaPhone = fila.insertCell(2);
    celdaName.textContent = persona.name;
    celdaEmail.textContent = persona.email;
    celdaPhone.textContent = persona.phone;
  });
}
function readCSV() {
  // Get the file input
  const csvFile = fileInput.files[0];

  // Check if a file is selected
  if (!csvFile) {
    alert("Please select a CSV file.");
    return;
  }

  // Initialize FileReader
  const reader = new FileReader();

  reader.onload = function (event) {
    // Get the file content
    const fileContent = event.target.result;

    // Split the content into lines
    const lines = fileContent.split("\n");

    // Initialize an array to hold the CSV data
    const csvArray = [];

    // Loop through each line
    for (let i = 0; i < lines.length; i++) {
      // Split each line into columns (assuming comma as the delimiter)
      const cols = lines[i].split(",");

      // Push the columns to the array
      csvArray.push(cols);
    }

    const personas = convertirCSVAPersonas(csvArray);
    console.log(personas);

    mostrarTabla(personas)

    // Output the array for demonstration
  };

  // Read the file as text
  reader.readAsText(csvFile);
}

//////

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

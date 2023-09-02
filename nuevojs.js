const boton = document.getElementById("subir-button");
const tabla = document.getElementById("tablaPersonas"); // Obtenemos la referencia a la tabla

boton.onclick = function () {
 

  
  tabla.style.display = "table"; 
};

const personas = [
  {
    name: "Mikhael",
    email: "email.example@email.com",
    phone: 8295650292,
  },
  {
    name: "Abigail",
    email: "email.example@email.com",
    phone: 8295650292,
  },
  {
    name: "Abraham",
    email: "email.example@email.com",
    phone: 8295650292,
  },
];


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

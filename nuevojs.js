const button = document.getElementById("upload-button");
const table = document.getElementById("people-table"); // Obtenemos la referencia a la tabla
const inputFile = document.getElementById("input-file");
 const apiUrl ="https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items";

button.onclick = function () {
  readCSV();
};

function readCSV() {
  const csvFile = inputFile.files[0];

  if (!csvFile) {
    alert("Please select a CSV file.");
    return;
  }

  const reader = new FileReader();

  // csv reader, convert csv to people, show the new array in the table and send people to the API endpoint
  reader.onload = function (event) {
    const fileContent = event.target.result;
    const lines = fileContent.split("\n");
    const csvArray = [];

    lines.forEach(line => {
      const cols = line.split(",")
      csvArray.push(cols);
    });

    const people = convertCSVToPeople(csvArray);

    showPeopleTable(people);

    sendPeople(people)
  };

  reader.readAsText(csvFile);
}

function showPeopleTable(people) {
  const tbody = table.getElementsByTagName("tbody")[0];
  
  people.forEach((person) => {
    const row = tbody.insertRow();
    const cellName = row.insertCell(0);
    const cellPhone = row.insertCell(1);
    const cellEmail = row.insertCell(2);

    cellName.textContent = person.name;
    cellPhone.textContent = person.phone;
    cellEmail.textContent = person.email;
  });
}

function convertCSVToPeople(csv) {
  const people = [];

  csv.forEach(function (row) {
    const person = {
      name: row[0],
      phone: row[1],
      email: row[2],
    };

    people.push(person);
  });

  return people;
}
  
function sendPeople(people) {
  people.forEach(function (person) {
    const post = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    };

    fetch(apiUrl, post)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          alert("There is an error in your CSV: " + data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  })  
}
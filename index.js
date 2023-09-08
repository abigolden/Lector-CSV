const button = document.getElementById("upload-button");
const table = document.getElementById("people-table"); // Obtenemos la referencia a la tabla
const inputFile = document.getElementById("input-file");
const apiUrl ="https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items";
const loadingMessage = document.getElementById("loading-message");
const loadingMessageScreen =loadingMessage.textContent = "Loading...";
const stopedLoadingMessage = (loadingMessage.textContent = "");

button.onclick = function () {
  readCSV();
};

function readCSV() {
  const csvFile = inputFile.files[0];

  if (!csvFile) {
    alert("Please select a CSV file.");
    return;
  }
loadingMessage.textContent = "";
  const reader = new FileReader();

  // csv reader, convert csv to people, show the new array in the table and send people to the API endpoint
  reader.onload = function (event) {
    const fileContent = event.target.result;
    const lines = fileContent.split("\n");
    const csvArray = [];

    lines.forEach((line) => {
      const cols = line.split(",");
      csvArray.push(cols);
    });

    const people = convertCSVToPeople(csvArray);

    sendPeople(people);
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

async function sendPeople(people) {
  try {
    loadingMessageScreen

    for (let i = 0; i < people.length; i++) {
        const person = people[i];

        const post = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        };

        const response = await fetch(apiUrl, post);
        const data = await response.json();

        if (data.error) {
          alert(`There is an error: ${data.error}`);
        }
      }
    stopedLoadingMessage

    showStoredPeople()

  } catch (error) {
    alert("There was a failure in our service: " + error);
  }
}

function showStoredPeople() {
  const get = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(apiUrl, get)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const dataPersonas = data.items;
      showPeopleTable(dataPersonas);
      alert("We've send your csv successfully");
    })
    .catch((error) => {
      alert("There was a failure in our service: " +  error);
    });
}

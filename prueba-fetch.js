

const url = "https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items";
// URL de la API

const dataToSend = {
  name: "john_doe",
  email: "john@bar.com",
  phone: "555-555-5555",
};

const post = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(dataToSend),
  mode: "no-corsE"
};

/* "{\"username\":\"jhon_doe\", \"email\":\"jhon@example.com\"}" */

fetch(url, post).then((response) => {
  console.log(response)
})

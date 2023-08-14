document.getElementById('button2').addEventListener('click', function() {
    alert('Button 2 clicked!');
});

document.getElementById('button3').addEventListener('click', function() {
    alert('Button 3 clicked!');
});


document.getElementById("fetchButton").addEventListener("click", fetchData);

function fetchData() {
  // Replace with your API endpoint URL
  const apiUrl = "https://ybqv8ehvvk.execute-api.us-west-2.amazonaws.com/test";

  var requestBody = {
    region: "us-west-2"
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => response.json())
    .then(data => {
      const responseDiv = document.getElementById("responseDiv");
      responseDiv.innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      const responseDiv = document.getElementById("responseDiv");
      responseDiv.innerHTML = "Error fetching data.";
    });
}
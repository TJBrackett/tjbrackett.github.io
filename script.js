document.getElementById("fetchButton").addEventListener("click", fetchData);
document.getElementById("createButton").addEventListener("click", createData);
document.getElementById("destroyButton").addEventListener("click", destroyData);

function createData() {
  const apiUrl = "https://z01pvz7zzc.execute-api.us-west-2.amazonaws.com/test";

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const responseDiv = document.getElementById("responseDiv1");
      responseDiv.innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      const responseDiv = document.getElementById("responseDiv1");
      responseDiv.innerHTML = "Error creating data.";
    });
}

function fetchData() {
  const apiUrl = "https://z01pvz7zzc.execute-api.us-west-2.amazonaws.com/test";
  const selectedRegion = document.querySelector('input[name="region"]:checked').value;
  
  var requestBody = {
    region: selectedRegion
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
      const responseDiv = document.getElementById("responseDiv2");
      responseDiv.innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(error => {
      console.error("Error creating data:", error);
      const responseDiv = document.getElementById("responseDiv2");
      responseDiv.innerHTML = "Error fetching data.";
    });
}

function destroyData() {
  const apiUrl = "https://z01pvz7zzc.execute-api.us-west-2.amazonaws.com/test";

  fetch(apiUrl, {
    method: "DELETE"
  })
    .then(response => {
      const responseDiv = document.getElementById("responseDiv3");
      responseDiv.innerHTML = "Data destroyed successfully.";
    })
    .catch(error => {
      console.error("Error destroying data:", error);
      const responseDiv = document.getElementById("responseDiv3");
      responseDiv.innerHTML = "Error destroying data.";
    });
}
document.getElementById("fetchButton").addEventListener("click", fetchData);
document.getElementById("createButton").addEventListener("click", createData);
document.getElementById("destroyButton").addEventListener("click", destroyData);

const toggleButton = document.getElementById("toggleButton");
const panel1 = document.getElementById("panel1");
const panel2 = document.getElementById("panel2");

toggleButton.addEventListener("click", function () {
    if (panel1.style.display === "none") {
        panel1.style.display = "block";
        panel2.style.display = "none";
    } else {
        panel1.style.display = "none";
        panel2.style.display = "block";
    }
});

function toggleLoadingIndicator(show) {
    const loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = show ? "block" : "none";
}

function createData() {
  toggleLoadingIndicator(true);
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
    })
    .finally(() => {
        toggleLoadingIndicator(false);
    });
}

function fetchData() {
  toggleLoadingIndicator(true);
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
    })    
    .finally(() => {
        toggleLoadingIndicator(false);
    });
}

function destroyData() {
  toggleLoadingIndicator(true);
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
    })
    .finally(() => {
        toggleLoadingIndicator(false);
    });
}


document.getElementById("downloadButton").addEventListener("click", () => {
    // Create a blob with an empty text file
    const blob = new Blob(['Why would you open this?'], { type: 'text/plain' });

    // Create a zip folder
    const zip = new JSZip();
    zip.file('trojan.txt', blob);

    // Generate a blob from the zip folder
    zip.generateAsync({ type: 'blob' })
        .then(blob => {
            // Create a URL for the blob
            const url = URL.createObjectURL(blob);

            // Create a temporary link for downloading
            const link = document.createElement('a');
            link.href = url;
            link.download = 'important.zip';

            // Trigger the click event of the link
            link.click();

            // Clean up the URL and link
            URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error generating zip:', error);
        });
});

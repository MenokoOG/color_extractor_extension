// Function to send a message to content script and display color values
function sendMessageToContentScript() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getColorValues" }, function (response) {
      displayColorValues(response.colors);
    });
  });
}

// Function to display color values in the output div
function displayColorValues(colors) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = `<h2>Color Values</h2>`;

  colors.forEach(color => {
    outputDiv.innerHTML += `<div class="color-preview" style="background-color: ${color};"></div> ${color}<br>`;
  });
}

// Call the sendMessageToContentScript function when the popup is loaded
document.addEventListener('DOMContentLoaded', sendMessageToContentScript);

document.getElementById("checkBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { type: "EXTRACT_CONTENT" }, (res) => {
      if (res) {
        document.getElementById("output").innerText = "Sending to Gemini...";
        fetch("http://localhost:3000/gemini-check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: res.content })
        })
          .then((r) => r.json())
          .then((data) => {
            document.getElementById("output").innerText = data.reply;
          })
          .catch((err) => {
            document.getElementById("output").innerText = "Error: " + err.message;
          });
      }
    });
  });
});
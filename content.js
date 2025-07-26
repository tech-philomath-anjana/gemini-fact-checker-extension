function extractContent() {
  const article = document.querySelector("article") || document.body;
  const content = article.innerText.slice(0, 4000);
  return {
    title: document.title,
    url: window.location.href,
    content
  };
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "EXTRACT_CONTENT") {
    sendResponse(extractContent());
  }
});
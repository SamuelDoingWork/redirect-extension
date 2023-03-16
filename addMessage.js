document.querySelector("button").addEventListener("click", () => {
    const replacer = 
    {
      "url": document.getElementById("url").value,
      "urlToReplace": document.getElementById("replacer").value
    };
    chrome.runtime.sendMessage(replacer);
});
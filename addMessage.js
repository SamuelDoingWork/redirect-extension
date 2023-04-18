const urlElement = document.getElementById("url");
const urlToReplaceElement = document.getElementById("replacer");
const checkbox = document.getElementById("on-off");

function Read() {
  chrome.runtime.sendMessage({ command: "Read" }, ({onOff, redirectList}) => {
    console.log(redirectList)
    checkbox.checked = onOff;

    urlElement.value = redirectList[0].url;
    urlToReplaceElement.value = redirectList[0].urlToReplace;
  });
}

document.querySelector("button").addEventListener("click", () => {
  const replacer =
  {
    "url": urlElement.value,
    "urlToReplace": urlToReplaceElement.value
  };

  chrome.runtime.sendMessage({ command: "Replacer", value: replacer });
});

checkbox.addEventListener("change", () => {
  const value = checkbox.checked;

  chrome.runtime.sendMessage({ command: "Switch", value });
});


Read();

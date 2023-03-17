let onOff = false;

let redirectList = [
    {url: "", urlToReplace: ""}
]

const commands = {
    Replacer: (value) => {
        redirectList = [
            value
        ];
    },
    Switch: (value) => {
        onOff = value;
        
        SwitchRedirect();
    },
    Read: (_, sendResponse) => {
        sendResponse(
            {onOff, redirectList}
        )
    }
}

const redirectListener = (details) => {
    const actualUrl = details.url;

    for(const {url, urlToReplace} of redirectList)
    {
        if(!actualUrl.includes(url))
        {
            continue;
        }

        return { redirectUrl: actualUrl.replace(url, urlToReplace) };
    };
}

function SwitchRedirect() {
    if(onOff) {
        chrome.webRequest.onBeforeRequest.addListener(
            redirectListener,
            { urls: ["<all_urls>"] },
            ["blocking"]
        );
    }
    else {
        chrome.webRequest.onBeforeRequest.removeListener(redirectListener);
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    commands[message.command](message.value, sendResponse);
});
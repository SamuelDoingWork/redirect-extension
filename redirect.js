let redirectList = [
]

chrome.runtime.onMessage.addListener((message) => {
    redirectList = [
        message
    ]
});

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        const actualUrl = details.url;

        for(const {url, urlToReplace} of redirectList)
        {
            if(!actualUrl.includes(url))
            {
                continue;
            }

            return { redirectUrl: actualUrl.replace(url, urlToReplace) };
        };
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);
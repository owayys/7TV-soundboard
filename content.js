const audio = new Audio(chrome.runtime.getURL("sound.mp3"));

function playSound() {
    console.log("Playing sound");
    audio.play();
}

function checkForNewElements(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const emoteElement = node.classList.contains(
                        "seventv-chat-emote"
                    )
                        ? node
                        : node.querySelector(".seventv-chat-emote");
                    if (
                        emoteElement &&
                        emoteElement.tagName.toLowerCase() === "img"
                    ) {
                        console.log(
                            "New img element with class 'seventv-chat-emote' added:",
                            emoteElement
                        );
                        const altText = emoteElement.getAttribute("alt");
                        console.log("Alt text of the img element:", altText);
                        if (altText === "veryCat") {
                            playSound();
                        }
                    }
                }
            });
        }
    }
}

const observer = new MutationObserver(checkForNewElements);

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

console.log("Content script loaded and observing DOM changes");

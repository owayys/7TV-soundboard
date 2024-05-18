// Function to play a sound
function playSound(soundUrl) {
    const audio = new Audio(soundUrl);
    audio.play();
}

// Function to check for the specific element additions
function checkForNewElements(mutationsList, observer) {
    chrome.storage.local.get("triggers", (result) => {
        if (!result.triggers) return;
        const triggers = result.triggers;

        for (const mutation of mutationsList) {
            if (
                mutation.type === "childList" &&
                mutation.addedNodes.length > 0
            ) {
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
                            const altText = emoteElement.getAttribute("alt");
                            triggers.forEach((trigger) => {
                                if (altText === trigger.text) {
                                    console.log(
                                        "Trigger text found in alt text:",
                                        altText
                                    );
                                    playSound(trigger.sound);
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}

// Create a MutationObserver to monitor the DOM
const observer = new MutationObserver(checkForNewElements);

// Start observing the document body for changes
observer.observe(document.body, {
    childList: true,
    subtree: true,
});

console.log("Content script loaded and observing DOM changes");

/*global chrome*/
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
// Function to play a sound
function playSound(soundUrl, volume = 1) {
    const audio = new Audio(soundUrl);
    audio.volume = volume;
    audio.play();
}

let shouldIgnoreMutations = true; // Flag to ignore initial mutations
// Function to check for the specific element additions
async function checkForNewElements(mutationsList, observer) {
    if (shouldIgnoreMutations) {
        // Ignore initial mutations
        await sleep(1000);
        shouldIgnoreMutations = false;
        return;
    }
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
                                console.log(window.location.href, trigger?.url);
                                if (
                                    altText === trigger?.text &&
                                    window.location.href === trigger?.url
                                ) {
                                    console.log(
                                        "Trigger text found in alt text:",
                                        altText,
                                        trigger?.volume
                                    );
                                    chrome.storage.local.get(
                                        "triggersMuteAll",
                                        (result) => {
                                            if (result.triggersMuteAll) {
                                                console.log(
                                                    "Mute all is enabled"
                                                );
                                                return;
                                            }

                                            playSound(
                                                trigger?.sound,
                                                trigger?.volume / 100
                                            );
                                        }
                                    );
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

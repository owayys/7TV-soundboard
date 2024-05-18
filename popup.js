document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("addTrigger").addEventListener("click", addTrigger);

function addTrigger() {
    const triggerDiv = document.createElement("div");
    triggerDiv.className = "trigger";
    triggerDiv.innerHTML = `
    <input type="text" placeholder="Trigger text" class="trigger-text">
    <input type="file" accept="audio/*" class="trigger-file">
    <button class="removeTrigger">Remove</button>
  `;
    triggerDiv.querySelector(".removeTrigger").addEventListener("click", () => {
        triggerDiv.remove();
        saveOptions();
    });
    document.getElementById("triggers").appendChild(triggerDiv);
    triggerDiv
        .querySelector(".trigger-text")
        .addEventListener("input", saveOptions);
    triggerDiv
        .querySelector(".trigger-file")
        .addEventListener("change", saveOptions);
}

function saveOptions() {
    const triggers = [];
    const triggerDivs = document.querySelectorAll(".trigger");
    let pendingFiles = triggerDivs.length;

    triggerDivs.forEach((triggerDiv) => {
        const text = triggerDiv.querySelector(".trigger-text").value;
        const fileInput = triggerDiv.querySelector(".trigger-file");
        const file = fileInput.files[0];

        if (text && file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                triggers.push({ text: text, sound: e.target.result });
                pendingFiles--;

                if (pendingFiles === 0) {
                    chrome.storage.local.set({ triggers: triggers });
                }
            };
            reader.readAsDataURL(file);
        } else {
            pendingFiles--;

            if (pendingFiles === 0) {
                chrome.storage.local.set({ triggers: triggers });
            }
        }
    });
}

function restoreOptions() {
    chrome.storage.local.get("triggers", (result) => {
        if (result.triggers) {
            result.triggers.forEach((trigger) => {
                const triggerDiv = document.createElement("div");
                triggerDiv.className = "trigger";
                triggerDiv.innerHTML = `
          <input type="text" value="${trigger.text}" class="trigger-text">
          <input type="file" accept="audio/*" class="trigger-file">
          <button class="removeTrigger">Remove</button>
        `;
                triggerDiv
                    .querySelector(".removeTrigger")
                    .addEventListener("click", () => {
                        triggerDiv.remove();
                        saveOptions();
                    });
                document.getElementById("triggers").appendChild(triggerDiv);
                triggerDiv
                    .querySelector(".trigger-text")
                    .addEventListener("input", saveOptions);
                triggerDiv
                    .querySelector(".trigger-file")
                    .addEventListener("change", saveOptions);
            });
        }
    });
}

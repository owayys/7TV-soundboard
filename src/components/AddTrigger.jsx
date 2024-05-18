/* global chrome */

const AddTrigger = ({
    triggers,
    setTriggers,
    newTriggerText,
    setNewTriggerText,
    newTriggerSound,
    setNewTriggerSound,
    newTriggerVolume,
    setNewTriggerVolume,
}) => {
    const handleFileSelect = () => {
        document.getElementById("fileInput").click();
    };

    const handleNewTrigger = () => {
        console.log(
            triggers,
            newTriggerText,
            newTriggerSound,
            newTriggerVolume
        );
        if (!newTriggerText) console.log("No trigger text provided");
        if (!newTriggerSound) console.log("No trigger sound provided");
        if (
            newTriggerText &&
            newTriggerSound &&
            !triggers.find((trigger) => trigger.text === newTriggerText)
        ) {
            let newTrigger;
            const reader = new FileReader();
            reader.onload = function (e) {
                newTrigger = {
                    text: newTriggerText,
                    sound: e.target.result,
                    volume: newTriggerVolume,
                };
                console.log(newTrigger);
                chrome.storage.local
                    .set({
                        triggers: [...triggers, newTrigger],
                    })
                    .then(() => {
                        console.log("Trigger added to storage");
                        setTriggers([...triggers, newTrigger]);
                        setNewTriggerText("");
                        setNewTriggerSound(null);
                        setNewTriggerVolume(100);
                        document.getElementById("fileInput").value = "";
                    });
            };
            reader.readAsDataURL(newTriggerSound);
        }
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignContent: "center",
                alignItems: "center",
            }}
        >
            <span
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <input
                    type="text"
                    value={newTriggerText}
                    onChange={(e) => setNewTriggerText(e.target.value)}
                    style={{
                        width: "65%",
                    }}
                />
                <input
                    id="fileInput"
                    type="file"
                    accept="audio/*"
                    style={{ display: "none" }}
                    onChange={(e) => setNewTriggerSound(e.target.files[0])}
                />
                <button
                    style={{
                        width: "30%",
                    }}
                    onClick={handleFileSelect}
                >
                    Browse
                </button>
            </span>
            <span
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <input
                    style={{
                        width: "65%",
                    }}
                    onChange={(e) => setNewTriggerVolume(e.target.value)}
                    type="range"
                    value={newTriggerVolume}
                    min="0"
                    max="100"
                />
                <button
                    style={{
                        width: "30%",
                    }}
                    onClick={handleNewTrigger}
                >
                    Add
                </button>
            </span>
        </div>
    );
};

export default AddTrigger;

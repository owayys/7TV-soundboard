/*global chrome*/

import { useState, useEffect } from "react";
import "./App.css";
import Trigger from "./components/Trigger";

function App() {
    const [triggers, setTriggers] = useState([]);
    const [newTriggerText, setNewTriggerText] = useState("");
    const [newTriggerSound, setNewTriggerSound] = useState(null);
    const [newTriggerVolume, setNewTriggerVolume] = useState(100);

    useEffect(() => {
        chrome.storage.local.get("triggers", (result) => {
            if (result.triggers) {
                setTriggers(result.triggers);
            }
        });
    }, []);

    const handleFileSelect = () => {
        document.getElementById("fileInput").click();
    };

    const handleNewTrigger = () => {
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
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "space-between",
                    alignContent: "center",
                    alignItems: "center",
                }}
            >
                <h2>7TV Soundboard</h2>
                <button
                    onClick={() => {
                        chrome.storage.local.clear();
                        setTriggers([]);
                    }}
                    style={{
                        backgroundColor: "red",
                        color: "white",
                    }}
                >
                    Clear All
                </button>
            </div>
            <div
                style={{
                    height: "300px",
                    maxHeight: "300px",
                    overflowY: "scroll",
                    marginBottom: "10px",
                }}
            >
                {triggers.map((trigger, index) => (
                    <Trigger key={index} trigger={trigger} />
                ))}
            </div>
            <hr
                style={{
                    borderWidth: "1px",
                    borderColor: "gray",
                    marginBottom: "15px",
                    marginTop: "15px",
                }}
            ></hr>
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
        </>
    );
}

export default App;

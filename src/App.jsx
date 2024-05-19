/*global chrome*/

import { useState, useEffect } from "react";
import "./App.css";
import Trigger from "./components/Trigger";
import AddTrigger from "./components/AddTrigger";

function App() {
    const [triggers, setTriggers] = useState([]);
    const [newTriggerText, setNewTriggerText] = useState("");
    const [newTriggerSound, setNewTriggerSound] = useState(null);
    const [newTriggerVolume, setNewTriggerVolume] = useState(100);
    const [currentTabUrl, setCurrentTabUrl] = useState("");
    const [muteAll, setMuteAll] = useState(false);

    useEffect(() => {
        chrome.storage.local.get("triggers", (result) => {
            if (result.triggers) {
                setTriggers(result.triggers);
                console.log("Triggers loaded from storage", result.triggers);
            }
        });

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            setCurrentTabUrl(tabs[0].url);
        });

        chrome.storage.local.get("triggersMuteAll", (result) => {
            if (result.triggersMuteAll) {
                setMuteAll(result.triggersMuteAll);
                console.log(
                    "MuteAll loaded from storage",
                    result.triggersMuteAll
                );
            }
        });
    }, []);

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
                <button
                    onClick={() => {
                        chrome.storage.local
                            .set({ triggersMuteAll: !muteAll })
                            .then(() => {
                                setMuteAll(!muteAll);
                            });
                    }}
                >
                    {muteAll ? "Unmute" : "Mute"}
                </button>
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
                    Clear
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
                {triggers
                    .filter((trigger) => trigger?.url === currentTabUrl)
                    .map((trigger, index) => (
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
            <AddTrigger
                triggers={triggers}
                setTriggers={setTriggers}
                newTriggerText={newTriggerText}
                setNewTriggerText={setNewTriggerText}
                newTriggerSound={newTriggerSound}
                setNewTriggerSound={setNewTriggerSound}
                newTriggerVolume={newTriggerVolume}
                setNewTriggerVolume={setNewTriggerVolume}
            />
        </>
    );
}

export default App;

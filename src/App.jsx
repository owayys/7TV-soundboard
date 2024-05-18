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

    useEffect(() => {
        chrome.storage.local.get("triggers", (result) => {
            if (result.triggers) {
                setTriggers(result.triggers);
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

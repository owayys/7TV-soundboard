/*global chrome*/

import { useState } from "react";
import { playSound } from "../utils/utils";

const Trigger = (trigger) => {
    const [show, setShow] = useState(true);
    const [currVolume, setCurrVolume] = useState(trigger?.trigger?.volume);

    const handleDelete = () => {
        setShow(false);
        chrome.storage.local.get("triggers", (result) => {
            if (result.triggers) {
                const newTriggers = result.triggers.filter(
                    (t) => t.text !== trigger.trigger.text
                );
                chrome.storage.local.set({ triggers: newTriggers });
            }
        });
    };

    const handleVolumeChange = (volume) => {
        setCurrVolume(volume);
        chrome.storage.local.get("triggers", (result) => {
            if (result.triggers) {
                const newTriggers = result.triggers.map((t) => {
                    if (
                        t.text === trigger.trigger.text &&
                        t.url === trigger.trigger.url
                    ) {
                        return {
                            ...t,
                            volume: volume,
                        };
                    }
                    return t;
                });
                chrome.storage.local.set({ triggers: newTriggers });
            }
        });
    };

    return (
        <>
            {show && trigger?.trigger && (
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
                    <p>{trigger?.trigger?.text}</p>
                    <span
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                        }}
                    >
                        <input
                            type="range"
                            value={currVolume}
                            onChange={(e) => handleVolumeChange(e.target.value)}
                            min="0"
                            max="100"
                        />
                        <button
                            onClick={() =>
                                playSound(
                                    trigger?.trigger?.sound,
                                    currVolume / 100
                                )
                            }
                        >
                            Play
                        </button>
                        <button
                            style={{
                                backgroundColor: "red",
                                color: "white",
                            }}
                            onClick={handleDelete}
                        >
                            X
                        </button>
                    </span>
                </div>
            )}
        </>
    );
};

export default Trigger;

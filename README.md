# 7TV Soundboard

A chrome extension that enables you to add triggers on 7TV emotes to play specified soundclips.

# Demo

## Pre-requisites

- The 7TV extension must be installed.
- The trigger emote must be present in the streamer's current 7TV emote set.

https://github.com/owayys/7TV-soundboard/assets/76042418/54dc872e-5c47-4d06-8f3c-2450d398685c

# Usage

1. **Option 1: Download and Extract**

    - Download the [latest release](https://github.com/owayys/7TV-soundboard/releases/latest/download/extension.zip).
    - Extract the `extension.zip` archive.

    **Option 2: Clone and Build**

    - Clone this project and install the dependencies:
        ```sh
        git clone https://github.com/owayys/7TV-soundboard.git
        cd 7TV-soundboard
        npm install
        ```
    - Build the project:
        ```sh
        npm run build
        ```

2. Go to your browser extension settings and enable developer mode.
3. Load the unpacked extension in your browser.
4. Select the `dist` folder that was generated during the process.

Once the extension is loaded, you should be able to use the 7TV Soundboard.

# Features

-   [x] Add emote Triggers & specify soundclips.
-   [x] Per-trigger volume control.
-   [x] Preview added trigger soundclips.
-   [x] Channel-specific triggers.
-   [x] Mute all.
-   [ ] Channel-specific mute.
-   [ ] Validate emote names with Twitch & 7TV API calls.

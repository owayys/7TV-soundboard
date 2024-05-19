# 7TV Soundboard

A chrome extension that enables you to add triggers on 7TV emotes to play specified soundclips.

# Demo

https://github.com/owayys/7TV-soundboard/assets/76042418/6fdf27a3-ba61-4319-a811-9050408e65a5

# Usage

1. **Option 1: Download and Extract**

    - Download the [latest release](https://github.com/owayys/7TV-soundboard/releases/latest/download/extension.zip).
    - Extract the `extension.zip` archive.

    **OR**

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

**THEN**

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
-   [x] Channel-specific mute.
-   [ ] Validate emote names with API calls.

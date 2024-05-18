export const playSound = (soundUrl, volume = 1) => {
    const audio = new Audio(soundUrl);
    audio.volume = volume;
    audio.play();
};

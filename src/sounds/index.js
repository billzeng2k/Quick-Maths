export { default as add_symbol } from './add_symbol.mp3';
export { default as error } from './error.mp3';
export { default as finish } from './finish.mp3';
export { default as go } from './go.mp3';
export { default as menu } from './menu.mp3';
export { default as ready } from './ready.mp3';
export { default as remove_symbol } from './remove_symbol.mp3';
export { default as set } from './set.mp3';
export { default as win } from './win.mp3';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

export let muted = false;

export function toggleSound() {
    muted = !muted;
}

export function playSound(sound) {
    if (!muted) {
        var source = audioCtx.createBufferSource();
        var request = new XMLHttpRequest();
        request.open('GET', sound, true);

        request.responseType = 'arraybuffer';

        request.onload = function () {
            var audioData = request.response;

            audioCtx.decodeAudioData(audioData, function (buffer) {
                source.buffer = buffer;

                source.connect(audioCtx.destination);
                source.start(0);
            },
                function (e) { console.log("Error with decoding audio data" + e); });
        }
        request.send();
    }
}


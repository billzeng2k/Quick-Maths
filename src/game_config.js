import { grin, love, cool, angel, silly, smile, daruma_happy, dog_happy, kappa_happy, daruma_sad, dog_sad, kappa_sad, monkey_happy, takoyaki_happy, oni_happy, octopus_happy, monkey_sad, takoyaki_sad, oni_sad, octopus_sad } from './images';
import { calcWidth } from './logic.js';

export const alt = 'Gah it broke :(';
export const winEmojis = [grin, love, cool, angel, silly, smile];
export let gameRunning = false, homebutton = true;
export function setGameRunning(inp) {
    gameRunning = inp;
}
export function setHomeButton(inp) {
    homebutton = inp;
}
export let tut = true, tutCnt = 0, tutAns = [];
export function setTut(inp) {
    tut = inp;
}
export function setTutCnt(inp) {
    tutCnt = inp;
}
export function setTutAns(inp) {
    tutAns = inp;
}
export const timerSize = calcWidth(25, 0);
export const yeahIcons = [daruma_happy, dog_happy, kappa_happy, monkey_happy, takoyaki_happy, oni_happy, octopus_happy];
export const nahIcons = [daruma_sad, dog_sad, kappa_sad, monkey_sad, takoyaki_sad, oni_sad, octopus_sad];
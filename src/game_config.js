import { grin, love, cool, angel, silly, smile, surprised, angry, poo, dizzy, cry } from './images';
import { calcWidth } from './logic.js';

export const alt = 'Gah it broke :(';
export const winEmojis = [grin, love, cool, angel, silly, smile];
export const loseEmojis = [surprised, angry, poo, dizzy, cry];
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
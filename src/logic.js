import { plus, minus, divide, multiply } from './images';
export let minR = -9, maxR = 99, highScore = 0, terms = 3;
export function setMaxR(inp) {
    maxR = inp;
} 
export function setTerms(inp) {
    terms = inp;
} 
export function setHighScore(inp) {
    highScore = inp;
} 
export const symbols = ['+', '-', '*', '/'];

export function setContext(callback) {
    window.FBInstant.context
        .chooseAsync()
        .then(function () {
            window.FBInstant
                .getLeaderboardAsync('BaseGame.' + window.FBInstant.context.getID())
                .then(leaderboard => { return leaderboard.setScoreAsync(0); })
                .then(() => {
                    window.FBInstant
                        .getLeaderboardAsync('BaseGame.' + window.FBInstant.context.getID())
                        .then(leaderboard => leaderboard.getPlayerEntryAsync())
                        .then(entry => {
                            highScore = entry.getScore();
                            callback('Play');
                        }).catch(error => {
                            console.error(error);
                            highScore = 0;
                        });
                })
                .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
}

export function reset() {
    terms = 3;
}

export function generateAnswer(values) {
    let ans = [];
    let sol = [];
    if (terms === 4) {
        for (let i = 0; i < symbols.length; i++) {
            for (let j = 0; j < symbols.length; j++) {
                for (let k = 0; k < symbols.length; k++) {
                    let answer = solveEquation(values.slice(0), [symbols[i], symbols[j], symbols[k]]);
                    if (answer <= maxR && answer >= minR) {
                        ans.push(answer);
                        sol.push([symbols[i], symbols[j], symbols[k]]);
                    }
                }
            }
        }
    } else {
        for (let i = 0; i < symbols.length; i++) {
            for (let j = 0; j < symbols.length; j++) {
                let answer = solveEquation(values.slice(0), [symbols[i], symbols[j]]);
                if (answer <= maxR && answer >= minR) {
                    ans.push(answer);
                    sol.push([symbols[i], symbols[j]]);
                }
            }
        }
    }
    let index = Math.floor(Math.random() * ans.length);
    return { result: ans[index], answer: sol[index] };
}

export function solveEquation(values, operators) {
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '*') {
            values[i] *= values[i + 1];
            values.splice(i + 1, 1);
            operators.splice(i, 1);
            i = -1;
        } else if (operators[i] === '/') {
            values[i] /= values[i + 1];
            values.splice(i + 1, 1);
            operators.splice(i, 1);
            i = -1;
        }
    }
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            values[i] += values[i + 1];
            values.splice(i + 1, 1);
            operators.splice(i, 1);
            i = -1;
        } else if (operators[i] === '-') {
            values[i] -= values[i + 1];
            values.splice(i + 1, 1);
            operators.splice(i, 1);
            i = -1;
        }
    }
    return values[0] % 1 === 0 ? values[0] : maxR + 1;
}

export function wrongAnswer(values, result) {
    let operators = [];
    for (let i = 0; i < terms - 2; i++)
        operators.push(symbols[Math.floor(Math.random() * symbols.length)]);
    operators.push(symbols[Math.floor(Math.random() * 2)]);
    if (solveEquation(values.slice(0), result) === result) {
        if (operators[terms - 2] === '+')
            operators[terms - 2] = '-';
        else
            operators[terms - 2] = '+';
    }
    return convertToImages(operators);
}

export function convertToImage(operator) {
    switch (operator) {
        case '+':
            return plus;
        case '-':
            return minus;
        case '*':
            return multiply;
        case '/':
            return divide;
        default:
            return plus;
    }
}

export function convertToImages(operators) {
    for (let i = 0; i < operators.length; i++) 
        operators[i] = convertToImage(operators[i]);
    return operators;
}

export function lerp(a, b, t) {
    if (t >= 1)
        return b;
    if (t <= 0)
        return a;
    return a + (b - a) * t;
}

export function calcWidth(percent, additional) {
    return document.body.clientWidth * percent / 100 + additional;
}

export function calcHeight(percent, additional) {
    return document.body.clientHeight * percent / 100 + additional;
}
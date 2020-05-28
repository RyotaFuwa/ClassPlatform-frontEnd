//TODO: random library
function randomChoice(choices) {
    let index = Math.floor(Math.random() * choices.length);
    return choices[index]
}

export {randomChoice}
export default randomChoice;


function generateStateString() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let state = '';

    for(let i = 0; i < 16; i++) {
        state+= possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return state;
}

module.exports = generateStateString;
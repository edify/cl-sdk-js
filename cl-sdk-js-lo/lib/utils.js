/**
 * Created by diugalde on 05/09/16.
 */

/**
 * Generates a random ASCII string of specific length.
 *
 * @param len - number (Number of characters).
 * @returns string
 */
function generateRandomString(len) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(let i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

module.exports = {
    generateRandomString: generateRandomString
};

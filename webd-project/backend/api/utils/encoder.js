const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

 async function encode(plainText){
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(plainText,salt);
} 

function compare(token1, token2){
    return bcrypt.compare(token2, token1);
}

module.exports = {
    encode,
    compare
}
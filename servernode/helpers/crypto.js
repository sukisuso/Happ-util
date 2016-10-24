var crypto = require('crypto');
const algorithm = 'sha256';
const secret = '9192-keylogreing';

function encrypt(text){
 
  const hash = crypto.createHmac(algorithm , secret)
                   .update(text)
                   .digest('hex');
  return hash;
}

module.exports = {
  "encrypt":encrypt
}
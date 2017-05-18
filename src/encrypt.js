'use strict'
/**
  Example:

    var encrypt = this.helpers.encrypt();
    var password = encrypt.generate('...')
    if(encrypt.check('...', password))
      ...
*/

var bcrypt = require('bcryptjs');

export default class Encrypt{
  constructor(){}

  generate(raw){
    if(!raw) throw new Error("raw is required")

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(raw, salt);

    return hash;
  }

  check(raw, encrypted){
    if(!raw) throw new Error("argument raw is required")
    if(!encrypted) throw new Error('argument encrypted is required');

    return bcrypt.compareSync(raw, encrypted); 
  }
}

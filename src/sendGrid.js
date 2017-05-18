'use strict'
/**
  var sendgrid = new SendGrid(config);
  var result = yield sendgrid.setData({...}).send();
        or yield sendgrid.send({...})


  for more information check:
    https://github.com/sendgrid/sendgrid-nodejs#usage
*/

import sendgrid from 'sendgrid';

export default class SendGrid{
  constructor (config){
    if(!(this instanceof SendGrid)) return new SendGrid(config);

    if(!config.username) throw new Error('Sendgrid username missing');
    if(!config.password) throw new Error('Sendgrid password missing');

    this.sendgrid = sendgrid(config.username, config.password);
  }

  /*
    {
      to:       [],
      toname:   [],
      from:     '',
      fromname: '',
      subject:  '',
      text:     '',
      html:     '',
      bcc:      [],
      replyto:  '',
      date:     new Date(),
      files: [
        {
          filename:     '',           // required only if file.content is used.
          contentType:  '',           // optional
          cid:          '',           // optional, used to specify cid for inline content
          path:         '',           //
          url:          '',           // == One of these three options is required
          content:      ('' | Buffer) //
        }
      ],
      file_data:  {}
    }
  */
  setData(data){
    this.data = data;
    return this;
  }
  /* yieldable .send */
  send (data){
    this.data = data;

    var sendgrid = this.sendgrid;
    var email = new sendgrid.Email(this.data);

    return function(cb){
      sendgrid.send(email, cb);
    }
  }


}

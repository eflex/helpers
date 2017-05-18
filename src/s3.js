'use strict'
/**
  Example:
  var s3 = new S3(config)

  var result = yield s3.upload(src, dest);
  var result = yield s3.uploadStream(readable_stream, dest);

  // return file in the browser
  var file = yield s3.download(file_name);
  this.type = path.extname(file_name);
  this.body = file;

  var result = yield s3.delete(location)

  // success:
  .statusCode == 200

  *note:
    for more information check
      https://github.com/LearnBoost/knox

*/
import fs from 'fs';
import stream from 'stream';
import knox from 'knox';
import know_mpu from 'knox-mpu';

export default class S3{
  constructor (config){
    if(!(this instanceof S3)) return new S3(config);

    this.s3_client = knox.createClient({
      key: config.key,
      secret: config.secret,
      bucket: config.bucket
    })
  }

  upload (src, dest){
    if(!(src instanceof stream.Readable)) src = fs.createReadStream(src);

    var client = this.s3_client;
    return function(cb){
          new know_mpu({client: client, objectName: dest, stream: src},cb);
    }
  }

  uploadStream(readable_stream, dest){
    var client = this.s3_client;
    return function(cb){
        new know_mpu({client: client, objectName: dest, stream: readable_stream},cb);
    }
  }

  /**
    return a readable stream
  */
  download (file_name){
    var client = this.s3_client;
    return function(cb){
      client.getFile(file_name, cb);
    }
  }

  delete (file_name){
    var client = this.s3_client;
    return function(cb){
      if(file_name instanceof Array){
        client.deleteMultiple(file_name, cb);
      }else{
        client.deleteFile(file_name, cb);
      }

    }
  }
}

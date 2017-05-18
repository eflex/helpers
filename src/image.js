'use strict'
import path from 'path';
import co from 'co';
import gm from 'gm';

/**
  Example:
    var img = new GM(file);
    img.resize(w,h);
    var info = yield img.identify();
    var result = yield img.write(dest)
    var result = yield img.stream(writeStream)
    ....

  *note:
    for more information check
      http://aheckmann.github.io/gm/docs.html
*/

export default class GM{
  constructor (image_path){
    let imageMagick = gm.subClass({ imageMagick: true });

    this.image = imageMagick(image_path);
    // return this;
  }

  /* return the gm intance */
  toObject (){
    return this.image
  }

  resize (w,h){
    this.image.resize(w,h);
    return this;
  }

  crop(w,h){
    this.image.crop(w,h);
    return this;
  }

  gravity(loc){
    if(!loc) loc = 'Center';
    this.image.gravity(loc);
    return this;
  }

  quality(qty){
    if(!qty) qty = 90;
    this.image.quality(qty);
    return this;
  }


  /* identify */
  identify (){
    var image = this.image;
    return function(cb){
      image.identify(cb);
    }
  }

  /* yieldable write */
  * write(dest_path){
    try{
      yield write(this.image, dest_path)
      return {message: 'success'}
    }catch(e){
      return {message: 'fail', error: e }
    }

    /* thunkified gm.write */
    function write(gm, dest){
      return function(cb){
        gm.write(dest, cb);
      }
    }
  }


  /**
    yieldable stream
    if no writable stream provided then returns a readable stream
  */
  * stream (writable_stream, type){
    if(!writable_stream) return this.image.stream(type);

    try{
      this.image.stream(type).pipe(writable_stream)
      return {message: 'success'};
    }catch(e){
      return {message: 'fail', error: e}
    }
  }

}
"use strict";
import encrypt from "../lib/encrypt";
import random from "../lib/random";
import {toNumber,toComma} from "../lib/currency";
import assert from "assert";

describe("Testing encrypt and random modules", function(){
  it("check encrypted text", function(){
      var raw = "helloworld";
      var Encrypt = new encrypt("12345");
      let encrypted = Encrypt.generate(raw);
      let check = Encrypt.check("helloworld", encrypted);
      assert.equal(check, true);
  });

  it("should return random", function(){
    let rand = random(32);
    assert.equal(rand.length, 32);
  })

})
describe("Testing currency module", function(){
  it("should convert 10,000.00 to 10000", function(){
    let result = toNumber("10,000.00");
    assert.equal(10000, result);

  })

  it("should convert 10000 to 10,000", function(){
    let result = toNumber("10,000.00");
    assert(10000, result);
    assert.equal("10,000", toComma(result))
  })

})

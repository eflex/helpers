"use strict";

/* convert number to comma delimited values */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toComma = toComma;
exports.toNumber = toNumber;

function toComma(value) {
  var parts = value.toString().split(".");
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}

function toNumber(value) {
  return Number(value.replace(/[^0-9\.]+/g, ""));
}
const titlize = require('titlize');

function key(string) {
  return titlize(string).split(' ').join('');
}

function intRange(a, b) {
  let out = [];
  for(let i = a; i < b; i++) {
    out.push(i);
  }
  return out;
}

export {key, intRange};
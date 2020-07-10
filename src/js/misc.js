const titlize = require('titlize');

function key(string) {
  return titlize(string).split(' ').join('');
}

export {key};
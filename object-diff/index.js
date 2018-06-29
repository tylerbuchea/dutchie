module.exports = objectDiff;

function objectDiff(newCode, oldCode) {
  const oldTokens = flatten(oldCode).map(token => ['-'].concat(token));
  const newTokens = flatten(newCode).map(token => ['+'].concat(token));
  const allTokens = oldTokens.concat(newTokens)
  const diffTokens = [];

  for ([a, b, c] of allTokens) {
    let count = 0;
    for ([d, e, f] of allTokens) {
      if (b + c === e + f) count++;
    }
    if (count < 2) diffTokens.push([a, b, c]);
  }

  return diffTokens;
}

function flatten(parentValue, parentKey = '', path = '') {
  path += `.${parentKey}`;

  if (typeof parentValue === 'number') {
    const token = [ path.slice(2), parentValue ];
    return [token];
  }

  const paths = Object.keys(parentValue)
    .reduce((arr, key) => arr.concat(flatten(parentValue[key], key, path)), []);

  return paths;
}
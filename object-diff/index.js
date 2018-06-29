module.exports = objectDiff;

function objectDiff(newCode, oldCode) {
  const oldTokens = flatten(oldCode).map(token => ['-'].concat(token));
  const newTokens = flatten(newCode).map(token => ['+'].concat(token));

  const tokenMap = new Map();
  const allTokens = oldTokens
    .concat(newTokens)
    // .map(([operation, path, value]) => [path + ',' + value, operation])
    // .forEach(([key, value]) => tokenMap.has(key)
    //     ? tokenMap.delete(key)
    //     : tokenMap.set(key, value)
    // );

    // tokenMap
    // return;

    // .map(token => ['-'].concat(token));
    // .map(token => ['+'].concat(token));

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

// apples 3
// oranges.bergamot 3
// oranges.navel.peaches 1
// oranges.navel.apples 3

// [ '-', 'oranges.valencia.pears', 2 ],
// [ '-', 'oranges.valencia.oranges', 4 ],
// [ '+', 'oranges.navel.peaches', 1 ],
// [ '+', 'oranges.navel.apples', 3 ]

const newCode = {
  apples: 3,
  oranges: {
    bergamot: 3,
    navel: {
      peaches: 1,
      apples: 3
    }
  }
}

const oldCode = {
  apples: 3,
  oranges: {
    bergamot: 3,
    valencia: {
      pears: 2,
      oranges: 4
    }
  }
}

console.log(objectDiff(newCode, oldCode))
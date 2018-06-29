module.exports = objectDiff;

function objectDiff(newCode, oldCode) {
  const oldTokens = flatten(oldCode).map(token => ['-'].concat(token));
  const newTokens = flatten(newCode).map(token => ['+'].concat(token));

  const tokenSet = new Map();
  const allTokens = oldTokens
    .concat(newTokens)
    .map(([operation, path, value]) => [path + ',' + value, operation])
    .forEach(([key, value]) => tokenSet.has(key)
        ? tokenSet.delete(key)
        : tokenSet.set(key, value)
    );

    console.log(tokenSet);
    return;

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

  let paths = [];

  for (let key in parentValue) {
    const nextPath = flatten(parentValue[key], key, path);
    paths = paths.concat(nextPath);
  }

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
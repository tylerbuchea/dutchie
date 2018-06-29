
module.exports = function merkle(tree, simpleHasher) {
  // const root = crawlTree(tree, simpleHasher);
  // console.log(root);

  this.verify = function() {
    // console.log('verify');
  }
  // console.log(tree);
  // const root = simpleHasher(simpleHasher(tree[0] + tree[1]) + simpleHasher(tree[2] + tree[3]))
  // const root = simpleHasher(simpleHasher(tree[0] + tree[1]) + tree[2]);
  const root = simpleHasher(
    simpleHasher(tree[0] + tree[1]) + tree[2]
  );
  console.log(root);
  console.log(678075951);
  
  return {
    root,
    getVerification() {
      // console.log('getVerification');
    },
  }

}

function crawlTree(tree, simpleHasher) {
  const nextTeir = [];

  for (let i=0; i<tree.length; i++) {
    const mom = tree.shift();
    const dad = tree.shift();
    console.log(mom, dad, tree);
    nextTeir.push(simpleHasher(mom + dad));
    // console.log(nextTeir);
    if (tree.length === 1) nextTeir.push(tree[0]);
    // if (tree.length === 1) nextTeir.push(simpleHasher(tree[0]));
    // console.log(nextTeir);
  }

  // console.log(nextTeir.length);

  if (nextTeir.length === 1) {
    return nextTeir[0];
  }

  return crawlTree(nextTeir, simpleHasher);
}

module.exports = function merkle(tree, simpleHasher) {
  // const root = crawlTree(tree, simpleHasher);

  this.verify = function() {
    // console.log('verify');
  }

  // This is me trying to manually compose them because my crawlTree
  // function wasn't working.
  // But this doesn't work either. This is how I think it should look
  // But apprently not.
  // I have .only set in the test file
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

// This is my automatic merkle tree application function
function crawlTree(tree, simpleHasher) {
  const nextTeir = [];

  for (let i=0; i<tree.length; i++) {
    const mom = tree.shift();
    const dad = tree.shift();
    nextTeir.push(simpleHasher(mom + dad));
    if (tree.length === 1) nextTeir.push(tree[0]);
  }

  if (nextTeir.length === 1) {
    return nextTeir[0];
  }

  return crawlTree(nextTeir, simpleHasher);
}
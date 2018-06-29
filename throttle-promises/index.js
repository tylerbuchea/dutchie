module.exports = async function throttlePromises(batchLength, promiseArray, results = []) {
  try {
    const batch = promiseArray.slice(0, batchLength);
    const nextBatch = promiseArray.slice(batchLength);
    const nextResults = await Promise.all(batch.map(value => value()));

    results = results.concat(nextResults);

    if (nextBatch.length) {
      return throttlePromises(batchLength, nextBatch, results);
    }

    return results;
  } catch(e) {
    console.log('yoooo', e);
  }
}
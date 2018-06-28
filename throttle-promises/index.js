module.exports = function throttlePromises(batchLength, promiseArray) {
  const batch = promiseArray.slice(0, batchLength);
  const nextBatch = promiseArray.slice(batchLength);
  const promises = Promise.all(batch);

  console.log(batch.length, nextBatch.length);
  if (nextBatch.length) {
    return promises.then(() => throttlePromises(batchLength, nextBatch))
  } else {
    console.log('LAST');
    return promises;
  }
}
module.exports = function throttlePromises(batchLength, promiseArray) {
  const batch = promiseArray.slice(0, batchLength);
  const nextBatch = promiseArray.slice(batchLength);
  const result = Promise.all(batch);

  if (nextBatch.length) {
    console.log('LENGTTHH');
    return result.then(() => throttlePromises(batchLength, nextBatch))
  } else {
    console.log('NOOON');
    return result;
  }
}
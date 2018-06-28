module.exports = function debounce(fn, time) {
  var queue = [];

  function takeLatest() {
    var lastFn = queue.pop();
    queue = [];
    lastFn();
  }

  return function() {
    queue.push(() => fn.apply(this, arguments));
    if (queue.length === 1) {
      setTimeout(takeLatest, time);
    }
  }
}
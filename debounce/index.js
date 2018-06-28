module.exports = function debounce(fn, time) {
  let lastFn = null;

  const takeLatest = () => {
    lastFn();
    lastFn = null;
  };
  
  return function() {
    if (!lastFn) setTimeout(takeLatest, time);
    lastFn = () => fn.apply(this, arguments);
  }
}
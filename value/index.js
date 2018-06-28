module.exports = function value(thunk) {
  if (typeof thunk === 'function') {
    return value(thunk());
  }
  return thunk;
}
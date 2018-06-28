module.exports = function value(thunk) {
  return (typeof thunk === 'function')
    ? value(thunk())
    : thunk;
}
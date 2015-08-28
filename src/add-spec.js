describe('add', function () {
  var add = require('./add');
  it('adds numbers', function () {
    console.assert(add(2, 3) === 5);
  });
  it('concatenates strings', function () {
    console.assert(add('foo', 'bar') === 'foobar');
  });
});

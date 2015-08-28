var benv = require('benv');
describe('calc module', function () {
  beforeEach(function setupEnvironment(done) {
    benv.setup(function () {
      benv.expose({
        angular: benv.require('../node_modules/angular/angular.js', 'angular')
      });
      done();
    });
  });
  beforeEach(function loadCalcModule() {
    // force to load the module from scratch
    delete require.cache[require.resolve('./calc')];
    require('./calc');
  });
  it('has "add" value that adds numbers', function () {
    var injector = angular.injector(['Calc']);
    console.assert(injector, 'grabbed Calc injector');
    var add = injector.get('add');
    console.assert(add(2, 3) === 5, 'added 2 + 3');
  });

  var describeIt = require('describe-it');
  var setupEachTime = true;
  describeIt(__dirname + '/calc.js', 'hello()', setupEachTime, function (getHello) {
    it('has private "hello"', function () {
      var hello = getHello();
      console.assert(hello() === 'hello');
    });
  });

  describeIt(__dirname + '/calc.js', 'subService(add)', setupEachTime, function (getSubService) {
    it('has function', function () {
      var fn = getSubService();
      console.assert(typeof fn === 'function');
    });
    it('returns sub', function () {
      var fn = getSubService();
      function testAdd(a, b) {
        return a + b;
      }
      var sub = fn(testAdd);
      console.assert(sub(2, 3) === -1);
    });
    it('calls the provided testAdd', function () {
      var fn = getSubService();
      var testAddCalled;
      function testAdd(a, b) {
        testAddCalled = true;
        return a + b;
      }
      var sub = fn(testAdd);
      console.assert(sub(2, 3) === -1);
      console.assert(testAddCalled);
    });
  });

  afterEach(function destroySyntheticBrowser() {
    benv.teardown(true);
  });
});

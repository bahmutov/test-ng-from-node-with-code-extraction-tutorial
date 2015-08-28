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

  afterEach(function destroySyntheticBrowser() {
    benv.teardown(true);
  });
});

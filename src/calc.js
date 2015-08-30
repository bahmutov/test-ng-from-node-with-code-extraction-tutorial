function hello() {
  return 'hello';
}
function subService(add) {
  return function sub(a, b) {
    return add(a, -b);
  };
}
function addAsyncService($q, add) {
  return function addAsync(a, b) {
    return $q.when(add(a, b));
  };
}
angular.module('Calc', ['ng'])
  .service('add', function addService() {
    return require('./add');
  })
  .value('hello', hello)
  .service('sub', subService)
  .service('addAsync', addAsyncService);


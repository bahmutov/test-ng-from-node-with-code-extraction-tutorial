function hello() {
  return 'hello';
}
function subService(add) {
  return function sub(a, b) {
    return add(a, -b);
  };
}
angular.module('Calc', [])
  .service('add', function addService() {
    return require('./add');
  })
  .service('sub', subService);


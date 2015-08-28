function hello() {
  return 'hello';
}
angular.module('Calc', [])
  .service('add', function addService() {
    return require('./add');
  });

app.directive("onAnmEnd", function($parse) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var expressionHandler = $parse(attrs.onAnmEnd);
      element.on('oanimationend animationend webkitAnimationEnd', () => {
        scope.$apply(function() {
          expressionHandler(scope);
        });
      });
    }
  }
});


// TODO: Use this with individual animation support:

// app.directive("lxAnmEnd", function($parse) {
//
//   return {
//     restrict: 'A',
//     scope: {
//       actions: '=lxAnmEnd'
//     },
//     link: function(scope, element, attrs) {
//       element.on('oanimationend animationend webkitAnimationEnd', function(e) {
//         scope.$apply(function() {
//           scope.$parent.$eval(scope.actions[e.animationName]);
//         });
//       });
//     }
//   }
//
// });

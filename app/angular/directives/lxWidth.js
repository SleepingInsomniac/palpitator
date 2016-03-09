app.directive(
"lxWidth",
function() {
  return {
    restrict: 'A',
    scope: {
      widthPercent: "=lxWidth"
    },
    link: function(scope, element, attrs) {
      
      scope.$watch(
        'widthPercent',
        (oldValue, newValue) => element[0].style.width = `${scope.widthPercent}%`
      );
      
    }
  };
});

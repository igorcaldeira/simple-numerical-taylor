
var app = angular.module('rkApp', []);

app.controller('TodoListController', ['$scope', function($scope) {
    $scope.table = [];
    // default values

    $scope.equation = "(x ^ 2) + y";
    $scope.stepsize = 0.1;
    
    $scope.start = 0.8;
    $scope.end = 1.3;

    $scope.x = 1;
    $scope.y = 2;

    // principal function

    $scope.run = function(){
        $scope.table = [];
        taylor();
    };

    function taylor () {

        var numberIterations = ($scope.end - $scope.start) / $scope.stepsize;

        for (var i = 0; i <= numberIterations; i++) {

            var xvalue = $scope.start + ($scope.stepsize * i);

            var total = $scope.y;

            var varScope = {
                x: parseFloat($scope.x),
                y: parseFloat($scope.y),
            }

            var eq = math.parse($scope.equation);
            total += (xvalue - 1) * eq.eval(varScope) / math.factorial(0);

            var derivativeEq = eq;
            var derivativeYresult = eq.eval(varScope);

            for (var j = 1; j <= 5; j++) {

                var derivativex = (math.derivative(derivativeEq, 'x').eval(varScope));
                var derivativey = (math.derivative(eq, 'y').eval(varScope));
                var derivative = derivativex + (derivativey * derivativeYresult);

                var part = math.pow((xvalue - $scope.x), j+1);
                var factorial = math.factorial(j+1);

                derivativeEq = math.derivative(derivativeEq, 'x');
                derivativeYresult = derivative;

                var parcialTotal = (derivative * part) / factorial;

                total += parcialTotal;
            }

            $scope.table.push([xvalue , total]);
        }
    }

  }]);

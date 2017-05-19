angular.module('MyCtrls', ['MyServices'])

.controller('HomeCtrl', ['$scope', function($scope) {
        console.log('home controller console log');
    }])
    .controller('NavCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
        $scope.isLoggedIn = function() {
            return Auth.isLoggedIn();
        };

        $scope.logout = function() {
            Auth.removeToken();
            $location.path('/');
        };
    }])

.controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.user = {
        email: '',
        password: ''
    };
    $scope.userSignup = function() {
        $http.post('/api/users', $scope.user).then(function success(res) {
            console.log('successfully created a new user', res);
            $location.path('/'); //relocate to the home page
        }, function error(res) {
            console.log('Error while signing up', res);
        });
    };
}])

.controller('LoginCtrl', ['$scope', '$timeout', 'Auth', '$http', '$location', 'Alerts', function($scope, $timeout, Auth, $http, $location, Alerts) {
    $scope.user = {
        email: '',
        password: ''
    };
    var clearAlerts = function() {
        Alerts.clear();
    };

    $scope.userLogin = function() {
        $http.post('/api/auth', $scope.user).then(function success(res) {
            console.log('response from server when loggin in:', res);
            Auth.saveToken(res.data.token);
            Alerts.add('success', 'You are now logged in, congrats.');
            $timeout(clearAlerts, 1500);
            $location.path('/'); //redirect to home
        }, function error(res) {
            console.log('Something went wrong', res);
            Alerts.add('error', 'Bad Login Info, Please Try Again!!');
            $timeout(clearAlerts, 1500);
        });
    };
}])

.controller('AlertsController', ['$scope', 'Alerts', function($scope, Alerts) {
    $scope.alerts = function() {
        return Alerts.get();
    };
}])

.controller("LineCtrl", ['$scope', function($scope) {
    var sleeps = [{ hours: 7, date: '05/16/17' }, { hours: 8, date: '05/17/17' }];
    var ctx = document.getElementById("line").getContext('2d');

    sleeps.forEach(function(sleep) {
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Date", "Hour"],
                datasets: [{
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    data: [sleep.hours]
                }]
            }
        });
    });
}]);

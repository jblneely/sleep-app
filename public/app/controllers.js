angular.module('TaskCtrls', ['TaskServices'])

.controller('HomeCtrl', ['$scope', 'Task', function($scope, Task) {
        $scope.tasks = [];

        Task.query(function success(data) {
            $scope.tasks = data;
        }, function error(data) {
            console.log(data);
        });

        $scope.deleteTask = function(id, tasksIdx) {
            Task.delete({ id: id }, function success(data) {
                $scope.tasks.splice(tasksIdx, 1);
            }, function error(data) {
                console.log(data);
            });
        };
    }])
    .controller('ShowCtrl', ['$scope', '$stateParams', 'Task', function($scope, $stateParams, Task) {
        $scope.task = {};

        Taks.get({ id: $stateParams.id }, function success(data) {
            $scope.task = data;
        }, function error(data) {
            console.log(data);
        });
    }])
    .controller('NewCtrl', ['$scope', '$location', 'Task', function($scope, $location, Task) {
        $scope.task = {
            title: '',
            description: '',
            image: ''
        };

        $scope.createTask = function() {
            Task.save($scope.task, function success(data) {
                $location.path('/');
            }, function error(data) {
                console.log(data);
            });
        };
    }])
    .controller('NavCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
        $scope.isLoggedIn = function() {
            return Auth.isLoggedIn();
        }

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
        }

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
    }
}])

.controller("LineCtrl", ['$scope', function($scope) {
    var sleepDataFromDB = [{ hours: 5, date: '05/22/17' },
        { hours: 8, date: '05/23/17' },
        { hours: 11, date: '05/24/17' },
        { hours: 7.75, date: '05/25/17' },
        { hours: 5, date: '05/26/17' },
        { hours: 6, date: '05/27/17' },
        { hours: 8.5, date: '05/28/17' }
    ];
    var labelArray = [];
    var hoursArray = [];
    sleepDataFromDB.forEach(function(dataPoint) {
        labelArray.push(dataPoint.date);
        hoursArray.push(dataPoint.hours);
    });

    var sleeps = [{
        label: 'sleep',
        data: [5, 8, 6, 9, 6, 10, 4],
        backgroundColor: [
            'rgba(54, 162, 235, 0.2)'
        ]
    }, {
        label: 'from database',
        data: hoursArray,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
        ]
    }];

    var ctx = document.getElementById("line").getContext('2d');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelArray,
            datasets: sleeps
        }
    });

}])

.controller("DoughnutCtrl", ['$scope', function($scope) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["M", "T", "W", "T", "F", "S", "S"],
            datasets: [{
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                ],
                data: [12, 19]
            }]
        }
    });





    // tasks.forEach(function(task) {
    //     ctx = document.getElementById("myChart" + task.id).getContext('2d');
    //     var myDougnutChart = new Chart(ctx, {
    //         type: 'doughnut',
    //         data: {
    //             labels: ["Current", "Goal"],
    //             datasets: [{
    //                 backgroundColor: [
    //                     'rgba(255, 99, 132, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)'
    //                 ],
    //                 // data: [task.current, task.goal - task.current]
    //                 data: [4, 7]
    //             }]
    //         }
    //     });
    // });
}]);

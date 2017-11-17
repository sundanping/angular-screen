angular.module('app')
    .component('task', {
        template: '<div ui-include="\'task-stats/task.html\'"></div>',
        controller: taskController,
        controllerAs: 'vm'
    });
    taskController.$inject=['$timeout', 'config', 'http', '$interval','$rootScope'];
    function taskController($timeout, config, http, $interval,$rootScope) {
        // var _this =this;
    }
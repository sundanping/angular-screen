angular.module('app')
    .component('content', {
        template: '<div ui-include="\'content-stats/content.html\'"></div>',
        controller: contentController,
        controllerAs: 'vm'
    });
contentController.$inject=['$timeout', 'config', 'http','$interval'];
function contentController($timeout, config, http,$interval) {
    var _this =this;

}
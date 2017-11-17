(function () {
    angular.module('app')
        .component('hot', {
            template: '<div ui-include="\'hot-stats/hot.html\'"></div>',
            controller: hotController,
            controllerAs: 'vm'
        });
    hotController.$inject=['config', 'http','$interval','$rootScope','$timeout'];
    function hotController(config, http, $interval,$rootScope,$timeout) {
        var _this =this;

        /**全局变量**/
        //标题
        _this.title = '';
        _this.titleCount = 0;
        _this.titleList = [];
        _this.titleLength = 0;

        _this.showTitle =false;
        _this.showMother =false;

        _this.$onInit=function () {
            /**标题轮播**/
            _this._getTitle();
            $interval(function(){
                _this.showTitle =false;_this.showMother =false;
                if(_this.titleList[0] && _this.titleCount < _this.titleLength){
                    _this.titleCount += 1;
                    _this.title = _this.titleList[_this.titleCount];
                    $rootScope.title = _this.titleList[_this.titleCount];
                    $timeout(function () {
                        _this.showTitle =true;
                    });
                    _this.showMother =true;
                }else {
                    _this._getTitle();
                }
            },15000);
        };

        _this._getTitle = function() {
            http(config.getUrl('hot_stats_title'))
                .then(function (data) {
                    if(data.error_code == '0' && data.error_message == ''){
                        _this.titleList = data.result;
                        _this.title =  _this.titleList[0];
                        _this.titleLength = _this.titleList.length;
                        _this.titleCount = 1;
                        $rootScope.title = _this.titleList[0];
                        $timeout(function () {
                            _this.showTitle =true;
                        });
                        _this.showMother =true;
                    }else{
                        //接口访问错误
                    }
                });
        };

    }
}());

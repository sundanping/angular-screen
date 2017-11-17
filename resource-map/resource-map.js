/**
 * Created by zhouyaxin on 2017/8/16.
 */
angular.module('app')
    .component('resourceMap', {
        template: '<div ui-include="\'resource-map/resource-map.html\'"></div>',
        controllerAs: 'vm',
        controller: mapController
    });
    mapController.$inject = ['$timeout','config','$http','$interval'];
    function mapController($timeout,config,$http,$interval) {
        var vm = this;
        vm.$onInit = function(){
            vm.coordinateList = [];
            vm.pages = 1;
            vm.getList();

            $interval(function(){
                vm.coordinateList = [];
                vm.getList();
            },5000);
        };

        vm.getList = function () {
            $http({
                method: 'GET',
                url: config.getUrl('map_list'),
                params: {'api.page': vm.pages,'api.size':5}
            }).then(function (data) {
                    if (data && data.data.error_message) {
                        vm.msg = data.data.error_message || config.error_tip;
                        return false;
                    }
                    if (data && data.data) {
                        vm.mapList = data.data.result.data;
                        vm.total = parseInt(data.data.result.total);
                        if ((vm.total / 5) == vm.pages) {
                            vm.pages = 1;
                        }else {
                            vm.pages = parseInt(vm.pages + 1);
                        }
                        vm.pageNum = Math.ceil(vm.total / 5);
                        vm.map();
                    }
                })
        };

        vm.map = function() {
            vm.mp = new BMap.Map("map");
            // vm.mp.enableScrollWheelZoom(true);
            //绘制带图标注
            SquareOverlay.prototype = new BMap.Overlay();
            SquareOverlay.prototype.initialize = function(map){
                this._map = map;
                var div = document.createElement("div"),
                    img = document.createElement("img");
                div.appendChild(img);
                img.src = this._src;
                div.className = 'map-style';
                div.style.position = "absolute";
                div.style.width = (this._length - 5 ) + "px";
                div.style.height = (this._length - 5 ) + "px";
                div.style.background = 'url(../img/map/landmark.png) no-repeat center';
                div.style.backgroundSize = '62%';
                map.getPanes().markerPane.appendChild(div);
                this._div = div;
                return div;
            };
            SquareOverlay.prototype.draw = function(){
                var position = this._map.pointToOverlayPixel(this._center);
                this._div.style.left = position.x - this._length / 2 + 5 + "px";
                this._div.style.top = position.y - this._length / 1.1 + 5 + "px";
            };
            angular.forEach(vm.mapList, function (vv) {
                var img = vv.avatar ? vv.avatar : '../img/map/head.png';
                var mySquare = new SquareOverlay({lng: vv.longitude, lat: vv.latitude}, 60, "red", img);
                vm.mp.addOverlay(mySquare);
            });
            //绘制带图标注结束

            //设置地图的最佳视图
            angular.forEach(vm.mapList, function (vv) {
                vm.coordinateList.push(new BMap.Point(vv.longitude,vv.latitude));
            });
            var view = vm.mp.getViewport(vm.coordinateList);
            var mapZoom = view.zoom - 1;
            var centerPoint = view.center;
            vm.mp.centerAndZoom(centerPoint,mapZoom);


            function SquareOverlay(center, length, color, src){
                this._src = src;
                this._center = center;
                this._length = length;
                this._color = color;
            }
    };


}
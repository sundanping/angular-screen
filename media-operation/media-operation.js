/**
 * Created by zhouyaxin on 2017/8/18.
 */
angular.module('app')
    .component('mediaOperation', {
        template: '<div ui-include="\'media-operation/media-operation.html\'"></div>',
        controllerAs: 'vm',
        controller: operateController
    });
operateController.$inject = ['$timeout','config','$http','$interval'];
function operateController($timeout,config,$http,$interval) {
    var vm = this;
    vm.$onInit = function(){
        vm.originOperteList =[];
        vm.originOperList =[];
        vm.originWXList =[];
        vm.getData();
        vm.rotate =[false,false,false,false,false,false,false,false];
        vm.rotateOper =[false,false,false,false,false,false,false,false];
        vm.rotateWX =[false,false,false,false,false,false,false,false];
        $interval(function(){
            vm.originOperteList = angular.copy(vm.operateList.sum_app_install);
            vm.originOperList = angular.copy(vm.operateList.sum_web_pv);
            vm.originWXList = angular.copy(vm.operateList.wx_fans);
            vm.getData();
        },10000);
        vm.listFir = [];
        vm.listSec =[];
        vm.oper1 = [];
        vm.oper2 =[];
        vm.WX1 = [];
        vm.WX2 =[];
        vm.zIndexFir = 200;
        vm.zIndexSec = 100;
        vm.zIndexOper1 = 200;
        vm.zIndexOper2 = 100;
        vm.zIndexWX1 = 200;
        vm.zIndexWX2 = 100;
        vm.left = ['0', '11%', '22%', '33%', '44%','55%','66%','77%'];
    };

    vm.getData = function () {
        $http({
            method: 'GET',
            url: config.getUrl('operate_list')
        }).then(function (data) {
            if (data && data.data.error_message) {
                vm.msg = data.data.error_message || config.error_tip;
                return false;
            }
            if (data && data.data) {
                vm.swap('zIndexFir', 'zIndexSec');
                vm.swap('zIndexOper1', 'zIndexOper2');
                vm.swap('zIndexWX1', 'zIndexWX2');
                data.data.result.sum_app_install = vm.PreFixInterge(data.data.result.sum_app_install ,8);
                data.data.result.sum_web_pv = vm.PreFixInterge(data.data.result.sum_web_pv,8);
                data.data.result.wx_fans = vm.PreFixInterge(data.data.result.wx_fans,8);
                data.data.result.sum_app_install = data.data.result.sum_app_install.toString().split('');
                data.data.result.sum_web_pv = data.data.result.sum_web_pv.toString().split('');
                data.data.result.wx_fans = data.data.result.wx_fans.toString().split('');
                vm.operateList = data.data.result;
                if(vm.originOperteList.length){
                    angular.forEach(data.data.result.sum_app_install,function(vv,index){
                        if(vv != vm.originOperteList[index]){
                            vm.rotate[index] = true;
                        }else{
                            vm.rotate[index] = false;
                        }
                    })
                }

                if(vm.originOperList.length){
                    angular.forEach(data.data.result.sum_web_pv,function(vv,index){
                        if(vv != vm.originOperList[index]){
                            vm.rotateOper[index] = true;
                        }else{
                            vm.rotateOper[index] = false;
                        }
                    })
                }

                if(vm.originWXList.length){
                    angular.forEach(data.data.result.wx_fans,function(vv,index){
                        if(vv != vm.originWXList[index]){
                            vm.rotateWX[index] = true;
                        }else{
                            vm.rotateWX[index] = false;
                        }
                    })
                }

                if(vm.listFir.length && vm.originOperteList){
                    vm.listSec = vm.operateList.sum_app_install;
                    vm.listFir =[];
                }else{
                    vm.listFir = vm.operateList.sum_app_install;
                    vm.listSec = [];
                }

                if(vm.oper1.length && vm.originOperList){
                    vm.oper2 = vm.operateList.sum_web_pv;
                    vm.oper1 =[];
                }else{
                    vm.oper1 = vm.operateList.sum_web_pv;
                    vm.oper2 = [];
                }

                if(vm.WX1.length && vm.originWXList){
                    vm.WX2 = vm.operateList.wx_fans;
                    vm.WX1 =[];
                }else{
                    vm.WX1 = vm.operateList.wx_fans;
                    vm.WX2 = [];
                }
            }
        })
    };
    vm.PreFixInterge = function(num,n){
        //num代表传入的数字，n代表要保留的字符的长度
        return (Array(n).join(0)+num).slice(-n);
    };

    vm.swap = function (key1, key2) {
        var temp;
        temp = vm[key1];
        vm[key1] = vm[key2];
        vm[key2] = temp;
    }

}
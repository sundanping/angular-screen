angular.module('app')
    .component('clueConver', {
        template: '<div ui-include="\'clueConver/template.html\'" class="clue-conver"></div>',
        controller: clueConver,
        controllerAs: 'vm'
    });
    clueConver.$inject = ['$interval','config','http','$timeout'];
    function clueConver($interval,config,http,$timeout){
        var vm = this;
        vm.$onInit = function () {
            vm.navList = [{name:'互联网',id: 1,url:config.getUrl('internet_list')},{name:'微信',id: 2,url:config.getUrl('weixin_list')}];
            vm.navList[0].active = true;
            vm.pageCur = 1;
            vm.interpageCur = 1;
            vm.wxPageCur = 1;
            vm.listFir = [];
            vm.listSec =[];
            vm.zIndexFir = 200;
            vm.zIndexSec = 100;
            vm.top = ['0', '16.6%', '33.2%', '49.8%','66.4%','83%'];
            vm.url = config.getUrl('internet_list');
            vm.getList();

            $interval(function(){
                vm.navListNew = angular.copy(vm.navList);
                angular.forEach(vm.navListNew,function(vv,index){
                    if(vv.active == true){
                        vm.navList[index].active =false;
                        var idx = index == vm.navListNew.length -1 ? 0 :index+1;
                        vm.navList[idx].active =true;
                        vm.url = vm.navList[idx].url;
                    }
                });
            },16000);
            vm.intervarList();
        };
        vm.intervarList = function(){
            $interval(function(){
                if(vm.url == config.getUrl('internet_list')){
                    vm.interpageCur = vm.interpageCur == vm.pageNum ? 1 : vm.interpageCur +1;
                    vm.pageCur = vm.interpageCur;
                }else{
                    vm.wxPageCur = vm.wxPageCur == vm.pageNum ? 1 : vm.wxPageCur +1;
                    vm.pageCur = vm.wxPageCur;
                }

                vm.getList();
            },8000);
        };
        vm.getList = function(){
            http(vm.url,{'api.page':vm.pageCur,'api.size':6},'GET')
                .then(function(data){
                    if(data.error_code == 0){
                        vm.swap('zIndexFir', 'zIndexSec');
                        vm.data = data.result.data;
                        if(vm.listFir.length){
                            vm.listSec = vm.data;
                            vm.listFir =[];

                        }else{
                            vm.listFir = vm.data;
                            vm.listSec = [];
                        }
                        vm.total=parseInt(data.result.total);
                        vm.pageNum=Math.ceil(vm.total/6);
                    }else{
                        console.warn(data.error_message || config.error_tip);
                        return false;
                    }
                })
        };
        vm.swap = function (key1, key2) {
            var temp;
            temp = vm[key1];
            vm[key1] = vm[key2];
            vm[key2] = temp;
        }

    }
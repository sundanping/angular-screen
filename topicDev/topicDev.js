angular.module('app')
    .component('topicDev', {
        template: '<div ui-include="\'topicDev/template.html\'" class="topic-dev"></div>',
        controller: topicDev,
        controllerAs: 'vm'
    });
    topicDev.$inject = ['config','http','$interval'];
    function topicDev(config,http,$interval){
        var vm = this;
        vm.$onInit = function () {
            vm.getList();
            vm.pageCur = 1;
            vm.listFir = [];
            vm.listSec =[];
            vm.zIndexFir = 200;
            vm.zIndexSec = 100;
            vm.top = ['0', '16.6%', '33.2%', '49.8%','66.4%','83%'];
            $interval(function(){
                vm.pageCur = vm.pageCur == vm.pageNum ? 1 : vm.pageCur+1
                vm.getList();
            },16000);
        };

        vm.getList = function(){
            var url = config.getUrl('xietong_topic');
            http(url,{'api.page':vm.pageCur,'api.size':6},'GET')
                .then(function(data){
                    if(data.error_code == 0){
                        [vm.zIndexFir, vm.zIndexSec] = [vm.zIndexSec, vm.zIndexFir];
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
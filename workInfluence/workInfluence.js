angular.module('app')
    .component('workInfluence', {
        template: '<div ui-include="\'workInfluence/template.html\'" class="work-influence"></div>',
        controller: workInfluence,
        controllerAs: 'vm'
    });
    workInfluence.$inject = ['$timeout','config','http','$interval'];
    function workInfluence($timeout,config,http,$interval){
        var vm = this;
        vm.$onInit = function () {
            vm.pageCur = 1;
            vm.pageReadCur = 1;
            vm.readList = [];
            vm.commentList = [];
            vm.listFir = [];
            vm.listSec =[];
            vm.commentListFir = [];
            vm.commentListSec = [];
            vm.listSec =[];
            vm.zIndexFir = 200;
            vm.zIndexSec = 100;
            vm.zIndexComment1 = 200;
            vm.zIndexComment2 = 100;
            vm.top = ['0', '33%', '66%'];
            vm.Commenttop = ['0', '33%', '66%'];
            $interval(function(){
                $timeout(function(){
                    vm.pageCur = vm.pageCur == vm.pageNum ? 1 : vm.pageCur+1
                    vm.getComment();
                },2000);
                vm.pageReadCur = vm.pageReadCur == vm.pageReadNum ? 1 : vm.pageReadCur+1
                vm.getRead();
            },16000);
            vm.getComment();
            vm.getRead();
            $timeout(function(){
                vm.width = document.getElementsByClassName('workInf_num')[0].offsetHeight+'px'
            },900);

        };
        vm.getComment = function(){
            var url = config.getUrl('mxu_content_list');
            http(url,{'order':'comment_num','api.page':vm.pageCur,'api.size':5},'GET')
                .then(function(data){
                    if(data.error_code == 0){
                        [vm.zIndexComment1, vm.zIndexComment2] = [vm.zIndexComment2, vm.zIndexComment1];
                        vm.swap('zIndexComment1', 'zIndexComment2');
                       vm.commentList = data.result.data.slice(0,3);
                        vm.total=parseInt(data.result.total);
                        vm.pageNum=Math.ceil(vm.total/6);
                        vm.commentList.cur = vm.pageCur;
                        if(vm.commentListFir.length){
                            vm.commentListSec = vm.commentList;
                            vm.commentListFir =[];

                        }else{
                            vm.commentListFir = vm.commentList;
                            vm.commentListSec = [];
                        }
                    }else{
                        console.warn(data.error_message || config.error_tip);
                        return false;
                    }
                })
        }
        vm.getRead = function(){
            var url = config.getUrl('mxu_content_list');
            http(url,{'order':'click_num','api.page':vm.pageReadCur,'api.size':5},'GET')
                .then(function(data){
                    if(data.error_code == 0){
                        [vm.zIndexFir, vm.zIndexSec] = [vm.zIndexSec, vm.zIndexFir];
                        vm.swap('zIndexFir', 'zIndexSec');
                        vm.readList = data.result.data.slice(0,3);
                        vm.readtotal=parseInt(data.result.total);
                        vm.pageReadNum=Math.ceil(vm.readtotal/6);
                        vm.readList.cur = vm.pageReadCur;
                        if(vm.listFir.length){
                            vm.listSec = vm.readList;
                            vm.listFir =[];

                        }else{
                            vm.listFir = vm.readList;
                            vm.listSec = [];
                        }
                    }else{
                        console.warn(data.error_message || config.error_tip);
                        return false;
                    }
                })
        }
        vm.swap = function (key1, key2) {
            var temp;
            temp = vm[key1];
            vm[key1] = vm[key2];
            vm[key2] = temp;
        }
    }
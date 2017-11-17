(function(){
    angular.module('app').factory('http', [//,'myUtils'
        '$q', '$http','config',
        function ( $q, $http,config ) {//myUtils
            return function (url, param, method) {
                param = param || {};
                method = method && method.toLocaleLowerCase() || 'get';

                var async = function( url ){
                    var deferred = $q.defer(), promise = '';


                    var ajaxParam = {
                        url : url,
                        method : method,
                        headers : {}
                        // withCredentials : true
                    };
                    if( method == 'post' || method == 'patch' || method == 'put' ){
                        ajaxParam.data = param;
                    }else{
                        ajaxParam.params = param;
                    }

                    promise = $http(ajaxParam);

                    promise.success(function (data) {
                        // if( data && data.ErrorCode ){
                        // if( data.ErrorCode == 'NO_DATA' ){
                        // $state.go('error');
                        // }
                        // }
                        deferred.resolve(data);
                    }).error(function (reason,status,headers) {
                        deferred.reject(status);
                        if(status==401){
                            // myUtils.storage.clear();
                            var param= {
                                path   : window.CONFIG.cookiePath,
                                domain : window.CONFIG.cookieDomain,
                                expires:-1
                            };
                            // myUtils.cookie('mxu_token','',param);
                            // location.href=config.loginUrl;
                        }
                        if(status == 403 || status == 404 || status.toString().indexOf('50') >= 0){
                            // $state.go('404',{status : status});
                        }
                    });
                    return deferred.promise
                };

                if( typeof url === 'string' ){
                    return async( url );
                }else if( angular.isArray( url ) && url[0] ){
                    var promises = [];
                    for( var i=0,len=url.length; i<len; i++ ){
                        promises.push( async( url[i] ) );
                    }
                    return $q.all(promises);
                }

            };
        }
    ]);

    angular.module('app').factory('httpInterceptor', [
        '$q',
        function ($q) {
            return {
                'request': function (config) {
                    //config.headers['X-Request-With'] = null;
                    // config.headers['crossDomain'] = true;
                    //config.requestTimestamp = new Date().getTime();
                    return config;
                },
                'requestError': function (rejection) {
                    return $q.reject(rejection);
                },
                'response': function (response) {
                    if (response.status == 200) {
                    }
                    return response;

                },
                'responseError': function (rejection) {
                    return $q.reject(rejection);
                }
            };
        }
    ]).config([
        '$httpProvider',
        function ($httpProvider) {
            $httpProvider.interceptors.push('httpInterceptor');
        }
    ]);
})();

window.app = angular.module('mean', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles','bitbplate.dashboard']);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('bitbplate.dashboard',['bitbplate.services']);
angular.module('bitbplate.services',[]);
angular.module('bitbplate.transactions',['bitbplate.services']);

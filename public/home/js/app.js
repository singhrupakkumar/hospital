
var app = angular.module('fwrk.home', [
    'ui.router',
    'fwrk.users',
    'fwrk.pages'
    
])
        .factory('Page', function() { //now this is not working 
            var title = 'default';
            return {
                title: function() {
                    return title;
                },
                setTitle: function(newTitle) {
                    title = newTitle
                }
            };
        })
        .controller('TitleCtrl', function($scope, Page) {
            $scope.Page = Page;
        })

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "/home/templates/index.html",
                controller: 'MainCtrl'
            })
            .state('resetpassword', {
                url: "/resetpassword",
                templateUrl: "/home/templates/resetpassword.html",
                controller: 'ForgotCtrl'
            })
            // .state('privacyandpolicy', {
            //     url: "/privacyandpolicy",
            //    // templateUrl: "/home/templates/privacyandpolicy.html",
            //     controller: 'PrivacyCtrl'
            // })      
            // .state('aboutus', {
            //     url: "/aboutus",
            //  //   templateUrl: "/home/templates/aboutus.html",
            //     controller: 'AboutusCtrl'
            // })       
    $urlRouterProvider.otherwise("/");
});             
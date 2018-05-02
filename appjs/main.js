(function() {

    var app = angular.module('MessageApp',['ngRoute']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/groups', {
            templateUrl: 'pages/groups.html',
            controller: 'GroupsController',
            controllerAs : 'groupsCtrl'
        }).when('/users', {
            templateUrl: 'pages/users.html',
            controller: 'UsersController',
            controllerAs : 'usersCtrl'
        }).when('/users/:username', {
            templateUrl: 'pages/users.html',
            controller: 'usersByUsernameController',
            controllerAs : 'usersByUsernameCtrl'
        }).when('/users/:pid/contacts', {
            templateUrl: 'pages/usersContacts.html',
            controller: 'usersContactController',
            controllerAs : 'usersContactCtrl'
        }).when('/groups/:gid/members', {
            templateUrl: 'pages/members.html',
            controller: 'membersController',
            controllerAs : 'membersCtrl'
        }).when('/groups/:gid/messages', {
            templateUrl: 'pages/groups_messages.html',
            controller: 'GroupsMessagesController',
            controllerAs : 'groupsMessagesCtrl'
        }).when('/groups/:gid/messages/by/:pid', {
            templateUrl: 'pages/messages.html',
            controller: 'messagesBySenderController',
            controllerAs : 'messagesBySenderCtrl'
        }).when('/:pid/contacts/:name', {
            templateUrl: 'pages/contacts.html',
            controller: 'contactsByNameController',
            controllerAs : 'contactsByNameCtrl'
        }).otherwise({
            redirectTo: '/groups'
        });
    }]);
})();



'use strict'

var Application = Application || {};

Application.Constants   = angular.module('application.constants',   []);
Application.Services    = angular.module('application.services',    []);
Application.Controllers = angular.module('application.controllers', []);
Application.Filters     = angular.module('application.filters',     []);
Application.Directives  = angular.module('application.directives',  []);

var app = angular.module('Belize', [ 'ngRoute', 'ui', 'ui.bootstrap', 'ui.router', 'ngResource', 'application.filters', 'application.services', 'application.directives', 'application.constants', 'application.controllers']);

app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/board');

    $stateProvider

        .state('board', {
            url: "/board",
            templateUrl: "../views/Board/board.html"

        })





});

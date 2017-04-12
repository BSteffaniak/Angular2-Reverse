/**
 * Created by bradensteffaniak on 4/11/17.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="angular/Angular.ts"/>
/// <reference path="Controllers.ts"/>
/// <reference path="Services.ts"/>
function filter(data, completed) {
    return data.filter(function (x) { return x.completed == completed; });
}
var App = (function () {
    function App() {
    }
    App.prototype.init = function () {
        var todomvc = angular.module("todomvc", ["ngRoute"]);
        todomvc.filter("filter", filter);
        todomvc.factory("todoStorage", [function () { new TodoStorage(); }]);
        todomvc.directive("todoFocus", ["$timeout",]);
        todomvc.controller("TodoCtrl", ["$scope", "$location", "todoStorage", "filterFilter", TodoCtrl.prototype.constructor]);
        todomvc.config(["$routeProvider", function (routeProvider) {
                routeProvider.when("/test", new Route("templates/test.html", "TodoCtrl", "ctrl"));
            }]);
    };
    return App;
}());
exports.App = App;

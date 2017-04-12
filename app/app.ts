/**
 * Created by bradensteffaniak on 4/11/17.
 */

/// <reference path="angular/Angular.ts"/>
/// <reference path="Controllers.ts"/>
/// <reference path="Services.ts"/>

function filter(data: Array<Todo>, completed: Boolean): Array<Todo> {
        return data.filter(x => x.completed == completed)
}

export class App {
    static init() {
        var todomvc = angular.module("todomvc", ["ngRoute"])

        todomvc.filter("filter", () => { return filter })
        todomvc.factory("todoStorage", [() => { return new TodoStorage() }])
        todomvc.directive("todoFocus", ["$timeout", ])
        todomvc.controller("TodoCtrl", ["$scope", "$location", "todoStorage", "filterFilter", TodoCtrl.prototype.constructor])

        todomvc.config(["$routeProvider", (routeProvider: Router) => {
            routeProvider.when("/test", new Route("templates/test.html", "TodoCtrl", "ctrl"))
        }])
    }
}

App.init();
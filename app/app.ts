/**
 * Created by bradensteffaniak on 4/11/17.
 */

import { Route, Router, Angular } from "./angular/Angular1";

import { FocusDirective } from "./FocusDirective";
import { HighlightDirective } from "./HighlightDirective";
import { Todo, TodoCtrl } from "./TodoController";

import { TodoStorage } from "./Services";

declare let angular: any;


function filter(data: Array<Todo>, completed: Boolean): Array<Todo> {
    return data.filter(x => x.completed == completed)
}

export class App {

    static init() {
        var todomvc = angular.module("todomvc", ["ngRoute"]);

        todomvc.filter("filter", () => { return filter });
        todomvc.factory("todoStorage", [() => { return new TodoStorage() }]);
        todomvc.controller("TodoCtrl", ["$scope", "$location", "todoStorage", "filterFilter", TodoCtrl.prototype.constructor]);



        todomvc.config(["$routeProvider", (routeProvider: Router) => {
            routeProvider.when("/test", new Route("templates/test.html", "TodoCtrl", "ctrl"));
        }]);

        Angular.init(todomvc);
    }
}
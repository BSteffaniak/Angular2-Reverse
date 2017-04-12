/**
 * Created by bradensteffaniak on 4/11/17.
 */

declare var angular: any;

interface Scope {
    watch(exp: any, todo: (any), deepWatch: Boolean)
    watch(exp: any, todo: (any))
    apply(func: (any))
}

interface LocalStorage {
    getItem(id: string): string
    setItem(id: string, data: string)
}

class Route {
    templateUrl: string;
    controller: string;
    controllerAs: string;

    constructor(templateUrl: string, controller: string, controllerAs: string) {
        this.templateUrl = templateUrl;
        this.controller = controller;
        this.controllerAs = controllerAs;
    }
}

interface Router {
    when(url: String, route: Route): Router
}
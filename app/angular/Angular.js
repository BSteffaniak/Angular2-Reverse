/**
 * Created by bradensteffaniak on 4/11/17.
 */
var Route = (function () {
    function Route(templateUrl, controller, controllerAs) {
        this.templateUrl = templateUrl;
        this.controller = controller;
        this.controllerAs = controllerAs;
    }
    return Route;
}());

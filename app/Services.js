/**
 * Created by bradensteffaniak on 4/11/17.
 */
/// <reference path="angular/Angular.ts"/>
/// <reference path="Controllers.ts"/>
var TodoStorage = (function () {
    function TodoStorage() {
        this.STORAGE_ID = "TODOS-angularjs";
    }
    TodoStorage.prototype.get = function () {
        var data = storage.getItem(this.STORAGE_ID);
        if (data == null) {
            data = "[]";
        }
        return JSON.parse(data);
    };
    TodoStorage.prototype.put = function (data) {
        storage.setItem(this.STORAGE_ID, JSON.stringify(data));
    };
    return TodoStorage;
}());

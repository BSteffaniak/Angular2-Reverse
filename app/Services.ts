/**
 * Created by bradensteffaniak on 4/11/17.
 */

/// <reference path="angular/Angular.ts"/>
/// <reference path="Controllers.ts"/>

declare var storage: LocalStorage;

class TodoStorage {
    private STORAGE_ID: string = "TODOS-angularjs";

    get(): Array<Todo> {
        let data = storage.getItem(this.STORAGE_ID);
        if(data == null) {
            data = "[]"
        }
        return JSON.parse(data) as Array<Todo>
    }

    put(data: Array<Todo>) {
        storage.setItem(this.STORAGE_ID, JSON.stringify(data))
    }
}
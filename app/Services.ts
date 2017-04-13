/**
 * Created by bradensteffaniak on 4/11/17.
 */

import { Todo } from "./TodoController";

export class TodoStorage {
    private STORAGE_ID: string = "TODOS-angularjs";

    get(): Array<Todo> {
        let data = localStorage.getItem(this.STORAGE_ID);
        if(data == null) {
            data = "[]"
        }
        return JSON.parse(data) as Array<Todo>
    }

    put(data: Array<Todo>) {
        localStorage.setItem(this.STORAGE_ID, JSON.stringify(data))
    }
}
/**
 * Created by bradensteffaniak on 4/11/17.
 */

import { Scope } from "./angular/Angular1";

import { TodoStorage } from "./Services";

export class Todo {
    title: string = "";
    completed: boolean = false;

    constructor(title: string, completed: boolean) {
        this.title = title;
        this.completed = completed;
    }
}

export class TodoCtrl {
    location: Location;
    todoStorage: TodoStorage;
    filterFilter: (a: Array<Todo>, b: boolean) => Array<Todo>;

    todos: Array<Todo>;
    newTodo: string;
    editedTodo: Todo;
    test: string;

    statusFilter: boolean;
    allChecked: boolean;

    remainingCount: number;
    completedCount: number;

    constructor(scope: Scope, location: Location, todoStorage: TodoStorage, filterFilter: (a: Array<Todo>, b: Boolean) => Array<Todo>) {
        this.location = location;
        this.todoStorage = todoStorage;
        this.filterFilter = filterFilter;

        this.todos = todoStorage.get();
        this.newTodo = "";
        this.editedTodo = null;
        this.test = "jello";

        scope.$watch("todos", () => {
            this.remainingCount = filterFilter(this.todos, false).length;
            this.completedCount = this.todos.length - this.remainingCount;
            this.completedCount = this.todos.length - this.remainingCount;
            this.allChecked = this.remainingCount == 0;
        }, true);

        if (location.pathname == "") {
            location.pathname = "/";
        }

        this.location = location;

        scope.$watch("location.pathname", path => {
            switch (path) {
                case "/active":
                    this.statusFilter = false;
                    break;
                case "/completed":
                    this.statusFilter = true;
                    break;
                default:
                    this.statusFilter = null;
            }
        });
    }

    addTodo() {
        if (this.newTodo.length > 0) {
            this.todos.push(new Todo(this.newTodo, false));
            this.newTodo = "";
        }
    }

    editTodo(todo: Todo) {
        this.editedTodo = todo;
    }

    doneEditing(todo: Todo) {
        this.editedTodo = null;

        if(todo.title != null) {
            this.removeTodo(todo);
        }
    }

    removeTodo(todo: Todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
    }

    clearCompletedTodos() {
        this.todos = this.todos.filter(it => { !it.completed });
    }

    markAll(completed: boolean) {
        this.todos.forEach(it => { it.completed = completed });
    }
}
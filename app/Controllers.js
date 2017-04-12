/**
 * Created by bradensteffaniak on 4/11/17.
 */
/// <reference path="angular/Angular.ts"/>
var Todo = (function () {
    function Todo(title, completed) {
        this.title = "";
        this.completed = false;
        this.title = title;
        this.completed = completed;
    }
    return Todo;
}());
var TodoCtrl = (function () {
    function TodoCtrl(scope, location, todoStorage, filterFilter) {
        var _this = this;
        this.location = location;
        this.todoStorage = todoStorage;
        this.filterFilter = filterFilter;
        this.todos = todoStorage.get();
        this.newTodo = "";
        this.editedTodo = null;
        this.test = "jello";
        scope.watch("todos", function () {
            _this.remainingCount = filterFilter(_this.todos, false).length;
            _this.completedCount = _this.todos.length - _this.remainingCount;
            _this.completedCount = _this.todos.length - _this.remainingCount;
            _this.allChecked = _this.remainingCount == 0;
        }, true);
        if (location.pathname == "") {
            location.pathname = "/";
        }
        this.location = location;
        scope.watch("location.pathname", function (path) {
            switch (path) {
                case "/active":
                    _this.statusFilter = false;
                    break;
                case "/completed":
                    _this.statusFilter = true;
                    break;
                default:
                    _this.statusFilter = null;
            }
        });
    }
    TodoCtrl.prototype.addTodo = function () {
        if (this.newTodo.length > 0) {
            this.todos.push(new Todo(this.newTodo, false));
            this.newTodo = "";
        }
    };
    TodoCtrl.prototype.editTodo = function (todo) {
        this.editedTodo = todo;
    };
    TodoCtrl.prototype.doneEditing = function (todo) {
        this.editedTodo = null;
        if (todo.title != null) {
            this.removeTodo(todo);
        }
    };
    TodoCtrl.prototype.removeTodo = function (todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
    };
    TodoCtrl.prototype.clearCompletedTodos = function () {
        this.todos = this.todos.filter(function (it) { !it.completed; });
    };
    TodoCtrl.prototype.markAll = function (completed) {
        this.todos.forEach(function (it) { it.completed = completed; });
    };
    return TodoCtrl;
}());

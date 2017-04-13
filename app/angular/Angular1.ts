/**
 * Created by bradensteffaniak on 4/11/17.
 */

export interface Scope {
    $watch(exp: any, todo: (any), deepWatch: Boolean)
    $watch(exp: any, todo: (any))
    $apply(func: (any))
}

export interface LocalStorage {
    getItem(id: string): string
    setItem(id: string, data: string)
}

export class Route {
    templateUrl: string;
    controller: string;
    controllerAs: string;

    constructor(templateUrl: string, controller: string, controllerAs: string) {
        this.templateUrl = templateUrl;
        this.controller = controller;
        this.controllerAs = controllerAs;
    }
}

export interface Router {
    when(url: String, route: Route): Router
}

interface OnInit {
    ngOnInit()
}

var directives: any = {};
var directiveVars: any = {};
var directiveListeners: any = {};

export function HostListener(listener: string): any {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        directiveListeners[target.constructor.name] = directiveVars[target.constructor.name] || [];
        directiveListeners[target.constructor.name].push({ func: target[propertyKey], type: listener });
    }
}

export function Directive(args: any): any {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        directives[target.name] = {
            selector: args.selector,
            trimmedSelector: args.selector.substring(1, args.selector.length - 1),
            func: target
        };
        console.log("Added ", target.name);
    }
}

export function Input(): any {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        /*directives.push({
         selector: args.selector,
         trimmedSelector: args.selector.substring(1, args.selector.length - 1),
         func: target
         });*/

        directiveVars[target.constructor.name] = directiveVars[target.constructor.name] || [];
        directiveVars[target.constructor.name].push(propertyKey);

        console.log(propertyKey, descriptor, this);
    }
}

export class ElementRef {
    nativeElement: HTMLElement;

    constructor(nativeElement: HTMLElement) {
        this.nativeElement = nativeElement;
    }
}

export class Angular {
    static initDirective(directive: any): () => any {
        return () => {
            let scope = {};

            if (directiveVars[directive.func.name]) {
                directiveVars[directive.func.name].forEach(value => {
                    scope[value] = "=?";
                });
            }

            return {
                scope: scope,
                link: (scope, elements, attrs) => {
                    let instance = new directive.func(new ElementRef(elements[0]));

                    if (directiveListeners[directive.func.name]) {
                        directiveListeners[directive.func.name].forEach(value => {
                            elements[0].addEventListener(value.type, () => {
                                value.func.call(instance, value.args);
                            });
                        });
                    }
                }
            }
        }
    }

    static init(module: any) {
        for (let key in directives) {
            if (directives.hasOwnProperty(key)) {
                let value = directives[key];

                module.directive(value.trimmedSelector, [Angular.initDirective(value)]);
            }
        }
    }
}
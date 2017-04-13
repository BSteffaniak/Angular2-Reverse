/**
 * Created by bradensteffaniak on 4/11/17.
 */

import { ElementRef, Directive } from './angular/Angular1';

@Directive({ selector: '[focus]' })
export class FocusDirective {
    constructor(el: ElementRef) {
        el.nativeElement.focus();
    }
}
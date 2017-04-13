/**
 * Created by bradensteffaniak on 4/11/17.
 */

import {ElementRef, Directive, Input, HostListener} from './angular/Angular1';

@Directive({ selector: '[highlight]' })
export class HighlightDirective {
    @Input() highlightColor: string;

    constructor(private el: ElementRef) {}

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight('yellow');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
    }

    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }
}
import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';
import { registerLocaleData } from '@angular/common';

@Directive({
  selector: '[appHighlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseOver() {
    // this.renderer2.setStyle(this.elementRef.nativeElement, 'background-color', 'yellow');
    this.backgroundColor = 'yellow';
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    // this.renderer2.setStyle(this.elementRef.nativeElement, 'background-color', 'white');
    this.backgroundColor = 'white';
  }

  // @HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('style.backgroundColor') get setColor() {
    // código extra
    return this.backgroundColor;
  }
  private backgroundColor: string;

  constructor(/*private elementRef: ElementRef, private renderer2: Renderer2*/) { }

}

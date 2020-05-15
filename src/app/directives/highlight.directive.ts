// host listener will listen to the mouse movement and appropriately act 
//Renderer allows us to automatically adapt itself to the appropriate platform on which the rendering of this view is being done
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core'; 

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onmouseenter(){
    this.renderer.addClass(this.el.nativeElement, 'highlight')
  }

  @HostListener('mouseleave') onmouseleave(){
    this.renderer.removeClass(this.el.nativeElement, 'highlight')
  }

}

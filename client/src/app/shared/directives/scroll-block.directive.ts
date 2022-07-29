import { Directive, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[onScrollBlock]',
})
export class ScrollBlockDirective implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'scroll-block');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'scroll-block');
  }
}

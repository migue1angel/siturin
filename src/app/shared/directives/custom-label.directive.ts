import { Directive, ElementRef, input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLabel]',
})
export class CustomLabelDirective implements OnInit {
  label = input<string>();
  private readonly element: HTMLElement;
  constructor(private readonly el: ElementRef<HTMLElement>) {
    this.element = el.nativeElement;
  }
  ngOnInit(): void {
    this.setLabel();
  }

  setLabel() {
    this.element.classList.add('font-semibold');
    this.element.innerText = `${this.label()}:`;
  }
}

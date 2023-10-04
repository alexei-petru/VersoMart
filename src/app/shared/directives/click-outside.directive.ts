import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
interface HasElementRef {
  _elementRef: ElementRef;
}

type ExceptType = ElementRef | HTMLElement | HasElementRef | undefined;
@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  @Output() public clickOutside = new EventEmitter<void>();
  @Input() public except: ExceptType;

  constructor(private readonly elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    const isTargetElement = this.elementRef.nativeElement.contains(targetElement);
    const isExceptElement = this.checkTargetIfExcept(this.except, targetElement);
    console.log(
      '\x1b[35m%s\x1b[0m',
      `click-outside.directive H11:43 L20: 'elementRef'`,
      this.elementRef.nativeElement,
    );
    console.log(
      '\x1b[35m%s\x1b[0m',
      `click-outside.directive H11:42 L20: 'targetElement'`,
      targetElement,
    );
    console.log(
      '\x1b[35m%s\x1b[0m',
      `click-outside.directive H11:43 L25: 'isTargetElement'`,
      isTargetElement,
    );

    if (!isTargetElement && !isExceptElement) {
      this.clickOutside.emit();
    }
  }

  private checkTargetIfExcept(except: ExceptType, targetElement: HTMLElement) {
    if (!except) return false;
    if (except instanceof ElementRef) {
      return except?.nativeElement.contains(targetElement);
    }
    if (except instanceof HTMLElement) {
      return except?.contains(targetElement);
    }
    if (except && '_elementRef' in except) {
      return except._elementRef.nativeElement.contains(targetElement);
    }
    return false;
  }
}
